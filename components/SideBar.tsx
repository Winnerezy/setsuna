import { BookMarkedIcon, HomeIcon, LucideOctagon, MessageCirclePlusIcon, SearchIcon, Settings2Icon } from "lucide-react";
import Link from "next/link";

export default function SideBar() {
  return (
     <aside className="w-[70px] fixed sm:flex hidden flex-col items-center justify-start gap-y-4 min-h-screen bg-[var(--global-bg)] py-4 z-40">
      <LucideOctagon/> {/* Logo soon/ */}
      <section className="flex flex-col gap-y-[70px] h-[500px] absolute top-48">
      <Link href={'/home'}><HomeIcon/></Link>
      <Link href={'/search'}><SearchIcon/></Link>
      <Link href={'/messages'}><MessageCirclePlusIcon/></Link>
      <Link href={'/saved-posts'}><BookMarkedIcon/></Link>
      <Link href={'/settings'}><Settings2Icon/></Link>
      </section>

     </aside>
  )
}
