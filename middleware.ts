import { NextRequest } from "next/server"
import authConfig from "./auth.config"
import NextAuth from "next-auth"

const { auth } = NextAuth(authConfig)
export default auth(async function middleware(req: NextRequest) {
    console.log("Helllo")
    console.log(req.nextUrl.pathname)
})

export const config = {
    matcher : ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"]
}