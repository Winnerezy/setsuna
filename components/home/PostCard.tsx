"use client"

import axios from "axios";
import { BookmarkIcon, HeartIcon, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useRouter } from "next/navigation";

export const PostCard = ({ post, updatePost }) => {
  const { user } = useContext(AuthContext)// user data function
  const { content, author, photo, _id, likes: initialLikes, comments } = post;
  const [likes, setLikes] = useState(initialLikes);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter()

  const handleLike = async () => {
    try {
      setIsLoading(true)
      let newLikes = [...likes]

      const hasLiked = newLikes.includes(user._id)

      if(hasLiked){
        newLikes = newLikes.filter(userId => userId !== user._id)
      } else {
        newLikes.push(user._id)
      }
      setLikes(newLikes)

      await axios.put(`/api/post/like-post/${_id}`, { newLikes }, {
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
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <article className="flex justify-between p-4 flex-grow w-full max-w-[600px] border-[var(--global-border-bg)] bg-[var(--global-post-bg)] border items-center space-y-4 cursor-pointer">
      <section className="flex w-full sm:gap-x-6 gap-4 self-start items-start justify-center">
        <section className="flex gap-x-6 items-center justify-start">
        <img src={user.profilephoto} className="size-[50px] rounded-full object-fill"/>
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
                 <button disabled={isLoading} className="z-40"><HeartIcon className={`size-5 ${likes.includes(user._id) ? "text-red-600 fill-red-600" : ""}`} onClick={handleLike} /></button> 
                  <p>{likes.length}</p>
                </article>
                <article className="flex gap-x-[5px] items-center justify-center">
                <MessageCircle className="size-5" onClick={() => router.push(`post/${_id}`)}/>
                <p>{comments.length}</p>
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
