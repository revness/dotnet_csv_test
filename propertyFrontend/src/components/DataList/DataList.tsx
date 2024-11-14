import { DataItem } from "../../Services/data-list-services";
import { useContext, useState } from "react";
import { DataFileContext } from "../../context/DataFileContextProvider";

interface DataListProps {
  data: DataItem[];
}

const DataList = ({ data }: DataListProps) => {
  const { deleteData } = useContext(DataFileContext);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = data.filter((item) => {
    const searchString = searchTerm.toLowerCase();
    return (
      item.propertyId.toLowerCase().includes(searchString) ||
      item.primaryPurpose.toLowerCase().includes(searchString) ||
      item.fullAddress.toLowerCase().includes(searchString) ||
      item.formattedArea.toLowerCase().includes(searchString) ||
      item.formattedPurchasePrice.toLowerCase().includes(searchString) ||
      item.contractDate.includes(searchString) ||
      item.settlementDate.includes(searchString)
    );
  });

  return (
    <div>
      <div className="flex flex-col mx-auto items-center">
        <div>
          <input
            type="text"
            placeholder="Search properties..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
      <table className="min-w-full divide-y divide-gray-300">
        <thead>
          <tr className="divide-x divide-gray-200">
            <th>Property ID</th>
            <th>Contract Date</th>
            <th>Settlement Date</th>
            <th>Primary Purpose</th>
            <th>Full Address</th>
            <th>Area</th>
            <th>Purchase Price</th>
            <th>Price Per M2</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {filteredData.map((item) => (
            <tr key={item.id} className="divide-x divide-gray-200">
              <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 ">
                {item.propertyId}
              </td>
              <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 ">
                {item.contractDate.slice(0, 10)}
              </td>
              <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 ">
                {item.settlementDate.slice(0, 10)}
              </td>
              <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 ">
                {item.primaryPurpose}
              </td>
              <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 ">
                {item.fullAddress}
              </td>
              <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 ">
                {item.formattedArea}
              </td>
              <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 ">
                {item.formattedPurchasePrice}
              </td>
              <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 ">
                {item.pricePerM2.toFixed(2)}
              </td>
              <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 ">
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => deleteData(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataList;
