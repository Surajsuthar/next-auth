import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { LoginSchema } from "./schema"
import { getUserByEmail } from "./data"
import bcrypt from "bcryptjs"
 
export default { 
    providers: [
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