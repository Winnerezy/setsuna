'use client'

import { useRouter } from 'next/navigation';
import React, { createContext, useEffect, useState } from 'react'
import { INITIAL_USER } from '../lib/utils/initial';

const INITIAL_STATE = {
    user: INITIAL_USER,
    isLoading: false,
    isAuthenticated: false,
    setUser: () => {},
    setIsAuthenticated: () => {},
    checkAuthUser: async () => false as boolean
}

export const AuthContext = createContext<IContextType>(INITIAL_STATE);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User>(INITIAL_USER)
    const [isLoading, setIsLoading] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const router = useRouter()
    const checkAuthUser = async() => {
        try {
            setIsLoading(true)
            const options = {
                method: 'GET', 
                headers: {
                    Accept: 'application/json',
                    
                }
            }
            const currentUser = await fetch('/api/user', options)
            const ans = await currentUser.json()
            setUser(ans)
            setIsAuthenticated(true)
            return true
        } catch (error) {
            console.error(error)
            return false
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(()=> {
        const checkAuth = async() => {
           const result: boolean = await checkAuthUser()

           if(!result){
            router.push('/sign-up')
           }
        }
        checkAuth()
    }, [])

    const value = {
        user, setUser, isLoading, isAuthenticated, setIsAuthenticated, checkAuthUser
    }
  return (
    <AuthContext.Provider value={value}>
        { children }
    </AuthContext.Provider>
  )
}
