import { Home } from '@mui/icons-material';
import React from 'react'
import { Link, NavLink } from 'react-router-dom'

function Header({scrollToBookNow}) {

    const handleLogOut = () => {
        sessionStorage.setItem("isLoggedIn", false);
        window.location.href = "/auth";
      };
    
  return (
    <div>
          <div className="navbar">
        <div className="logo"><span>N</span>avkar</div>
        <ul className="nav-links">
          <li><NavLink  to="/">Home</NavLink></li>
          <li><Link to="/bookings">My Bookings</Link></li>
          <li><Link to="/about">AboutUs</Link></li>
  
          <li><Link to="/search" className="btn-book-now" onClick={scrollToBookNow}>Search Bus</Link></li>
          <li><Link to="/searchBus" className="hero-button" onClick={handleLogOut}>Log Out</Link></li>
        </ul>
      </div>      
    </div>
  )
}

export default Header
