
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import User from "../../../lib/utils/schemas/UserSchema";
import { useRouter } from "next/navigation";

export const GET = async(req: any) => {
    try {
    // const authToken = headers().get('authorization').split(' ')[1]
    const url = new URL(req.url).searchParams 
    const username = new URLSearchParams(url).get('username') // getting the usernames from the url params

    // let profile: any;

    // if(authToken){
    //     profile = await User.findOne({ authToken: authToken }, { email: false, password: false, authToken: false })
    // } else if (username && !authToken) {
    const profile = await User.findOne({ username: username }, { email: false, password: false, authToken: false })
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