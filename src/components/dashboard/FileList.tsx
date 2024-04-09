import React from "react";
import { useFileContext } from "@/context/FileListContext";
import moment from "moment";
import Image from "next/image";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Ellipsis } from "lucide-react";

const FileList = () => {
  const { files } = useFileContext();
  const { user } = useKindeBrowserClient();

  if (files && files.length) {
    console.log(files);
  }
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
                <Ellipsis />
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
