"use server"

import * as z from "zod"
import { LoginSchema } from "../schema"
import { db } from "@/lib/db"
import { signIn } from "@/auth"
import { DEFAULT_LOGIN_ROUTE } from "@/route"
import { AuthError } from "next-auth"
import { getUserByEmail } from "@/data"
import { error } from "console"
import { generateVerificationToken } from "@/lib/token"


export const login = async ( values : z.infer<typeof LoginSchema> ) => {
    const valiDateFeild = LoginSchema.safeParse(values)
    if(!valiDateFeild.success) {
        return { error : "Invalid Feilds!"}
    }

    const { email, password } = valiDateFeild.data
    const existingUser = await getUserByEmail(email);
    if(!existingUser || !existingUser.email || !existingUser.password) {
        return { error : "Email doesnt exist"}
    } 

    if(!existingUser.emailVerified) {
        const verificationToken = await generateVerificationToken(existingUser.email);
        return  { success : "Confiramation email sent"};
    }

    try {
        await signIn("credentials" , {
            email,
            password,
            redirectTo : DEFAULT_LOGIN_ROUTE
        })

    } catch (error) {
        if( error instanceof AuthError) {
            switch (error.type ) {
                case "CredentialsSignin":
                    return { error : "Invalid credentials"}
                default :
                    return { error : "SomeThing went Wrong"}
            }
        }

        throw error
    }
}