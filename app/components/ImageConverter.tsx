"use client";
import React, { useState, useEffect } from "react";

interface ImageConverterProps {
  format: string;
}

const ImageConverter: React.FC<ImageConverterProps> = ({ format }) => {
  const formatString = format || "jpg"; 
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [filePreviews, setFilePreviews] = useState<Map<string, string>>(); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedFiles.length > 0) {
      const previews = new Map<string, string>();
      selectedFiles.forEach((file) => {
        const fileUrl = URL.createObjectURL(file);
        previews.set(file.name, fileUrl);
      });
      setFilePreviews(previews);
      return () => previews.forEach((url) => URL.revokeObjectURL(url));
    }
  }, [selectedFiles]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFiles(Array.from(event.target.files));
      setError(null);
    }
  };

  return (
    <div className="container">
      {error && <div className="alert alert-danger text-center">{error}</div>}
      <input
        type="file"
        multiple
        onChange={handleFileChange}
      />
      {filePreviews && (
        <div>
          {Array.from(filePreviews.entries()).map(([fileName], index) => (
            <div key={index}>{fileName}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageConverter;