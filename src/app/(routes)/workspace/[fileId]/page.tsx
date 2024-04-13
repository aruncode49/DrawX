"use client";

import dynamic from "next/dynamic";

const DocumentEditor = dynamic(
  async () => await import("@/components/workspace/DocumentEditor"),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full flex justify-center items-center">
        <LoaderCircle className="animate-spin" color="gray" size={40} />
      </div>
    ),
  }
);

const Canvas = dynamic(
  async () => await import("@/components/workspace/Canvas"),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full flex justify-center items-center">
        <LoaderCircle className="animate-spin" color="gray" size={40} />
      </div>
    ),
  }
);

import Header from "@/components/workspace/Header";
import { FILE } from "@/lib/types";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";

const Workspace = ({ params }: any) => {
  const [activeId, setActiveId] = useState<number>(2);
  const [triggerForSave, setTriggerForSave] = useState<boolean>(false);
  const [fileData, setFileData] = useState<FILE | any>();

  const { fileId }: any = params;

  async function getFileData() {
    try {
      const res = await axios.post("/api/file/get", { fileId });
      if (res?.data?.success) {
        console.log(res?.data);
        setFileData(res?.data?.file);
      } else {
        console.log(res?.data);
        setFileData({
          teamId: "",
          _id: "string",
          createdBy: "string",
          fileName: "Untitled File",
          archive: false,
          document: "",
          whiteboard: "string",
          createdAt: "",
        });
      }
    } catch (error: any) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    fileId && getFileData();
  }, [fileId]);

  return (
    <div className="min-h-screen">
      <Header
        activeId={activeId}
        setActiveId={setActiveId}
        setTriggerForSave={setTriggerForSave}
        fileData={fileData}
      />

      {/* Workspace layout */}
      <div className="grid grid-cols-12">
        {/* Document */}
        <div
          className={`min-h-[calc(100vh-64px)] border-r p-1  ${
            activeId == 1 && "col-span-12"
          }  ${activeId == 2 && "col-span-5"} ${activeId == 3 && "hidden"}`}
        >
          <DocumentEditor
            triggerForSave={triggerForSave}
            fileId={fileId}
            fileData={fileData}
          />
        </div>
        {/* Canvas */}
        <div
          className={`min-h-[calc(100vh-64px)] ${activeId == 1 && "hidden"} ${
            activeId == 3 && "col-span-12"
          }  ${activeId == 2 && "col-span-7"}`}
        >
          <Canvas />
        </div>
      </div>
    </div>
  );
};

export default Workspace;
