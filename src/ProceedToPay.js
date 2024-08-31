import React, { useState } from 'react';

const ProceedToPayment = ({ selectedSeats, totalAmount, onProceed }) => {
  return (
    <div className="proceed-to-payment">
      <h2>Review Your Booking</h2>
      <div className="booking-summary">
        <div>
          <span>Selected Seats:</span>
          <span>{selectedSeats.join(', ')}</span>
        </div>
        <div>
          <span>Total Amount:</span>
          <span>{`INR ${totalAmount}`}</span>
        </div>
      </div>
      <button className="button continue" onClick={onProceed}>
        Proceed to Book
      </button>
    </div>
  );
};

export default ProceedToPayment;
