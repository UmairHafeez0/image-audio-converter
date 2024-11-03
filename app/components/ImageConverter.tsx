"use client";
import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

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

  const handlePreviewClick = (
    image: string,
    imageName: string,
    isConverted: boolean,
    convertedImageUrl: string
  ) => {
    if (isConverted) {
      const nameWithoutExtension = imageName.substring(
        0,
        imageName.lastIndexOf(".")
      );
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
    <div className="container">
      {error && <div className="alert alert-danger text-center">{error}</div>}

      <input
        type="file"
        multiple
        onChange={handleFileChange}
      />

      {filePreviews && (
        <div>
          {Array.from(filePreviews.entries()).map(([fileName, fileUrl], index) => (
            <div key={index}>
              <h5>{fileName}</h5>
              <button
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
              </button>
              <button
                onClick={() => handleDownload(
                  convertedImages?.get(fileName) || fileUrl,
                  fileName
                )}
              >
                Download
              </button>
            </div>
          ))}
        </div>
      )}

      <Modal show={showPreview} onHide={handleClosePreview} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Image Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>{previewName}</h5>
          {previewImage && (
            <img 
              src={previewImage} 
              alt="Preview" 
              style={{ maxWidth: '100%', height: 'auto' }} 
            />
          )}
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