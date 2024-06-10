
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import User from "../../../lib/utils/schemas/UserSchema";
import { mongodb } from "../../../lib/utils/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import middleware from "../middleware";

interface CustomNextRequest extends NextRequest {
    user?: string; // Define the user property
}

export const GET = async(req: CustomNextRequest, res: NextResponse) => {
    
    try{
        await mongodb()
        await middleware(req)
        const userId = req.user
        const profile = await User.findById(userId, { email: false, password: false })
        
        if(!profile){
            return new NextResponse(JSON.stringify({ message: "No user found" }), {
                status: 404
            })
        }
        return new NextResponse(JSON.stringify(profile))
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: error.message }), {
            status: 500
        })
    }
}
