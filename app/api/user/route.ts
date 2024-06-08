
import { cookies, headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import User from "../../../lib/utils/schemas/UserSchema";

export const GET = async(req: NextRequest) => {
    try {
    const userId = headers().get('user-id')

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
