import { AuthOptions } from "next-auth"
import GoogleProvider from 'next-auth/providers/google'
import { db } from "../db/db"
import { users } from "../db/schema"

export const authOptions : AuthOptions = {
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            async profile(profile,token){
                try {
                
                    const data = {
                        Fname: profile.given_name,
                        Lname: profile.family_name,
                        email: profile.email,
                        provider:"GOOGLE",
                        externalId: profile.sub,
                        image:profile.picture,
                    }


                  

                    const user = await db.insert(users).values(data).onConflictDoUpdate({
                        target: users.email,
                        set: data
                    }).returning();


                    return {
                        ...data,
                        name:data.Fname,
                        id:String(user[0].id),
                        role:user[0].role
                    }
                } catch (error) {
                    return {id : profile.sub}
                }
            }
        })
    ],
    callbacks:{
        session(data: any){
            return data;
        },
        jwt({token,user}:{token: any, user: any}){
            if(user){
                token.role = user.role,
                token.id = user.id
            }
            return token;
            
        }
    }
    
}