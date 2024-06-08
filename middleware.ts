import { jwtVerify } from "jose"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

export default async function middleware (req: NextRequest){

    const url = req.nextUrl

    if (url.pathname === '/api/login' || url.pathname === '/api/register') {
        return NextResponse.next()
    }

    const authToken = cookies().get('authToken')?.value
    
    if(!authToken) {
    return NextResponse.redirect(new URL('/sign-up', req.url))
    }

    try {
        const { payload }: { payload: { userId: string } } = await jwtVerify(authToken, new TextEncoder().encode(process.env.SECRET_TOKEN)) // verifying the auth token in cookies
        if(!payload){
            return NextResponse.redirect(new URL('/sign-up', req.url))
        }

        const response = NextResponse.next()
        response.headers.set('user-id', payload.userId)
        return response 
    } catch (error) {
        console.log(error)
        return NextResponse.redirect(new URL('/sign-up', req.url))
    }
   
}

export const config = {
    matcher: ['/api/:path*'],
}