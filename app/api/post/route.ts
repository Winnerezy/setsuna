import { NextRequest, NextResponse } from "next/server"
import { mongodb } from "../../../lib/utils/mongodb"
import Post from "../../../lib/utils/schemas/PostSchema"
import User from "../../../lib/utils/schemas/UserSchema"
import { headers } from "next/headers"
import middleware from "../middleware"

interface CustomNextRequest extends NextRequest {
    user?: string; // Define the user property
}

export const POST = async(req: CustomNextRequest, res: NextResponse) => {
    if(req.method === "POST"){
        try {
            await mongodb()
            await middleware(req)
            const userId = req.user
            const { content, photo } = await req.json()
            const user = await User.findById(userId)
            if(!user){
                return new NextResponse(JSON.stringify({ message: "No user found" }), {
                    status: 404
                })
            }
            const post = await Post.create({
                userId,
                author: user.username,
                content, 
                photo: photo
            })
            return new NextResponse(JSON.stringify({
                message: "Post Created",
                post: post
            }), {
                status: 201,
                
            })
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

