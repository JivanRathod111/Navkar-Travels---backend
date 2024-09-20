import { useRef, useState } from "react";
import "./App.css";
import Footer from "./components/Footer";
import Home from "./components/Home";
import SearchBus from "./SearchBus";
import MyBookings from "./MyBookings";
import Header from "./components/Header";
import SignUp from "./SignUp";
import Login from "./Login";
import About from "./About";
import Offers from "./components/Offers";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

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
      {isSignUp ? (
        <SignUp setIsSignUp={setIsSignUp} />
      ) : !hasAccess ? (
        <Login setHasAccess={setHasAccess} setIsSignUp={setIsSignUp} />
      ) : (
        <BrowserRouter>
          <Header />

          <Routes>
            {/* Default route to Home */}
            <Route path="/" element={<Navigate to="/home" />} />

            {/* Define Home route */}
            <Route path="/home" element={<Home scrollToBookNow={scrollToBookNow} />} />

            <Route path="/about" element={<About />} />
            <Route path="/bookings" element={<MyBookings />} />
            <Route path="/search" element={<SearchBus />} />
            <Route path="/offer" element={<Offers />} />
            {/* Add more routes as needed */}
          </Routes>

          <Footer />

          <div ref={bookNowRef}>
            {/* Additional components or content can be placed here */}
          </div>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
