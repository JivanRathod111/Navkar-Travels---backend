// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const Seat = ({ seat, onClick }) => {
//   const seatClass = seat.isBooked ? 'seat booked' : 'seat available';

//   return (
//     <div
//       className={seatClass}
//       onClick={() => !seat.isBooked && onClick(seat.number)}
//       title={`Seat ${seat.number}`}
//     >
//       {seat.isBooked ? 'Booked' : seat.number}
//     </div>
//   );
// };

// const ViewSeats = ({ busId }) => {
//   const [seats, setSeats] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchSeats = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8081/seat/1`);
//         if (!response.data.length) {
//           throw new Error('No seats data available');
//         }
//         setSeats(response.data);
//       } catch (error) {
//         setError(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSeats();
//   }, [busId]);

//   const handleSeatClick = async (seatNumber) => {
//     try {
//       // Make the POST request to book the seat
//       const response = await axios.post(`http://localhost:8081/booking/`, {
//         seatNumber,
//         busId,
//       });

//       if (response.status === 200) {
//         // Update the seat status in local state after booking
//         setSeats((prevSeats) =>
//           prevSeats.map((seat) =>
//             seat.number === seatNumber ? { ...seat, isBooked: true } : seat
//           )
//         );
//         alert(`Seat ${seatNumber} booked successfully!`);
//       } else {
//         alert(`Failed to book seat ${seatNumber}.`);
//       }
//     } catch (error) {
//       console.error('Error booking seat:', error);
//       alert('Failed to book seat. Please try again.');
//     }
//   };

//   if (loading) return <p>Loading seats...</p>;
//   if (error) return <p>Error fetching seats: {error.message}</p>;

//   return (
//     <div className="seat-selection-panel">
//       <h2>Upper Deck</h2>
//       <div className='sub-container'>
//         <div className="steering-icon"></div>
//         <div className="seat-container">
//           <div className="seat-row row-1">
//             <Seat seat={{ number: 'U1', isBooked: seats.some(seat => seat.number === 'U1' && seat.isBooked) }} onClick={handleSeatClick} />
//             <Seat seat={{ number: 'U2', isBooked: seats.some(seat => seat.number === 'U2' && seat.isBooked) }} onClick={handleSeatClick} />
//             <Seat seat={{ number: 'U3', isBooked: seats.some(seat => seat.number === 'U3' && seat.isBooked) }} onClick={handleSeatClick} />
//             <Seat seat={{ number: 'U4', isBooked: seats.some(seat => seat.number === 'U4' && seat.isBooked) }} onClick={handleSeatClick} />
//             <Seat seat={{ number: 'U5', isBooked: seats.some(seat => seat.number === 'U5' && seat.isBooked) }} onClick={handleSeatClick} />
//             <Seat seat={{ number: 'U6', isBooked: seats.some(seat => seat.number === 'U6' && seat.isBooked) }} onClick={handleSeatClick} />
//           </div>
//           <div className="seat-row row-2" style={{ marginBottom: "30px" }}>
//             <Seat seat={{ number: 'U7', isBooked: seats.some(seat => seat.number === 'U7' && seat.isBooked) }} onClick={handleSeatClick} />
//             <Seat seat={{ number: 'U8', isBooked: seats.some(seat => seat.number === 'U8' && seat.isBooked) }} onClick={handleSeatClick} />
//             <Seat seat={{ number: 'U9', isBooked: seats.some(seat => seat.number === 'U9' && seat.isBooked) }} onClick={handleSeatClick} />
//             <Seat seat={{ number: 'U10', isBooked: seats.some(seat => seat.number === 'U10' && seat.isBooked) }} onClick={handleSeatClick} />
//             <Seat seat={{ number: 'U11', isBooked: seats.some(seat => seat.number === 'U11' && seat.isBooked) }} onClick={handleSeatClick} />
//             <Seat seat={{ number: 'U12', isBooked: seats.some(seat => seat.number === 'U12' && seat.isBooked) }} onClick={handleSeatClick} />
//           </div>
//           <div className="seat-row row-3">
//             <Seat seat={{ number: 'U13', isBooked: seats.some(seat => seat.number === 'U13' && seat.isBooked) }} onClick={handleSeatClick} />
//             <Seat seat={{ number: 'U14', isBooked: seats.some(seat => seat.number === 'U14' && seat.isBooked) }} onClick={handleSeatClick} />
//             <Seat seat={{ number: 'U15', isBooked: seats.some(seat => seat.number === 'U15' && seat.isBooked) }} onClick={handleSeatClick} />
//             <Seat seat={{ number: 'U16', isBooked: seats.some(seat => seat.number === 'U16' && seat.isBooked) }} onClick={handleSeatClick} />
//             <Seat seat={{ number: 'U17', isBooked: seats.some(seat => seat.number === 'U17' && seat.isBooked) }} onClick={handleSeatClick} />
//             <Seat seat={{ number: 'U18', isBooked: seats.some(seat => seat.number === 'U18' && seat.isBooked) }} onClick={handleSeatClick} />
//           </div>
//         </div>
//       </div>

