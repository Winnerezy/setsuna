import { NextRequest, NextResponse } from "next/server";
import User from "../../../../lib/utils/schemas/UserSchema";
import { cookies, headers } from "next/headers";
import { redirect } from "next/dist/server/api-utils";

export const PUT = async(req: NextRequest, { params }: { params: { username: string } }) => {
    try {
        const { username } = params
        if(!username){
            return NextResponse.redirect('/404')
        }
        const authToken = cookies().get('authToken').value
        
        if(!authToken){
            return new NextResponse(JSON.stringify({ message: 'Invalid Token'}), {
                status: 401
            })
        }
        const { _id } = await User.findOne({ authToken: authToken })
        const { _id: followingUserId, followers } = await User.findOne({ username })
        if(followers.includes(_id)) {
            await User.findOneAndUpdate({ username }, { $pull : {followers: _id }})
            await User.findByIdAndUpdate(_id, { $pull : {following: followingUserId }})
        } else {
            await User.findOneAndUpdate({ username }, { $push : {followers: _id }})
            await User.findByIdAndUpdate(_id, { $push : {following: followingUserId }})
        }
        return new NextResponse(JSON.stringify({ message: 'Successful' }))
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: error.message }), {
            status: 500
        })
    }
}