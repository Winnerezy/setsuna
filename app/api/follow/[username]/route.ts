import { NextRequest, NextResponse } from "next/server";
import User from "../../../../lib/utils/schemas/UserSchema";
import { headers } from "next/headers";
import { mongodb } from "../../../../lib/utils/mongodb";
import middleware from "../../middleware";
import { NextApiRequest } from "next";

interface CustomNextRequest extends NextRequest {
    user?: string; 
  }
  
export const PUT = async(req: CustomNextRequest, { params } : { params :{ username: string } }) => {
    try {
        await mongodb();
        await middleware(req)
        const userId = req.user
        const { username } = params

        if(!userId){
            return new NextResponse(JSON.stringify({ message: 'Invalid Token'}), {
                status: 401
            })
        }
        
        const { _id } = await User.findById(userId)

        if(!_id){
            return new NextResponse(JSON.stringify({ message: 'No user found' }), {
                status: 404
            })
        }

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