"use client";
import React, { useState, useEffect } from "react";
import styles from "../styles/ImageConverter.module.css"; 
import Link from "next/link";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ProgressBar from "react-bootstrap/ProgressBar"; 
import "bootstrap/dist/css/bootstrap.min.css"; 
import JSZip from "jszip";
import { FaFileUpload } from 'react-icons/fa'; 
import { saveAs } from "file-saver"; 

interface ImageConverterProps {
  format: string;
}

const ImageConverter: React.FC<ImageConverterProps> = ({ format }) => {
  const formatString = format || "jpg"; 

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [convertedImages, setConvertedImages] = useState<Map<string, string>>(); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filePreviews, setFilePreviews] = useState<Map<string, string>>(); 
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [PreviewName, setPreviewName] = useState<string | null>(null);
  const [conversionStatus, setConversionStatus] =
    useState<Map<string, string>>(); 
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

  useEffect(() => {
    if (convertedImages) {
      const statuses = new Map<string, string>();
      selectedFiles.forEach((file) => {
        statuses.set(
          file.name,
          convertedImages.has(file.name) ? "Completed" : "Not Converted"
        );
      });
      setConversionStatus(statuses);
    }
  }, [convertedImages]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFiles(Array.from(event.target.files));
      setConvertedImages(new Map());
      setError(null);
      setProgress(0);
      setTotalFiles(event.target.files.length);
    }
  };

  const handleDownloadAll = async () => {
    console.log("Start Download All");
    if (!convertedImages || convertedImages.size === 0) {
      alert("No images available for download.");
      return;
    }
    
    console.log("Images for download:", convertedImages); 
    
    const zip = new JSZip();
    const fileExtension = `.${formatString}`;
  
    const promises = Array.from(convertedImages.entries()).map(([originalFileName, url]) => {
     
      const fileName = originalFileName.replace(/\.[^/.]+$/, fileExtension); 
      
      return fetch(url)
        .then((response) => response.blob())
        .then((blob) => {
          console.log("Adding file to ZIP:", fileName);
          zip.file(fileName, blob);
        })
        .catch((error) => {
          console.error(`Failed to fetch file ${originalFileName}:`, error);
        });
    });
    
    try {
      await Promise.all(promises);
      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, `converted-images.${formatString}.zip`);
    } catch (error) {
      console.error("ZIP creation error:", error);
      alert("Failed to create ZIP file. Please try again.");
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
  
  const handlePreviewClick = (
    image: string,
    imageName: string,
    check: boolean,
    imageConverted: string
  ) => {
    if (check) {
      const nameWithoutExtension = imageName.substring(
        0,
        imageName.lastIndexOf(".")
      );
      setPreviewName(`${nameWithoutExtension}.${formatString}`);
      setPreviewImage(imageConverted);
    } else {
      setPreviewName(imageName);
      setPreviewImage(image);
    }
    setShowPreview(true);
  };

  const handleClosePreview = () => setShowPreview(false);

  const handleDownload = (image: string) => {
    const link = document.createElement("a");
    link.href = image;
    link.download = `converted.${formatString}`;
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
            />
          </label>
        </div>
      </div>


      <div className={styles.previewContainer}>
        {filePreviews && (
          <div className={styles.previewGrid}>
            {Array.from(filePreviews.entries()).map(
              ([fileName, fileUrl], index) => (
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
                      onClick={() => handleDownload(fileUrl)}
                    >
                      Download
                    </Button>
                  </div>
                </div>
              )
            )}
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
          disabled={loading}
        >
          Convert All
        </Button>

        {convertedImages && convertedImages.size > 0 && (
          <Button
            variant="success"
            onClick={handleDownloadAll}
            disabled={loading}
            className="ms-2"
          >
            Download All
          </Button>
        )}
      </div>

  

<Modal show={showPreview} onHide={handleClosePreview} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Image Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>{PreviewName}</h5>
          {previewImage && (
            <img src={previewImage} alt="Preview" className="img-fluid" />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClosePreview}>
            Close
          </Button>
          <Button
              variant="primary"
              onClick={() => handleDownload(previewImage || '')}
            >
              Download
            </Button>
        </Modal.Footer>
      </Modal>

      <div className={`container ${styles.converterContainer}`}>
   
      <div className={styles.formatLinks}>
        <h2 className="text-center heading-image-h2">Other Converters</h2>
        <div className={styles.linksContainer}>
          {['jpg', 'png', 'gif', 'bmp', 'tiff', 'webp', 'svg', 'heif', 'ico', 'raw', 'avif'].map(format => (
            <Link
              key={format}
              href={`/convert-to-${format}`} 
              className={styles.formatLink}
            >
              {format.toUpperCase()} Converter
            </Link>
          ))}
        </div>
      </div>
    </div>



    </div>
  );
};

export default ImageConverter;
