import {usePostgres} from "~/server/utils/postgres";
import {compare} from 'bcrypt';
import jwt from 'jsonwebtoken';

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

    if (!existingUser.length) {
        return {success: false, statusCode: 400, message: "This email is not registered."};
    }

    const user = existingUser[0];

    const validPassword = await compare(password, user.password);
    if (!validPassword) {
        return {success: false, statusCode: 400, message: "Invalid password."};
    }

    const token = jwt.sign(
        {
            id: user.id, email: user.email
        },
        process.env.JWT_SECRET as string,
        {expiresIn: '12h'}
    )

    return {
        success: true,
        statusCode: 200,
        token
    };
})