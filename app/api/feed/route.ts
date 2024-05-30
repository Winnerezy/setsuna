import { NextRequest, NextResponse } from "next/server";
import { mongodb } from "../../../lib/utils/mongodb";
import Post from "../../../lib/utils/schemas/PostSchema";
import User from "../../../lib/utils/schemas/UserSchema";
import { headers } from "next/headers";

export const GET = async(req: NextRequest, res: NextResponse) => {
  try {
    mongodb()
    const authToken = headers().get('authorization').split(' ')[1]; // getting the authorization from the request

    const { username } = await User.findOne({ authToken: authToken });
    const userPosts = await Post.find({ author: username }).sort({ createdAt: -1 })
    return new NextResponse(JSON.stringify(userPosts));
  } catch (error) {
    // Handle errors here
    console.error(error);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
