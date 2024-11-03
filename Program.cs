using System;
using System.IO;
using System.Linq;

class Program
{
    static void Main(string[] args)
    {
        // Check if file path is provided
        if (args.Length == 0)
        {
            Console.WriteLine("Please provide a CSV file path.");
            Console.WriteLine("Usage: dotnet run -- path/to/your/file.csv");
            return;
        }

        string filePath = args[0];
        
        // Check if file exists
        if (!File.Exists(filePath))
        {
            Console.WriteLine($"File not found: {filePath}");
            return;
        }

        try
        {
            // Read first 6 lines (header + 5 rows)
            var lines = File.ReadLines(filePath).Take(6).ToList();
            
            Console.WriteLine("\nFirst 5 rows of the CSV file:\n");
            foreach (var line in lines)
            {
                Console.WriteLine(line);
            }
            
            Console.WriteLine($"\nTotal rows in file: {File.ReadLines(filePath).Count()}");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error reading file: {ex.Message}");
        }
    }
}