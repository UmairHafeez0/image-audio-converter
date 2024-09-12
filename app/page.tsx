import Link from 'next/link';
import { FC } from 'react';
import styles from './css/HomePage.module.css';


const FeatureCard: FC<{ title: string; description: string; link: string; }> = ({ title, description, link }) => (
  <div className="col-md-4 mb-4">
    <div className={`${styles.featureCard} card h-100 shadow-lg border-light`}>
      <div className="card-body text-center">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <Link href={link} className="btn btn-primary">Try Now</Link>
      </div>
    </div>
  </div>
);

export default function HomePage() {
  return (
    <>
      <header className={`${styles.header} text-center`}>
        <div className="container">
          <h1 className="display-4">UltimateFileConverter</h1>
          <p className="lead">Your All-in-One File Conversion and Download Tool</p>
          <p>Convert and download files in various formats with ease!</p>
          <Link href="#features" className="btn btn-light btn-lg">Discover Our Features</Link>
        </div>
      </header>

      <section id="features" className={`${styles.section} py-5`}>
        <div className="container">
          <h2 className={`${styles.display5} text-center mb-4`}>Our Key Features</h2>
          <div className="row">
            <FeatureCard
              title="Image Format Conversion"
              description="Convert images to formats like JPG, PNG, GIF, and more."
              link="/tools/image-converter"
            />
            <FeatureCard
              title="Video Format Conversion"
              description="Convert videos between formats like MP4, AVI, MOV, and others."
              link="/tools/video-converter"
            />
            <FeatureCard
              title="MP3 Format Conversion"
              description="Convert audio files to MP3 and other formats."
              link="/tools/mp3-converter"
            />
          </div>
          <div className="row mt-4">
            <FeatureCard
              title="PDF to DOCX Converter"
              description="Easily convert your PDFs to editable DOCX files."
              link="/tools/pdf-to-docx"
            />
            <FeatureCard
              title="YouTube Video Downloader"
              description="Download YouTube videos in your preferred format."
              link="/tools/youtube-downloader"
            />
            <FeatureCard
              title="TikTok Video Downloader"
              description="Download TikTok videos directly to your device."
              link="/tools/tiktok-downloader"
            />
          </div>
        </div>
      </section>
    </>
  );
}