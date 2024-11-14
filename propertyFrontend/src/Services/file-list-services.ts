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
    const errorText = await response.text();
    throw new Error(errorText);
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
    const errorText = await response.text();
    throw new Error(errorText);
  }

  return response.json();
};
