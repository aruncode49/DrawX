import { createContext, useContext, useState } from "react";
import { FILE } from "@/lib/types";

interface ContextValue {
  files: FILE[] | undefined;
  setFiles: React.Dispatch<React.SetStateAction<FILE[] | undefined>>;
}

const FileListContext = createContext<ContextValue>({
  files: undefined,
  setFiles: () => undefined,
});

const FileListProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [files, setFiles] = useState<FILE[]>();

  return (
    <FileListContext.Provider value={{ files, setFiles }}>
      {children}
    </FileListContext.Provider>
  );
};

export const useFileContext = () => useContext(FileListContext);

export default FileListProvider;
