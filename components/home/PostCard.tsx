import axios from "axios";
import { BookmarkIcon, MessageCircle, MessageCircleX, ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

export const HomeFeed = ({ content, author, photo, id }: PostCard) => {

  const [likes, setLikes] = useState<string[]>([])
  const [dislikes, setDislikes] = useState<string[]>([]);


  const fetchPost = useCallback( async() => {
    const res = await axios.get(`/api/user-post/${id}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('authToken')}`
      }
    })
    const { likes, dislikes } =  res.data
    setLikes(likes)
    setDislikes(dislikes)
  }, [id])

  useEffect(()=> {
    fetchPost()
  }, [])

  const refetch = () => {
    fetchPost()
  }

  const handleLike = async() => {
    await axios.put(`/api/post/like-post/${id}`, null, {
      headers: {
        Accept: "application/json",
        authorization: `Bearer ${localStorage.getItem('authToken')}`
      }
    })
    refetch()
  }

    const handleDislike = async () => {
      await axios.put(`/api/post/dislike-post/${id}`, null, {
        headers: {
          Accept: "application/json",
          authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      refetch()
    };
  return (
    <article className="flex flex-col justify-between p-4 flex-grow w-full max-w-[600px] border-[var(--global-tetiary-text)] border-2 rounded-[20px] items-center space-y-4">
      <section className="flex  w-full sm:gap-x-6 gap-x-4 self-start">
        <div className="size-10 sm:size-12 rounded-full bg-white"></div>
        <div className="flex flex-col size-[90%]">
          <img
            src={photo}
            className={`flex-grow self-start size-full  ${
              photo ? "flex" : "hidden"
            }`}
          />
          <p className="p-2 max-w-[400px] flex-grow text-sm sm:text-[16px] font-light tracking-wide">
            {content}
          </p>
        </div>
      </section>

      <section className="flex flex-col w-full gap-y-2">
        <hr className="border-b-[#e4e4e4] border w-full" />
        <div className="flex w-full pr-2 items-center justify-between">
          <div className="flex gap-x-4 items-center">
            <Link
              className="font-semibold"
              href={`/profile/${author}`}
            >{`@${author}`}</Link>
            <div className="flex gap-x-4 text-sm">
              <article className="flex flex-col py-[5px]">
                <ThumbsUpIcon className="size-5" onClick={handleLike} />
                <p>{`${likes.length} ${likes.length === 1 ? "Like" : "Likes"}`}</p>
              </article>
              <article className="flex flex-col py-[5px]">
                <ThumbsDownIcon className="size-5" onClick={handleDislike} />
                <p>{`${dislikes.length} ${dislikes.length === 1 ? "Dislike" : "Dislikes"}`}</p>
              </article>
            </div>
          </div>
          <div className="flex gap-x-4">
            <MessageCircle className="size-5" />
            <BookmarkIcon className="size-5" />
          </div>
        </div>
      </section>
    </article>
  );
};
