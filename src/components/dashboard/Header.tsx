import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Search, Send } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";

const Header = () => {
  const { user }: any = useKindeBrowserClient();

  return (
    <div className="flex items-center justify-between text-sm">
      {/* all label */}
      <p className="bg-zinc-800 px-2.5 py-1 rounded-md border border-zinc-500 font-medium">
        All Files
      </p>
      <div className="flex items-center gap-3 justify-end">
        {/* search input */}
        <div
          className="flex items-center border border-zinc-600 rounded-lg px-2 w-52
      "
        >
          <Search size={14} className="text-zinc-200" />
          <input
            type="text"
            name="search"
            placeholder="Search"
            autoComplete="off"
            className="bg-transparent px-2 py-1 h-7 text-xs outline-none bg-black"
          />
        </div>

        {/* user picture */}
        <div>
          {user && (
            <Image
              src={user?.picture}
              alt="user"
              width={27}
              height={27}
              className="rounded-full border border-zinc-300 min-w-7 min-h-7"
            />
          )}
        </div>

        {/* invite button */}
        <div className="">
          <Button className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-sm h-8">
            <Send size={12} />
            Invite
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
