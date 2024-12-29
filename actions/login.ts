"use server"

import * as z from "zod"
import { LoginSchema } from "../schema"
import { db } from "@/lib/db"

export const login = async ( values : z.infer<typeof LoginSchema> ) => {
    const valiDateFeild = LoginSchema.safeParse(values)
    if(!valiDateFeild.success) {
        return { error : "Invalid Feilds!"}
    }

    return { success : "Email sents"}
    console.log(values)
}