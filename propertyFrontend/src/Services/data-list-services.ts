export interface DataItem {
  id: number;
  propertyId: string;
  purchasePrice: number;
  districtCode: string;
  propertyName: string | null;
  area: number;
  areaType: string | null;
  contractDate: string;
  settlementDate: string;
  natureOfProperty: string;
  primaryPurpose: string;
  strataLotNumber: string;
  interestOfSale: number;
  dealingNumber: string;
  fullAddress: string;
  formattedArea: string;
  formattedPurchasePrice: string;
  pricePerM2: number;
  postCode: string;
}

export const getAllData = async () => {
  const response = await fetch("http://localhost:5007/propertyitems");
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  const json = await response.json();
  console.log(json);
  return json as DataItem[];
};
