import { useContext } from "react";
import { DataFileContext } from "../../context/DataFileContextProvider";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bubble } from "react-chartjs-2";

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

const Dashboard = () => {
  const data = useContext(DataFileContext).data;

  const processedData = data
    .filter(
      (property) =>
        property.area && property.purchasePrice && property.pricePerM2
    )
    .map((property) => ({
      area: property.area,
      pricePerM2: property.pricePerM2,
      price: property.purchasePrice,
      address: property.fullAddress,
    }));

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Area (m²)",
        },
        beginAtZero: true,
        max: Math.max(...processedData.map((item) => item.area)) * 1.1,
      },
      y: {
        title: {
          display: true,
          text: "Price per m²",
        },
        beginAtZero: true,
        max: Math.max(...processedData.map((item) => item.pricePerM2)) * 1.1,
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const dataPoint = processedData[context.dataIndex];
            return [
              `Address: ${dataPoint.address}`,
              `Area: ${dataPoint.area} m²`,
              `Price per m²: $${dataPoint.pricePerM2.toFixed(2)}`,
              `Total Price: $${dataPoint.price?.toLocaleString()}`,
            ];
          },
        },
      },
    },
  };

  const chartData = {
    datasets: [
      {
        label: "Residential (R)",
        data: processedData.map((item) => ({
          x: item.area,
          y: item.pricePerM2,
          r: item.price ? Math.sqrt(item.price) / 200 : 0, // Scale radius based on price
        })),
        backgroundColor: "rgba(54, 162, 235, 0.3)",
        borderColor: "rgba(54, 162, 235, 1)",
      },
    ],
  };

  return (
    <div>
      <div>Dashboard</div>
      <div className="w-full h-96">
        <Bubble options={options} data={chartData} />
      </div>
    </div>
  );
};

export default Dashboard;
