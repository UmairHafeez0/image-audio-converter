"use client";
import React, { useState, useEffect } from "react";

interface ImageConverterProps {
  format: string;
}

const ImageConverter: React.FC<ImageConverterProps> = ({ format }) => {
  const formatString = format || "jpg"; 

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="container">
      {error && <div className="alert alert-danger text-center">{error}</div>}
      <div>Basic Image Converter Component</div>
    </div>
  );
};

export default ImageConverter;