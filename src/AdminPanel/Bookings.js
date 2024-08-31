import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button, Table, Form, InputGroup, FormControl } from 'react-bootstrap';
import DatePicker from 'react-datepicker'; // You'll need to install this package
import 'react-datepicker/dist/react-datepicker.css';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [buses, setBuses] = useState([]);
  const [editId, setEditId] = useState(null);
  const [newBooking, setNewBooking] = useState({
    bookingDate: null,
    status: '',
    paymentStatus: '',
    fare: '',
    userId: '',
    busId: '',
    seats: []
  });
  const [show, setShow] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    fetchData();
    fetchUsers();
    fetchBuses();
  }, []);

  const fetchData = () => {
    axios.get('http://localhost:8081/booking/')
      .then((response) => {
        setBookings(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the bookings!', error);
      });
  };

  const fetchUsers = () => {
    axios.get('http://localhost:8081/users/')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the users!', error);
      });
  };

  const fetchBuses = () => {
    axios.get('http://localhost:8081/buses/')
      .then((response) => {
        setBuses(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the buses!', error);
      });
  };

  const handleEditClick = (id) => {
    const booking = bookings.find((b) => b.id === id);
    setNewBooking({
      ...booking,
      bookingDate: new Date(booking.bookingDate),
      userId: booking.user.id,
      busId: booking.bus.id,
      seats: booking.seats || []
    });
    setEditId(id);
    setShow(true);
    setIsAdding(false);
  };

  const handleSaveClick = () => {
    const payload = {
      ...newBooking,
      user: { id: parseInt(newBooking.userId, 10) },
      bus: { id: parseInt(newBooking.busId, 10) },
      bookingDate: newBooking.bookingDate.toISOString().split('T')[0]
    };

    if (editId) {
      axios.put(`http://localhost:8081/booking/update/${newBooking.id}`, payload)
        .then((response) => {
          setBookings((prevBookings) =>
            prevBookings.map((b) => (b.id === newBooking.id ? response.data : b))
          );
          alert('Booking updated successfully!');
          setShow(false);
          setEditId(null);
        })
        .catch((error) => {
          console.error('There was an error updating the booking!', error);
        });
    } else {
      axios.post('http://localhost:8081/booking/', payload)
        .then((response) => {
          setBookings((prevBookings) => [...prevBookings, response.data]);
          alert('Booking added successfully!');
          setShow(false);
        })
        .catch((error) => {
          console.error('There was an error adding the booking!', error);
        });
    }
  };

  const handleDeleteClick = (id) => {
    axios.delete(`http://localhost:8081/booking/${id}`)
      .then(() => {
        setBookings((prevBookings) => prevBookings.filter((b) => b.id !== id));
        alert('Booking deleted successfully!');
      })
      .catch((error) => {
        console.error('There was an error deleting the booking!', error);
      });
  };

  const handleClose = () => {
    setShow(false);
    setIsAdding(false);
    setEditId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBooking((prevBooking) => ({ ...prevBooking, [name]: value }));
  };

  const handleDateChange = (date) => {
    setNewBooking((prevBooking) => ({ ...prevBooking, bookingDate: date }));
  };

  const handleSeatChange = (index, field, value) => {
    const updatedSeats = [...newBooking.seats];
    updatedSeats[index] = { ...updatedSeats[index], [field]: value };
    setNewBooking((prevBooking) => ({ ...prevBooking, seats: updatedSeats }));
  };

  const addSeat = () => {
    setNewBooking((prevBooking) => ({
      ...prevBooking,
      seats: [...prevBooking.seats, { seatNumber: '', isBooked: false }]
    }));
  };

  const removeSeat = (index) => {
    setNewBooking((prevBooking) => ({
      ...prevBooking,
      seats: prevBooking.seats.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="container mt-4">
      <Button
        variant="primary"
        onClick={() => {
          setNewBooking({
            bookingDate: null,
            status: '',
            paymentStatus: '',
            fare: '',
            userId: '',
            busId: '',
            seats: []
          });
          setShow(true);
          setIsAdding(true);
        }}
        className="mb-3"
      >
        Add Booking
      </Button>

      {bookings.length === 0 ? (
        <p>No bookings available.</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Booking Date</th>
              <th>Status</th>
              <th>Payment Status</th>
              <th>Fare</th>
              <th>User ID</th>
              <th>Bus ID</th>
              <th>Seats</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.id}</td>
                <td>{new Date(booking.bookingDate).toLocaleDateString()}</td>
                <td>{booking.status}</td>
                <td>{booking.paymentStatus}</td>
                <td>{booking.fare}</td>
                <td>{booking.user.id}</td>
                <td>{booking.bus.id}</td>
                <td>
                  {booking.seats.map((seat) => (
                    <div key={seat.id}>
                      {seat.seatNumber} ({seat.isBooked ? 'Booked' : 'Available'})
                    </div>
                  ))}
                </td>
                <td>
                  <Button
                    variant="info"
                    onClick={() => handleEditClick(booking.id)}
                    className="me-2"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteClick(booking.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Modal for adding/editing booking */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{isAdding ? 'Add New Booking' : 'Edit Booking'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Booking Date</Form.Label>
              <DatePicker
                selected={newBooking.bookingDate}
                onChange={handleDateChange}
                className="form-control"
                dateFormat="MM/dd/yyyy"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <FormControl
                name="status"
                value={newBooking.status || ''}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Payment Status</Form.Label>
              <FormControl
                name="paymentStatus"
                value={newBooking.paymentStatus || ''}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Fare</Form.Label>
              <FormControl
                type="number"
                name="fare"
                value={newBooking.fare || ''}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>User ID</Form.Label>
              <FormControl
                as="select"
                name="userId"
                value={newBooking.userId}
                onChange={handleChange}
              >
                <option value="">Select User</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name} (ID: {user.id})
                  </option>
                ))}
              </FormControl>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Bus ID</Form.Label>
              <FormControl
                as="select"
                name="busId"
                value={newBooking.busId}
                onChange={handleChange}
              >
                <option value="">Select Bus</option>
                {buses.map((bus) => (
                  <option key={bus.id} value={bus.id}>
                    Bus {bus.id} - {bus.licensePlate}
                  </option>
                ))}
              </FormControl>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Seats</Form.Label>
              {newBooking.seats.map((seat, index) => (
                <div key={index} className="mb-2">
                  <InputGroup>
                    <FormControl
                      placeholder="Seat Number"
                      value={seat.seatNumber}
                      onChange={(e) => handleSeatChange(index, 'seatNumber', e.target.value)}
                    />
                    <InputGroup.Checkbox
                      checked={seat.isBooked}
                      onChange={(e) => handleSeatChange(index, 'isBooked', e.target.checked)}
                    />
                    <Button variant="danger" onClick={() => removeSeat(index)}>
                      Remove
                    </Button>
                  </InputGroup>
                </div>
              ))}
              <Button variant="secondary" onClick={addSeat}>
                Add Seat
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveClick}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Bookings;

