'use client'

import { useRef, useState } from "react"

export default function Search() {

  const [search, setSearch] = useState<string>('')
  const searchRef = useRef(null)
  const handleSearch = async() => {
    setSearch(searchRef.current.value)
    if(search.trim() === ''){
      return;
    }
  }
  return (
    <main className="flex flex-col w-full min-h-screen mt-8 p-4 items-center">
      <input type='search' ref={searchRef} onChange={handleSearch} className="flex-grow w-full max-w-[700px] p-2 max-h-10 rounded-[20px] outline-none" placeholder="Find your entertainment..."/>
    </main>
  )
}
