'use client'

import { useParams } from 'next/navigation'
import { useCallback, useContext, useEffect, useReducer, useState } from 'react'
import { AuthContext } from '../../../context/AuthContext'
import { PostCard } from '../../../components/home/PostCard'
import { INITIAL_POST, INITIAL_USER } from '../../../lib/utils/initial'
import { Button } from '../../../components/ui/Button'

export default function Profile() {
    const { username } = useParams()
    const { user } = useContext(AuthContext)
    const [profile, setProfile] = useState<User | null>(null)
    const [posts, setPosts] = useState<Post[] | null>(null)
    
    const initialState = {
      page: 'posts'
    } 
      
    const [state, dispatch] = useReducer(reducer, initialState)

    console.log(state)
    const fetchProfile = async() => {
      const res = await fetch(`/api/profile/${username}`, {
        method: 'GET',
        headers: {
          Accept: "application/json",
          "content-type": "application/json"
        }
      })
      const ans = await res.json()
      setProfile(ans)
    }

    useEffect(()=> {
      fetchProfile()
    }, [])

    const handleFeed = (name: Action) => {
      dispatch({ type: name.type });
    }

    const page = useCallback( async() => {
      try {
        const res = await fetch(`/api/user-post/${username}/${state.page}`, {
          method: 'GET',
          headers: {
            Accept: "application/json",
            "content-type": "application/json"
          }
        })
        const ans = await res.json()
        setPosts(ans) 
      } catch (error) {
        console.error(error)
      }
        
    }, [state.page])

    useEffect(() => {
    page()
    }, [page])

    const handleFollow = async() => {
      try {
        await fetch(`/api/follow/${username}`, {
          method: 'PUT',
          headers: {
            Accept: "application/json",
            "content-type": "application/json"
          }
        })
        fetchProfile()
      } catch (error) {
        console.error(error.message)
      }
    }

    const editProfile = () => {
      
    }

    function reducer(state: State, action: Action): State {
      switch(action.type){
        case 'posts': {
          return { page: 'posts' }
        }
        case 'saved-posts': {
          return { page: 'saved-posts' }
        }
        default: return state
      }
   
    }
  return (
    <main className='flex flex-col w-full min-h-screen md:pl-16'>
      {
        profile ?
        <section className='flex flex-col w-full'>
        <img src={profile?.headerphoto} className='w-full flex-grow h-[160px] bg-[var(--global-border-bg)] absolute -z-20 object-cover'/>
        <div className='w-full p-4 flex sm:flex-row flex-col items-start sm:items-center gap-y-6 sm:gap-x-12 mt-16'>
        <img src={profile?.profilephoto} alt={`@${profile?.username}`} className='size-[150px] sm:size-[200px] rounded-full border-2 border-[var(--global-border-bg)] self-start'/>
       <div className='flex items-center sm:mt-16 w-full'>
       <div className='flex flex-col items-start gap-y-2'>
       <p className='font-bold text-3xl'>{ profile?.firstname }</p>
       <p className='font-light text-md'>@{ profile?.username }</p>
       <section className='flex gap-x-4 font-light tracking-wide items-center justify-center'>
        <p><span className='font-semibold'>{ profile?.followers && profile?.followers.length } </span>Followers</p>
        <p><span className='font-semibold'>{ profile?.following && profile?.following.length }</span> Following</p>
       </section>
       </div>
       <section className='self-start'>
       { 
          username === user?.username ? 
          <Button onClick={editProfile}>Edit Profile</Button>
          :
          <Button onClick={handleFollow}>{ profile?.followers && profile?.followers.includes(user._id) ? "Unfollow" : "Follow"}</Button>
        }
       </section>
       </div>


      </div>
      <nav className='w-full flex items-center justify-between gap-x-2 px-8 md:px-36 font-semibold text-center'>
        <p onClick={() => handleFeed({ type: 'posts' })} className='cursor-pointer'>Posts</p>
        <p onClick={() => handleFeed({ type: 'saved-posts' })} className='cursor-pointer'>Saved</p>
        <p className='cursor-pointer'>Likes</p>
        <p className='cursor-pointer'>TODO</p>
      </nav>
      <hr className='border-2 border-[var(--global-border-bg)]'/>
      <section className='flex flex-col w-full px-4 items-center mt-4 sm:mb-4 mb-20'>
        { 
         posts ? posts?.map(post => <PostCard key={post._id} post={post} />)
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
