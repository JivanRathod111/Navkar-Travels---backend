// Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/book">Book Tickets</a></li>
            <li><a href="/my-bookings">My Bookings</a></li>
            <li><a href="/offers">Offers</a></li>
            <li><a href="/about">About Us</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Help</h3>
          <ul>
            <li><a href="/offers">Offers</a></li>
            <li><a href="/contact">Customer Support</a></li>
            <li><a href="/terms">Terms & Conditions</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>          
            <li><a href="/terms">FAQs</a></li>
            <li><a href="/privacy">Blog</a></li>
          </ul>
        </div>



        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-media">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </div>

        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Phone: +1 123 456 7890</p>
          <p>Email: support@busbooking.com</p>
          <p>Address: 123 Bus Street, City, Country</p>
        </div>

        <div className="footer-section">
          <h3> Our Partner</h3>
          <p>Goibibo Bus</p>
          <p>Goibibo Hotels</p>
          <p>MakeMyTrip Hotels</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Bus Booking. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
