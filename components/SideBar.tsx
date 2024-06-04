'use client'

import { BookMarkedIcon, HomeIcon, LucideOctagon, MessageCirclePlusIcon, SearchIcon, Settings2Icon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function SideBar() {

  const pathname = usePathname()

  return (
     <aside className="w-[70px] fixed sm:flex hidden flex-col items-center justify-start gap-y-4 min-h-screen bg-[var(--global-bg)] py-4 z-40">
      <LucideOctagon/> {/* Logo soon/ */}
      <section className="flex flex-col gap-y-[70px] h-[500px] absolute top-48">
      <Link href={'/home'}><HomeIcon className={`${pathname === '/home' ? 'fill-[var(--global-navbar-bg)]' : ''}`}/></Link>
      <Link href={'/search'}><SearchIcon className={`${pathname === '/search' ? 'fill-[var(--global-navbar-bg)]' : ''}`}/></Link>
      <Link href={'/messages'}><MessageCirclePlusIcon className={`${pathname === '/messages' ? 'fill-[var(--global-navbar-bg)]' : ''}`}/></Link>
      <Link href={'/saved-posts'}><BookMarkedIcon className={`${pathname === '/saved-posts' ? 'fill-[var(--global-navbar-bg)]' : ''}`}/></Link>
      <Link href={'/settings'}><Settings2Icon className={`${pathname === '/settings' ? 'fill-[var(--global-navbar-bg)]' : ''}`}/></Link>
      </section>

     </aside>
  )
}
