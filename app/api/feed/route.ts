import { cookies, headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import User from "../../../lib/utils/schemas/UserSchema";
import Post from "../../../lib/utils/schemas/PostSchema";
import { mongodb } from "../../../lib/utils/mongodb";
import middleware from "../middleware";
import { NextApiRequest, NextApiResponse } from "next";

interface CustomNextRequest extends NextRequest {
  user?: string; 
}

export const GET = async(req: CustomNextRequest, res: NextResponse) => {
  
  try{
      await mongodb()
      await middleware(req)
      const userId = req.user
      const user = await User.findById(userId)
      const feed = await Post
      .find({ $or : [ { userId }, { userId: user.following }]})
      .sort({ createdAt: -1 })
  
      const userPosts = await Post.find({ userId })
      for(let userPost of userPosts){
        if(userPost.author !== user.username){
          await Post.updateOne({ userId: userPost.userId }, { author: user.username })
        }
      }
      return new NextResponse(JSON.stringify(feed));
    } catch (error) {
      return new NextResponse(
        JSON.stringify({ message: error.message }),
        {
          status: 500
        }
      );
    }
  }