import { jwtVerify } from "jose";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

interface CustomNextRequest extends NextRequest {
    user?: string; // Define the user property
}

const middleware = async (req: CustomNextRequest) => {
    try {
        const authToken = cookies().get('authToken').value

        const signInUrl = new URL('/sign-in', req.url).href
        if (!authToken) {
            console.log('Auth token missing');
            return NextResponse.redirect(signInUrl)
        }
        
        try {
            const { payload }: { payload :{ userId: string } } = await jwtVerify(authToken, new TextEncoder().encode(process.env.SECRET_TOKEN));

            (req as CustomNextRequest).user = payload.userId // decoded token for user id
            return NextResponse.next()
        } catch (error) {
            console.error('Failed to verify token:', error.message);
            return NextResponse.redirect(signInUrl)
        }
    } catch (error) {
        console.error('Error in middleware:', error);
        return
    }
};

export default middleware