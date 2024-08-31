import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Seat from './Seat';
import ProceedToBook from './ProceedToBook';

const SeatSelectionPanel = ({ busId }) => {
  const [seats, setSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [startPoint, setStartPoint] = useState('');
  const [endPoint, setEndPoint] = useState('');
  const [date, setDate] = useState("2024-09-01");
  const [fare, setFare] = useState();
  const [baseFare, setBaseFare] = useState(100);
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    const generateDummySeats = (busId) => {
      const dummySeats = [];
      for (let i = 1; i <= 18; i++) {
        dummySeats.push({
          id: `U-${String(i).padStart(2, '0')}`,
          seatNumber: `U-${String(i).padStart(2, '0')}`,
          isBooked: false,
          busId: busId
        });
        dummySeats.push({
          id: `L-${String(i).padStart(2, '0')}`,
          seatNumber: `L-${String(i).padStart(2, '0')}`,
          isBooked: false,
          busId: busId
        });
      }
      return dummySeats;
    };

    const fetchSeats = async () => {
      try {
        // Fetch initial seat data
        const response = await axios.get(`http://localhost:8081/seat/bus/${busId}`);
        const fetchedSeats = response.data;
        
        // Generate dummy seats
        const dummySeats = generateDummySeats(busId);
        
        // Update dummy seats with fetched seat data
        const updatedSeats = dummySeats.map(seat => {
          const fetchedSeat = fetchedSeats.find(s => s.seatNumber === seat.seatNumber);
          return fetchedSeat ? { ...seat, isBooked: fetchedSeat.isBooked } : seat;
        });

        setSeats(updatedSeats);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSeats();
  }, [busId]);


  const fetchBusDetails = async () => {
      // Fetch initial bus data
      const response = await axios.get(`http://localhost:8081/bus/${busId}`);
      const fetchedBusDetails = response.data;
      setStartPoint(fetchedBusDetails.startPoint);
      setEndPoint(fetchedBusDetails.endPoint);
      setDate(fetchedBusDetails.date);
    }

    const handleSeatClick = (seat) => {
    if (!seat.isBooked) {
      setSelectedSeats((prevSelectedSeats) =>
        prevSelectedSeats.some((selectedSeat) => selectedSeat.id === seat.id)
          ? prevSelectedSeats.filter((selectedSeat) => selectedSeat.id !== seat.id)
          : [...prevSelectedSeats, seat]
      );
    }
    fetchBusDetails();
  };

  const calculateFare = (selectedSeats, baseFare, discount) => {
    const fare = selectedSeats.length * baseFare;
    const discountedFare = fare - (fare * discount);
    setFare(discountedFare.toFixed(2));
  };

  useEffect(() => {
    calculateFare(selectedSeats, baseFare, discount);
  }, [selectedSeats, baseFare, discount]);

  const handleBooking = async () => {
    try {
      const bookingData = {
        bookingDate: new Date().toISOString().split('T')[0],
        status: 'CONFIRMED',
        paymentStatus: 'PENDING',
        fare: parseFloat(fare),
        user: { id: sessionStorage.getItem('userId') },
        seats: selectedSeats.map(seat => ({
          seatNumber: seat.seatNumber,
          isBooked: true,
        })),
        bus: { id: busId },
      };

      // Post the booking data to the server
      const bookingResponse = await axios.post('http://localhost:8081/booking/', bookingData);

      if (bookingResponse.status === 200) {
        alert("You have booked seats successfully!");

        // Fetch updated seat data after booking
        const seatsResponse = await axios.get(`http://localhost:8081/seat/bus/${busId}`);

        if (seatsResponse.status === 200) {
          const fetchedSeats = seatsResponse.data;
          
          // Update the seat status in the current seat data
          const updatedSeats = seats.map(seat => {
            const fetchedSeat = fetchedSeats.find(s => s.seatNumber === seat.seatNumber);
            return fetchedSeat ? { ...seat, isBooked: fetchedSeat.isBooked } : seat;
          });

          // Update state with new seat data
          setSeats(updatedSeats);
          setSelectedSeats([]);
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

  const filterSeatsByDeck = (prefix) => {
    return seats.filter(seat => seat.seatNumber.startsWith(prefix));
  };

  const renderSeatsInRows = (seats) => {
    const totalRows = 3;
    const seatsPerRow = 6;

    const rows = [];
    for (let rowIndex = 0; rowIndex < totalRows; rowIndex++) {
      const rowSeats = seats.slice(rowIndex * seatsPerRow, (rowIndex + 1) * seatsPerRow);
      rows.push(
        <div
          className={`seat-row row${rowIndex + 1}`}
          key={rowIndex}
          style={{ marginBottom: rowIndex === 1 ? '20px' : '0' }}
        >
          {rowSeats.map(seat => (
            <Seat 
              key={seat.id} 
              seat={seat} 
              isSelected={selectedSeats.some(s => s.id === seat.id)} 
              onClick={() => handleSeatClick(seat)} 
            />
          ))}
        </div>
      );
    }
    return rows;
  };

  if (loading) return <p>Loading seats...</p>;
  if (error) return <p>Error generating seats: {error.message}</p>;

  return (
    <>
      <div className='booking-section-header'>
        <div className='indicator'>
          <h3>Booked</h3>
          <span className='seat booked'></span>
          <h3>Selected</h3>
          <span className='seat selected'></span>
          <h3>Available</h3>
          <span className='seat available'></span>
        </div>
      </div>
      <section className='booking-section'>
        <div className="seat-selection-panel">
          <h3>Upper Deck</h3>
          <div className='sub-container'>
            <div className="steering-icon"></div>
            <div className="seat-container">
              {renderSeatsInRows(filterSeatsByDeck('U'))}
            </div>
          </div>
          <h3>Lower Deck</h3>
          <div className='sub-container'>
            <div className="steering-icon"></div>
            <div className="seat-container">
              {renderSeatsInRows(filterSeatsByDeck('L'))}
            </div>
          </div>
        </div>
        <div className="proceed-to-book-container">
          {selectedSeats.length > 0 && (
            <ProceedToBook
              selectedSeats={selectedSeats}
              startPoint={startPoint}
              endPoint={endPoint}
              fare={fare}
              date={date}
              onProceed={handleBooking} // Pass the handleBooking function here
              onSeatsUpdated={(updatedSeats) => setSeats(updatedSeats)}
              clearSelectedSeats={() => setSelectedSeats([])}
              openSearchBus={() => console.log('Open Search Bus')}
              busId={busId}
            />
          )}
        </div>
      </section>
    </>
  );
};

export default SeatSelectionPanel;
