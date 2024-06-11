import { NextRequest, NextResponse } from "next/server";
import { mongodb } from "../../../lib/utils/mongodb";
import User from "../../../lib/utils/schemas/UserSchema";
import bcrypt from "bcrypt";
import { SignJWT } from "jose";
import { NextApiResponse } from "next";

// Login handler
export const POST = async (req: NextRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      // Connect to MongoDB
      await mongodb();

      // Parse request body
      const { username, password } = await req.json();

      // Find user by username
      const user = await User.findOne({ username });
      if (!user) {
        return new NextResponse(
          JSON.stringify({ message: "No User Found" }),
          { status: 404 }
        );
      }

      // Compare password with stored hash
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return new NextResponse(
          JSON.stringify({ message: "Incorrect username and password combination." }),
          { status: 400 }
        );
      }

      // Create JWT token
      const authToken = await new SignJWT({ userId: user._id })
        .setProtectedHeader({ alg: 'HS256' })
        // .setExpirationTime('5h') // Set token expiration time
        .sign(new TextEncoder().encode(process.env.SECRET_TOKEN));

      // Set token as HTTP-only cookie
      const response = NextResponse.json({ message: "Logged In" }, { status: 200 });
      response.cookies.set({
        name: "authToken",
        value: authToken,
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60,
        path: "/",
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production"
      });
  
      return response;

    } catch (error) {
      return new NextResponse(
        JSON.stringify({ message: error.message }),
        { status: 500 }
      );
    }
  } else {
    // Handle non-POST requests
    return new NextResponse(
      JSON.stringify({ message: "Method not allowed" }),
      { status: 405 }
    );
  }
};
