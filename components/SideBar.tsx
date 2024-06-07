'use client'

import { BellIcon, HomeIcon, LucideOctagon, MessageCirclePlusIcon, SearchIcon, Settings2Icon, User2Icon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function SideBar() {

  const { user } = useContext(AuthContext)

  const pathname = usePathname()

  return (
     <aside className="w-[70px] sm:flex hidden flex-col items-center justify-start gap-y-4 min-h-screen bg-[var(--global-bg)] py-4 z-40">
      <LucideOctagon/> {/* Logo soon/ */}
      <section className="flex flex-col gap-y-[70px] h-[500px] absolute top-48">
      <Link href={'/home'}><HomeIcon className={`${pathname === '/home' ? 'fill-[var(--global-navbar-bg)]' : ''}`}/></Link>
      <Link href={'/search'}><SearchIcon className={`${pathname === '/search' ? 'fill-[var(--global-navbar-bg)]' : ''}`}/></Link>
      <Link href={'/messages'}><MessageCirclePlusIcon className={`${pathname === '/messages' ? 'fill-[var(--global-navbar-bg)]' : ''}`}/></Link>
      <Link href={'/saved-posts'}><BellIcon className={`${pathname === '/saved-posts' ? 'fill-[var(--global-navbar-bg)]' : ''}`}/></Link>
      <Link href={`/profile/${user.username}`}><User2Icon className={`${pathname === `/profile/${user.username}` ? 'fill-[var(--global-navbar-bg)]' : ''}`}/></Link>
      </section>

     </aside>
  )
}
