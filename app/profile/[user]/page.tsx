'use client'

import { useParams } from 'next/navigation'
import React from 'react'
import { useProfile } from '../../../hooks/useProfile'

export default function User() {
  const { user } = useParams()
  const { userData } = useProfile(user)
  return (
    
    <div className='text-white'>{ userData?.username }</div>
  )
}