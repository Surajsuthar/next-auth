"use server"

import * as z from "zod"
import { LoginSchema } from "../schema"
import { db } from "@/lib/db"
import { signIn } from "@/auth"
import { DEFAULT_LOGIN_ROUTE } from "@/route"
import { AuthError } from "next-auth"


export const login = async ( values : z.infer<typeof LoginSchema> ) => {
    const valiDateFeild = LoginSchema.safeParse(values)
    if(!valiDateFeild.success) {
        return { error : "Invalid Feilds!"}
    }

    const { email, password } = valiDateFeild.data
    console.log("Details",email,password)

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