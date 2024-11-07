using System.ComponentModel.DataAnnotations;

public class Property
{
    public int Id { get; set; }

    // Required field
    [Required]
    public string PropertyId { get; set; } = string.Empty;

    // All other fields should be nullable
    public string? DistrictCode { get; set; }
    public string? PropertyName { get; set; }
    public string? UnitNumber { get; set; }
    public string? HouseNumber { get; set; }
    public string? StreetName { get; set; }
    public string? Locality { get; set; }
    public string? PostCode { get; set; }
    public decimal? Area { get; set; }
    public string? AreaType { get; set; }
    public DateTime? ContractDate { get; set; }
    public DateTime? SettlementDate { get; set; }
    public decimal? PurchasePrice { get; set; }
    public string? Zoning { get; set; }
    public string? NatureOfProperty { get; set; }
    public string? PrimaryPurpose { get; set; }
    public string? StrataLotNumber { get; set; }
    public int? InterestOfSale { get; set; }
    public string? DealingNumber { get; set; }
    public string? LegalDescription { get; set; }

    // Calculated properties
    public string FullAddress
    {
        get
        {
            var addressParts = new List<string>();

            if (!string.IsNullOrWhiteSpace(UnitNumber))
                addressParts.Add($"Unit {UnitNumber}");
            
            if (!string.IsNullOrWhiteSpace(HouseNumber))
                addressParts.Add(HouseNumber);
            
            if (!string.IsNullOrWhiteSpace(StreetName))
                addressParts.Add(StreetName);
            
            if (!string.IsNullOrWhiteSpace(Locality))
                addressParts.Add(Locality);
            
            if (!string.IsNullOrWhiteSpace(PostCode))
                addressParts.Add(PostCode);

            return string.Join(", ", addressParts);
        }
    }

    public string FormattedArea
    {
        get
        {
            if (!Area.HasValue)
                return string.Empty;

            var unit = AreaType?.ToUpper() switch
            {
                "M" => "m²",
                "H" => "ha",
                _ => string.Empty
            };

            return $"{Area.Value:N3} {unit}".Trim();
        }
    }

    public string FormattedPurchasePrice
    {
        get
        {
            return PurchasePrice.HasValue 
                ? $"${PurchasePrice.Value:N2}" 
                : string.Empty;
        }
    }
    public decimal PricePerM2
    {
        get
        {
            if (!Area.HasValue || !PurchasePrice.HasValue || AreaType?.ToUpper() != "M")
                return 0;

            return PurchasePrice.Value / Area.Value;
        }
    }}