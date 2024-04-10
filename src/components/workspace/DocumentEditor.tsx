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
// @ts-ignore
import Paragraph from "@editorjs/paragraph";

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

const DocumentEditor = () => {
  const ref = useRef<EditorJS>();
  const [document, setDocument] = useState(rawData);

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
        paragraph: {
          class: Paragraph,
          inlineToolbar: true,
        },
      },

      holder: "editorjs",
      data: document,
    });
    ref.current = editor;
  };

  useEffect(() => {
    initEditor();
  }, []);

  return (
    <div className=" px-8 pt-8">
      <div className="font-semibold" id="editorjs"></div>
    </div>
  );
};

export default DocumentEditor;
