'use client'

import React, { createContext, useState } from 'react'

export const PostContext = createContext<{ posts: Post[]; setPosts: React.Dispatch<React.SetStateAction<Post[]>> } | undefined>(undefined);
export const PostProvider = ({ children } : { children: React.ReactNode }) => {
    const [posts, setPosts] = useState<Post[]>([])
  return (
    <PostContext.Provider value={{posts, setPosts}}>
        { children }
    </PostContext.Provider>
  )
}
