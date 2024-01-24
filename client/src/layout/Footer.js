// Footer.js

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer>
      <p>&copy; FOR ENQUIRIES PLEASE CONTACT US</p>
      <div className="social-icons">
        <FontAwesomeIcon icon={faFacebook} className="icon" />
        <FontAwesomeIcon icon={faInstagram} className="icon" />
        <FontAwesomeIcon icon={faTwitter} className="icon" />
      </div>
    </footer>
  );
};

export default Footer;

