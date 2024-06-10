import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import User from "../../../../lib/utils/schemas/UserSchema";
import Post from "../../../../lib/utils/schemas/PostSchema";
import { mongodb } from "../../../../lib/utils/mongodb";
import middleware from "../../middleware";

export const GET = async(req: NextRequest, { params }: { params: { username: string } }) => {
  try {
    await mongodb();

    const { username } = params
    const user = await User.findOne({ username })

    const userPosts = await Post.find({userId: user._id }).sort({ createdAt: -1 })
    for(let userPost of userPosts){
      if(userPost.author !== user.username){ 
        await Post.updateOne({ userId: userPost.userId }, { author: user.username }) // updating the user's username in posts if ever changed
      }
    }
    return new NextResponse(JSON.stringify(userPosts), {
      headers: { "Content-Type": "application/json" },
    });
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
