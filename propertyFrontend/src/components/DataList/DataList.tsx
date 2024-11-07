import { DataItem } from "../../Services/data-list-services";

interface DataListProps {
  data: DataItem[];
}

const DataList = ({ data }: DataListProps) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Property ID</th>
          <th>Contract Date</th>
          <th>Settlement Date</th>
          <th>Primary Purpose</th>
          <th>Full Address</th>
          <th>Area</th>
          <th>Purchase Price</th>
          <th>Price Per M2</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.propertyId}</td>
            <td>{item.contractDate.slice(0, 10)}</td>
            <td>{item.settlementDate.slice(0, 10)}</td>
            <td>{item.primaryPurpose}</td>
            <td>{item.fullAddress}</td>
            <td>{item.formattedArea}</td>
            <td>{item.formattedPurchasePrice}</td>
            <td>{item.pricePerM2}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataList;
