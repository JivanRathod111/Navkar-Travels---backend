import { useRef, useState } from "react";
import "./App.css";
import Footer from "./components/Footer";
import Home from "./components/Home";
import SearchBus from "./SearchBus";
import MyBookings from "./MyBookings";
import Header from "./components/Header";
import Auth from "./Auth";
import SignUp from "./SignUp";
import Login from "./Login";
import AdminPanel from "./AdminPanel/AdminPanel";
import AdminHeader from "./AdminPanel/AdminHeader";
import Bookings from "./AdminPanel/Bookings";
import Trips from "./AdminPanel/Trips";
import Seats from "./AdminPanel/Seats";
import BusPanel from "./AdminPanel/BusPanel";
import About from "./About";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Offers from "./components/Offers";

function App() {
  const bookNowRef = useRef(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const [hasAccess, setHasAccess] = useState(
    JSON.parse(sessionStorage.getItem("isLoggedIn"))
  );

  const scrollToBookNow = () => {
    bookNowRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      {/* <AdminPanel/> */} 
 
      {/* <BusPanel/> */}
  
      {isSignUp ? (
        <SignUp setIsSignUp={setIsSignUp} />
      ) : !hasAccess ? (
        <Login setHasAccess={setHasAccess} setIsSignUp={setIsSignUp} />
      ) : (
        <>
         <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/home" element={<Home scrollToBookNow={scrollToBookNow} />} />
        <Route path="/about" element={<About/>} />
        <Route path="/bookings" element={<MyBookings />} />
        {/* <Route path="/search" element={<SearchBus />} /> */}
      </Routes>
    </BrowserRouter>

          {/* <Home
            scrollToBookNow={scrollToBookNow}
            isLoggedIn={hasAccess}
            setHasAccess={setHasAccess}
          /> */}
          <div ref={bookNowRef}>
            {/* <SearchBus /> */}
            <Offers />
          </div>
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
