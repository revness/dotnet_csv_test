import DataList from "../../components/DataList/DataList";
import { useContext } from "react";
import { DataFileContext } from "../../context/DataFileContextProvider";

const DataPage = () => {
  const data = useContext(DataFileContext).data;

  return (
    <div className="max-w-7xl mx-auto px-8">
      <h1 className="text-2xl font-bold mt-4 mb-2 text-center">Data Page</h1>
      <p className="mb-4 text-center">There are {data.length} data points. </p>
      <DataList data={data} />
    </div>
  );
};

export default DataPage;
