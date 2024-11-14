import { DataItem } from "../Services/data-list-services";
import { FileItem } from "../Services/file-list-services";
import { useEffect, useState, createContext } from "react";
import { getAllData } from "../Services/data-list-services";
import { getAllFiles } from "../Services/file-list-services";
import { deleteDataById } from "../Services/data-list-services";

interface DataFileContextProviderProps {
  children: React.ReactNode;
}

export const DataFileContext = createContext<{
  data: DataItem[];
  file: FileItem[];
  updateData: () => void;
  updateFile: () => void;
  addChart: () => void;
  removeChart: (index: number) => void;
  charts: number[];
  deleteData: (id: number) => void;
}>({
  data: [],
  file: [],
  updateData: () => {},
  updateFile: () => {},
  addChart: () => {},
  removeChart: () => {},
  charts: [],
  deleteData: () => {},
});
const DataFileContextProvider = ({
  children,
}: DataFileContextProviderProps) => {
  const [data, setData] = useState<DataItem[]>([]);
  const [file, setFile] = useState<FileItem[]>([]);
  const [charts, setCharts] = useState([0]); // Array of chart IDs

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

  const deleteData = async (id: number) => {
    try {
      await deleteDataById(id);
    } catch (e) {
      console.error("Delete failed:", e);
    } finally {
      updateData();
    }
  };

  const addChart = () => {
    setCharts((prev) => [...prev, prev.length]); // Add new chart with unique ID
  };

  const removeChart = (index: number) => {
    setCharts((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    updateData();
    updateFile();
  }, []);

  return (
    <DataFileContext.Provider
      value={{
        data,
        file,
        updateData,
        updateFile,
        addChart,
        removeChart,
        charts,
        deleteData,
      }}
    >
      {children}
    </DataFileContext.Provider>
  );
};

export default DataFileContextProvider;
