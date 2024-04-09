import React, { useEffect, useState } from "react";
import SideBarDropdown from "./SideBarDropdown";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import SideBarBottom from "./SideBarBottom";
import { TEAM, FILE } from "@/lib/types";
import axios from "axios";
import { toast } from "sonner";
import SideBarBottomShimmer from "../skeleton/SideBarBottomShimmer";
import { useFileContext } from "@/context/FileListContext";

const SideBar = ({ team }: { team: TEAM[] }) => {
  const { user } = useKindeBrowserClient();
  const [fileName, setFileName] = useState<string>("");
  const [testactiveTeam] = useState<TEAM>();
  const [activeTeam, setActiveTeam] = useState<TEAM>(testactiveTeam!);

  const [allFiles, setAllFiles] = useState<FILE[]>();

  const { setFiles } = useFileContext();

  let toastId: string | number;

  async function handleCreateNewFile() {
    try {
      toastId = toast.loading("Creating File...");
      const res = await axios.post("/api/file/create", {
        fileName,
        teamId: activeTeam?._id,
        createdBy: user?.email,
        archive: false,
        document: "",
        whiteboard: "",
      });

      if (res?.data?.success) {
        toast.success(res?.data?.msg);
        setAllFiles(res?.data?.allFiles);
        setFiles(res?.data?.allFiles);
        setFileName("");
      } else {
        toast.error(res?.data?.msg);
        setFileName("");
      }
    } catch (error: any) {
      console.log(error.message);
    } finally {
      if (toastId) {
        toast.dismiss(toastId);
      }
    }
  }

  async function getAllFiles() {
    try {
      const res = await axios.post("/api/file/get", {
        teamId: activeTeam?._id,
        createdBy: user?.email,
      });

      if (res?.data?.success) {
        setAllFiles(res?.data?.allFiles);
        setFiles(res?.data?.allFiles);
      } else {
        setAllFiles(res?.data?.allFiles);
        setFiles(res?.data?.allFiles);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    if (activeTeam) getAllFiles();
  }, [activeTeam]);

  useEffect(() => {
    team && team.length && setActiveTeam(team[0]);
  }, [team && team.length]);

  return (
    <div className="px-6 pt-10 flex flex-col h-full pb-8 bg-black/90">
      {/* team drop down */}
      <div className="flex-1">
        <SideBarDropdown
          team={team}
          activeTeam={activeTeam!}
          setActiveTeam={setActiveTeam}
        />
      </div>

      {/* bottom section */}
      <div>
        {activeTeam && allFiles ? (
          <SideBarBottom
            handleCreateNewFile={handleCreateNewFile}
            fileName={fileName}
            setFileName={setFileName}
            allFiles={allFiles!}
          />
        ) : (
          <div className="flex justify-center mt-3">
            <SideBarBottomShimmer />
          </div>
        )}
      </div>
    </div>
  );
};

export default SideBar;
