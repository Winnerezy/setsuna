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
            return Response.json({ message: "User already registered with this credencials" })
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
        return Response.json(user.authToken);
    } catch (error) {
        return Response.json({ message: error.message });
    }

}