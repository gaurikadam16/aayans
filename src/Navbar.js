import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeStatus, setActiveStatus] = useState(null); // Tracks 'completed' or 'ongoing'
  const [activeCategory, setActiveCategory] = useState(null); // Tracks expanded sub-category
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
    setActiveDropdown(null);
    setActiveStatus(null);
    setActiveCategory(null);
    window.scrollTo(0, 0);
  };

  const toggleDropdown = (name) => {
    if (window.innerWidth <= 1100) {
      setActiveDropdown(activeDropdown === name ? null : name);
    }
  };

  const toggleStatus = (status) => {
    setActiveStatus(activeStatus === status ? null : status);
    setActiveCategory(null); // Reset sub-category expansion on status change
  };

  // Structured Data split strictly by Status (Completed / Ongoing) -> Category -> Projects
  const projectData = {
    completed: {
      "CORE INDUSTRIES": {
        agriculture: ["Hydroponic Farming", "Organic Farming", "Seeds & Fertilisers"],
        manufacturing: ["Automobiles & EV", "Cell Phone", "Steel & Metal", "Ready-Made Garments"],
        industry: ["Chemical Industries", "Petroleum Industry"],
        mining: ["Heavy Metal", "Precious Elements"],
        power: ["Biofuel Generation", "CNG Generation", "Biogas Generation", "Solar Energy"]
      },
      "DEVELOPMENT": {
        infrastructure: ["Real Estate"],
        tourism: ["Amusement Park And Water Park", "Local Tourism", "Museums"],
        education: ["Education Sector (Practical Knowledge-Based)", "Sport University"],
        healthcare: ["Health Services Multi-Speciality Hospital"]
      },
      "MEDIA & TECH": {
        services: ["Food And Beverage", "Hospitality", "Import And Export Services", "Marketing And Advertising Services"],
        media: ["Aatharv Events", "Agc Sports", "News Uncut (Marathi News Channel)", "Praja Jagruti (Marathi Newspaper)"],
        publications: ["Masters Stroke (Business Magazine)", "Swaroop Creation (Book Publishing And Printing House)"],
        tech: ["Artificial Intelligence", "Financial Services", "Information Technology Services And Business", "Robotics"]
      }
    },
    ongoing: {
      "CORE INDUSTRIES": {
        agriculture: ["Sugar Production", "Jaggery Production"],
        manufacturing: ["Drone Mfg", "Solar Panels", "Space Vehicles", "Solar Cell", "Electrolyzers For Hydrogen Fuel"],
        industry: ["Battery Mfg", "Power Storage"],
        mining: ["Crypto Mining", "Refinery"],
        power: ["Biomass Generation", "Hydrogen Fuel (Green Hydrogen)", "Thermal Solar Power", "Waste Management For Power Generation"]
      },
      "DEVELOPMENT": {
        infrastructure: ["Hydrogen Systems", "Infrastructure Dept"],
        tourism: ["Science Park", "Space Tourism", "Underwater Tourism", "Tourism Industry And Services"],
        education: ["Aviation Education And Administration University", "Broadcasting Engineering Education", "Robotics Education"],
        healthcare: ["Medicine Industry", "Specialist Cancer Hospital"]
      },
      "MEDIA & TECH": {
        services: ["Aadya Sanrachna (Business Analysis)", "Air Cab Services", "Aviation Sector", "Cruise Shipping And Program Business", "Hovercraft Services", "Shipping Business", "Sea And River Aviation"],
        media: ["Sumukh Production ( Marathi Film Production House)", "Vishwavinayak Production (Film Production House)", "OTT Apps: “Idiot box” And “Saltpix”", "Sumukh Chitra (Theatre Company)", "Swarang Infotainment Channel"],
        publications: ["Chitran Magazine (Education In Arts And Drawing)", "Onecut (Entertainment Magazine)"],
        tech: ["Aeronautical And Astronautical Engineering", "Organic Semiconductor", "Integrated Device Manufacturer", "Indian Search Engine", "Optical Semiconductor Manufacturing", "Shunya Awkasa - Space Debris Management", "Semiconductor Fab", "Space Services", "Wave Energy Generation"]
      }
    }
  };

  const createSlug = (text) => {
    return text.toLowerCase()
      .replace(/&/g, '')
      .replace(/\s+/g, '-')
      .replace(/[()]/g, '')
      .replace(/[:“”'"]/g, '') 
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const renderStatusProjects = (statusType) => {
    if (activeStatus !== statusType) return null;

    const currentData = projectData[statusType];

    return (
      <div className="status-expanded-content" onClick={(e) => e.stopPropagation()}>
        <div className="mega-grid">
          {Object.keys(currentData).map((colTitle) => (
            <div key={colTitle} className="mega-col">
              <h4 className="col-main-heading">{colTitle}</h4>
              {Object.keys(currentData[colTitle]).map((catKey) => (
                <div key={catKey} className="item-group">
                  <div 
                    className={`item-label ${activeCategory === `${statusType}-${catKey}` ? 'active-label' : ''}`}
                    onClick={() => {
                      const id = `${statusType}-${catKey}`;
                      setActiveCategory(activeCategory === id ? null : id);
                    }}
                  >
                    {catKey === "power" ? "POWER GENERATION" : catKey.toUpperCase()}{' '}
                    <span className="arrow-small">
                      {activeCategory === `${statusType}-${catKey}` ? '▲' : '▼'}
                    </span>
                  </div>

                  {activeCategory === `${statusType}-${catKey}` && (
                    <div className="sub-menu-list">
                      {currentData[colTitle][catKey].map((item, i) => (
                        <Link key={i} to={`/project/${createSlug(item)}`} onClick={closeMenu}>
                          {item}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className={`nav-overlay ${menuOpen ? 'show' : ''}`} onClick={closeMenu}></div>
      <nav className={`nav-container ${scrolled ? 'nav-scrolled' : 'nav-initial'}`}>
        <div className="nav-wrapper">
          <Link to="/" className="nav-logo" onClick={closeMenu}>
            <img src="aayans/public/images/Aaryans_logo_new_01.png" alt="Aaryans Group" />
          </Link>
          
          <div className={`menu-toggle ${menuOpen ? 'is-active' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
            <span className="bar"></span><span className="bar"></span><span className="bar"></span>
          </div>

          <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
            <Link to="/" className="nav-link-item" onClick={closeMenu}>HOME</Link>
            
            {/* OUR PROJECT DROPDOWN */}
            <div className="dropdown-wrapper" 
                 onMouseEnter={() => window.innerWidth > 1100 && setActiveDropdown('project')}
                 onMouseLeave={() => window.innerWidth > 1100 && (setActiveDropdown(null), setActiveStatus(null), setActiveCategory(null))}
                 onClick={() => toggleDropdown('project')}>
              <span className="nav-link-item">OUR PROJECT <small className="drop-icon">▼</small></span>
              
              {activeDropdown === 'project' && (
                <div className="project-simple-dropdown" onClick={(e) => e.stopPropagation()}>
                  
                  {/* COMPLETED PROJECTS ACCORDION */}
                  <div className="status-accordion-item">
                    <div 
                      className={`status-header ${activeStatus === 'completed' ? 'active' : ''}`}
                      onClick={() => toggleStatus('completed')}
                    >
                      <span>COMPLETED PROJECTS</span>
                      <small className="arrow-small">{activeStatus === 'completed' ? '▲' : '▼'}</small>
                    </div>
                    {renderStatusProjects('completed')}
                  </div>

                  {/* ONGOING PROJECTS ACCORDION */}
                  <div className="status-accordion-item">
                    <div 
                      className={`status-header ${activeStatus === 'ongoing' ? 'active' : ''}`}
                      onClick={() => toggleStatus('ongoing')}
                    >
                      <span>ONGOING PROJECTS</span>
                      <small className="arrow-small">{activeStatus === 'ongoing' ? '▲' : '▼'}</small>
                    </div>
                    {renderStatusProjects('ongoing')}
                  </div>

                </div>
              )}
            </div>
            
            <Link to="/career" className="nav-link-item" onClick={closeMenu}>CAREER</Link>
            <Link to="/gallery" className="nav-link-item" onClick={closeMenu}>GALLERY</Link>
            
            <div className="dropdown-wrapper"
                 onMouseEnter={() => window.innerWidth > 1100 && setActiveDropdown('about')}
                 onMouseLeave={() => window.innerWidth > 1100 && setActiveDropdown(null)}
                 onClick={() => toggleDropdown('about')}>
              <span className="nav-link-item">ABOUT US <small className="drop-icon">▼</small></span>
              
              {activeDropdown === 'about' && (
                <div className="standard-dropdown" onClick={(e) => e.stopPropagation()}>
                  <Link to="/about" onClick={closeMenu}>About Us</Link>
                  <Link to="/our-team" onClick={closeMenu}>Our Team</Link>
                  <Link to="/chairman-desk" onClick={closeMenu}>Chairman Desk</Link>
                  <Link to="/md-desk" onClick={closeMenu}>Managing Director (MD) Desk</Link>
                  <Link to="/ceo-desk" onClick={closeMenu}>CEO Desk</Link>
                </div>
              )}
            </div>
            
            <Link to="/contact" className="nav-cta-btn" onClick={closeMenu}>GLOBAL INQUIRY</Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
