import axios from "axios"
import { useEffect, useState } from "react"

export const useProfile = (user: any) => {
    const [userData, setUserData] = useState<User | null>(null)
    const [error, setError] = useState(null)

    useEffect(()=> {
        async function fetchUser(){
            try {
                const res = await axios.get(`/api/profile/?username=${user}`, {
                    headers: {
                        Accept: "application/json",
                        authorization: `Bearer ${localStorage.getItem('authToken')}`
                    }
                })
                const data = res?.data
                setUserData(data)
            } catch (error) {
                setError(error)
            }
        
        }
        fetchUser()
    }, [])
    return { userData, error }
}