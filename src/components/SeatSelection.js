import React, { useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBus, faUser, faBed } from '@fortawesome/free-solid-svg-icons'; // Import icons

// Define CSS class names
const seatClass = 'seat'; // CSS class for available seats
const disabledSeatClass = 'seat seat-disabled'; // CSS class for disabled seats
const selectedSeatClass = 'seat seat-selected'; // CSS class for selected seats
const genderIconClass = 'gender-icon'; // CSS class for gender icon
const sleeperIconClass = 'sleeper-icon'; // CSS class for sleeper icon

const Seat = React.memo(({ seat, onClick }) => {
  const seatClassName = seat.disabled
    ? disabledSeatClass
    : seat.selected
    ? selectedSeatClass
    : seatClass;

  return (
    <div className={seatClassName} onClick={onClick} style={seatStyle}>
      {seat.type === 'female' && <FontAwesomeIcon icon={faUser} className={genderIconClass} style={genderIconStyle} />}
      {seat.type === 'sleeper' && <FontAwesomeIcon icon={faBed} className={sleeperIconClass} style={sleeperIconStyle} />}
    </div>
  );
});

const Section = ({ title, seats, onSeatClick }) => (
  <div className="deck" style={deckStyle}>
    <h2 style={titleStyle}>{title}</h2>
    <div className="seat-container" style={seatContainerStyle}>
      {seats.map((seat, index) => (
        <Seat key={index} seat={seat} onClick={() => onSeatClick(index)} />
      ))}
    </div>
  </div>
);

