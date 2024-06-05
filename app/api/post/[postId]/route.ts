import { NextRequest, NextResponse } from "next/server"
import { mongodb } from "../../../../lib/utils/mongodb"
import { headers } from "next/headers"
import Post from "../../../../lib/utils/schemas/PostSchema"
import User from "../../../../lib/utils/schemas/UserSchema"

export const GET = async(req: NextRequest, { params }: { params : { postId: string } }) => {
    if(req.method === "GET"){
        try {
            mongodb()
            const authToken = headers().get('authorization').split(' ')[1]

            const { postId } = params
            const user = await User.findOne({ authToken: authToken })
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