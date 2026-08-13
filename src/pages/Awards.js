import React, { useState } from 'react';
import './Awards.css';

const Awards = () => {
  const [filter, setFilter] = useState('All');
  const awardImg = "/images/shine.jpg"; 

  const awardsData = [
    { id: 1, year: '2023', title: "Innovation of the Year", desc: "Setting new benchmarks in sustainable infrastructure.", img: "/images/a1.jpeg" },
    { id: 2, year: '2023', title: "Global Excellence", desc: "Recognized for world-class project management.", img: "/images/a2.webp" },
    { id: 3, year: '2022', title: "Sustainability Award", desc: "Leading the way in eco-friendly construction.", img: "/images/a3.jpeg" },
    { id: 4, year: '2021', title: "Fastest Growing Group", desc: "Achieving 300% growth in emerging markets.", img: "/images/a4.jpg" },
    { id: 5, year: '2019', title: "Legacy Award", desc: "Commemorating a decade of engineering excellence.", img: "/images/aa5.jpg" },
  ];

  const categories = ['All', '2023', '2022', '2021', '2019'];
  const filteredAwards = filter === 'All' ? awardsData : awardsData.filter(item => item.year === filter);

  return (
    <div className="awards-page">
      {/* Hero Section */}
      <section className="awards-hero">
        <h1 className="awards-title">Awards</h1>
      </section>

      {/* Hero Overlap Section */}
      <section className="awards-overlap-section">
        <div className="awards-visual-container">
          <div className="awards-image-box">
            <img src={awardImg} alt="Awards Display" className="main-award-img" />
          </div>
          <div className="awards-quote-card">
            <p>"Coming together is a beginning. Keeping together is progress. Working together is success."</p>
          </div>
        </div>
      </section>

      {/* Achievement Section */}
      <section className="awards-list-container">
        <div className="section-header">
           <span className="gold-text">Our Journey</span>
           <h2 className="awards-subtitle">Our Achievements</h2>
           <div className="accent-line"></div>
        </div>

        {/* Filter Bar */}
        <div className="filter-wrapper">
          <div className="filter-container">
            {categories.map(cat => (
              <button 
                key={cat}
                className={`filter-btn ${filter === cat ? 'active' : ''}`}
                onClick={() => setFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Premium Awards Grid */}
        <div className="awards-gallery-grid">
          {filteredAwards.map((award) => (
            <div key={award.id} className="premium-award-card">
              <div className="card-inner">
                <div className="card-front">
                  <div className="year-tag">{award.year}</div>
                  <div className="card-img-holder">
                    <img src={award.img} alt={award.title} onError={(e) => e.target.src="/images/placeholder.jpg"} />
                    <div className="img-overlay"></div>
                  </div>
                  <div className="card-body">
                    <h3>{award.title}</h3>
                    <p>{award.desc}</p>
                    <div className="card-footer-line"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Awards;