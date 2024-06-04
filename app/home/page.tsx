"use client"

import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { Header } from "../../components/ui/Header";
import { TextareaAutosize } from "@mui/base";
import { PostCard } from "../../components/home/PostCard";
import { useFetchFeed } from "../../hooks/useFetchFeed";
import { ImageIcon } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { PostSkeleton } from "../../components/ui/PostSkeleton";
import { useRouter } from "next/navigation";

export default function Home() {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const contentRef = useRef(null);
  const [photo, setPhoto] = useState(null);
  const { posts: initialPosts, refetch, isLoading, error } = useFetchFeed();
  const [posts, setPosts] = useState([]);

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

  const updatePost = (updatedPost: Post) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === updatedPost._id ? updatedPost : post
      )
    );
  };

  return (
    <main className="relative flex flex-col w-full h-full items-center justify-center">
      <div className="w-full h-full p-5 flex justify-center">
        <article className="flex flex-col justify-between p-4 flex-grow w-full max-w-[600px] border-[var(--global-border-bg)] bg-[var(--global-post-bg)] border rounded-[20px] items-center space-y-4">
          <section className="flex w-full space-x-4">
            <div className="size-12 rounded-full bg-white object-none"></div>
            <div className="flex flex-col size-fit">
              <img
                src={photo}
                className={`${
                  photo ? "flex" : "hidden"
                } size-full flex-grow self-start`}
              />
              <TextareaAutosize
                className="bg-transparent outline-none p-2 max-w-[400px] flex-grow resize-none"
                placeholder="Share your experience...."
                value={content}
                onChange={handleInput}
                ref={contentRef}
              />
            </div>
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
      </div>
      <section className="w-full flex flex-col items-center justify-center p-5">
        {isLoading
          ? Array(3)
              .fill(null)
              .map((_, index) => <PostSkeleton key={index} />)
          : error
          ? <p>{error.message}</p>
          : posts.map((post) => (
              <PostCard
                key={post._id}
                post={post}
                updatePost={updatePost}
              />
            ))}
      </section>
    </main>
  );
}
