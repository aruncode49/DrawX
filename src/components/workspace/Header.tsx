"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Link } from "lucide-react";

const links = [
  {
    id: 1,
    name: "Document",
    class: "",
  },
  {
    id: 2,
    name: "Both",
    class: "border-l border-r border-zinc-600",
  },
  {
    id: 3,
    name: "Canvas",
    class: "",
  },
];

const Header = () => {
  const [activeId, setActiveId] = useState<number>(2);

  return (
    <div className="flex items-center justify-between px-5 py-2 border-b border-zinc-700">
      {/* logo and file name */}
      <div className="text-sm flex items-center gap-2">
        <Image src={"/logo.png"} width={35} height={35} alt="logo" />
        <h2>Untitled File</h2>
      </div>

      {/* selector (doc, both, canvas) */}
      <div>
        <ul className="flex items-center text-sm border border-zinc-600 rounded">
          {links.map((link) => (
            <li
              key={link.id}
              onClick={() => setActiveId(link.id)}
              className={`px-2 py-1 w-[90px] text-center cursor-pointer ${
                link.class
              } ${activeId == link.id ? "bg-zinc-700" : ""}`}
            >
              {link.name}
            </li>
          ))}
        </ul>
      </div>

      {/* share or save button */}
      <div>
        <Button className="bg-blue-600 hover:bg-blue-700 h-7 w-[88px] text-sm flex items-center px-1 gap-2">
          Share
          <Link size={13} />
        </Button>
      </div>
    </div>
  );
};

export default Header;
