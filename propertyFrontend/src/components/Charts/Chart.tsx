import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bubble } from "react-chartjs-2";
import { useState, useMemo } from "react";

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

interface ChartDataProps {
  data: {
    area: number;
    purchasePrice: number;
    pricePerM2: number;
    fullAddress: string;
    primaryPurpose: string;
    postCode: string;
  }[];
}

type MetricOption = {
  value: "area" | "purchasePrice" | "pricePerM2";
  label: string;
};

const metricOptions: MetricOption[] = [
  { value: "area", label: "Area (m²)" },
  { value: "purchasePrice", label: "Purchase Price" },
  { value: "pricePerM2", label: "Price per m²" },
];

const Chart = ({ data }: ChartDataProps) => {
  const [xAxis, setXAxis] = useState<MetricOption["value"]>("area");
  const [yAxis, setYAxis] = useState<MetricOption["value"]>("purchasePrice");
  const [selectedPostcodes, setSelectedPostcodes] = useState<string[]>([]);
  const [showPostcodeDropdown, setShowPostcodeDropdown] = useState(false);

  // Get unique postcodes from data
  const availablePostcodes = useMemo(() => {
    const postcodes = new Set(data.map((item) => item.postCode));
    console.log(postcodes, "postcodes");
    return Array.from(postcodes).sort();
  }, [data]);

  const togglePostcode = (postcode: string) => {
    setSelectedPostcodes((prev) =>
      prev.includes(postcode)
        ? prev.filter((p) => p !== postcode)
        : [...prev, postcode]
    );
  };

  const processedData = useMemo(() => {
    return data
      .filter(
        (property) =>
          property.area &&
          property.purchasePrice &&
          property.pricePerM2 &&
          property.primaryPurpose === "RESIDENCE" &&
          (selectedPostcodes.length === 0 ||
            selectedPostcodes.includes(property.postCode))
      )
      .map((property) => ({
        area: property.area,
        pricePerM2: property.pricePerM2,
        purchasePrice: property.purchasePrice,
        address: property.fullAddress,
        postCode: property.postCode,
      }));
  }, [data, selectedPostcodes]);

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: metricOptions.find((opt) => opt.value === xAxis)?.label || "",
        },
        beginAtZero: true,
        max: processedData.length
          ? Math.max(...processedData.map((item) => item[xAxis])) * 1.1
          : undefined,
      },
      y: {
        title: {
          display: true,
          text: metricOptions.find((opt) => opt.value === yAxis)?.label || "",
        },
        beginAtZero: true,
        max: processedData.length
          ? Math.max(...processedData.map((item) => item[yAxis])) * 1.1
          : undefined,
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const dataPoint = processedData[context.dataIndex];
            return [
              `Address: ${dataPoint.address}`,
              `Area: ${dataPoint.area.toLocaleString()} m²`,
              `Price per m²: $${dataPoint.pricePerM2.toLocaleString()}`,
              `Total Price: $${dataPoint.purchasePrice.toLocaleString()}`,
            ];
          },
        },
      },
    },
  };

  const chartData = {
    datasets: [
      {
        label: "Residential Properties",
        data: processedData.map((item) => ({
          x: item[xAxis],
          y: item[yAxis],
          r: Math.sqrt(item.purchasePrice) / 200,
        })),
        backgroundColor: "rgba(54, 162, 235, 0.3)",
        borderColor: "rgba(54, 162, 235, 1)",
      },
    ],
  };

  return (
    <div className="w-full h-96 flex flex-col items-center mb-12 ">
      <h1 className="text-center font-bold mb-4">
        Property Metrics Comparison
      </h1>

      <div className="flex gap-4 mb-4">
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium">X Axis</label>
          <select
            value={xAxis}
            onChange={(e) => setXAxis(e.target.value as MetricOption["value"])}
            className="px-3 py-2 border rounded-md bg-white"
          >
            {metricOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium">Y Axis</label>
          <select
            value={yAxis}
            onChange={(e) => setYAxis(e.target.value as MetricOption["value"])}
            className="px-3 py-2 border rounded-md bg-white"
          >
            {metricOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col relative">
          <label className="mb-1 text-sm font-medium">
            Postcodes ({selectedPostcodes.length} selected)
          </label>
          <button
            onClick={() => setShowPostcodeDropdown(!showPostcodeDropdown)}
            className="px-3 py-2 border rounded-md bg-white text-left w-48"
          >
            Select Postcodes
          </button>
          {showPostcodeDropdown && (
            <div className="absolute top-full mt-1 w-48 max-h-48 overflow-y-auto bg-white border rounded-md shadow-lg z-10">
              <div className="p-2 border-b">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={
                      selectedPostcodes.length === availablePostcodes.length
                    }
                    onChange={() =>
                      setSelectedPostcodes(
                        selectedPostcodes.length === availablePostcodes.length
                          ? []
                          : [...availablePostcodes]
                      )
                    }
                    className="mr-2"
                  />
                  Select All
                </label>
              </div>
              {availablePostcodes.map((postcode) => (
                <div key={postcode} className="p-2 hover:bg-gray-100">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedPostcodes.includes(postcode)}
                      onChange={() => togglePostcode(postcode)}
                      className="mr-2"
                    />
                    {postcode}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Bubble options={options} data={chartData} />
    </div>
  );
};

export default Chart;
