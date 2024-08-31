import React from 'react';
// Ensure you have the appropriate CSS file for styling

const Seat = ({ seat, isSelected, onClick }) => {
  const seatClass = seat.isBooked
    ? 'seat booked'
    : isSelected
    ? 'seat selected'
    : 'seat available';

  return (
    <div
      className={seatClass}
      onClick={() => !seat.isBooked && onClick(seat)} // Only handle click if the seat is not booked
      title={`Seat ${seat.seatNumber}`}
    >
      {seat.isBooked ? 'Booked' : seat.seatNumber}
    </div>
  );
};

export default Seat;
