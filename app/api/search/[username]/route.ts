import { NextRequest, NextResponse } from "next/server"
import User from "../../../../lib/utils/schemas/UserSchema"
import { mongodb } from "../../../../lib/utils/mongodb"
import middleware from "../../middleware";

export const GET = async(req: NextRequest, { params }: { params: { username: string } }) => {
    try {
        await mongodb();
        const { username: user } = params
        const username = RegExp(user, 'i')
        const users = await User.find({ username })
        if(!users){
            return new NextResponse(JSON.stringify({ message: 'No Users Found' }), {
                status: 404
            })
        }
        return new NextResponse(JSON.stringify(users))
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: error.message }), {
            status: 500
        })
    }
}