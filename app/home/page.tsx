"use client"

import axios from "axios";
import { useEffect, useState } from "react";
import { useFetchFeed } from "../../hooks/useFetchFeed";
import { useRouter } from "next/navigation";
import { PostSkeleton } from "../../components/ui/PostSkeleton";
import { PostCard } from "../../components/home/PostCard";

export default function Home() {
  
  const { posts: initialPosts, isLoading, error } = useFetchFeed();
  const [posts, setPosts] = useState<Post[] | null>(null);

  const router = useRouter()

  useEffect(() => {
      setPosts(initialPosts);
  }, [initialPosts]);


  return (
    <main className="relative flex flex-col w-full h-full items-center justify-center">
      <h1 className="text-3xl font-bold text-start w-full ml-8 md:ml-36 mt-4">Setsuna</h1>
      <div className="size-full p-5 flex flex-col items-center justify-center">
        <section className="size-full flex flex-col items-center justify-center py-5 mb-10 sm:mb-0">
        {isLoading && !posts
          ? <PostSkeleton />
          : error
          ? <p>{error.message}</p>
          : posts ? 
          posts?.map((post) => (
            <PostCard
              key={post._id}
              post={post}
            />
          ))
          : 
          ""
          }
      </section>
      </div>
    </main>
  );
}
