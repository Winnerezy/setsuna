'use client'

import { useParams } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'
import { AuthContext, INITIAL_USER } from '../../../context/AuthContext'
import { PostCard } from '../../../components/home/PostCard'
import { INITIAL_POST } from '../../../lib/utils/initial'

export default function Profile() {
    const { username } = useParams()
    const { user } = useContext(AuthContext)
    const [profile, setProfile] = useState<User>(INITIAL_USER)
    const [posts, setPosts] = useState<Post[]>([INITIAL_POST])

    const fetchProfile = async() => {
      const res = await fetch(`/api/profile/${username}`, {
        method: 'GET'
      })
      const ans = await res.json()
      setProfile(ans)
    }
    useEffect(()=> {
      fetchProfile()
    }, [])

    const updatePost = (updatedPost: Post) => {
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === updatedPost._id ? updatedPost : post
        )
      );
    };

    const handlePosts = async() => {
      const res = await fetch(`/api/user-post/${username}`, {
        method: 'GET'
      })
      const ans = await res.json()
      setPosts(ans)
    }
  return (
    <main className='flex flex-col w-full min-h-screen'>
      <section className='flex flex-col w-full'>
        <img src={profile.profilephoto} className='w-full h-24'/>
        <div className='w-full p-4 flex sm:flex-row flex-col items-start sm:items-center gap-y-6 sm:gap-x-12 ml-16'>
        <img src={profile.profilephoto} alt={profile.username} className='size-[100px] md:size-[200px] rounded-full border-2 border-[var(--global-border-bg)] self-start'/>
       <div className='flex flex-col items-start gap-y-2'>
       <p className='font-bold text-3xl'>{ profile.firstname }</p>
       <p className='font-light text-md'>@{ profile.username }</p>
       </div>
       { 
          username === user.username ? 
          <button className='w-36 h-10 p-2 rounded-[20px] border border-[var(--global-border-bg)] justify-self-end font-semibold'>Edit Profile</button>
          :
          <button className='w-36 h-10 p-2 rounded-[20px] border border-[var(--global-border-bg)] font-semibold'>{ profile.following.includes(user.username) ? "Following" : "Follow"}</button>
        }
      </div>
      <div className='w-full flex justify-center items-center gap-x-[400px] px-12 font-semibold'>
        <p onClick={handlePosts} className='cursor-pointer'>Posts</p>
        <p className='cursor-pointer'>Saved</p>
        <p className='cursor-pointer'>Likes</p>
        <p className='cursor-pointer'>TODO</p>
      </div>
      <hr className='border-2 border-[var(--global-border-bg)]'/>
      <section className='flex flex-col w-full items-center mt-4'>
        { 
          posts.map(post => <PostCard key={post._id} post={post} updatePost={updatePost}/>)
        }
      </section>
      </section>
    </main>
  )
}
