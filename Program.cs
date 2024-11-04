using System;
using System.IO;
using System.Linq;
using System.Text;
class Program
{
    static void Main(string[] args)
    {
        if (args.Length == 0)
        {
            Console.WriteLine("Please provide a CSV file path.");
            Console.WriteLine("Usage: dotnet run -- path/to/your/file.csv");
            return;
        }

        string filePath = args[0];
        
        if (!File.Exists(filePath))
        {
            Console.WriteLine($"File not found: {filePath}");
            return;
        }

        try
        {
            // Skip header row, then take records starting with 'B'
            var records = File.ReadLines(filePath)
                .Skip(1)  // Skip header row
                .Where(line => 
                {
                    var firstColumn = line.Split(',')[0].Trim();
                    return firstColumn.StartsWith("B", StringComparison.OrdinalIgnoreCase);
                })
                .Take(5)
                .ToList();

            // Print header
            Console.WriteLine("\nHeader row:");
            Console.WriteLine(File.ReadLines(filePath).First());
            
            Console.WriteLine("\nFirst 5 records starting with 'B':");
            foreach (var record in records)
            {
                Console.WriteLine(record);
            }
            
            Console.WriteLine($"\nTotal 'B' records found: {records.Count}");
;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error reading file: {ex.Message}");
        }
    }
}