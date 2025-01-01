import { getVerificationTokenByEmail } from "@/data/verification-token";
import { v4 as uuidv4 } from "uuid"
import { db } from "./db";

export const generateVerificationToken = async (
    email : string
) => {
    try {
        const token = uuidv4()
        const expire = new Date(new Date().getTime() + 3600*1000);
    
        const existsingToken = await getVerificationTokenByEmail(email);
        if(existsingToken) {
            await db.verificationToken.delete({
                where : { id : existsingToken.id }
            })
        }
        const verificationToken = await db.verificationToken.create({
            data : {
                email,
                token,
                expire
            }
        })
    
        return verificationToken;
    } catch (error) {
        throw error
    }
}