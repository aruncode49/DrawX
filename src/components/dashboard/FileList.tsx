import React from "react";
import { useFileContext } from "@/context/FileListContext";
import moment from "moment";
import Image from "next/image";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Archive, Ellipsis } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const FileList = () => {
  const { files } = useFileContext();
  const { user } = useKindeBrowserClient();

  return files && files.length ? (
    <div className="overflow-x-auto mt-10">
      <table className="min-w-full divide-y divide-zinc-700 text-white text-sm">
        <thead className="ltr:text-left rtl:text-right">
          <tr>
            <td className="whitespace-nowrap px-4 py-2 text-xs text-zinc-300">
              File Name
            </td>
            <td className="whitespace-nowrap px-4 py-2 text-xs text-zinc-300">
              Created At
            </td>
            <td className="whitespace-nowrap px-4 py-2 text-xs text-zinc-300">
              Edited
            </td>
            <td className="whitespace-nowrap px-4 py-2 text-xs text-zinc-300">
              Author
            </td>
          </tr>
        </thead>

        <tbody className="divide-y divide-zinc-700 text-white">
          {files?.map((file) => (
            <tr key={file._id}>
              <td className="whitespace-nowrap px-4 py-2 font-medium ">
                {file.fileName}
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-xs text-zinc-200">
                {moment(file.createdAt).format("DD MMM YYYY")}
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-xs text-zinc-200">
                {moment(file.createdAt).format("DD MMM YYYY")}
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-xs text-zinc-200">
                <Image
                  src={user?.picture!}
                  alt="user"
                  width={25}
                  height={25}
                  className="rounded-full border"
                />
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-xs text-zinc-200">
                <DropdownMenu>
                  <DropdownMenuTrigger className="outline-none rounded-full p-2">
                    <Ellipsis />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className=" text-sm bg-zinc-800 text-white border-zinc-700 ">
                    <span className="flex justify-center items-center gap-3 p-1 rounded cursor-pointer hover:bg-zinc-700">
                      <Archive size={16} />
                      Archive
                    </span>
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <p className="mt-32 text-center text-zinc-500">Your list is empty</p>
  );
};

export default FileList;
