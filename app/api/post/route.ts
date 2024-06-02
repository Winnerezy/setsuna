import { NextRequest, NextResponse } from "next/server"
import { mongodb } from "../../../lib/utils/mongodb"
import Post from "../../../lib/utils/schemas/PostSchema"
import User from "../../../lib/utils/schemas/UserSchema"
import { headers } from "next/headers"
import cloudinary from "../../../lib/utils/cloudinary"

export const POST = async(req: NextRequest) => {
    if(req.method === "POST"){
        try {
            mongodb()
            const authToken = headers().get('authorization').split(' ')[1]

            const { content, photo } = await req.json()
            const user = await User.findOne({ authToken: authToken })
            if(!user){
                return new NextResponse(JSON.stringify({ message: "No user found" }), {
                    status: 404
                })
            }
            const post = await Post.create({
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