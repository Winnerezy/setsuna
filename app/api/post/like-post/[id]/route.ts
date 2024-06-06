import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import Post from "../../../../../lib/utils/schemas/PostSchema";
import User from "../../../../../lib/utils/schemas/UserSchema";
import { mongodb } from "../../../../../lib/utils/mongodb";

export const PUT = async (req: NextRequest, { params } : { params: { id: string } } ) => {
  if (req.method === "PUT") {
    try {
      await mongodb();
      const authToken = headers().get("authorization").split(" ")[1];
      const { newLikes } = await req.json()
      const { id } = params


      if (!id) {
        return NextResponse.redirect(new URL("/home", req.url));
      }

      const user = await User.findOne({ authToken: authToken });

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
