public class DatFileUploadDto
{
    public int ProcessedRecords { get; set; }
    public int SuccessfulRecords { get; set; }
    public List<string> Errors { get; set; } = new();
}