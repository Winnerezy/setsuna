import User from "../../../lib/utils/schemas/UserSchema";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { NextApiRequest, NextApiResponse } from "next";
import { cookies } from "next/headers";
import { SignJWT } from "jose";
import { mongodb } from "../../../lib/utils/mongodb";

export const POST = async(req: NextRequest, res: NextApiResponse) => {
    try {
        await mongodb();
        let userData = await req.json();
        const saltRounds = 10
        const existingUser = await User.findOne({ $or:[{ email: userData.email }, { username: userData.username }]})
        if(existingUser){
            return new NextResponse(
              JSON.stringify({
                message: "User already registered with this credentials",
              }),
              {
                status: 400,
              }
            );
        }
        const hashPassword = await bcrypt.hash(userData.password, saltRounds)

        const user = await User.create({ 
          firstname: userData.firstname,
          lastname: userData.lastname,
          username: userData.username,
          email: userData.email,
          password: hashPassword
       });

         const authToken = await new SignJWT({ userId: user._id }) 
              .setProtectedHeader({ alg: 'HS256' }) 
              .sign(new TextEncoder().encode(process.env.SECRET_TOKEN));
        

        cookies().set({
          name: 'authToken',
          value: authToken,
          httpOnly: false, 
          maxAge: 7 * 24 * 60 * 60,
          sameSite: 'strict',
          path: '/'
        })
         
        return new NextResponse(JSON.stringify(user._id));
    } catch (error) {
        return new NextResponse(
          JSON.stringify({
            message: error.message,
          }),
          {
            status: 500,
          }
        );
    }

}