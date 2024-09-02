import React from 'react';
import '../CSS/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <h2>MORENT</h2>
          <p>Our vision is to provide convenience and help increase your sales business.</p>
        </div>
        <div className="footer-links">
          <div className="footer-column">
            <h4>About</h4>
            <ul>
              <li>How it works</li>
              <li>Featured</li>
              <li>Partnership</li>
              <li>Business Relation</li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Community</h4>
            <ul>
              <li>Events</li>
              <li>Blog</li>
              <li>Podcast</li>
              <li>Invite a friend</li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Socials</h4>
            <ul>
              <li>Discord</li>
              <li>Instagram</li>
              <li>Twitter</li>
              <li>Facebook</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>©2022 MORENT. All rights reserved</span>
        <div className="footer-bottom-links">
          <span>Privacy & Policy</span>
          <span>Terms & Condition</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
