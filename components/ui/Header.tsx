import { MessageCircleIcon, StarIcon } from "lucide-react";
import { SearchBar } from "./SearchBar";
export const Header = () => {
  return (
    <header className="flex sticky gap-x-8 w-full items-center justify-between p-4 h-24 border-2 border-t-0 border-l-0 border-r-0 border-b-[var(--global-border-bg)]">
        <SearchBar />
        <div className="flex space-x-4">
          <MessageCircleIcon className="text-white cursor-pointer" />
          <StarIcon className="text-white cursor-pointer" />
        </div>
    </header>
  );
}
