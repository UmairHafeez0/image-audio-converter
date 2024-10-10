"use client";
import React, { useState, useEffect } from "react";

interface ImageConverterProps {
  format: string;
}

const ImageConverter: React.FC<ImageConverterProps> = ({ format }) => {
  // Previous state remains
  const [convertedImages, setConvertedImages] = useState<Map<string, string>>(); 
  const [progress, setProgress] = useState<number>(0);
  const [totalFiles, setTotalFiles] = useState<number>(0); 

  const handleConversion = async () => {
    if (selectedFiles.length === 0) {
      return alert("Please upload at least one image file first!");
    }
  
    const formData = new FormData();
    selectedFiles.forEach((file) => formData.append("files", file));
    formData.append("format", formatString);
  
    try {
      setLoading(true);
      setProgress(0);
      setTotalFiles(selectedFiles.length);
  
      const response = await fetch(
        "http://localhost:3030/image-converter-all",
        {
          method: "POST",
          body: formData,
        }
      );
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const data = await response.json();
      const imageMap = new Map<string, string>();
      selectedFiles.forEach((file) => {
        const fileName = file.name;
        if (data.convertedFileUrls[fileName]) {
          imageMap.set(fileName, data.convertedFileUrls[fileName]);
        }
      });
      setConvertedImages(imageMap);
  
      const totalSteps = 100;
      let step = 0;
  
      const interval = setInterval(() => {
        if (step >= totalSteps) {
          clearInterval(interval);
          setProgress(100); 
        } else {
          step += Math.ceil(totalSteps / selectedFiles.length);
          setProgress(step);
        }
      }, 500); 
  
    } catch (error) {
      console.error("Conversion error:", error);
      setError("Failed to convert images. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      {/* Previous JSX remains */}
      <button onClick={handleConversion} disabled={loading}>
        Convert All
      </button>
      <div>Progress: {progress}%</div>
    </div>
  );
};