//       <h2>Lower Deck</h2>
//       <div className='sub-container'>
//         <div className="steering-icon"></div>
//         <div className="seat-container">
//           <div className="seat-row row-1">
//             <Seat seat={{ number: 'L1', isBooked: seats.some(seat => seat.number === 'L1' && seat.isBooked) }} onClick={handleSeatClick} />
//             <Seat seat={{ number: 'L2', isBooked: seats.some(seat => seat.number === 'L2' && seat.isBooked) }} onClick={handleSeatClick} />
//             <Seat seat={{ number: 'L3', isBooked: seats.some(seat => seat.number === 'L3' && seat.isBooked) }} onClick={handleSeatClick} />
//             <Seat seat={{ number: 'L4', isBooked: seats.some(seat => seat.number === 'L4' && seat.isBooked) }} onClick={handleSeatClick} />
//             <Seat seat={{ number: 'L5', isBooked: seats.some(seat => seat.number === 'L5' && seat.isBooked) }} onClick={handleSeatClick} />
//             <Seat seat={{ number: 'L6', isBooked: seats.some(seat => seat.number === 'L6' && seat.isBooked) }} onClick={handleSeatClick} />
//           </div>
//           <div className="seat-row row-2" style={{ marginBottom: "30px" }}>
//             <Seat seat={{ number: 'L7', isBooked: seats.some(seat => seat.number === 'L7' && seat.isBooked) }} onClick={handleSeatClick} />
//             <Seat seat={{ number: 'L8', isBooked: seats.some(seat => seat.number === 'L8' && seat.isBooked) }} onClick={handleSeatClick} />
//             <Seat seat={{ number: 'L9', isBooked: seats.some(seat => seat.number === 'L9' && seat.isBooked) }} onClick={handleSeatClick} />
//             <Seat seat={{ number: 'L10', isBooked: seats.some(seat => seat.number === 'L10' && seat.isBooked) }} onClick={handleSeatClick} />
//             <Seat seat={{ number: 'L11', isBooked: seats.some(seat => seat.number === 'L11' && seat.isBooked) }} onClick={handleSeatClick} />
//             <Seat seat={{ number: 'L12', isBooked: seats.some(seat => seat.number === 'L12' && seat.isBooked) }} onClick={handleSeatClick} />
//           </div>
//           <div className="seat-row row-3">
//             <Seat seat={{ number: 'L13', isBooked: seats.some(seat => seat.number === 'L13' && seat.isBooked) }} onClick={handleSeatClick} />
//             <Seat seat={{ number: 'L14', isBooked: seats.some(seat => seat.number === 'L14' && seat.isBooked) }} onClick={handleSeatClick} />
//             <Seat seat={{ number: 'L15', isBooked: seats.some(seat => seat.number === 'L15' && seat.isBooked) }} onClick={handleSeatClick} />
//             <Seat seat={{ number: 'L16', isBooked: seats.some(seat => seat.number === 'L16' && seat.isBooked) }} onClick={handleSeatClick} />
//             <Seat seat={{ number: 'L17', isBooked: seats.some(seat => seat.number === 'L17' && seat.isBooked) }} onClick={handleSeatClick} />
//             <Seat seat={{ number: 'L18', isBooked: seats.some(seat => seat.number === 'L18' && seat.isBooked) }} onClick={handleSeatClick} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ViewSeats;
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Seat = ({ seat, isSelected, onClick }) => {
  const seatClass = seat.isBooked
    ? 'seat booked'
    : isSelected
    ? 'seat selected'
    : 'seat available';

  return (
    <div
      className={seatClass}
      onClick={() => !seat.isBooked && onClick(seat)}
      title={`Seat ${seat.seatNumber}`}
    >
      {seat.isBooked ? 'Booked' : seat.seatNumber}
    </div>
  );
};

const ViewSeats = ({ busId, userId }) => {
  const [seats, setSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSeat, setSelectedSeat] = useState(null);

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/seat/busId/1`);
        if (!response.data.length) {
          throw new Error('No seats data available');
        }
        setSeats(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSeats();
  }, [busId]);

  const handleSeatClick = (seat) => {
    if (!seat.isBooked) {
      setSelectedSeat(seat);
    }
  };

  const handleBooking = async () => {
    if (!selectedSeat) {
      alert('Please select a seat first.');
      return;
    }

    const bookingData = {
      user: { id: 1 }, // Use the userId prop
      seat: { id: selectedSeat.id },
      bookingDate: new Date().toISOString().split('T')[0], // Current date
      paymentStatus: 'PENDING',
    };
    console.log(bookingData);
    


    try {
      const response = await axios.post('http://localhost:8081/booking/', bookingData);
      
      if (response.status === 200) {
        // Update the seat status in local state after booking
        setSeats((prevSeats) =>
          prevSeats.map((seat) =>
            seat.id === selectedSeat.id ? { ...seat, isBooked: true } : seat
          )
        );
        alert(`Seat ${selectedSeat.seatNumber} booked successfully!`);
        setSelectedSeat(null); // Reset selected seat after booking
      } else {
        alert(`Failed to book seat ${selectedSeat.seatNumber}.`);
      }
    } catch (error) {
      console.error('Error booking seat:', error);
      alert('Failed to book seat. Please try again.');
    }
  };

  if (loading) return <p>Loading seats...</p>;
  if (error) return <p>Error fetching seats: {error.message}</p>;

  return (
    <div className="seat-selection-panel">
      <h2>Seat Selection</h2>
      <div className='seat-container'>
        {seats.map(seat => (
          <Seat
            key={seat.id}
            seat={seat}
            isSelected={selectedSeat?.id === seat.id}
            onClick={handleSeatClick}
          />
        ))}
      </div>

      {selectedSeat && (
        <div className="booking-section">
          <button onClick={handleBooking}>Confirm Booking</button>
        </div>
      )}
    </div>
  );
};

export default ViewSeats;
