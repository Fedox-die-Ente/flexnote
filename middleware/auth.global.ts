import {jwtDecode as JwtDecode} from 'jwt-decode';

export default defineNuxtRouteMiddleware((to, from) => {
    const tokenCookie = useCookie("flexnote_token");

    if (tokenCookie.value) {
        const token = tokenCookie.value;
        if (token) {
            try {
                const decodedToken = JwtDecode(token);
                const currentTime = Date.now() / 1000;

                if (decodedToken?.exp! < currentTime) {
                    console.warn("Token expired, redirecting to login.");
                    tokenCookie.value = null;
                    return navigateTo('/login');
                }
            } catch (error) {
                console.error("Invalid token:", error);
                tokenCookie.value = null;
                return navigateTo('/login');
            }
        } else if (to.name !== 'login' && to.name !== 'register') {
            return navigateTo('/login');
        }
    } else {
        if (to.name !== 'login' && to.name !== 'register') {
            return navigateTo('/login');
        }
    }
});