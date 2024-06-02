import { NextRequest, NextResponse } from "next/server";
import Post from "../../../../lib/utils/schemas/PostSchema";
import { mongodb } from "../../../../lib/utils/mongodb";
import User from "../../../../lib/utils/schemas/UserSchema";
import { headers } from "next/headers";

export const GET = async (req: NextRequest) => {
  if (req.method === "GET") {
    try {
      await mongodb();
      const authToken = headers().get('authorization').split(' ')[1];

      const url = new URL(req.url);
      const id = url.pathname.split("/").pop();

      if (!id) {
        return NextResponse.redirect(new URL("/404", req.url));
      }

      const user = await User.findOne({ authToken: authToken });

      if (!user) {
        return new NextResponse(JSON.stringify({ message: "No user found" }), {
          status: 404,
        });
      }

      const post = await Post.findById(id);

      return new NextResponse(JSON.stringify(post));
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
