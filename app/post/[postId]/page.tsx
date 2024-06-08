"use client"

import axios from "axios";
import { ArrowBigLeftIcon, BookmarkIcon, HeartIcon, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useContext, useRef, useCallback } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useParams } from "next/navigation";
import { PostSkeleton } from "../../../components/ui/PostSkeleton";
import { useRouter } from "next/navigation";
import { INITIAL_POST } from "../../../lib/utils/initial";
import dayjs from "dayjs";
import localizedFormat from 'dayjs/plugin/localizedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(localizedFormat)
dayjs.extend(relativeTime)

// const INITIAL_COMMENT = {
//   author: '',
//   comment: ''
// }

export default function PostPage (){
   
  const [post, setPost] = useState<Post>(INITIAL_POST)
  const { user } = useContext(AuthContext)// user data function
  const { postId } = useParams()

  const [postLoading, setPostLoading] = useState(false)
  const [comment, setComment] = useState<string>('')

  const { content, author, photo, _id, likes: initialLikes, createdAt } = post;
  const [likes, setLikes] = useState<string[]>(initialLikes);
  const [isLoading, setIsLoading] = useState(false);
  const [commentLoading, setCommentLoading] = useState(false);
  const commentRef = useRef<HTMLInputElement>(null)
  const [commentList, setCommentList] = useState<IComment[]>([])
  
  const router = useRouter()

  const fetchPost = async() => {
    try {
        setPostLoading(true)
        const res = await fetch(`/api/post/${postId}`, { headers: {
            Accept: 'application/json'       
           } })
        const ans =  await res.json()
        setPost(ans)  
        setLikes(ans.likes)
        setCommentList(ans.comments)
    } catch (error) {
        console.error(error)
    } finally {
        setPostLoading(false)
    }
  }
  useEffect(()=> {
    fetchPost()
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
          Accept: "application/json"
        },

      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false)
    }
  };

  const handleComment = () => {
    setComment(commentRef.current.value)
  }

  const handlePost = async() => {
    try {
        if(comment.trim() === ''){
            return;
        }
        setCommentLoading(true)
        const res = await fetch('/api/post/comment', {
            method: 'POST',
            headers: {
                Accept: 'application/json'
            },
            body: JSON.stringify({
                author: user.username,
                comment, 
                postId
            })}
        )
        if (!res.ok) {
            throw new Error("Error found");
          }
        setComment('')
        if(commentRef.current){
          commentRef.current.value = ''
        }
        refetchComments()
    } catch (error) {
        console.error(error)
    } finally {
        setCommentLoading(false)
    }
  }

  const refetchComments = useCallback(async() => {
    try {
      const res = await fetch(`/api/post/comment/${postId}`, {
        method: 'GET'
      })
      const ans = await res.json()
      setCommentList(ans)
    } catch (error) {
      console.error(error)
    }
  }, []) 

  return (

    <main className="w-full relative flex flex-col items-center justify-center mt-6 px-4 mb-8">
        <ArrowBigLeftIcon className="self-start size-8" onClick={() => router.back()}/>
        { postLoading ? <PostSkeleton/> 
        : 
        <>
        <article className="flex rounded-t-[20px] justify-between p-4 flex-grow w-full max-w-[600px]  border-[var(--global-border-bg)] bg-[var(--global-post-bg)] border items-center space-y-4">
        <section className="flex flex-col w-full sm:gap-x-6 gap-4 self-start items-start justify-center">
          <section className="flex gap-x-6 items-center justify-start">
          <img src={user.profilephoto} className="size-[50px] rounded-full object-fill"/>
          <div className="flex gap-x-4 items-center">
                  <Link className="font-semibold" href={`/profile/${author}`}>{`@${author}`}</Link>
                  <p className="text-sm font-semibold">{ dayjs(createdAt).isBefore(new Date()) ? dayjs(createdAt).fromNow() : dayjs(createdAt).format('LL') }</p>
              </div>

          </section>
  
          <div className="flex flex-col self-start size-full gap-3">
             
            <img
              src={photo}
              className={`flex-grow self-start size-full rounded-[30px] ${photo ? "flex" : "hidden"}`}
            />
            <p className="py-2 max-w-[400px] flex-grow text-sm sm:text-[16px] font-light tracking-wide">
              {content}
            </p>
  
            <section className="flex flex-col w-full gap-y-2">
                <div className="flex gap-x-4 text-md">
                <article className={`flex gap-x-[5px] items-center justify-center ${likes.includes(user._id) ? "text-[var(--global-like-button)]" : ""}`}>
                 <button disabled={isLoading} className="z-40"><HeartIcon className={`size-5 ${likes.includes(user._id) ? "fill-[var(--global-like-button)] likebtn" : ""}`} onClick={handleLike} /></button> 
                  <p>{likes.length}</p>
                </article>
                  <article className="flex gap-x-[5px] items-center justify-center">
                  <MessageCircle className="size-5" />
                  <p>{commentList.length}</p>
                  </article>
                  <article className="flex gap-x-[5px] items-center justify-center">
                  <BookmarkIcon className="size-5" />
                  </article>
                 
                </div>
        </section>
          </div>
        </section>
      </article>
        <section className="w-full max-w-[600px]">
            <div className="flex flex-col w-full h-24 bg-[var(--global-post-bg)] p-2">
                <input type="text" ref={commentRef} onChange={handleComment} className="w-full p-2 flex-grow rounded-[10px] bg-transparent outline-none" placeholder="Enter comment here..."/>
                <button disabled={commentLoading} className="w-24 h-10 p-2 rounded-[20px] border border-[var(--global-border)] self-end" onClick={handlePost}>Post</button> 
            </div>
            <div>
                { commentList.map((comment) => (
                    <div className="w-full h-14 flex items-center justify-between p-2 bg-[var(--global-post-bg)] border border-t-[var(--global-border-bg)] border-b-0 border-l-0 border-r-0" key={comment.comment}>
                        <article className="flex gap-2">
                        <p>@{ comment.author }</p>
                        <p>{ comment.comment }</p>
                        </article>
                        <HeartIcon className="size-4"/>
                    </div>
                )) }
            </div>
        </section>
        </>
        }

</main>
  );
};
