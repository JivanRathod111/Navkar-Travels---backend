import React, { useState } from 'react';

const PassengerDetails = ({ onConfirm }) => {
  const [passengerName, setPassengerName] = useState('');
  const [passengerAge, setPassengerAge] = useState('');
  const [passengerGender, setPassengerGender] = useState('');

  const handleConfirm = () => {
    onConfirm({ passengerName, passengerAge, passengerGender });
  };

  return (
    <div className="passenger-details">
      <h2>Enter Passenger Details</h2>
      <div className="form-group">
        <label>Name:</label>
        <input
          type="text"
          value={passengerName}
          onChange={(e) => setPassengerName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Age:</label>
        <input
          type="number"
          value={passengerAge}
          onChange={(e) => setPassengerAge(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Gender:</label>
        <select
          value={passengerGender}
          onChange={(e) => setPassengerGender(e.target.value)}
        >
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
      <button className="button continue" onClick={handleConfirm}>
        Confirm Booking
      </button>
    </div>
  );
};

export default PassengerDetails;
