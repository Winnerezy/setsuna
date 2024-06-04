import { BookMarkedIcon, HomeIcon, LucideOctagon, MessageCirclePlusIcon, SearchIcon, Settings2Icon } from "lucide-react";
import Link from "next/link";

export default function BottomeBar() {
  return (
     <footer className="w-full fixed bottom-0 flex sm:hidden items-center justify-center gap-y-4 h-[70px] bg-[var(--global-bg)] px-4 z-40">
      <section className="flex justify-between gap-x-4 w-[500px]">
      <Link href={'/home'}><HomeIcon/></Link>
      <Link href={'/search'}><SearchIcon/></Link>
      <Link href={'/messages'}><MessageCirclePlusIcon/></Link>
      <Link href={'/saved-posts'}><BookMarkedIcon/></Link>
      <Link href={'/settings'}><Settings2Icon/></Link>
      </section>

     </footer>
  )
}
