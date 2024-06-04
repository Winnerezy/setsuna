"use client"

import axios from "axios";
import { BookmarkIcon, MessageCircle, ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@mui/material";
import { useState, useEffect } from "react";

export const PostCard = ({ post, updatePost }) => {
  const { content, author, photo, _id, likes: initialLikes, dislikes: initialDislikes } = post;
  const [likes, setLikes] = useState(initialLikes);
  const [dislikes, setDislikes] = useState(initialDislikes);

  useEffect(() => {
    setLikes(initialLikes);
    setDislikes(initialDislikes);
  }, [initialLikes, initialDislikes]);

  const handleLike = async () => {
    try {
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

  const handleDislike = async () => {
    try {
      await axios.put(`/api/post/dislike-post/${_id}`, null, {
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
                  <ThumbsUpIcon className="size-5" onClick={handleLike} />
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
