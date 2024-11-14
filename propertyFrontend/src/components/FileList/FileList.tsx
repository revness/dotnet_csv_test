import { FileItem } from "../../Services/file-list-services";

interface DataListProps {
  data: FileItem[];
}

const DataList = ({ data }: DataListProps) => {
  return (
    <div className=" max-w-7xl mx-auto">
      <div className="inline-block min-w-full py-2 align-middle ">
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr className="divide-x divide-gray-200">
              <th>File Name</th>
              <th>Processed Records</th>
              <th>Successful Records</th>
              <th>Processing Errors</th>
              <th>Upload Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {data.map((item, index) => (
              <tr key={index} className="divide-x divide-gray-200">
                <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 ">
                  {item.fileName}
                </td>
                <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 ">
                  {item.recordsProcessed}
                </td>
                <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500">
                  {item.successfulRecords}
                </td>
                <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 max-w-20 truncate">
                  {item.processingErrors ? item.processingErrors : "N/A"}
                </td>
                <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500">
                  {item.uploadDate.slice(0, 10)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataList;
