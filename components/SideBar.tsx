'use client'

import { HomeIcon, LucideOctagon, MessageCirclePlusIcon, PlusCircleIcon, SearchIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useMemo } from "react";
import { AuthContext } from "../context/AuthContext";

export default function SideBar() {

  const { user } = useContext(AuthContext)

  const pathname = usePathname()

  return (
     <aside className="w-[70px] fixed md:flex hidden flex-col items-center justify-start gap-y-4 min-h-screen bg-[var(--global-bg)] py-4 z-40">
      <LucideOctagon/> {/* Logo soon/ */}
      <section className="flex flex-col gap-y-[70px] h-[500px] absolute top-48">
      <Link href={'/home'}><HomeIcon className={`${pathname === '/home' ? '' : 'text-[var(--global-icon)]'}`}/></Link>
      <Link href={'/search'}><SearchIcon className={`${pathname === '/search' ? '' : 'text-[var(--global-icon)]'}`}/></Link>
      <Link href={'/create-post'}><PlusCircleIcon className={`${pathname === '/create-post' ? '' : 'text-[var(--global-icon)]'}`}/></Link>
      <Link href={'/messages'}><MessageCirclePlusIcon className={`${pathname === '/messages' ? '' : 'text-[var(--global-icon)]'}`}/></Link>
      <Link href={`/profile/${user?.username}`}><img src={user?.profilephoto} className={` size-8 rounded-full ${pathname === `/profile/${user?.username}` ? '' : 'text-[var(--global-icon)]'}`}/></Link>
      </section>

     </aside>
  )
}
