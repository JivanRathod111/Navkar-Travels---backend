import React, { useState } from 'react';
import axios from 'axios';
import { Button, Table, Form, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import BusSeatManager from './BusSeatManager';

// Form Component for Adding/Editing Seats
const SeatForm = ({ formValues, onInputChange, onSave, onClose, isEditing, buses }) => {
  return (
    <Form>
      <Form.Group controlId="seatNumber">
        <Form.Label>Seat Number</Form.Label>
        <Form.Control
          type="text"
          name="seatNumber"
          value={formValues.seatNumber}
          onChange={onInputChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="isBooked">
        <Form.Label>Is Booked</Form.Label>
        <Form.Check
          type="checkbox"
          name="isBooked"
          checked={formValues.isBooked}
          onChange={onInputChange}
        />
      </Form.Group>
      <Form.Group controlId="busId">
        <Form.Label>Bus</Form.Label>
        <Form.Control
          as="select"
          name="busId"
          value={formValues.busId}
          onChange={onInputChange}
          required
        >
          <option value="">Select a Bus</option>
          {Array.isArray(buses) && buses.map(bus => (
            <option key={bus.id} value={bus.id}>{bus.id} - {bus.busNumber}</option>
          ))}
        </Form.Control>
      </Form.Group>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Close</Button>
        <Button variant="primary" onClick={onSave}>{isEditing ? 'Update Seat' : 'Add Seat'}</Button>
      </Modal.Footer>
    </Form>
  );
};

const Seats = () => {
  const [seats, setSeats] = React.useState([]);
  const [buses, setBuses] = React.useState([]);
  const [busId, setBusId] = useState('');
  const [busSeats, setBusSeats] = useState([]);
  const [showDialog, setShowDialog] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);
  const [currentSeat, setCurrentSeat] = React.useState(null);
  const [formValues, setFormValues] = React.useState({
    seatNumber: '',
    isBooked: false,
    busId: ''
  });

  const fetchSeats = async () => {
    try {
      const response = await axios.get('http://localhost:8081/seat/');
      setSeats(response.data);
    } catch (error) {
      console.error('There was an error fetching the seats!', error);
    }
  };

  const fetchBuses = async () => {
    try {
      const response = await axios.get('http://localhost:8081/bus/');
      if (Array.isArray(response.data)) {
        setBuses(response.data);
      }
    } catch (error) {
      console.error('There was an error fetching the buses!', error);
    }
  };

  React.useEffect(() => {
    fetchSeats();
    fetchBuses();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const openDialog = (seat = null) => {
    setIsEditing(!!seat);
    setCurrentSeat(seat);
    setFormValues(seat ? {
      seatNumber: seat.seatNumber,
      isBooked: seat.isBooked,
      busId: seat.bus ? seat.bus.id : '',
    } : {
      seatNumber: '',
      isBooked: false,
      busId: ''
    });
    setShowDialog(true);
  };

  const closeDialog = () => setShowDialog(false);
  
const handleSave = async () => {
    const validatedFormValues = {
      seatNumber: formValues.seatNumber.trim(),
      isBooked: formValues.isBooked,
      bus: formValues.busId ? { id: parseInt(formValues.busId, 10) } : null
    };

    try {
      if (isEditing && currentSeat) {
        const response = await axios.put(`http://localhost:8081/seat/${currentSeat.id}`, validatedFormValues);
        setSeats(seats.map(seat => seat.id === response.data.id ? response.data : seat));
        alert('Seat updated successfully!');
      } else {
        const response = await axios.post('http://localhost:8081/seat/', validatedFormValues);
        setSeats([...seats, response.data]);
        alert('Seat added successfully!');
      }
      closeDialog();
    } catch (error) {
      console.error('There was an error saving the seat!', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/seat/${id}`);
      setSeats(seats.filter(seat => seat.id !== id));
      alert('Seat deleted successfully!');
    } catch (error) {
      console.error('There was an error deleting the seat!', error);
    }
  };

  return (
    <div className="container">
      <BusSeatManager/>
      <Button variant="primary" onClick={() => openDialog()}>Add New Seat</Button>
      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Seat Number</th>
            <th>Is Booked</th>
            <th>Bus ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {seats.map(seat => (
            <tr key={seat.id}>
              <td>{seat.id}</td>
              <td>{seat.seatNumber}</td>
              <td>{seat.isBooked ? 'Yes' : 'No'}</td>
              <td>{seat.bus ? seat.bus.id : 'N/A'}</td>
              <td>
                <Button variant="warning" onClick={() => openDialog(seat)} className="me-2">Edit</Button>
                <Button variant="danger" onClick={() => handleDelete(seat.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Dialog for adding/editing seats */}
      <Modal show={showDialog} onHide={closeDialog}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Edit Seat' : 'Add New Seat'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SeatForm
            formValues={formValues}
            onInputChange={handleInputChange}
            onSave={handleSave}
            onClose={closeDialog}
            isEditing={isEditing}
            buses={buses}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Seats;

