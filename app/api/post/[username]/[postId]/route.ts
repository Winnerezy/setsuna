import { NextRequest, NextResponse } from "next/server"
import { mongodb } from "../../../../../lib/utils/mongodb"
import { headers } from "next/headers"
import Post from "../../../../../lib/utils/schemas/PostSchema"
import User from "../../../../../lib/utils/schemas/UserSchema"
import middleware from "../../../middleware"

interface CustomNextRequest extends NextRequest {
  user?: string; 
}

export const GET = async(req: CustomNextRequest, { params }: { params : { postId: string } }) => {
    if(req.method === "GET"){
        try {
            await mongodb()
            await middleware(req)
            const userId = req.user
            const { postId } = params
            const user = await User.findById(userId)
            if(!user){
                return new NextResponse(JSON.stringify({ message: "No user found" }), {
                    status: 404
                })
            }
            const post = await Post.findById(postId)
            return new NextResponse(JSON.stringify(post))
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
}