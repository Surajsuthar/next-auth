"use server"

import { db } from "@/lib/db";
import { getUserByEmail } from "@/data";
import { getVerificationTokenByToken } from "@/data/verification-token";

export const newVefication = async ( token : string ) => {
    const existingToken = await getVerificationTokenByToken(token);
    if(!existingToken) {
        return { error : "Token doesnt exits"}
    }

    const hashExprie = new Date(existingToken.expire) < new Date();
    if(hashExprie) {
        return  { error: "Token has exprie"}
    } 

    const existingUser = await getUserByEmail(existingToken.email);
    if(!existingUser) {
        return { error: "Email doesnt exits"}
    }
    await db.user.update({
        where: {
            id :existingUser.id
        },
        data: {
            emailVerified: new Date(),
            email: existingToken.email
        }
    })

    await db.verificationToken.delete({
        where : { id: existingToken.id}
    })

    return { success: "Email verified Successfully"}
}