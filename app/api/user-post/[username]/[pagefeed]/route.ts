import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import User from "../../../../../lib/utils/schemas/UserSchema";
import Post from "../../../../../lib/utils/schemas/PostSchema";
import { mongodb } from "../../../../../lib/utils/mongodb";
import middleware from "../../../middleware";

interface CustomNextRequest extends NextRequest {
    user?: string; // Define the user property
}

export const GET = async(req: CustomNextRequest, { params }: { params: { username: string, pagefeed: string } }) => {
  try {
    await mongodb();
    await middleware(req)

    const { username, pagefeed } = params
    if(pagefeed === 'posts'){

      const userPosts = await Post.find({ author: username }).sort({ createdAt: -1 })
      
      return new NextResponse(JSON.stringify(userPosts), {
        headers: { "Content-Type": "application/json" },
      });
    } else {
      return
    }
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
