"use client";

import DocumentEditor from "@/components/workspace/DocumentEditor";
import Header from "@/components/workspace/Header";
import React, { useState } from "react";

const Workspace = () => {
  const [activeId, setActiveId] = useState<number>(2);

  return (
    <div className="min-h-screen">
      <Header activeId={activeId} setActiveId={setActiveId} />

      {/* Workspace layout */}
      <div className="grid grid-cols-12">
        {/* Document */}
        <div
          className={`min-h-[calc(100vh-52px)] border-r border-zinc-300 p-1  ${
            activeId == 1 && "col-span-12"
          }  ${activeId == 2 && "col-span-5"} ${activeId == 3 && "hidden"}`}
        >
          <DocumentEditor />
        </div>
        {/* Canvas */}
        <div
          className={`min-h-[calc(100vh-52px)] ${activeId == 1 && "hidden"} ${
            activeId == 3 && "col-span-12"
          }  ${activeId == 2 && "col-span-7"}`}
        >
          Canvas
        </div>
      </div>
    </div>
  );
};

export default Workspace;
