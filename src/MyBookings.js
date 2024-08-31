import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Box, Typography, Paper } from '@mui/material';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

const colors = {
  accent: '#B85042',
  secondary: '#E7E8D1',
  primary: '#A7BEAE',
};

// Styled Paper component with flex-direction column
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'left',
  color: colors.primary,
  backgroundColor: 'white',
  height: 'auto',
  lineHeight: '1.5',
  borderRadius: '8px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  boxShadow: `0 4px 8px rgba(0, 0, 0, 0.2)`,
}));

// Header styled component
const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  backgroundColor: colors.primary,
  color: theme.palette.common.white,
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(2),
}));

// Details container styled component
const Details = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
}));

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#ff9800', // Orange color for the button
    },
  },
});

const MyBookings = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = sessionStorage.getItem('userId'); // Ensure 'userId' is correctly set in sessionStorage

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/user/${userId}`);
        setUser(response.data);
      } catch (error) {
        setError('Failed to fetch user data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      getUser();
    } else {
      setLoading(false);
      setError('User ID not found.');
    }
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!user) return <div>No user data available</div>;

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          flexGrow: 1,
          backgroundColor: colors.secondary,
          padding: '20px 90px 90px 90px',
          height: '100vh',
          overflow: 'scroll',
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                display: 'grid',
                gridTemplateColumns: { xs: '1fr' },
                gap: 2,
              }}
            >
              {user.bookings.length === 0 ? (
                <Typography variant="h6" sx={{ color: colors.accent, textAlign: 'center' }}>
                  No bookings found
                </Typography>
              ) : (
                user.bookings.map((booking) => (
                  <Item key={booking.id} elevation={6}>
                    <Header>
                      <Typography variant="h6" sx={{ flex: 1, textAlign: 'center' }}>Booking ID</Typography>
                      <Typography variant="h6" sx={{ flex: 1, textAlign: 'center' }}>Booking Date</Typography>
                      <Typography variant="h6" sx={{ flex: 1, textAlign: 'center' }}>Bus Number</Typography>
                      <Typography variant="h6" sx={{ flex: 1, textAlign: 'center' }}>Status</Typography>
                      <Typography variant="h6" sx={{ flex: 1, textAlign: 'center' }}>Payment Status</Typography>
                      <Typography variant="h6" sx={{ flex: 1, textAlign: 'center' }}>Fare</Typography>
                    </Header>
                    <Details>
                      <Typography variant="body1" sx={{ flex: 1, textAlign: 'center' }}>{booking.id}</Typography>
                      <Typography variant="body1" sx={{ flex: 1, textAlign: 'center' }}>{booking.bookingDate}</Typography>
                      <Typography variant="body1" sx={{ flex: 1, textAlign: 'center' }}>{booking.seats[0]?.bus.busNumber}</Typography>
                      <Typography variant="body1" sx={{ flex: 1, textAlign: 'center' }}>{booking.status}</Typography>
                      <Typography variant="body1" sx={{ flex: 1, textAlign: 'center' }}>{booking.paymentStatus}</Typography>
                      <Typography variant="body1" sx={{ flex: 1, textAlign: 'center' }}>{booking.fare ? `$${booking.fare}` : 'Not Available'}</Typography>
                    </Details>
                    <Box>
                      <Typography variant="h6" sx={{ color: colors.accent }}>Seats:</Typography>
                      <ul>
                        {booking.seats.map((seat) => (
                          <li key={seat.id}>
                            Seat Number: {seat.seatNumber} | Bus Route: {seat.bus.startPoint} to {seat.bus.endPoint}
                          </li>
                        ))}
                      </ul>
                    </Box>
                  </Item>
                ))
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default MyBookings;
