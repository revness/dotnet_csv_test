# Property insights app

Lets try and query some CSV files and get some insights, while learning how to code in dotnet.

# Description
An app that takes a large dataset of nsw housing sales prices and extracts insights in a beautiful and easy to understand way.
Built in ReactTS + tailwind for the frontend, and the backend RESTful API is written in .NET. 
We're going to try using sqlite for the first time as well.


# Changelog
- Set up Readme
- Gets .DAT files from source

5/11/24
- sets up frontend boilerplate react takes
- sets up backend boilerplate .net /minimal API
- CSV files are separated into multiple dat files,  combine them into one csv for visualisation
-sets up first migration with EF Core migration tool using 
```
dotnet ef migrations add InitialCreate
```
-creates sqlite db using 
```
dotnet ef database update
```

6/12/24 1PM
- Merge CSV data to sqlite db