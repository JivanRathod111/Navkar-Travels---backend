import React, { useState, useEffect } from 'react';
import { Grid, Paper, Box, Button, Typography } from '@mui/material';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import SeatSelectionPanel from './SeatSelectionPanel';
import axios from 'axios';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'left',
  color: theme.palette.text.secondary,
}));

const Header = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(2),
}));

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#ff9800', // Orange color for the button
    },
  },
});

function AvailableBus({ trips = [], onBack }) {
  const [showSeats, setShowSeats] = useState(false);
  const [selectedBusId, setSelectedBusId] = useState(null);
  const [availableTrips, setAvailableTrips] = useState([]);

  const fetchBookedSeats = async (tripId) => {
    try {
      // Fetch the seat data from the API
      const response = await axios.get(`http://localhost:8081/seat/bus/${tripId}`);
      const seatData = response.data; // Assuming this is an array of seat objects
  
      if (Array.isArray(seatData) && seatData.length > 0) {
        // Extract totalSeats from the first seat entry (assuming all seats belong to the same bus)
        const totalSeats = seatData[0].bus.totalSeats;
  
        // Count booked seats
        const bookedSeats = seatData.length; // Each entry represents a booked seat
  
        // Return total and booked seats
        return {
          totalSeats,
          bookedSeats,
          availableSeats: totalSeats - bookedSeats
        };
      } else {
        // Handle the case where no seat data is returned
        return {
          totalSeats: 36, // Default value
          bookedSeats: 0,
          availableSeats: 36
        };
      }
    } catch (error) {
      console.error('Error fetching booked seats:', error);
      return {
        totalSeats: 36, // Default value
        bookedSeats: 0,
        availableSeats: 36
      };
    }
  };

  const calculateAvailableSeats = async () => {
    const tripsWithSeats = await Promise.all(trips.map(async (trip) => {
      const { totalSeats, bookedSeats } = await fetchBookedSeats(trip.id);
      return {
        ...trip,
        availableSeats: totalSeats - bookedSeats
      };
    }));
    setAvailableTrips(tripsWithSeats);
  };
  
  useEffect(() => {
    if (trips.length > 0) {
      calculateAvailableSeats();
    }
  }, [trips]);
  

  const handleViewSeats = (busId) => {
    setSelectedBusId(busId);
    setShowSeats(true);
  };

  if (!Array.isArray(availableTrips)) {
    return <Typography variant="h6" sx={{ color: 'red' }}>No trips available.</Typography>;
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1, mt: 4 }}>
        {showSeats && selectedBusId ? (
          <SeatSelectionPanel busId={selectedBusId} />
        ) : (
          <Box>
            <Button
              variant="contained"
              onClick={onBack}
              sx={{ mb: 3, color: 'white', bgcolor: '#B85042' }}
            >
              Back to Search
            </Button>
            <Typography variant="h5" gutterBottom sx={{ color: 'white' }}>
              {availableTrips.length} Bus{availableTrips.length > 1 ? 'es' : ''} Found
            </Typography>
            <Grid container spacing={2}>
              {availableTrips.map((trip) => (
                <Grid item xs={12} key={trip.id}>
                  <Item elevation={6}>
                    {/* Header Section as Columns */}
                    <Grid container spacing={2}>
                      <Grid item xs={2}>
                        <Typography variant="h6" component="div" sx={{ fontWeight: '600' }}>
                          Bus Number
                        </Typography>
                        <hr />
                        <Typography variant="body1">
                          {trip.busNumber || 'Unknown'}
                        </Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <Typography variant="h6" component="div" sx={{ fontWeight: '600' }}>
                          Date
                        </Typography>
                        <hr />
                        <Typography variant="body1">
                          {trip.date ? trip.date.toString() : 'Unknown Date'}
                        </Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <Typography variant="h6" component="div" sx={{ fontWeight: '600' }}>
                          Departure Time
                        </Typography>
                        <hr />
                        <Typography variant="body1">
                          {trip.departureTime ? new Date(trip.departureTime).toLocaleTimeString() : 'Unknown Time'}
                        </Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <Typography variant="h6" component="div" sx={{ fontWeight: '600' }}>
                          Arrival Time
                        </Typography>
                        <hr />
                        <Typography variant="body1">
                          {trip.arrivalTime ? new Date(trip.arrivalTime).toLocaleTimeString() : 'Unknown Time'}
                        </Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <Typography variant="h6" component="div" sx={{ fontWeight: '600' }}>
                          Distance
                        </Typography>
                        <hr />
                        <Typography variant="body1">
                          {trip.distance ? `${trip.distance} km` : 'Unknown Distance'}
                        </Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <Typography variant="h6" component="div" sx={{ fontWeight: '600' }}>
                          Seats Available
                        </Typography>
                        <hr />
                        <Typography variant="body1">
                          {trip.availableSeats || 'Unknown'}
                        </Typography>
                      </Grid>
                    </Grid>

                    {/* Button Section */}
                    <Grid container justifyContent="flex-start" sx={{ mt: 2 }}>
                      <Button
                        variant="contained"
                        sx={{ mb: 3, color: 'white', bgcolor: '#B85042' }}
                        onClick={() => handleViewSeats(trip.id)}
                      >
                        View Seats
                      </Button>
                    </Grid>
                  </Item>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Box>
    </ThemeProvider>
  );
}

export default AvailableBus;
