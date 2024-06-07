"use client"

import axios from "axios";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { TextareaAutosize } from "@mui/base";
import { PostCard } from "../../components/home/PostCard";
import { useFetchFeed } from "../../hooks/useFetchFeed";
import { ImageIcon } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { PostSkeleton } from "../../components/ui/PostSkeleton";
import { useRouter } from "next/navigation";
import { AuthContext } from "../../context/AuthContext";

export default function Home() {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const contentRef = useRef(null);
  const [photo, setPhoto] = useState(null);
  const { posts: initialPosts, refetch, isLoading, error } = useFetchFeed();
  const [posts, setPosts] = useState<Post[]>([]);

  const { user } = useContext(AuthContext) // logged in user data

  const router = useRouter()

  useEffect(()=> {
    if(!localStorage.getItem('authToken')){
      router.push('/sign-in')
    }
  }, [])
  useEffect(() => {
    if (initialPosts) {
      setPosts(initialPosts);
    }
  }, [initialPosts]);

  const handleInput = () => {
    setContent(contentRef.current.value);
  };

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        const binaryStr = reader.result;
        setPhoto(binaryStr);
      };
      reader.readAsDataURL(file);
    });
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handlePost = async () => {
    try {
      setLoading(true);
      const options = {
        accept: "application/json",
        authorization: `Bearer ${localStorage.getItem("authToken")}`,
      };

      const body = {
        userId: user._id,
        content: content,
        photo: photo,
      };
      const res = await axios.post("api/post", body, { headers: options });
      if (res.status !== 201) {
        throw new Error("Error found");
      }

      refetch();
      setContent("");
      setPhoto(null);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  console.log(posts)

  const updatePost = (updatedPost: Post) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === updatedPost._id ? updatedPost : post
      )
    );
  };

  return (
    <main className="relative flex flex-col w-full h-full items-center justify-center">
      <div className="size-full p-5 flex flex-col items-center justify-center">
        <article className="flex flex-col justify-between p-4 flex-grow w-full max-w-[600px] border-[var(--global-border-bg)] bg-[var(--global-post-bg)] border rounded-[20px] items-center space-y-4">
          <section className="relative flex w-full space-x-4">
            <section className="flex gap-x-6 items-start justify-start h-full size-[60px]">
              <img src={user.profilephoto} className="size-[50px] rounded-full object-fill cursor-pointer" onClick={() => router.push(`/profile/${user.username}`)}/>
            </section>
            <div className="flex flex-col size-full">
              <img
                src={photo}
                className={`${
                  photo ? "flex" : "hidden"
                } size-full max-h-[500px] flex-grow self-start rounded-[20px]`}
              />
              <TextareaAutosize
                className="bg-transparent outline-none p-2 w-full max-w-[600px] flex-grow resize-none"
                placeholder="Share your experience...."
                value={content}
                onChange={handleInput}
                ref={contentRef}
                maxLength= {300}
              />
            </div>
            <p className="absolute right-0 -bottom-4 text-sm">{ content.length }/300</p>
          </section>

          <section className="flex flex-col w-full gap-y-2">
            <hr className="border-b-[#e4e4e4] border w-full" />
            <div className="w-full flex items-center justify-between px-2">
              <div {...getRootProps()}>
                <input {...getInputProps()} accept="image/*" />
                <ImageIcon className="size-5 hover:opacity-80" />
              </div>

              <button
                className="border-[var(--global-border-bg)] border rounded-[20px] hover:opacity-80 disabled:opacity-70 disabled:text-[#e4e4e4] text-center p-1 w-16 h-8 font-semibold text-sm self-end"
                onClick={handlePost}
                disabled={loading}
              >
                Post
              </button>
            </div>
          </section>
        </article>
        <section className="size-full flex flex-col items-center justify-center py-5 mb-16 sm:mb-0">
        {isLoading
          ? Array(3)
              .fill(null)
              .map((_, index) => <PostSkeleton key={index} />)
          : error
          ? <p>{error.message}</p>
          : posts.length !== 0 ? 
          posts.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              updatePost={updatePost}
            />
          ))
          : 
          <p className="text-3xl font-semibold tracking-wide">Share your experience today!</p>
          }
      </section>
      </div>
    </main>
  );
}
