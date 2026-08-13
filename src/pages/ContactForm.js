import React, { useEffect } from 'react';
import './ContactForm.css';

const HubspotFormInit = ({ portalId, formId, region }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js.hsforms.net/forms/v2.js';
    script.async = true;
    script.defer = true;

    script.onload = () => {
      if (window.hbspt) {
        window.hbspt.forms.create({
          region: region,
          portalId: portalId,
          formId: formId,
          target: "#hubspot-contact-form-container"
        });
      }
    };

    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [portalId, formId, region]);

  return <div id="hubspot-contact-form-container"></div>;
};

const ContactForm = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="unique-contact-wrapper">
      <div className="glass-container">
        {/* Left Section: Visual/Info */}
        <div className="contact-info-panel">
          <h3>Connect with Aaryans Group</h3>
          <p>Join us in driving innovation and building success across global industries.</p>
          
          <div className="info-item">
            <span>📍</span> 
            <div>
              <strong>Head Office</strong><br/>
              Bavdhan, Pune, Maharashtra, India
            </div>
          </div>
          
          <div className="info-item">
            <span>✉️</span> 
            <div>
              <strong>Email Us</strong><br/>
              contact@aaryansgroup.org
            </div>
          </div>
        </div>

        {/* Right Section: HubSpot Form */}
        <div className="contact-form-panel">
          <h2 className="panel-title">Global Inquiry</h2>
          <div className="form-scroll-area">
             <HubspotFormInit 
                region="na2" 
                portalId="246152593" 
                formId="f4be5507-cf44-48d4-9604-420cda054a29" 
             />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;