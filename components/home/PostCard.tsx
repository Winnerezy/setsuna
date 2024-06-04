"use client"

import axios from "axios";
import { BookmarkIcon, HeartIcon, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import userInfo from "../../hooks/UserInfo";

export const PostCard = ({ post, updatePost }) => {
  const user = userInfo() // user data function
  const { content, author, photo, _id, likes: initialLikes } = post;
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    setLiked(() => initialLikes.includes(user?.username))
    setLikes(initialLikes);
  }, [initialLikes, user]);

  const handleLike = async () => {
    try {
      setLiked(prev => !prev)
      await axios.put(`/api/post/like-post/${_id}`, null, {
        headers: {
          Accept: "application/json",
          authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      const res = await axios.get(`/api/user-post/${_id}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      const updatedPost = res.data;
      updatePost(updatedPost);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <article className="flex justify-between p-4 flex-grow w-full max-w-[600px] border-[var(--global-border-bg)] bg-[var(--global-post-bg)] border items-center space-y-4">
      <section className="flex w-full sm:gap-x-6 gap-4 self-start items-start justify-center">
        <section className="flex gap-x-6 items-center justify-start">
          <div className="size-10 sm:size-12 rounded-full bg-white"></div>
        </section>

        <div className="flex flex-col self-start size-[90%] gap-3">
          <Link className="font-semibold" href={`/profile/${author}`}>{`@${author}`}</Link>
          <img
            src={photo}
            className={`flex-grow self-start size-full rounded-[30px] ${photo ? "flex" : "hidden"}`}
          />
          <p className="py-2 max-w-[400px] flex-grow text-sm sm:text-[16px] font-light tracking-wide">
            {content}
          </p>

          <section className="flex flex-col w-full gap-y-2">
              <div className="flex gap-x-4 text-md">
                <article className="flex gap-x-[5px] items-center justify-center">
                  <HeartIcon className={`size-5 ${liked ? "text-red-600 fill-red-600" : ""}`} onClick={handleLike} />
                  <p>{likes.length}</p>
                </article>
                <article className="flex gap-x-[5px] items-center justify-center">
                <MessageCircle className="size-5" />
                </article>
                <article className="flex gap-x-[5px] items-center justify-center">
                <BookmarkIcon className="size-5" />
                </article>
               
              </div>
      </section>
        </div>

      </section>
    </article>
  );
};
