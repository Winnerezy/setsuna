import { NextRequest, NextResponse } from "next/server";
import { mongodb } from "../../../lib/utils/mongodb";
import User from "../../../lib/utils/schemas/UserSchema";
import bcrypt from "bcrypt";
export const POST = async (req: NextRequest, res: NextResponse) => {
  if (req.method === "POST") {
    try {
      mongodb();
      const { username, password } = await req.json();
      const user = await User.findOne({ username });
      
      if(!user){
        return Response.json({ message: "No User Found" })
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return Response.json({
          message: "Incorrect username and password combination",
        });
      }

      return Response.json(user.authToken);
    } catch (error) {
      return Response.json({ message: error.message });
    }
  }
};
