export interface FileItem {
  fileName: string;
  uploadDate: string;
  recordsProcessed: number;
  successfulRecords: number;
  processingErrors: number | null;
}

export const getAllFiles = async () => {
  const response = await fetch("http://localhost:5007/propertyitems/uploads");
  if (!response.ok) {
    throw new Error("Failed to fetch files");
  }
  return (await response.json()) as FileItem[];
};

export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("http://localhost:5007/propertyitems/upload", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to upload file");
  }

  return response.json();
};
