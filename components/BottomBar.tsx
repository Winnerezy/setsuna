'use client'

import { BookMarkedIcon, HomeIcon, LucideOctagon, MessageCirclePlusIcon, SearchIcon, Settings2Icon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomeBar() {
  const pathname = usePathname()
  return (
     <footer className="w-full fixed bottom-0 flex sm:hidden items-center justify-center gap-y-4 h-[70px] bg-[var(--global-bg)] px-4 z-40">
      <section className="flex justify-between gap-x-4 w-[500px]">
      <Link href={'/home'}><HomeIcon className={`${pathname === '/home' ? 'fill-[var(--global-navbar-bg)]' : ''}`}/></Link>
      <Link href={'/search'}><SearchIcon className={`${pathname === '/search' ? 'fill-[var(--global-navbar-bg)]' : ''}`}/></Link>
      <Link href={'/messages'}><MessageCirclePlusIcon className={`${pathname === '/messages' ? 'fill-[var(--global-navbar-bg)]' : ''}`}/></Link>
      <Link href={'/saved-posts'}><BookMarkedIcon className={`${pathname === '/saved-posts' ? 'fill-[var(--global-navbar-bg)]' : ''}`}/></Link>
      <Link href={'/settings'}><Settings2Icon className={`${pathname === '/settings' ? 'fill-[var(--global-navbar-bg)]' : ''}`}/></Link>
      </section>
     </footer>
  )
}