const Sidebar = ({ isOpen, onClose, boardingPoint, setBoardingPoint, droppingPoint, setDroppingPoint, selectedGender, setSelectedGender }) => {
  const boardingOptions = ['Point A', 'Point B', 'Point C', 'Point D'];
  const droppingOptions = ['Point X', 'Point Y', 'Point Z', 'Point W'];

  const handleSelectionChange = (setter) => (e) => setter(e.target.value);

  const allSelected = boardingPoint && droppingPoint && selectedGender;

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`} style={{ ...sidebarStyle, ...(isOpen ? openSidebarStyle : closedSidebarStyle) }}>
      <button className="close-btn" onClick={onClose} style={closeButtonStyle}>Close</button>
      <h3 style={sidebarTitleStyle}>Select Your Details</h3>

      <div className="form-group" style={formGroupStyle}>
        <label style={labelStyle}>Boarding Point:</label>
        {boardingOptions.map((option, index) => (
          <div key={index} style={radioGroupStyle}>
            <input
              type="radio"
              id={`boarding-${index}`}
              name="boarding"
              value={option}
              checked={boardingPoint === option}
              onChange={handleSelectionChange(setBoardingPoint)}
              style={radioStyle}
            />
            <label htmlFor={`boarding-${index}`} style={radioLabelStyle}>{option}</label>
          </div>
        ))}
      </div>

      <div className="form-group" style={formGroupStyle}>
        <label style={labelStyle}>Dropping Point:</label>
        {droppingOptions.map((option, index) => (
          <div key={index} style={radioGroupStyle}>
            <input
              type="radio"
              id={`dropping-${index}`}
              name="dropping"
              value={option}
              checked={droppingPoint === option}
              onChange={handleSelectionChange(setDroppingPoint)}
              style={radioStyle}
            />
            <label htmlFor={`dropping-${index}`} style={radioLabelStyle}>{option}</label>
          </div>
        ))}
      </div>

      <div className="form-group" style={formGroupStyle}>
        <label style={labelStyle}>Gender:</label>
        <div>
          <input
            type="radio"
            id="male"
            name="gender"
            value="male"
            checked={selectedGender === 'male'}
            onChange={handleSelectionChange(setSelectedGender)}
            style={radioStyle}
          />
          <label htmlFor="male" style={radioLabelStyle}>Male</label>
        </div>
        <div>
          <input
            type="radio"
            id="female"
            name="gender"
            value="female"
            checked={selectedGender === 'female'}
            onChange={handleSelectionChange(setSelectedGender)}
            style={radioStyle}
          />
          <label htmlFor="female" style={radioLabelStyle}>Female</label>
        </div>
      </div>

      <button className={`payment-btn ${allSelected ? 'active' : 'disabled'}`} disabled={!allSelected} style={{ ...paymentButtonStyle, ...(allSelected ? activeButtonStyle : disabledButtonStyle) }}>
        Proceed to Payment
      </button>
    </div>
  );
};

const SeatSelection = () => {
  const [seats, setSeats] = useState([
    { type: '', disabled: false, selected: false },
    { type: 'female', disabled: false, selected: false },
    { type: '', disabled: false, selected: false },
    { type: '', disabled: false, selected: false },
    { type: 'sleeper', disabled: false, selected: false },
    { type: '', disabled: false, selected: false },
    { type: '', disabled: false, selected: false },
    { type: '', disabled: false, selected: false },
    { type: '', disabled: false, selected: false },
    { type: 'female', disabled: false, selected: false },
    { type: '', disabled: false, selected: false },
    { type: '', disabled: false, selected: false },
  ]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [boardingPoint, setBoardingPoint] = useState('');
  const [droppingPoint, setDroppingPoint] = useState('');
  const [selectedGender, setSelectedGender] = useState('');

  const handleSeatClick = useCallback((index) => {
    setSeats((prevSeats) =>
      prevSeats.map((seat, i) => i === index ? { ...seat, selected: !seat.selected } : seat)
    );
    setIsSidebarOpen(true);
  }, []);

  return (
    <div className="seat-selection-container" style={containerStyle}>
      <div className="info-message" style={infoMessageStyle}>
        Click on an Available seat to proceed with your transaction.
      </div>
      <div className="bus-container" style={busContainerStyle}>
        <div className="deck-container" style={deckContainerStyle}>
          <Section
            title="Seat Map"
            seats={seats}
            onSeatClick={handleSeatClick}
          />
        </div>
        <div className="driver-icon" style={driverIconStyle}>
          <FontAwesomeIcon icon={faBus} className="w-12 h-12 text-gray-500" />
        </div>
      </div>
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        boardingPoint={boardingPoint}
        setBoardingPoint={setBoardingPoint}
        droppingPoint={droppingPoint}
        setDroppingPoint={setDroppingPoint}
        selectedGender={selectedGender}
        setSelectedGender={setSelectedGender}
      />
    </div>
  );
};

// Styles
const seatStyle = {
  width: '40px',
  height: '40px',
  margin: '5px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  borderRadius: '5px',
};

const genderIconStyle = {
  fontSize: '18px',
  color: '#f6a5c0',
};

const sleeperIconStyle = {
  fontSize: '18px',
  color: '#8ab4f8',
};

const deckStyle = {
  padding: '10px',
};

const titleStyle = {
  fontSize: '18px',
  fontWeight: 'bold',
};

const seatContainerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
};

const sidebarStyle = {
  position: 'fixed',
  right: '0',
  top: '0',
  width: '300px',
  height: '100%',
  backgroundColor: '#fff',
  boxShadow: '-2px 0 5px rgba(0, 0, 0, 0.1)',
  padding: '20px',
  transition: 'transform 0.3s ease',
};

const openSidebarStyle = {
  transform: 'translateX(0)',
};

const closedSidebarStyle = {
  transform: 'translateX(100%)',
};

const closeButtonStyle = {
  display: 'block',
  backgroundColor: '#e55d00',
  color: '#fff',
  border: 'none',
  padding: '10px',
  borderRadius: '5px',
  cursor: 'pointer',
  marginBottom: '20px',
};

const sidebarTitleStyle = {
  fontSize: '20px',
  fontWeight: 'bold',
  marginBottom: '20px',
};

const formGroupStyle = {
  marginBottom: '20px',
};

const labelStyle = {
  display: 'block',
  fontWeight: 'bold',
  marginBottom: '10px',
};

const radioGroupStyle = {
  marginBottom: '10px',
};

const radioStyle = {
  marginRight: '10px',
};

const radioLabelStyle = {
  marginRight: '20px',
};

const paymentButtonStyle = {
  display: 'block',
  width: '100%',
  padding: '10px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

const activeButtonStyle = {
  backgroundColor: '#e55d00',
  color: '#fff',
};

const disabledButtonStyle = {
  backgroundColor: '#ccc',
  color: '#fff',
};

const infoMessageStyle = {
  backgroundColor: '#d1e7dd',
  color: '#0f5132',
  padding: '10px',
  borderRadius: '5px',
  marginBottom: '20px',
};

const busContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
};

const deckContainerStyle = {
  flex: '1',
};

const driverIconStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const containerStyle = {
  padding: '20px',
  backgroundColor: '#f5f5f5',
  height: '100vh',
};

export default SeatSelection;
