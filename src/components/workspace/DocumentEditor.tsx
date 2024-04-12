"use client";

import React, { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";

// @ts-ignore
import Header from "@editorjs/header";
// @ts-ignore
import List from "@editorjs/list";
// @ts-ignore
import Checklist from "@editorjs/checklist";
// @ts-ignore
import Table from "@editorjs/table";
// @ts-ignore
import CodeTool from "@editorjs/code";
import axios from "axios";
import { toast } from "sonner";
import { FILE } from "@/lib/types";

const rawData = {
  time: 1550476186479,
  blocks: [
    {
      data: {
        text: "Untitled File",
        level: 2,
      },
      id: "1234",
      type: "header",
    },
    {
      data: {
        level: 5,
      },
      id: "1234",
      type: "header",
    },
  ],
  version: "2.8.1",
};

interface PROPS {
  triggerForSave: boolean;
  fileId: string;
  fileData: FILE;
}

const DocumentEditor = ({ triggerForSave, fileId, fileData }: PROPS) => {
  const ref = useRef<EditorJS>();

  console.log(fileData);

  const initEditor = () => {
    const editor = new EditorJS({
      tools: {
        header: {
          class: Header,
          config: {
            placeholder: "Types your notes or document here",
          },
        },
        list: {
          class: List,
          inlineToolbar: true,
          config: {
            defaultStyle: "unordered",
          },
        },
        checklist: {
          class: Checklist,
          inlineToolbar: true,
        },
        table: {
          class: Table,
          inlineToolbar: true,
          config: {
            rows: 2,
            cols: 2,
          },
        },
        code: CodeTool,
      },

      holder: "editorjs",
      data: fileData?.document ? JSON.parse(fileData.document) : rawData,
    });
    ref.current = editor;
  };

  let toastId: string | number;

  // save doc in db
  async function saveDoc(document: string) {
    try {
      toastId = toast.loading("File Saving!");
      const res = await axios.patch("/api/file/updateDoc", {
        fileId,
        document,
      });

      if (res?.data?.success) {
        toast.success(res?.data?.msg);
      }
    } catch (error: any) {
      console.log(error.message);
    } finally {
      toast.dismiss(toastId);
    }
  }

  // handle save document function
  function handleSaveDocument() {
    if (ref?.current) {
      ref?.current
        ?.save()
        .then((outputData) => {
          saveDoc(JSON.stringify(outputData));
        })
        .catch((error) => {
          console.log("Saving failed: ", error);
        });
    }
  }

  useEffect(() => {
    triggerForSave && handleSaveDocument();
  }, [triggerForSave]);

  useEffect(() => {
    fileData && initEditor();
  }, [fileData]);

  return (
    <div className=" px-8 pt-8">
      <div className="" id="editorjs"></div>
    </div>
  );
};

export default DocumentEditor;
