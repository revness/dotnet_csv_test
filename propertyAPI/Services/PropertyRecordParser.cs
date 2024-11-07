using System.Globalization;

public static class PropertyRecordParser
{
    public static Property ParseBRecord(string[] fields)
    {
        if (fields.Length < 24)
            throw new ArgumentException("Invalid number of fields for B record");

        if (fields[11] is null || fields[15] is null || fields[11].Length == 0 || fields[15].Length == 0 || fields[11] == "0" || fields[15] == "0")
            throw new ArgumentException("Area and PurchasePrice are required fields");
        if (fields[12].ToUpper() != "M")
            throw new ArgumentException("AreaType must be 'M'");


        return new Property
        {
            DistrictCode = fields[1],
            PropertyId = fields[2],
            PropertyName = string.IsNullOrEmpty(fields[5]) ? null : fields[5],
            UnitNumber = string.IsNullOrEmpty(fields[6]) ? null : fields[6],
            HouseNumber = string.IsNullOrEmpty(fields[7]) ? null : fields[7],
            StreetName = string.IsNullOrEmpty(fields[8]) ? null : fields[8],
            Locality = string.IsNullOrEmpty(fields[9]) ? null : fields[9],
            PostCode = string.IsNullOrEmpty(fields[10]) ? null : fields[10],
            Area = string.IsNullOrEmpty(fields[11]) ? null : decimal.Parse(fields[11], CultureInfo.InvariantCulture),
            AreaType = string.IsNullOrEmpty(fields[12]) ? null : fields[12],
            ContractDate = string.IsNullOrEmpty(fields[13]) ? null : DateTime.ParseExact(fields[13], "yyyyMMdd", CultureInfo.InvariantCulture),
            SettlementDate = string.IsNullOrEmpty(fields[14]) ? null : DateTime.ParseExact(fields[14], "yyyyMMdd", CultureInfo.InvariantCulture),
            PurchasePrice = string.IsNullOrEmpty(fields[15]) ? null : decimal.Parse(fields[15], CultureInfo.InvariantCulture),
            Zoning = string.IsNullOrEmpty(fields[16]) ? null : fields[16],
            NatureOfProperty = string.IsNullOrEmpty(fields[17]) ? null : fields[17],
            PrimaryPurpose = string.IsNullOrEmpty(fields[18]) ? null : fields[18],
            StrataLotNumber = string.IsNullOrEmpty(fields[19]) ? null : fields[19],
            InterestOfSale = string.IsNullOrEmpty(fields[22]) ? null : int.Parse(fields[22]),
            DealingNumber = string.IsNullOrEmpty(fields[23]) ? null : fields[23]
        };
    }
}