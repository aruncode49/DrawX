import dynamic from "next/dynamic";
const Excalidraw = dynamic(
  async () => (await import("@excalidraw/excalidraw")).Excalidraw,
  {
    ssr: false,
  }
);
export default function Canvas() {
  return (
    <div className="h-full">
      <Excalidraw
        theme="light"
        onChange={(excalidrawElements, appState, files) =>
          console.log(excalidrawElements)
        }
        UIOptions={{
          canvasActions: {
            saveToActiveFile: false,
            loadScene: false,
            export: false,
            toggleTheme: false,
          },
        }}
      />
    </div>
  );
}
