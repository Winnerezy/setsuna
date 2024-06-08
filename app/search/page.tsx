'use client'

import { SearchIcon } from "lucide-react"
import { useRef, useState } from "react"
import UserCard from "../../components/ui/UserCard"

export default function Search() {

  const [search, setSearch] = useState<string>('')
  const searchRef = useRef(null)

  const [users, setUsers] = useState<UserCard[] | null>(null)

  const handleSearch = async() => {
    setSearch(searchRef.current.value)
    if(search.trim() === ''){
      return;
    }
    try {
      const res = await fetch(`/api/search/${search}`, {
        method: 'GET'
      })
      const ans = await res.json()
      setUsers(ans)
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <main className="flex flex-col w-full min-h-screen mt-8 p-4 items-center">
      <section className="relative flex items-center w-full max-w-[600px] justify-center bg-[var(--global-border-bg)] p-1 px-2 rounded-[10px]">
      <SearchIcon className="flex"/>
      <input type='search' ref={searchRef} onChange={handleSearch} className="flex-grow w-full max-w-[700px] p-2 max-h-10 bg-[var(--global-border-bg)] outline-none" placeholder="Find your entertainment..."/>
      </section>
      <section className="flex flex-col gap-y-4 w-full max-w-[600px] mt-4 items-center">
        { users?.map((user, index) => (<UserCard key={index} username={user?.username} profilephoto={user?.profilephoto} followers={user?.followers}/>)) }
      </section>
    </main>
  )
}
