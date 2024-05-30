import axios from "axios";
import { useCallback, useEffect, useState } from "react";

export const useFetchFeed = () => {
const [posts, setPosts] = useState([]);
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

useEffect(() => {
  fetchFeed();
}, []);

const refetch = () => {
  console.log("yeah");
    fetchFeed()
    
}

return { posts, refetch, isLoading, error }
}
