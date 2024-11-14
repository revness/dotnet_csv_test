import { DataFileContext } from "../../context/DataFileContextProvider";
import { useContext } from "react";
import Chart from "../../components/Charts/Chart";

const Dashboard = () => {
  const { data, file, addChart, removeChart, charts } =
    useContext(DataFileContext);

  return (
    <div className="max-w-7xl mx-auto px-8 flex flex-col items-center">
      <h1 className="text-2xl font-bold mt-4 mb-2 text-center">Dashboard</h1>
      <p className="text-center mb-4">
        There are {data.length} data points and {file.length} files uploaded
      </p>

      <button
        onClick={addChart}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md w-32"
      >
        Add Chart
      </button>

      <div className="flex flex-col items-center">
        {charts.map((chartId, index) => (
          <div
            key={chartId}
            className="border-black border-2 p-4 bg-white h[1600px] "
          >
            <button
              onClick={() => removeChart(index)}
              className="text-red-500 hover:text-red-700"
            >
              ✕
            </button>
            <div className="h-[550px] w-[800px] flex flex-col">
              <Chart data={data} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
