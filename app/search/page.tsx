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
    <main className="flex flex-col items-center justify-center">
      <input type='search' ref={searchRef} onChange={handleSearch} className="w-1/2 p-2 h-8 rounded-[20px]"/>
    </main>
  )
}
