
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import User from "../../../../lib/utils/schemas/UserSchema";
import { mongodb } from "../../../../lib/utils/mongodb";
import middleware from "../../middleware";

export const GET = async(req: NextRequest, { params }: { params: { username: string } }) => {
    try {
        await mongodb();
        const { username } = params
    const profile = await User.findOne({ username }, { email: false, password: false, authToken: false })
    // }

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