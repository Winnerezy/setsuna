'use client'

import { HomeIcon, LucideOctagon, MessageCirclePlusIcon, PlusCircleIcon, SearchIcon, Settings2Icon, User2Icon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function BottomeBar() {
  const { user } = useContext(AuthContext)
  const pathname = usePathname()
  return (
     <footer className="w-full fixed bottom-0 flex md:hidden items-center justify-center gap-y-4 h-[70px] bg-[var(--global-bg)] px-8 z-40 border-t-2 border-t-[var(--global-border-bg)]">
      <section className="flex items-center justify-between w-[500px]">
      <Link href={'/home'}><HomeIcon className={`${pathname === '/home' ? '' : 'text-[var(--global-icon)]'}`}/></Link>
      <Link href={'/search'}><SearchIcon className={`${pathname === '/search' ? '' : 'text-[var(--global-icon)]'}`}/></Link>
      <Link href={'/create-post'}><PlusCircleIcon className={`${pathname === '/create-post' ? '' : 'text-[var(--global-icon)]'}`}/></Link>
      <Link href={'/messages'}><MessageCirclePlusIcon className={`${pathname === '/messages' ? '' : 'text-[var(--global-icon)]'}`}/></Link>
      <Link href={`/profile/${user?.username}`}><img src={user?.profilephoto} className={` size-8 rounded-full ${pathname === `/profile/${user?.username}` ? '' : 'text-[var(--global-icon)]'}`}/></Link>
      </section>
      {/* <footer className="mx-4 self-center rounded-full w-[90%] fixed bottom-4 flex sm:hidden items-center justify-center gap-y-4 h-[70px] bg-[var(--global-bg)] px-8 z-40 border-t-2 border-t-[var(--global-border-bg)]">
<section className="flex justify-between w-[500px]">
<Link href={'/home'}><HomeIcon className={`${pathname === '/home' ? '' : 'text-[var(--global-icon)]'}`}/></Link>
      <Link href={'/search'}><SearchIcon className={`${pathname === '/search' ? '' : 'text-[var(--global-icon)]'}`}/></Link>
      <Link href={'/create-post'}><PlusCircleIcon className={`${pathname === '/create-post' ? '' : 'text-[var(--global-icon)]'}`}/></Link>
      <Link href={'/messages'}><MessageCirclePlusIcon className={`${pathname === '/messages' ? '' : 'text-[var(--global-icon)]'}`}/></Link>
      <Link href={`/profile/${user?.username}`}><img src={profilePhoto} className={` size-8 rounded-full ${pathname === `/profile/${user?.username}` ? '' : 'text-[var(--global-icon)]'}`}/></Link>
</section>
</footer> */}
     </footer>


  )
}
