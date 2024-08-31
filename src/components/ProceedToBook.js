import React from 'react';
import axios from 'axios';
import { Button, Paper } from '@mui/material';
import { styled } from '@mui/system';

const Row = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '10px',
});

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'left',
  color: theme.palette.text.secondary,
}));

const ProceedToBook = ({ 
  selectedSeats, 
  startPoint, 
  endPoint, 
  fare, 
  date, 
  onProceed, 
  onSeatsUpdated, 
  clearSelectedSeats, 
  openSearchBus, 
  busId 
}) => {

  const userId = sessionStorage.getItem('userId');

  if (!userId) {
    return <p>Error: User not logged in. Please log in to proceed with booking.</p>;
  }

  const handleProceed = async () => {
    if (selectedSeats.length === 0) {
      alert('Please select seats before proceeding.');
      return;
    }

    const bookingData = {
      bookingDate: new Date().toISOString().split('T')[0],
      status: 'CONFIRMED',
      paymentStatus: 'PENDING',
      fare: parseFloat(fare),
      user: { id: userId },
      seats: selectedSeats.map(seat => ({
        seatNumber: seat.seatNumber,
        isBooked: true,
      })),
      bus: { id: busId },
    };

    try {
      // Send the booking request to the server
      const bookingResponse = await axios.post('http://localhost:8081/booking/', bookingData);

      if (bookingResponse.status === 200) {
       

        // Fetch the updated seat data for the bus
        const seatsResponse = await axios.get(`http://localhost:8081/seat/bus/${busId}`);

        if (seatsResponse.status === 200) {
          const updatedSeats = seatsResponse.data;

          // Update the seat status in the parent component
          if (onSeatsUpdated) {
            onSeatsUpdated(updatedSeats);
          }

          // Clear selected seats
          if (clearSelectedSeats) {
            clearSelectedSeats();
          }

          // Open SearchBus component if necessary
          if (openSearchBus) {
            openSearchBus();
          }

          // Execute any additional logic after successful booking
          if (onProceed) {
            onProceed();
          }
        } else {
          alert('Failed to fetch updated seat data.');
        }
      } else {
        alert('Failed to book seats.');
      }
    } catch (error) {
      console.error('Error booking seats:', error);
      alert('Failed to book seats. Please try again.');
    }
  };

  return (
    <Item elevation={6} className="booking-details" style={{ width: '100%' }}>
      <h3>Booking Details</h3>
      <hr />
      <Row>
        <strong>Start Point:</strong> <span>{startPoint}</span>
      </Row>
      <Row>
        <strong>End Point:</strong> <span>{endPoint}</span>
      </Row>
      <Row>
        <strong>Date:</strong> <span>{date}</span>
      </Row>
      <Row>
        <strong>Selected Seats:</strong> <span>{selectedSeats.map(seat => seat.seatNumber).join(', ')}</span>
      </Row>
      <Row>
        <strong>Fare:</strong> <span>{fare}   Rs</span>
      </Row>
      <Row>
        <strong>Payment Status:</strong> <span>Pending</span>
      </Row>
      <Button 
        variant="contained" 
        fullWidth 
        sx={{ background: "#B85042", color: "white" }}
        onClick={handleProceed}
      >
        Proceed to Book
      </Button>
    </Item>
  );
};

export default ProceedToBook;
