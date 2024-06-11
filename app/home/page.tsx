"use client"

import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useFetchFeed } from "../../hooks/useFetchFeed";
import { useRouter } from "next/navigation";
import { PostSkeleton } from "../../components/ui/PostSkeleton";
import { PostCard } from "../../components/home/PostCard";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";

export default function Home() {
  
  const { posts: initialPosts, isLoading, error } = useFetchFeed();
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [page, setPage] = useState(1)
  const router = useRouter()

  const fetchMorePosts = useCallback(async () => {
    try {
      const res = await axios.get(`/api/posts?page=${page}`);
      setPosts(prevPosts => [...prevPosts, ...res.data]);
      setPage(prevPage => prevPage + 1);
    } catch (error) {
      console.error('Error fetching more posts:', error);
    }
  }, [page]);

  useEffect(() => {
      setPosts(initialPosts);
  }, [initialPosts]);

  const { lastElementRef, isFetching } = useInfiniteScroll(fetchMorePosts);

  return (
    <main className="relative flex flex-col size-full items-center justify-center">
      <header className="w-full pl-4 md:pl-20 mt-4">
        <h1 className="text-3xl font-bold text-start">Setsuna</h1>
      </header>
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
