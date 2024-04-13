"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Save, Share2 } from "lucide-react";
import { FILE } from "@/lib/types";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { toast } from "sonner";
import Link from "next/link";

const links = [
  {
    id: 1,
    name: "Document",
    class: "",
  },
  {
    id: 2,
    name: "Both",
    class: "border-l border-r border-zinc-300",
  },
  {
    id: 3,
    name: "Canvas",
    class: "",
  },
];

interface PROPS {
  activeId: number;
  setActiveId: React.Dispatch<React.SetStateAction<number>>;
  setTriggerForSave: React.Dispatch<React.SetStateAction<boolean>>;
  fileData: FILE;
}

const Header = ({
  activeId,
  setActiveId,
  setTriggerForSave,
  fileData,
}: PROPS) => {
  const { user } = useKindeBrowserClient();

  return (
    <div className="h-16  text-black flex items-center justify-between px-5 py-2 border-b ">
      {/* logo and file name */}
      <Link href={"/dashboard"} className="text-sm flex items-center gap-2">
        <Image src={"/logo.png"} width={40} height={40} alt="logo" />
        <h2 className="font-semibold text-[16px]">
          {fileData ? fileData.fileName : "Untitled File"}
        </h2>
      </Link>

      {/* selector (doc, both, canvas) */}
      <div>
        <ul className="flex items-center text-sm border border-zinc-300 rounded">
          {links.map((link) => (
            <li
              key={link.id}
              onClick={() => setActiveId(link.id)}
              className={`px-2 py-1 w-[90px] text-center cursor-pointer ${
                link.class
              } ${activeId == link.id ? "bg-zinc-200" : ""}`}
            >
              {link.name}
            </li>
          ))}
        </ul>
      </div>

      {/* share or save button */}
      <div className="flex items-center gap-3">
        <Button
          onClick={() => {
            if (!user) return toast.error("Please login to save the document!");
            setTriggerForSave((prev) => !prev);
          }}
          className="bg-blue-600 hover:bg-blue-700 h-8 w-[80px]  text-sm flex items-center px-1 gap-2 rounded "
        >
          Save
          <Save size={13} />
        </Button>

        {user && (
          <Image
            src={user?.picture!}
            alt="user"
            width={32}
            height={32}
            className="rounded-full border border-zinc-600"
          />
        )}
      </div>
    </div>
  );
};

export default Header;
