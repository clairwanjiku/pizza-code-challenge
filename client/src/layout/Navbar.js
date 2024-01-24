
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.jpeg';

const Navbar = ({ onGoHome, message }) => {
  return (
    <div className="navbar" style={{ padding: '5px 10px', backgroundColor: '#Dc3545' }}>
      <nav className="navbar navbar-info">
        <div className="container">
          <button className="navbar-brand" onClick={onGoHome}>
            <img src={logo} alt="Logo" className="logo" style={{ width: '50px', height: 'auto' }} />
          </button>
        </div>
      </nav>
      <Link to="/" style={{ fontSize: '20px', marginRight: '10px' }}>Home</Link>
      <li><Link to="/restaurant">Restaurant Pizza Form</Link></li>
      <Link to="/about" style={{ fontSize: '20px', marginRight: '10px' }}>About</Link>
      <Link to="/contact" style={{ fontSize: '20px' }}>Contact</Link>
      
      {message && <div className="message" style={{ fontSize: '14px' }}>{message}</div>}
    </div>
  );
};

export default Navbar;
