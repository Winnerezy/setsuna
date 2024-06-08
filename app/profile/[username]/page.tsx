'use client'

import { useParams } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../context/AuthContext'
import { PostCard } from '../../../components/home/PostCard'
import { INITIAL_POST, INITIAL_USER } from '../../../lib/utils/initial'
import { Button } from '../../../components/ui/Button'

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

    const handleFollow = async() => {
      try {
        await fetch(`/api/follow/${username}`, {
          method: 'PUT',
          headers: {
            authorization: `Bearer ${localStorage.getItem('authToken')}`
          }
        })
        fetchProfile()
      } catch (error) {
        console.error(error.message)
      }
    }

    const editProfile = () => {
      
    }

    console.log(profile.followers)
  return (
    <main className='flex flex-col w-full min-h-screen sm:ml-16'>
      {
        profile._id !== '' ?
        <section className='flex flex-col w-full'>
        <img src={profile.headerphoto} className='w-full h-[160px] bg-[var(--global-border-bg)] absolute -z-20 object-cover'/>
        <div className='w-full p-4 flex sm:flex-row flex-col items-start sm:items-center gap-y-6 sm:gap-x-12 mt-24'>
        <img src={profile.profilephoto} alt={`@${profile.username}`} className='size-[150px] sm:size-[200px] rounded-full border-2 border-[var(--global-border-bg)] self-start'/>
       <div className='flex flex-col items-start gap-y-2'>
       <p className='font-bold text-3xl'>{ profile.firstname }</p>
       <p className='font-light text-md'>@{ profile.username }</p>
       <section className='flex gap-x-4 font-light tracking-wide items-center justify-center'>
        <p><span className='font-semibold'>{ profile.followers && profile.followers.length } </span>Followers</p>
        <p><span className='font-semibold'>{ profile.following && profile.following.length }</span> Following</p>
       </section>
       </div>
       { 
          username === user.username ? 
          <Button onClick={editProfile}>Edit Profile</Button>
          :
          <Button onClick={handleFollow}>{ profile.followers && profile.followers.includes(user._id) ? "Unfollow" : "Follow"}</Button>
        }
      </div>
      <nav className='w-full flex items-center justify-between gap-x-2 px-8 md:px-36 font-semibold text-center'>
        <p onClick={handlePosts} className='cursor-pointer'>Posts</p>
        <p className='cursor-pointer'>Saved</p>
        <p className='cursor-pointer'>Likes</p>
        <p className='cursor-pointer'>TODO</p>
      </nav>
      <hr className='border-2 border-[var(--global-border-bg)]'/>
      <section className='flex flex-col w-full px-4 items-center mt-4 sm:mb-4 mb-20'>
        { 
         posts[0]._id !== '' ? posts.map(post => <PostCard key={post._id} post={post} updatePost={updatePost}/>)
         : 
         ""
        }
      </section>
      </section>
      : 
      "LOADING..."
      }
    </main>
  )
}
