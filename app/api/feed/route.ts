import { cookies, headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import User from "../../../lib/utils/schemas/UserSchema";
import Post from "../../../lib/utils/schemas/PostSchema";
import { mongodb } from "../../../lib/utils/mongodb";

export const GET = async(req: NextRequest, res: NextResponse) => {
  try {
    await mongodb()
    const userId = headers().get('user-id')
    const user = await User.findById(userId)
    const feed = await Post.find({ $or : [ { userId }, { userId: user.following }]}).sort({ createdAt: -1 })

    const userPosts = await Post.find({ userId })
    for(let userPost of userPosts){
      if(userPost.author !== user.username){
        await Post.updateOne({ userId: userPost.userId }, { author: user.username })
      }
    }
    return new NextResponse(JSON.stringify(feed), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
