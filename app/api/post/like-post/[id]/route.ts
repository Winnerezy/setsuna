import { NextRequest, NextResponse } from "next/server";
import Post from "../../../../../lib/utils/schemas/PostSchema";
import User from "../../../../../lib/utils/schemas/UserSchema";
import { mongodb } from "../../../../../lib/utils/mongodb";
import { headers } from "next/headers";
import middleware from "../../../middleware";

interface CustomNextRequest extends NextRequest {
  user?: string; 
}

export const PUT = async (req: CustomNextRequest, { params } : { params: { id: string } } ) => {
  if (req.method === "PUT") {
    try {
      await mongodb();
      await middleware(req)
      const userId = req.user
    
      const { newLikes } = await req.json()
      const { id } = params


      if (!id) {
        return NextResponse.redirect(new URL("/home", req.url));
      }

      const user = await User.findById(userId);

      if (!user) {
        return new NextResponse(JSON.stringify({ message: "No user found" }), {
          status: 404,
        });
      }
      
      const users = await User.find({ _id: { $in: newLikes } })
      await Post.findByIdAndUpdate(id, { likes: users.map(user => user._id)});

      console.log(newLikes)
      return new NextResponse(
        JSON.stringify({
          message: "Like Successful",
        })
      );
    } catch (error) {
      return new NextResponse(
        JSON.stringify({
          message: error.message,
        }),
        {
          status: 500,
        }
      );
    }
  }
};
