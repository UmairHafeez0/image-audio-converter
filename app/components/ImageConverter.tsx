"use client";
import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ProgressBar from "react-bootstrap/ProgressBar";
import { FaFileUpload } from 'react-icons/fa';
import styles from "../styles/ImageConverter.module.css";

interface ImageConverterProps {
  format: string;
}

const ImageConverter: React.FC<ImageConverterProps> = ({ format }) => {
  const formatString = format || "jpg"; 
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [filePreviews, setFilePreviews] = useState<Map<string, string>>();
  const [convertedImages, setConvertedImages] = useState<Map<string, string>>(); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [previewName, setPreviewName] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [totalFiles, setTotalFiles] = useState<number>(0);

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
      setProgress(0);
      setTotalFiles(event.target.files.length);
    }
  };

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
  
      const response = await fetch("http://localhost:3030/image-converter-all", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) throw new Error("Network response was not ok");
  
      const data = await response.json();
      const imageMap = new Map<string, string>();
      selectedFiles.forEach((file) => {
        if (data.convertedFileUrls[file.name]) {
          imageMap.set(file.name, data.convertedFileUrls[file.name]);
        }
      });
      setConvertedImages(imageMap);
  
      // Simulate progress
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

  const handlePreviewClick = (
    image: string,
    imageName: string,
    isConverted: boolean,
    convertedImageUrl: string
  ) => {
    if (isConverted) {
      const nameWithoutExtension = imageName.substring(0, imageName.lastIndexOf("."));
      setPreviewName(`${nameWithoutExtension}.${formatString}`);
      setPreviewImage(convertedImageUrl);
    } else {
      setPreviewName(imageName);
      setPreviewImage(image);
    }
    setShowPreview(true);
  };

  const handleClosePreview = () => setShowPreview(false);

  const handleDownload = (image: string, name: string) => {
    const link = document.createElement("a");
    link.href = image;
    link.download = name || `converted.${formatString}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={`container ${styles.converterContainer}`}>
      {error && <div className="alert alert-danger text-center">{error}</div>}

      <div className="mb-3">
        <div className={styles.fileInputContainer}>
          <label className={styles.fileInputButton}>
            <FaFileUpload size={24} /> Upload Files
            <input
              type="file"
              className={styles.fileInput}
              multiple
              onChange={handleFileChange}
              accept="image/*"
            />
          </label>
        </div>
      </div>

      <div className={styles.previewContainer}>
        {filePreviews && (
          <div className={styles.previewGrid}>
            {Array.from(filePreviews.entries()).map(([fileName, fileUrl], index) => (
              <div key={index} className={styles.imageBox}>
                <h5>{fileName}</h5>
                <div className={styles.imageButtons}>
                  <Button
                    variant="primary"
                    onClick={() =>
                      handlePreviewClick(
                        fileUrl,
                        fileName,
                        convertedImages?.has(fileName) || false,
                        convertedImages?.get(fileName) || ""
                      )
                    }
                  >
                    Preview
                  </Button>
                  <Button
                    variant="success"
                    onClick={() => handleDownload(
                      convertedImages?.get(fileName) || fileUrl,
                      fileName
                    )}
                  >
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {loading && <div className="text-center">Converting images...</div>}

      <ProgressBar
        now={progress}
        label={`${progress}%`}
        className="my-3"
      />

      <div className="text-center my-4">
        <Button
          variant="primary"
          onClick={handleConversion}
          disabled={loading || selectedFiles.length === 0}
        >
          Convert All
        </Button>
      </div>

      <Modal show={showPreview} onHide={handleClosePreview} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Image Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <h5 className="mb-3">{previewName}</h5>
          <div className={styles.imagePreviewContainer}>
            {previewImage && (
              <img 
                src={previewImage} 
                alt="Preview" 
                className={styles.previewImage}
              />
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClosePreview}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => previewImage && handleDownload(previewImage, previewName || '')}
          >
            Download
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ImageConverter;