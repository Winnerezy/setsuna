import { useCallback, useEffect, useState } from "react"

export default function userInfo() {
    const [user, setUser] = useState<User | null>(null)

    const fetchUser = useCallback(()=> {
        try {
            const fetchProfile = async() => {

                const options = {
                    method: 'GET', 
                    headers: {
                        Accept: 'application/json',
                        authorization: `Bearer ${localStorage.getItem('authToken')}`
                    }
                }
                const res = await fetch('/api/profile', options)
                const ans = await res.json()
                setUser(ans)
            }
            fetchProfile()
        } catch (error) {
            console.error(error)
        }
    }, [])
    useEffect(()=> {
        fetchUser()
    }, [])
  return user
}
