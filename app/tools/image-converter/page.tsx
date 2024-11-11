"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './ImageConverter.module.css';

const ImageConverter = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [outputFormat, setOutputFormat] = useState<string>('jpg');
  const [convertedImage, setConvertedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [filePreview, setFilePreview] = useState<string | null>(null);

  useEffect(() => {
    if (selectedFile) {
      const fileUrl = URL.createObjectURL(selectedFile);
      setFilePreview(fileUrl);
      return () => URL.revokeObjectURL(fileUrl);
    }
  }, [selectedFile]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
      setConvertedImage(null);
      setError(null);
    }
  };

  const handleConversion = async () => {
    if (!selectedFile) return alert('Please upload an image file first!');

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('format', outputFormat);

    try {
      setLoading(true);
      setProgress(0);

      const response = await fetch('http://localhost:3030/image-converter', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setConvertedImage(data.convertedFileUrl); // Assuming API returns converted image URL
    } catch (error) {
      setError('Failed to convert image. Please try again.');
    } finally {
      setLoading(false);
      setProgress(100);
    }
  };

  return (
    <div className={`container ${styles.converterContainer}`}>
 
      <h1 className="text-center">Image Format Converter</h1>

      {error && <div className="alert alert-danger text-center">{error}</div>}

      <div className="mb-3">
        <label className="form-label">Select an Image</label>
        <input
          type="file"
          className="form-control"
          onChange={handleFileChange}
        />
      </div>

      {filePreview && (
        <div className={styles.previewContainer}>
          <h5>Image Preview:</h5>
          <img src={filePreview} alt="Preview" className={`img-thumbnail ${styles.imagePreview}`} />
        </div>
      )}

      <div className="mb-3">
        <label className="form-label">Convert to Format</label>
        <select
          className="form-select"
          value={outputFormat}
          onChange={(e) => setOutputFormat(e.target.value)}
        >
          <option value="jpg">JPEG</option>
          <option value="png">PNG</option>
          <option value="gif">GIF</option>
          <option value="bmp">BMP</option>
          <option value="tiff">TIFF</option>
          <option value="webp">WEBP</option>
          <option value="svg">SVG</option>
          <option value="heif">HEIF</option>
          <option value="ico">ICO</option>
          <option value="raw">RAW</option>
          <option value="avif">AVIF</option>
        </select>
      </div>

      <button
        className={`btn btn-primary ${styles.convertButton}`}
        onClick={() => {
          if (typeof outputFormat === 'string') {
            window.location.href = `/convert-to-${outputFormat}`;
          }
        }}
        disabled={loading}
      >
        {loading ? 'Converting...' : `Go to ${outputFormat.toUpperCase()} Converter`}
      </button>

      {loading && (
        <div className={`progress ${styles.progressBar}`}>
          <div
            className="progress-bar progress-bar-striped progress-bar-animated"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {convertedImage && (
        <div className={`mt-4 ${styles.result}`}>
          <h4>Converted Image:</h4>
          <img src={convertedImage} alt="Converted" className="img-fluid" />
          <a href={convertedImage} download className="btn btn-success mt-3">Download Image</a>
        </div>
      )}

      <div className={`container ${styles.converterContainer}`}>
        <div className={styles.formatLinks}>
          <h2 className="text-center">Other Converters</h2>
          <div className={styles.linksContainer}>
            {['jpg', 'png', 'gif', 'bmp', 'tiff', 'webp', 'svg', 'heif', 'ico', 'raw', 'avif'].map(format => (
              <Link
                key={format}
                href={`/convert-to-${format}`}  // Use href instead of to
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
