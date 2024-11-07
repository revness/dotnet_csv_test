import { DataItem } from "../Services/data-list-services";
import { FileItem } from "../Services/file-list-services";
import { useEffect, useState, createContext } from "react";
import { getAllData } from "../Services/data-list-services";
import { getAllFiles } from "../Services/file-list-services";

interface DataFileContextProviderProps {
  children: React.ReactNode;
}

export const DataFileContext = createContext<{
  data: DataItem[];
  file: FileItem[];
  updateData: () => void;
  updateFile: () => void;
}>({
  data: [],
  file: [],
  updateData: () => {},
  updateFile: () => {},
});
const DataFileContextProvider = ({
  children,
}: DataFileContextProviderProps) => {
  const [data, setData] = useState<DataItem[]>([]);
  const [file, setFile] = useState<FileItem[]>([]);

  const updateData = () => {
    getAllData().then((data) => {
      setData(data);
    });
  };

  const updateFile = () => {
    getAllFiles().then((file) => {
      setFile(file);
    });
  };

  useEffect(() => {
    updateData();
    updateFile();
  }, []);

  return (
    <DataFileContext.Provider value={{ data, file, updateData, updateFile }}>
      {children}
    </DataFileContext.Provider>
  );
};

export default DataFileContextProvider;
