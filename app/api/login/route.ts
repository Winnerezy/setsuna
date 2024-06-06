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

     return new NextResponse(JSON.stringify({ authToken: user.authToken }))
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
