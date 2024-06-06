import { NextRequest, NextResponse } from "next/server"
import { mongodb } from "../../../../../lib/utils/mongodb"
import Post from "../../../../../lib/utils/schemas/PostSchema"

export const GET = async(req: NextRequest, { params }: { params: { postId: string } } ) => {
    await mongodb()
    if(req.method === "GET"){
        try {
            const { postId } = params
            const { comments } = await Post.findById(postId).sort({ createdAt: -1 })
            if(!comments){
                return new NextResponse(JSON.stringify({ message: "No Comments Available" }), {
                    status: 404
                })
            }
            console.log(comments)
            return new NextResponse(JSON.stringify(comments))
        } catch (error) {
            return new NextResponse(JSON.stringify({ message: error.message }), {
                status: 500
            })
        }
    }

}