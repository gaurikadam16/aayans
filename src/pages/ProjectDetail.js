import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { sectorData } from '../data/projectData';
import './ProjectDetail.css';

// Import Icons
import { FaInstagram, FaYoutube, FaGoogle } from 'react-icons/fa';

const ProjectDetail = () => {
  const { projectId } = useParams();
  const [data, setData] = useState(null);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  
  // State for the protected blob URL
  const [protectedVideoUrl, setProtectedVideoUrl] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Track the URL locally to avoid ESLint dependency warnings in cleanup
    let currentBlobUrl = "";

    if (sectorData && sectorData[projectId]) {
      const currentSector = sectorData[projectId];
      setData(currentSector);
      setIsPlaying(false);
      setShowPopup(false);
      setCurrentPage(0);

      // --- VIDEO PROTECTION LOGIC ---
      // Fetches video as blob to hide the real server path (/assets/videos/...)
      if (currentSector.video) {
        fetch(process.env.PUBLIC_URL + currentSector.video)
          .then(response => response.blob())
          .then(blob => {
            currentBlobUrl = URL.createObjectURL(blob);
            setProtectedVideoUrl(currentBlobUrl);
          })
          .catch(err => console.error("Video protection fetch failed:", err));
      }
    } else {
      setData(null);
    }

    // Cleanup: revoke the URL to free up memory
    return () => {
      if (currentBlobUrl) {
        URL.revokeObjectURL(currentBlobUrl);
      }
    };
  }, [projectId]);

  useEffect(() => {
    document.body.style.overflow = showPopup ? 'hidden' : 'unset';
  }, [showPopup]);

  const handleNext = (e) => { 
    e.stopPropagation(); 
    if (currentPage < (data?.pages?.length - 1)) setCurrentPage(prev => prev + 1); 
  };

  const handlePrev = (e) => { 
    e.stopPropagation(); 
    if (currentPage > 0) setCurrentPage(prev => prev - 1); 
  };

  const handleTogglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.muted = false;
        videoRef.current.play().catch(err => console.error("Video play error:", err));
        setIsPlaying(true);
      }
    }
  };

  if (!data) return <div className="pd-v4-notfound"><h1>COMING SOON</h1></div>;

  return (
    <div className="pd-v4-wrapper">
      {/* 1. Hero Section */}
      <section className="pd-v4-hero" style={{ backgroundImage: `url(${process.env.PUBLIC_URL + data.image})` }}>
        <div className="pd-v4-overlay"></div>
        <div className="pd-v4-hero-content">
          <span className="pd-v4-tag">{data.tag}</span>
          <h1 className="pd-v4-title">{data.title}</h1>
          <div className="pd-v4-subtitle-row">
            <div className="pd-v4-line"></div>
            <h2>{data.subtitle}</h2>
            <div className="pd-v4-line"></div>
          </div>
        </div>
      </section>

      {/* 2. Intro Section */}
      {data.introText && (
        <section className="pd-v5-intro-wrap">
          <div className="pd-v5-container">
            <div className="pd-v5-intro-grid">
              <div className="pd-v5-intro-text-side">
                <h2 className="pd-v5-intro-heading">{data.introTitle}</h2>
                <div className={`pd-v5-intro-desc ${data.introText.length > 800 ? 'is-long' : ''}`}>
                  {data.introText}
                </div>
              </div>
              <div className="pd-v5-intro-image-side">
                <div className="pd-v5-intro-img-box">
                  <img 
                    src={process.env.PUBLIC_URL + data.introImage} 
                    alt={data.introTitle || "Sector Image"} 
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. Innovation/Video Section with Invisible Overlay Protection */}
      <section className={`pd-v5-innovation ${isPlaying ? 'cinema-mode' : ''}`}>
        <div className="pd-v5-container">
          <div className="pd-v5-grid">
            <div className="pd-v5-video-wrapper">
              <div 
                className={`pd-v5-card ${isPlaying ? 'active-glow' : ''}`} 
                style={{ position: 'relative', overflow: 'hidden', cursor: 'pointer' }}
                onClick={handleTogglePlay}
              >
                {/* THE ACTUAL VIDEO */}
                <video 
                  ref={videoRef} 
                  key={protectedVideoUrl}
                  loop 
                  playsInline 
                  className="pd-v5-video" 
                  muted
                  controlsList="nodownload noRemotePlayback"
                  disablePictureInPicture
                >
                  {protectedVideoUrl && <source src={protectedVideoUrl} type="video/mp4" />}
                </video>

                {/* THE PROTECTIVE OVERLAY: Blocks "Save Video" but allows "Inspect" */}
                <div 
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 10,
                    background: 'transparent'
                  }}
                ></div>

                {!isPlaying && (
                  <div className="pd-v5-play-overlay" style={{ zIndex: 11 }}>
                    <div className="pd-v5-pulse-circle">▶</div>
                    <p className="pd-v5-play-text">WATCH VIDEO</p>
                  </div>
                )}
              </div>
            </div>
            <div className="pd-v5-text-box">
              <h2 className="pd-v5-title">{data.title} <br/><span className="red-accent">Solutions</span></h2>
              <div className="pd-v5-divider"></div>
              <p className="pd-v5-description">{data.description}</p>
              <button className="pd-v5-btn" onClick={() => setShowPopup(true)}>READ MORE →</button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Social Buttons Section */}
      {data.socialLinks && (
        <section className="pd-v5-social-section">
          <div className="pd-v5-container">
             <div className="pd-v5-social-content">
                <h3 className="pd-v5-social-text">To stay excited and updated about sports, <br/> check the social buttons below.</h3>
                <div className="pd-v5-social-icons">
                  {data.socialLinks.map((link, i) => (
                    <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="pd-v5-social-link">
                      {link.platform === 'instagram' && <FaInstagram />}
                      {link.platform === 'youtube' && <FaYoutube />}
                      {link.platform === 'google' && <FaGoogle />}
                    </a>
                  ))}
                </div>
             </div>
          </div>
        </section>
      )}

      {/* 5. Why Different Section */}
      {data.differentText && (
        <section className="pd-v5-different-section">
          <div className="pd-v5-container">
            <div className="pd-v5-different-content">
              <h2 className="pd-v5-different-title">{data.differentTitle || "Why we are different?"}</h2>
              <div className="pd-v5-different-text-box">
                {data.differentText.map((para, idx) => (
                  <p key={idx} className="pd-v5-different-p">{para}</p>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 6. Future Prospects */}
      {data.futureProspects && (
        <section className="pd-v5-future-prospects">
          <h3 className="pd-v5-future-main-title">{data.futureTitle}</h3>
          {data.futureProspects.map((item, index) => (
            <div key={index} className={`pd-v5-future-row ${index % 2 !== 0 ? 'reverse' : ''}`}>
              <div className="pd-v5-future-text-block">
                <p>{item.text}</p>
              </div>
              <div className="pd-v5-future-image-block">
                <img src={process.env.PUBLIC_URL + item.image} alt="Future" />
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Popup Modal */}
      {showPopup && (
        <div className="doc-popup-overlay" onClick={() => setShowPopup(false)}>
          <div className="doc-modal" onClick={(e) => e.stopPropagation()}>
            <div className="doc-header">
              <h2>Full Description</h2>
              <button className="doc-close" onClick={() => setShowPopup(false)}>&times;</button>
            </div>
            <div className="doc-body">
              <div className="doc-page">
                {data.pages && <img src={process.env.PUBLIC_URL + data.pages[currentPage]} alt="doc" className="doc-img-fade" />}
              </div>
            </div>
            <div className="doc-footer">
              <div className="doc-nav-bar">
                <button onClick={handlePrev} disabled={currentPage === 0} className="doc-nav-btn">— Previous</button>
                <span className="doc-page-indicator"><span>{currentPage + 1}</span> / {data.pages?.length}</span>
                <button onClick={handleNext} disabled={currentPage === (data.pages?.length - 1)} className="doc-nav-btn">Next —</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;