import DataList from "../../components/DataList/DataList";
import { useContext } from "react";
import { DataFileContext } from "../../context/DataFileContextProvider";

const DataPage = () => {
  const data = useContext(DataFileContext).data;

  return (
    <div>
      <h1>Data Page</h1>
      <p>There are {data.length} data points. </p>
      <DataList data={data} />
    </div>
  );
};

export default DataPage;
