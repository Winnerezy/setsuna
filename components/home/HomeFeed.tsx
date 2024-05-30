import { MessageCircle, MessageCircleX, ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";
import Link from "next/link";

export const HomeFeed = ({ content, author }: { content: string, author: string }) => {
  return (
    <article className="flex flex-col justify-between p-4 flex-grow w-full max-w-[600px] border-[var(--global-tetiary-text)] border-2 rounded-[20px] items-center space-y-4">
      <section className="flex flex-col md:flex-row w-full gap-2 self-start">
        <div className="size-12 rounded-full bg-white"></div>
        <p className="p-2 max-w-[400px] flex-grow text-xs sm:text-[16px] font-light tracking-wide">
          {content}
        </p>
      </section>

      <section className="flex flex-col w-full gap-y-2">
        <hr className="border-b-[#e4e4e4] border w-full" />
        <div className="flex w-full pr-2 items-center justify-between">
          <div className="flex gap-x-4 items-center">
            <Link className="font-semibold" href={`/profile/${author}`}>{`@${author}`}</Link>
            <div className="flex gap-x-4">
              <ThumbsUpIcon className="size-5" />
              <ThumbsDownIcon className="size-5" />
            </div>
          </div>

          <MessageCircle className="size-5" />
        </div>
      </section>
    </article>
  );
};
