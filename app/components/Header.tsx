import Link from 'next/link';
import Image from 'next/image';
import logo from '../image.png'; 

const Header = () => (
  <header className="bg-dark text-white py-3">
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container d-flex justify-content-between align-items-center">
        <Link href="/" className="navbar-brand d-flex align-items-center">
          <Image src={logo} alt="UltimateFileConverter Logo" width={40} height={40} />
          <span className="ms-2 logo-text">UltimateFileConverter</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {/* Dropdown for Tools */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="toolsDropdown"
                role="button"
                aria-expanded="false"
              >
                Tools
              </a>
              <ul className="dropdown-menu dropdown-scrollable" aria-labelledby="toolsDropdown">
                {/* Media Conversion Tools */}
                <li><h6 className="dropdown-header">Media Conversion Tools</h6></li>
                <li><Link href="/tools/image-converter" className="dropdown-item">Image Format Converter</Link></li>
                <li><Link href="/tools/video-converter" className="dropdown-item">Video Format Converter</Link></li>
                <li><Link href="/tools/audio-converter" className="dropdown-item">Audio Format Converter</Link></li>
                <li><Link href="/tools/file-converter" className="dropdown-item">File Format Converter</Link></li>
                <li><Link href="/tools/pdf-to-docx" className="dropdown-item">PDF to DOCX Converter</Link></li>

                <li><hr className="dropdown-divider" /></li>

                {/* Media Downloading Tools */}
                <li><h6 className="dropdown-header">Media Downloading Tools</h6></li>
                <li><Link href="/tools/youtube-downloader" className="dropdown-item">YouTube Video Downloader</Link></li>
                <li><Link href="/tools/facebook-downloader" className="dropdown-item">Facebook Video Downloader</Link></li>
                <li><Link href="/tools/tiktok-downloader" className="dropdown-item">TikTok Video Downloader</Link></li>

                <li><hr className="dropdown-divider" /></li>

                {/* Compression and Editing Tools */}
                <li><h6 className="dropdown-header">Compression and Editing Tools</h6></li>
                <li><Link href="/tools/image-compression" className="dropdown-item">Image Compression</Link></li>
                <li><Link href="/tools/video-compression" className="dropdown-item">Video Compression</Link></li>
                <li><Link href="/tools/pdf-compression" className="dropdown-item">PDF Compression</Link></li>
                <li><Link href="/tools/gif-creation" className="dropdown-item">GIF Creation</Link></li>
                <li><Link href="/tools/audio-cutter" className="dropdown-item">Audio Cutter</Link></li>
                <li><Link href="/tools/video-cutter" className="dropdown-item">Video Cutter</Link></li>
                <li><Link href="/tools/pdf-merge" className="dropdown-item">PDF Merge</Link></li>
                <li><Link href="/tools/pdf-split" className="dropdown-item">PDF Split</Link></li>

                <li><hr className="dropdown-divider" /></li>

                {/* Document Tools */}
                <li><h6 className="dropdown-header">Document Tools</h6></li>
                <li><Link href="/tools/word-to-pdf" className="dropdown-item">Word to PDF</Link></li>

                <li><hr className="dropdown-divider" /></li>

                {/* Utility Tools */}
                <li><h6 className="dropdown-header">Utility Tools</h6></li>
                <li><Link href="/tools/text-to-speech" className="dropdown-item">Text to Speech</Link></li>
                <li><Link href="/tools/speech-to-text" className="dropdown-item">Speech to Text</Link></li>
                <li><Link href="/tools/qr-code-generator" className="dropdown-item">QR Code Generator</Link></li>
                <li><Link href="/tools/barcode-generator" className="dropdown-item">Barcode Generator</Link></li>
                <li><Link href="/tools/url-shortener" className="dropdown-item">URL Shortener</Link></li>
                <li><Link href="/tools/unit-conversion" className="dropdown-item">Unit Conversion</Link></li>
              </ul>
            </li>

            {/* Other Navigation Links */}
            <li className="nav-item">
              <Link href="/pricing" className="nav-link">Pricing</Link>
            </li>
            <li className="nav-item">
              <Link href="/contact" className="nav-link">Contact</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
);

export default Header;
