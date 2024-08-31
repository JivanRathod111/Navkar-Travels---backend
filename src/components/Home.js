import React from 'react';
import Header from './Header';
import { BrowserRouter , Route,Routes} from "react-router-dom";
import MyBookings from '../MyBookings';
import SearchBus from '../SearchBus';
import About from '../About';


function Home({scrollToBookNow}) {
  return (
    <div>
  <div className="hero-container">
      <video className="hero-video" autoPlay loop muted>
        <source src="video/bg-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* <div className="navbar">
        <div className="logo"><span>N</span>avkar</div>
        <ul className="nav-links">
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/contact">My Bookings</Link></li>
          <li><Link to="/about">AboutUs</Link></li>
          <li><Link to="/about">Help</Link></li>
          <li><Link to="/booknow" className="btn-book-now" onClick={scrollToBookNow}>Book Now</Link></li>
        </ul>
      </div> */}
     
   
      <div className="hero-content">
        <h1>Journey Begins With Simple Booking</h1>
        <p>Start your journey with us today.</p>
        <button className="hero-button" onClick={scrollToBookNow}>Book Now</button>
      </div>
    </div>

    </div>
  )
}

export default Home;
