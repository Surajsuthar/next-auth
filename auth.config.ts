import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Github from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { LoginSchema } from "./schema"
import { getUserByEmail } from "./data"
import bcrypt from "bcryptjs"
 
export default {    
    providers: [
        Google({
            clientId:  process.env.GOOGLE_CLIENT_ID,
            clientSecret:  process.env.GOOGLE_CLIENT_SECRET
        }),
        Github({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET
        }),
        Credentials({
            async authorize(credentials,req) {
                const validateInput = LoginSchema.safeParse(credentials);
                if(validateInput.success) {
                    const { email, password } = validateInput.data
                    const user = await getUserByEmail(email);
                    if(!user || !user.password) {
                        return null;
                    }
                    if(await bcrypt.compare(password,user.password)) {
                        return user;
                    }
                }
                return null;
            }
        })
    ] 
} satisfies NextAuthConfig