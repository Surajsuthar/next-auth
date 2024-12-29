import { auth } from "@/auth"

// export { auth as middleware } from "@/auth"

export default auth((req) => {
    console.log("Hello",req.nextUrl.pathname)
})

export const config = {
    matcher : ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"]
}