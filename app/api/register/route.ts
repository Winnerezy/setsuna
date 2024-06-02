import { mongodb } from "../../../lib/utils/mongodb";
import User from "../../../lib/utils/schemas/UserSchema";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
export const POST = async(req: NextRequest, res: Response) => {
    try {
        mongodb();
        let userData = await req.json();
        const saltRounds = 10
        const existingUser = await User.findOne({ $or:[{ email: userData.email }, { username: userData.username }]})
        if(existingUser){
            return new NextResponse(
              JSON.stringify({
                message: "User already registered with this credencials",
              }),
              {
                status: 400,
              }
            );
        }
        const payload = JSON.stringify(Math.ceil(Math.random() * 1000 + 1))

        const hashPassword = await bcrypt.hash(userData.password, saltRounds)

        const token = jwt.sign(payload, process.env.SECRET_TOKEN)
        const user = await User.create({ 
            firstname: userData.firstname,
            lastname: userData.lastname,
            username: userData.username,
            email: userData.email,
            password: hashPassword,
            authToken: token
         });
        return new NextResponse(JSON.stringify(user.authToken));
    } catch (error) {
        return new NextResponse(
          JSON.stringify({
            message: error.message,
          }),
          {
            status: 404,
          }
        );
    }

}