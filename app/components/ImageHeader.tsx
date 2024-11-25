import React, { useState, useRef, useEffect } from "react";
import styles from "../styles/ImageConverterHeader.module.css";

const ImageConverter = () => {
  const [conversionType, setConversionType] = useState<
    "audio" | "video" | "image"
  >("image");
  const [fromFormat, setFromFormat] = useState<string | null>(null);
  const [toFormat, setToFormat] = useState<string | null>(null);
  const [selectedFromFormat, setSelectedFromFormat] = useState<string | null>(
    null
  );
  const [selectedToFormat, setSelectedToFormat] = useState<string | null>(null);

  const [dropdownOpenFrom, setDropdownOpenFrom] = useState<boolean>(false);
  const [dropdownOpenTo, setDropdownOpenTo] = useState<boolean>(false);
  const [subDropdownOpenFrom, setSubDropdownOpenFrom] = useState<string | null>(
    null
  );
  const [subDropdownOpenTo, setSubDropdownOpenTo] = useState<string | null>(
    null
  );

  const dropdownRefFrom = useRef<HTMLDivElement>(null);
  const dropdownRefTo = useRef<HTMLDivElement>(null);
  const subDropdownRefFrom = useRef<HTMLDivElement>(null);
  const subDropdownRefTo = useRef<HTMLDivElement>(null);

  const formats = {
    audio: ["mp3", "wav", "aac", "flac", "ogg"],
    video: ["mp4", "avi", "mov", "mkv", "webm"],
    image: [
      "jpg",
      "png",
      "gif",
      "bmp",
      "tiff",
      "webp",
      "svg",
      "heif",
      "ico",
      "raw",
      "avif",
    ],
  };

  const descriptions = {
    audio:
      "Convert any audio formats like MP3, WAV, AAC, FLAC, and more into other formats easily.",
    video:
      "Convert all popular video formats such as MP4, AVI, MOV, MKV, and others with ease.",
    image:
      "You can convert various image formats like JPG, PNG, GIF, and many more into different formats.",
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRefFrom.current &&
        !dropdownRefFrom.current.contains(event.target as Node)
      ) {
        setDropdownOpenFrom(false);
        setSubDropdownOpenFrom(null);
      }
      if (
        dropdownRefTo.current &&
        !dropdownRefTo.current.contains(event.target as Node)
      ) {
        setDropdownOpenTo(false);
        setSubDropdownOpenTo(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDropdownToggle = (dropdownType: "from" | "to") => {
    if (dropdownType === "from") {
      setDropdownOpenFrom(!dropdownOpenFrom);
    } else {
      setDropdownOpenTo(!dropdownOpenTo);
    }
  };

  const handleSubDropdownToggle = (
    type: string,
    dropdownType: "from" | "to"
  ) => {
    if (dropdownType === "from") {
      setSubDropdownOpenFrom(type);
    } else {
      setSubDropdownOpenTo(type);
    }
  };

  const adjustPosition = (
    ref: React.RefObject<HTMLDivElement>,
    dropdownClass: string
  ) => {
    const element = ref.current;
    if (element) {
      const rect = element.getBoundingClientRect();
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      if (rect.right > windowWidth) {
        element.classList.add(styles.adjustLeft);
      } else {
        element.classList.remove(styles.adjustLeft);
      }

      if (rect.bottom > windowHeight) {
        element.classList.add(styles.adjustTop);
      } else {
        element.classList.remove(styles.adjustTop);
      }
    }
  };

  useEffect(() => {
    if (dropdownOpenFrom) {
      adjustPosition(dropdownRefFrom, styles.dropdownContent);
    }
    if (dropdownOpenTo) {
      adjustPosition(dropdownRefTo, styles.dropdownContent);
    }
    if (subDropdownOpenFrom) {
      adjustPosition(subDropdownRefFrom, styles.subDropdownContent);
    }
    if (subDropdownOpenTo) {
      adjustPosition(subDropdownRefTo, styles.subDropdownContent);
    }
  }, [
    dropdownOpenFrom,
    dropdownOpenTo,
    subDropdownOpenFrom,
    subDropdownOpenTo,
  ]);

  return (
    <div className={styles.backgroundColorMatch}>
      <div className={styles.contentContainer}>
        <div
          className={`d-flex justify-content-between align-items-center ${styles.header}`}
        >
          <div
            className={`d-flex flex-column align-items-start ${styles.headerContainer}`}
          >
            <h1 className={`imageheader-h1 ${styles.title}`}>
              Convert {fromFormat || conversionType}
            </h1>
            {/* Description Section */}
            <p className={styles.description}>{descriptions[conversionType]}</p>
          </div>

          <div className={styles.conversionOptions}>
            <div className={styles.dropdownMenu}>
              <label className="form-label-convert">From</label>
              <div ref={dropdownRefFrom} className={styles.dropdown}>
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  onClick={() => handleDropdownToggle("from")}
                >
                  {selectedFromFormat || conversionType}
                </button>
                {dropdownOpenFrom && (
                  <div className={styles.dropdownContent}>
                    {Object.keys(formats).map((type) => (
                      <div
                        key={type}
                        className={styles.dropdownItem}
                        onMouseEnter={() =>
                          handleSubDropdownToggle(type, "from")
                        }
                      >
                        {type}
                        {subDropdownOpenFrom === type && (
                          <div
                            ref={subDropdownRefFrom}
                            className={styles.subDropdown}
                          >
                            <div className={styles.subDropdownContent}>
                              {formats[type as "audio" | "video" | "image"].map(
                                (format) => (
                                  <div
                                    key={format}
                                    className={styles.formatBox}
                                    onClick={() => {
                                      setFromFormat(format);
                                      setSelectedFromFormat(format);
                                      setDropdownOpenFrom(false);
                                      setSubDropdownOpenFrom(null);
                                    }}
                                  >
                                    {format.toUpperCase()}
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <label className="form-label-convert">To</label>
              <div ref={dropdownRefTo} className={styles.dropdown}>
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  onClick={() => handleDropdownToggle("to")}
                >
                  {selectedToFormat || conversionType}
                </button>
                {dropdownOpenTo && (
                  <div className={styles.dropdownContent}>
                    {Object.keys(formats).map((type) => (
                      <div
                        key={type}
                        className={styles.dropdownItem}
                        onMouseEnter={() => handleSubDropdownToggle(type, "to")}
                      >
                        {type}
                        {subDropdownOpenTo === type && (
                          <div
                            ref={subDropdownRefTo}
                            className={styles.subDropdown}
                          >
                            <div className={styles.subDropdownContent}>
                              {formats[type as "audio" | "video" | "image"].map(
                                (format) => (
                                  <div
                                    key={format}
                                    className={styles.formatBox}
                                    onClick={() => {
                                      setToFormat(format);
                                      setSelectedToFormat(format);
                                      setDropdownOpenTo(false);
                                      setSubDropdownOpenTo(null);
                                    }}
                                  >
                                    {format.toUpperCase()}
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageConverter;
