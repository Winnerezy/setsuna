import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { Button } from './Button'
import Link from 'next/link'

export default function UserCard({ username, profilephoto, followers} : UserCard) {
    const { user } = useContext(AuthContext)

    const [followed, setFollowed] = useState(() => {
        if(followers.includes(user._id)){
            return true
        } else {
            return false
        }
    })

    const handleFollow = async() => {
        try {
          await fetch(`/api/follow/${username}`, {
            method: 'PUT',
            headers: {
              authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
          })
          setFollowed(prev => !prev)
        } catch (error) {
          console.error(error.message)
        }
      }
  return (
    <article className='w-full h-24 flex items-center justify-between border-2 border-[var(--global-border-bg)] p-2 rounded-[10px]'>
        <div className='flex gap-x-4 items-center'>
        <Link href={`/profile/${username}`}><img src={ profilephoto } alt={ username } className='size-16 rounded-full'/></Link>
        <p className='text-md'>
            @{ username }
        </p>
        </div>
        <div className={`${username === user.username ? 'hidden' : ''}`}>
            <Button onClick={handleFollow}>{ followed ? "Unfollow" : "Follow"}</Button>
        </div>
    </article>
  )
}
