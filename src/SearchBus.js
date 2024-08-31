import React, { useState } from "react";
import axios from "axios";
import AvailableBus from "./components/AvailableBuses";
import { Container, Alert, Button } from "react-bootstrap";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import Offers from "./components/Offers";

function SearchBus() {
  const [startPoint, setStartPoint] = useState("");
  const [endPoint, setEndPoint] = useState("");
  const [date, setDate] = useState("2024-08-01"); // Default date in YYYY-MM-DD format
  const [trips, setTrips] = useState([]);
  const [error, setError] = useState("");
  const [showBusDetails, setShowBusDetails] = useState(false);

  const handleSearch = async () => {
    if (!startPoint || !endPoint || !date) {
      setError("Please enter start point, end point, and date.");
      return;
    }

    try {
      const response = await axios.get("http://localhost:8081/bus/search", {
        params: { startPoint, endPoint, date },
        
      });
      setTrips(response.data);
      console.log("trips", trips);
      setError(""); // Clear any previous errors
      setShowBusDetails(true);
    } catch (err) {
      console.error("Error fetching trips:", err);
      setError("An error occurred while fetching the trips.");
    }
  };

  return (
    <div className="background-container">
      <Container className="search-bus-container">
        {!showBusDetails ? (
          <div className="search-bar">
            <h2 className="mb-4">Search Your Journey</h2>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-end",
                flexWrap: "wrap",
                gap: 2,
              }}
            >
              <Box sx={{ flex: 1 }}>
                <TextField
                  id="input-with-icon-adornment-start"
                  label="From"
                  placeholder="Arrival"
                  value={startPoint}
                  onChange={(e) => setStartPoint(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FaMapMarkerAlt />
                      </InputAdornment>
                    ),
                  }}
                  variant="standard"
                  fullWidth
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <TextField
                  id="input-with-icon-adornment-end"
                  label="To"
                  placeholder="Departure"
                  value={endPoint}
                  onChange={(e) => setEndPoint(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FaMapMarkerAlt />
                      </InputAdornment>
                    ),
                  }}
                  variant="standard"
                  fullWidth
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <TextField
                  id="input-with-icon-adornment-date"
                  label="Date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FaCalendarAlt />
                      </InputAdornment>
                    ),
                  }}
                  variant="standard"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Box>
              <Box sx={{ flex: "0 0 auto", alignSelf: "flex-end" }}>
                <Button variant="primary" onClick={handleSearch}>
                  SEARCH BUSES
                </Button>
              </Box>
            </Box>
            {error && (
              <Alert variant="danger" className="mt-3">
                {error}
              </Alert>
            )}
          </div>
        ) : (
          <AvailableBus trips={trips} onBack={() => setShowBusDetails(false)} />
        )}
      </Container>
      <Offers/>
    </div>
  );
}

export default SearchBus;
