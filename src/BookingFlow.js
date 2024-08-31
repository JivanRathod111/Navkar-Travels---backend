import React, { useState } from 'react';
import PassengerDetails from './PassengerDetails';
import ProceedToPayment from './ProceedToPay';

const BookingFlow = () => {
  const [step, setStep] = useState('payment');
  const [selectedSeats, setSelectedSeats] = useState(['P']);
  const [totalAmount, setTotalAmount] = useState(2799);

  const handleProceedToBook = () => {
    setStep('book');
  };

  const handleConfirmBooking = (passengerDetails) => {
    console.log('Booking confirmed with details:', passengerDetails);
    // Handle booking confirmation
  };

  return (
    <div>
      {step === 'payment' && (
        <ProceedToPayment
          selectedSeats={selectedSeats}
          totalAmount={totalAmount}
          onProceed={handleProceedToBook}
        />
      )}
      {step === 'book' && (
        <PassengerDetails onConfirm={handleConfirmBooking} />
      )}
    </div>
  );
};

export default BookingFlow;
