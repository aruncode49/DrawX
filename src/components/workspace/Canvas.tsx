"use client";

import { FILE } from "@/lib/types";
import { MainMenu, WelcomeScreen } from "@excalidraw/excalidraw";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Excalidraw } from "@excalidraw/excalidraw";

interface PROPS {
  triggerForSave: boolean;
  fileId: string;
  fileData: FILE;
}

export default function Canvas({ triggerForSave, fileId, fileData }: PROPS) {
  const [canvasData, setCanvasData] = useState<any>(
    fileData?.whiteboard ? JSON.parse(fileData?.whiteboard) : []
  );

  let toastId: string | number;

  // handle save document function
  async function handleSaveCanvas() {
    try {
      toastId = toast.loading("File Saving...");
      const res = await axios.patch("/api/file/updateCanvas", {
        fileId,
        whiteboard: JSON.stringify(canvasData),
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

  useEffect(() => {
    triggerForSave && handleSaveCanvas();
  }, [triggerForSave]);

  return (
    <div className="h-full">
      <Excalidraw
        theme="light"
        initialData={{
          elements: canvasData,
        }}
        onChange={(excalidrawElements, appState, files) =>
          setCanvasData(excalidrawElements)
        }
        UIOptions={{
          canvasActions: {
            saveToActiveFile: false,
            loadScene: false,
            export: false,
            toggleTheme: false,
          },
        }}
      >
        <MainMenu>
          <MainMenu.DefaultItems.SaveAsImage />
          <MainMenu.DefaultItems.ClearCanvas />
          <MainMenu.DefaultItems.ChangeCanvasBackground />
        </MainMenu>

        <WelcomeScreen>
          <WelcomeScreen.Hints.MenuHint />
          <WelcomeScreen.Hints.ToolbarHint />
        </WelcomeScreen>
      </Excalidraw>
    </div>
  );
}
