import FileList from "../../components/FileList/FileList";
import { useState, ChangeEvent, useContext } from "react";
import { uploadFile } from "../../Services/file-list-services";
import { DataFileContext } from "../../context/DataFileContextProvider";

const FilePage = () => {
  const { file, updateData, updateFile } = useContext(DataFileContext);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    setIsUploading(true);
    setError(null);
    setSuccess(null);

    try {
      await uploadFile(file);
      updateData();
      updateFile();
      setSuccess(`Successfully uploaded ${file.name}, ${file.size} bytes.`);
    } catch (e: any) {
      // Parse the error message which contains JSON
      let errorMessage = "";
      try {
        const errorData = JSON.parse(e.message);
        errorMessage = `${errorData.error}: ${errorData.details} (${errorData.processedRecords} records processed, ${errorData.successfulRecords} successful)`;
      } catch {
        errorMessage = e.message;
      }

      console.error("Upload failed:", e);
      setError(errorMessage);
    } finally {
      setIsUploading(false);
      event.target.value = "";
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-8">
      <h1 className="text-2xl font-bold mt-4 mb-2 text-center">File Page</h1>
      <p className="mb-4 text-center">
        There are {file.length} files uploaded.{" "}
      </p>

      {error && <div className="mb-4"> {error} </div>}

      {success && <div className="mb-4"> {success} </div>}

      <div className="mb-4 flex justify-center">
        <label
          htmlFor="file-upload"
          className="bg-blue-500 hover:bg-blue-600 cursor-pointer p-2  text-white rounded"
        >
          <input
            id="file-upload"
            type="file"
            className="hidden"
            onChange={handleFileChange}
            disabled={isUploading}
            accept=".dat"
          />
          {isUploading ? (
            <span className="flex items-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Uploading...
            </span>
          ) : (
            "Choose File"
          )}
        </label>
      </div>

      <FileList data={file} />
    </div>
  );
};

export default FilePage;
