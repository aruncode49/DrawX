import { link } from "fs";
import { ChevronDown, Flag, Github, Trash } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

const links = [
  {
    id: 1,
    name: "Getting Started",
    icon: <Flag size={16} />,
    path: "",
  },
  {
    id: 2,
    name: "Github",
    icon: <Github size={16} />,
    path: "",
  },
  {
    id: 3,
    name: "Archive",
    icon: <Trash size={16} />,
    path: "",
  },
];

const SideBarBottom = () => {
  return (
    <div>
      {/* links */}
      <div className="text-sm">
        {links.map((link) => (
          <Link
            className="flex items-center gap-2 px-3 py-1.5 hover:bg-zinc-700 rounded-md font-medium"
            href={link.path}
            key={link.id}
          >
            {link.icon} {link.name}
          </Link>
        ))}
      </div>

      {/* new file button */}
      <div>
        <Button className="bg-blue-600 hover:bg-blue-700 w-full mt-5 flex items-center justify-between font-medium">
          New File
          <ChevronDown size={14} />
        </Button>
      </div>

      {/* file remaining progress bar */}
      <div className="w-full relative h-4 bg-zinc-600 rounded-full mt-5">
        <div
          className="absolute h-4 bg-blue-600 rounded-full"
          style={{ width: `50%` }}
        ></div>
      </div>

      {/* number of fiels */}
      <div className="mt-6 text-xs">
        <p>
          <strong>1</strong> out of <strong>5</strong> files used.
        </p>
        <p className="mt-1">
          <span className="underline cursor-pointer">Upgrade</span> your plan
          for unlimited access.
        </p>
      </div>
    </div>
  );
};

export default SideBarBottom;
