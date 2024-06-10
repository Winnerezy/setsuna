'use client'

import React, { createContext, useState } from 'react'

// Define the shape of the context value
interface PostContextType {
  posts: Post[] | null;
  setPosts: React.Dispatch<React.SetStateAction<Post[] | null>>;
}

// Create the context with a default value
const defaultValue: PostContextType = {
  posts: null,
  setPosts: () => {}
};

export const PostContext = createContext<{ posts: Post[] | null; setPosts: React.Dispatch<React.SetStateAction<Post[] | null>> } | null>(defaultValue);
export const PostProvider = ({ children } : { children: React.ReactNode }) => {
    const [posts, setPosts] = useState<Post[] | null>(null)
  return (
    <PostContext.Provider value={{posts, setPosts}}>
        { children }
    </PostContext.Provider>
  )
}
