import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import Post from "../../../../../lib/utils/schemas/PostSchema";
import User from "../../../../../lib/utils/schemas/UserSchema";
import { mongodb } from "../../../../../lib/utils/mongodb";

export const PUT = async (req: NextRequest) => {
  if (req.method === "PUT") {
    try {
      await mongodb();
      const authToken = headers().get("authorization").split(" ")[1];

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

      if (!post) {
        return new NextResponse(JSON.stringify({ message: "Post not found" }), {
          status: 404,
        });
      }

      await Post.findByIdAndUpdate(id, {
        $push: { dislikes: user.username },
      });


      if (post.dislikes.includes(user.username)) {
        await Post.findByIdAndUpdate(id, { $pull: { dislikes: user.username } })
      }

      return new NextResponse(
        JSON.stringify({
          message: "Dislike Successful",
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
