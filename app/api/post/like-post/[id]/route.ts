import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import Post from "../../../../../lib/utils/schemas/PostSchema";
import User from "../../../../../lib/utils/schemas/UserSchema";
import { mongodb } from "../../../../../lib/utils/mongodb";

export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
  if (req.method === "GET") {
    try {
      await mongodb();
      const authToken = headers().get("authorization").split(" ")[1];
      const { newLikes } = await req.json()
      const { id } = params
      console.log(id)

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

      await Post.findByIdAndUpdate(id, { likes: newLikes});


      // if (post.likes.includes(user.username)) {
      //   await Post.findByIdAndUpdate(id, { $pull: { likes: user.username } })
      // }

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

      await Post.findByIdAndUpdate(id, { likes: newLikes});

    
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
