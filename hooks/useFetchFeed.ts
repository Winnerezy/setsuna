import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import { PostContext } from "../context/PostContext";


export const useFetchFeed = () => {
const { posts, setPosts } = useContext(PostContext)
const [error, setError] = useState(null)
const [isLoading, setIsLoading] = useState(true)

const fetchFeed = useCallback(async () => {
  try {
    const res = await axios.get("api/feed",
       { headers:
       {
        Accept: "application/json"
       }
      });
    const posts = res.data;
    setPosts(posts);
  } catch (error) {
    setError(error)
  } finally {
    setIsLoading(false)
  }
}, []);

useEffect(() => {
  fetchFeed();
}, []);

const refetch = () => {  // refetching the posts when needed
    fetchFeed()
    
}

return { posts, refetch, isLoading, error }
}
