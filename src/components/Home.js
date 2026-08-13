import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';

// LOCAL VIDEO IMPORTS - Ensure these exist in src/assets/videos/
import videoOne from './assets/videos/hero-video-1.mp4';
import videoTwo from './assets/videos/hero-video-2.mp4';
import videoThree from './assets/videos/hero-video-3.mp4';

import 'swiper/css';
import 'swiper/css/effect-fade';
import './Home.css';

const Home = () => {
  const heroVideos = [videoOne, videoTwo, videoThree];

  const sectors = [
    { name: "Aerospace & Defense", img: "https://images.unsplash.com/photo-1517976487492-5750f3195933?q=80&w=2070" },
    { name: "Sustainable Energy", img: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=1000" },
    { name: "Global Infrastructure", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070" }
  ];

  return (
    <main className="home-wrapper">
      {/* SECTION 1: FULL-SCREEN HERO VIDEO SLIDER */}
      <section className="hero-section">
        <div className="hero-video-container">
          <Swiper
            modules={[Autoplay, EffectFade]}
            effect="fade"
            speed={2500}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            loop={true}
            allowTouchMove={false}
            className="hero-video-swiper"
          >
            {heroVideos.map((vidSource, index) => (
              <SwiperSlide key={index}>
                <div className="video-slide">
                  <video autoPlay muted loop playsInline className="background-video">
                    <source src={vidSource} type="video/mp4" />
                  </video>
                  <div className="video-overlay"></div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="hero-text">
          <span className="overline">Aaryans Group of Companies</span>
          <h1 className="hero-title">
            Forging <span className="highlight-blue">strength</span> and adding significant value to the <span className="highlight-blue">economy.</span>
          </h1>
          <p className="hero-subtext">Integrating technology and tradition to scale global industries through strategic excellence.</p>
        </div>
      </section>

      {/* SECTION 2: STATS */}
      <section className="stats-section">
        <p className="stats-intro">"Engineering future foundations through diversified global operations."</p>
        <div className="stats-grid">
          <div className="stat-item">
            <h2>12+</h2>
            <div className="stat-line"></div>
            <p>Years of Legacy</p>
          </div>
          <div className="stat-item">
            <h2>150+</h2>
            <div className="stat-line"></div>
            <p>Global Projects</p>
          </div>
          <div className="stat-item">
            <h2>3.5K</h2>
            <div className="stat-line"></div>
            <p>Skilled Talent</p>
          </div>
        </div>
      </section>

      {/* SECTION 3: SECTORS */}
      <section className="industry-section">
        <div className="industry-header">
          <h2>Core Strategic Sectors</h2>
        </div>
        <Swiper 
          modules={[Autoplay]} 
          spaceBetween={30} 
          slidesPerView={1} 
          autoplay={{delay:4000}} 
          breakpoints={{1024:{slidesPerView:3}}}
        >
          {sectors.map((s, i) => (
            <SwiperSlide key={i}>
              <div className="industry-card">
                <img src={s.img} alt={s.name} />
                <div className="industry-overlay">
                  <h3>{s.name}</h3>
                  <Link to="/portfolio" className="sector-link">
                    Explore Division →
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </main>
  );
};

export default Home;