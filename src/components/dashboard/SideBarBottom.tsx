import { ChevronDown, Flag, Github, Trash } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { FILE } from "@/lib/types";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

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

interface PROPS {
  handleCreateNewFile: any;
  fileName: string;
  setFileName: React.Dispatch<React.SetStateAction<string>>;
  allFiles: FILE[];
}

const SideBarBottom = ({
  handleCreateNewFile,
  fileName,
  setFileName,
  allFiles,
}: PROPS) => {
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
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 w-full mt-5 flex items-center justify-between font-medium">
              New File
              <ChevronDown size={14} />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md bg-zinc-900 border-zinc-600">
            <DialogHeader>
              <DialogTitle className="text-white">Create New File</DialogTitle>
            </DialogHeader>
            <div className="flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <Input
                  className="text-white bg-zinc-800 border-zinc-600 placeholder:text-zinc-400"
                  placeholder="Enter file name"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter className="sm:justify-end">
              <DialogClose asChild>
                <Button
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  type="button"
                  variant="secondary"
                  disabled={fileName?.length < 3}
                  onClick={() => handleCreateNewFile()}
                >
                  Create
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* file remaining progress bar */}
      <div className="w-full relative h-4 bg-zinc-600 rounded-full mt-5">
        <div
          className="absolute h-4 bg-blue-600 rounded-full"
          style={{ width: `${(allFiles && allFiles.length * 100) / 5}%` }}
        ></div>
      </div>

      {/* number of fiels */}
      <div className="mt-6 text-xs">
        <p>
          <strong>{allFiles && allFiles.length}</strong> out of{" "}
          <strong>5</strong> files used.
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
