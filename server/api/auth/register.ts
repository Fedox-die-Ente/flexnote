import {usePostgres} from "~/server/utils/postgres";
import {genSalt, hash} from 'bcrypt';

export default defineEventHandler(async (event) => {
    const {email, password} = await readBody(event);

    if (!email || !password) {
        return {
            success: false,
            statusCode: 400,
            message: "Email and password are required."
        };
    }

    const sql = usePostgres();

    const existingUser = await sql`
        SELECT *
        FROM users
        WHERE email = ${email}
    `;

    if (existingUser.length > 0) {
        return {success: false, statusCode: 400, message: "This email is already registered."};
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return {success: false, statusCode: 400, message: "Invalid email format."};
    }

    if (password.length < 6) {
        return {success: false, statusCode: 400, message: "Password must be at least 6 characters long."};
    }

    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    const result = await sql`
        INSERT INTO users (email, password)
        VALUES (${email}, ${hashedPassword}) RETURNING id, email
    `;

    if (result.length === 0) {
        return {success: false, statusCode: 500, message: "Failed to register user."};
    }

    const user = result[0];
    return {success: true, statusCode: 201, user: {id: user.id, email: user.email}};
})