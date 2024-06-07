"use client"

import axios from "axios";
import { BookmarkIcon, HeartIcon, MessageCircle, MoreVerticalIcon, ShareIcon } from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useRouter } from "next/navigation";

export const PostCard = ({ post, updatePost }) => {
  const { user } = useContext(AuthContext)// user data function
  const { content, author, photo, _id, likes: initialLikes, comments } = post;
  const [likes, setLikes] = useState(initialLikes);
  const [isLoading, setIsLoading] = useState(false);
  const [profilephoto, setProfilePhoto] = useState<string | null>(null)

  const router = useRouter()

  useEffect(()=> {
    const profileImage = async() => {
      const res = await fetch(`/api/profile/${author}`, {
        method: 'GET',
        headers: {
          authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      })
      const { profilephoto } = await res.json()
      setProfilePhoto(profilephoto)
    }
    profileImage()
  }, [])

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
    <article className="relative flex max-h-[450px] justify-between p-4 flex-grow w-full max-w-[600px] border-[var(--global-border-bg)] bg-[var(--global-post-bg)] border items-center space-y-4 cursor-pointer">
      <section className="flex w-full sm:gap-x-6 gap-4 self-start items-start justify-center">
        <section className="flex gap-x-6 items-center justify-start h-full size-[60px]">
        <img src={ profilephoto } className="size-[50px] rounded-full object-fill"/>
        <MoreVerticalIcon className="size-6 absolute right-2 top-2 hover:bg-[var(--global-border-bg)] rounded-full"/>
        </section>

        <div className="flex flex-col self-start size-[90%] gap-3">
          <Link className="font-semibold" href={`/profile/${author}`}>{`@${author}`}</Link>
          <img
            src={photo}
            className={`flex-grow size-full max-h-[500px] self-start rounded-[20px] object-contain ${photo ? "flex" : "hidden"}`}
          />
          <p className="py-2 max-w-[400px] flex-grow text-sm sm:text-[16px] font-light tracking-wide">
            {content}
          </p>

          <section className="flex flex-col w-full gap-y-2">
              <div className="flex gap-x-4 text-md w-full">
                <article className={`flex gap-x-[5px] items-center justify-center ${likes.includes(user._id) ? "text-[var(--global-like-button)]" : ""}`}>
                 <button disabled={isLoading} className="z-40"><HeartIcon className={`size-5 ${likes.includes(user._id) ? "fill-[var(--global-like-button)] likebtn" : ""}`} onClick={handleLike} /></button> 
                  <p>{likes.length}</p>
                </article>
                <article className="flex gap-x-[5px] items-center justify-center">
                <MessageCircle className="size-5" onClick={() => router.push(`post/${_id}`)}/>
                <p>{comments.length}</p>
                </article>
                <article className="flex gap-x-[5px] items-center justify-center">
                <BookmarkIcon className="size-5" />
                </article>
                <article className="flex w-full gap-x-[5px] items-center justify-end">
                <ShareIcon className="size-5"/>
                </article>
              </div>
      </section>
        </div>

      </section>
    </article>
  );
};
