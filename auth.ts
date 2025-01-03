import NextAuth , { type DefaultSession } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import authConfig from "./auth.config"
import { db } from "@/lib/db"
import { getUserById } from "./data"
import { UserRole } from "@prisma/client"

export const { 
  auth, 
  handlers, 
  signIn, 
  signOut
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error"
  },  
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where : { id : user.id },
        data : { emailVerified : new Date()} 
      })
    }
  },
  callbacks : {
    async signIn({user, account}) {
      if(account?.provider!=="credentials") return true;

      const existingUser = await getUserById(user.id as string);
      if(!existingUser?.emailVerified) {
        return false;
      }
      //todo 2fa
      
      return true;
    },
    async session({session , token}) {
      console.log(token)
      if(token.sub && session.user) {
        session.user.id = token.sub
      }
      if(token.role && session.user) {
        session.user.role = token.role as UserRole
      }

    },
    async jwt({ token }) {
      if(!token.sub) return token;
      const loggedUser = await getUserById(token.sub)
      if(!loggedUser) return token;
      token.role = loggedUser.role
      return token;
    }
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
})