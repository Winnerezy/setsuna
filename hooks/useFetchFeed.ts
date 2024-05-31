import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import { PostContext } from "../context/PostContext";

export const useFetchFeed = () => {
const { posts, setPosts } = useContext(PostContext)
const [error, setError] = useState(null)
const [isLoading, setIsLoading] = useState(false)

const fetchFeed = useCallback(async () => {
  try {
    setIsLoading(true)
    const options = {
      accept: "application/json",
      authorization: `Bearer ${localStorage.getItem("authToken")}`,
    };
    const res = await axios.get("api/feed", { headers: options });
    const posts = res.data;
    setPosts(posts);
  } catch (error) {
    setError(error)
  } finally {
    setIsLoading(false)
  }
}, []);

console.log(posts)

useEffect(() => {
  fetchFeed();
}, []);

const refetch = () => {
    fetchFeed()
    
}

return { posts, refetch, isLoading, error }
}
