"use server"

import * as z from "zod"
import { RegisterSchema } from "../schema"
import { db } from "@/lib/db"
import { getUserByEmail } from "../data"
import  bcrypt  from "bcryptjs"
import { generateVerificationToken } from "@/lib/token"
import { sendVeficationEmail } from "@/lib/mail"

export const register = async ( values : z.infer<typeof RegisterSchema> ) => {
    try {
        const valiDateFeild = RegisterSchema.safeParse(values)
        if(!valiDateFeild.success) {
            return { error : "Invalid Feilds!"}
        }
    
        const { email, password, name } = valiDateFeild.data
        const hashPassword  = await bcrypt.hash(password,10);
        const isUserExits = await getUserByEmail(email)
        
        if(isUserExits) {
            return { error : "Email already exists"}
        }
    
        await db.user.create({
            data : {
                email,
                name,
                password : hashPassword
            }
        })

        const verificationToken = await generateVerificationToken(email);

        await sendVeficationEmail(
            verificationToken.email,
            verificationToken.token
        )
    
        return { success : "confirmation mail sent"}
    } catch (error) {
        throw error;
    }
}