import { NextRequest, NextResponse } from "next/server";
import Post from "../../../../lib/utils/schemas/PostSchema";
import { mongodb } from "../../../../lib/utils/mongodb";
import middleware from "../../middleware";

export const POST = async(req: NextRequest, res: NextResponse) => {
    if(req.method === "POST"){
        try {
            await mongodb();
            const { author, comment, postId } = await req.json()
            const content = { author, comment }
            if(!postId){
                return new NextResponse(JSON.stringify({ message: "No post found" }), {
                    status: 404
                })
            }
            await Post.findByIdAndUpdate(postId, { $push: { comments: content } })
            return new NextResponse(JSON.stringify({ message: 'Commented' }))
        } catch (error) {
            return new NextResponse(JSON.stringify({ message: error.message }), {
                status: 500
            })
        }
    }

}



