import { NextRequest } from "next/server"
import authConfig from "../auth.config"
import NextAuth from "next-auth"
import {
    DEFAULT_LOGIN_ROUTE,
    apiRoutePrefix,
    authRoute,
    publicRoute
} from "@/route"

const { auth } = NextAuth(authConfig)
export default auth((req) => {
    const { nextUrl } = req
    const isLogged = !!req.auth;
    const isApiAuthRoute = nextUrl.pathname.startsWith(apiRoutePrefix);
    const isPublicroute = publicRoute.includes(nextUrl.pathname);
    const isAuthRoute = authRoute.includes(nextUrl.pathname);

    if(isApiAuthRoute) {
        return;
    }

    if(isAuthRoute) {
        if(isLogged) {
            return Response.redirect(new URL(DEFAULT_LOGIN_ROUTE,nextUrl));
        }
        return;
    }

    if(!isLogged && !isPublicroute) {
        return Response.redirect(new URL("/auth/login",nextUrl));
    }

    return;
})

export const config = {
    matcher : ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"]
}