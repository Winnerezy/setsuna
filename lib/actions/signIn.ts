import axios from "axios";
import { useRouter } from "next/navigation";

interface Body {
    firstname: string,
    lastname: string,
    username: string,
    email: string,
    password: string
}

export const signIn = async(body: Body)=> {
    const router = useRouter()
    try{
    const res = await axios.post("/api/register", body);
    const authToken = res.data;
    localStorage.setItem("authToken", authToken);
    router.push('/home')
    
    return authToken;
    } catch (error) {
    console.error({ message: error.message });
    }
    
}