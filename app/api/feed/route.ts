import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import User from "../../../lib/utils/schemas/UserSchema";
import Post from "../../../lib/utils/schemas/PostSchema";
import { mongodb } from "../../../lib/utils/mongodb";

export const GET = async(req: NextRequest, res: NextResponse) => {
  try {
    await mongodb()
    const authToken = headers().get('authorization').split(' ')[1];
    const user = await User.findOne({ authToken: authToken })
    const posts = await Post.find({ author: user.username }).sort({ createdAt: -1 })
    return new NextResponse(JSON.stringify(posts), {
      headers: { "Content-Type": "application/json" },
    });
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
