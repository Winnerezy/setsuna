import { NextRequest, NextResponse } from "next/server"
import { mongodb } from "../../../lib/utils/mongodb"
import Post from "../../../lib/utils/schemas/PostSchema"
import User from "../../../lib/utils/schemas/UserSchema"
import { headers } from "next/headers"

export const POST = async(req: NextRequest) => {
    if(req.method === "POST"){
        try {
            mongodb()
            const userId = headers().get('user-id')

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

