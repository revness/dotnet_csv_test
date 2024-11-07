using System.ComponentModel.DataAnnotations;
public class FileUploadHistory
{
    public int Id { get; set; }
    
    [Required]
    public string FileName { get; set; } = string.Empty;
    
    public DateTime UploadDate { get; set; }
    
    public int RecordsProcessed { get; set; }
    
    public int SuccessfulRecords { get; set; }
    
    public string? ProcessingErrors { get; set; }
}