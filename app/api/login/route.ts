import { NextRequest, NextResponse } from "next/server";
import { mongodb } from "../../../lib/utils/mongodb";
import User from "../../../lib/utils/schemas/UserSchema";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { SignJWT } from "jose";

export const POST = async (req: NextRequest, res: NextResponse) => {
  if (req.method === "POST") {
    try {
      mongodb();
      const { username, password } = await req.json();
      const user = await User.findOne({ username });
      
      if(!user){
        return new NextResponse(JSON.stringify({ message: "No User Found" }), {
          status: 404,
        });
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return new NextResponse(JSON.stringify({ message: "Incorrect username and password combination." }), {
          status: 400,
        });
      }

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

     return new NextResponse(JSON.stringify({ message: 'Logged In' }))
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
};
