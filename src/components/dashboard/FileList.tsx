import React from "react";
import { useFileContext } from "@/context/FileListContext";
import moment from "moment";
import Image from "next/image";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { LoaderCircle, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import axios from "axios";
import { toast } from "sonner";

const FileList = () => {
  const { files, setFiles } = useFileContext();
  const { user } = useKindeBrowserClient();
  const router = useRouter();

  let toastId: string | number;

  async function getAllFiles(teamId: string, createdBy: string) {
    try {
      const res = await axios.post("/api/file/get", {
        teamId,
        createdBy,
      });
      if (res?.data?.success) {
        setFiles(res?.data?.allFiles);
      } else {
        setFiles(res?.data?.allFiles);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  }

  async function deleteFile(id: string, teamId: string, createdBy: string) {
    try {
      toastId = toast.loading("File deleting...");
      const res = await axios.delete(`/api/file/delete?id=${id}`);
      if (res?.data?.success) {
        getAllFiles(teamId, createdBy);
        toast.success(res?.data?.msg);
      }
    } catch (error: any) {
      console.log(error.message);
    } finally {
      toast.dismiss(toastId);
    }
  }

  function handleDeleteFile(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string,
    teamId: string,
    createdBy: string
  ) {
    e.stopPropagation();
    deleteFile(id, teamId, createdBy);
    console.log("Delete files");
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
            <tr
              onClick={() => router.push(`/workspace/${file._id}`)}
              key={file._id}
              className="cursor-pointer"
            >
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
                <AlertDialog>
                  <AlertDialogTrigger
                    onClick={(e) => e.stopPropagation()}
                    className="outline-none rounded-full p-3 "
                  >
                    <Trash color="red" size={18} />
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-zinc-900 border-zinc-600 text-white">
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-gray-300">
                        This action cannot be undone. This will permanently
                        delete your file and file data from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel
                        className="text-black"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-red-500 hover:bg-red-600"
                        onClick={(e) =>
                          handleDeleteFile(
                            e,
                            file._id,
                            file.teamId,
                            file.createdBy
                          )
                        }
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : files?.length == 0 ? (
    <p className="mt-32 text-center text-zinc-500">Your list is empty</p>
  ) : (
    <div className="mt-32 flex justify-center">
      <LoaderCircle className="animate-spin" color="gray" size={40} />
    </div>
  );
};

export default FileList;
