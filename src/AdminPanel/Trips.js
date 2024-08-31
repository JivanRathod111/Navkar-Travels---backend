import React from 'react';
import axios from 'axios';
import { Button, Table, Form, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// Form Component for Adding/Editing Trips
const TripForm = ({ formValues, onInputChange, onSave, onClose, isEditing, buses }) => {
  return (
    <Form>
      <Form.Group controlId="startPoint">
        <Form.Label>Start Point</Form.Label>
        <Form.Control
          type="text"
          name="startPoint"
          value={formValues.startPoint}
          onChange={onInputChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="endPoint">
        <Form.Label>End Point</Form.Label>
        <Form.Control
          type="text"
          name="endPoint"
          value={formValues.endPoint}
          onChange={onInputChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="tripDate">
        <Form.Label>Trip Date</Form.Label>
        <Form.Control
          type="date"
          name="tripDate"
          value={formValues.tripDate}
          onChange={onInputChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="departureTime">
        <Form.Label>Departure Time</Form.Label>
        <Form.Control
          type="datetime-local"
          name="departureTime"
          value={formValues.departureTime}
          onChange={onInputChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="arrivalTime">
        <Form.Label>Arrival Time</Form.Label>
        <Form.Control
          type="datetime-local"
          name="arrivalTime"
          value={formValues.arrivalTime}
          onChange={onInputChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="availableSeats">
        <Form.Label>Available Seats</Form.Label>
        <Form.Control
          type="number"
          name="availableSeats"
          value={formValues.availableSeats}
          onChange={onInputChange}
          min="0"
          required
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
        <Button variant="primary" onClick={onSave}>{isEditing ? 'Update Trip' : 'Add Trip'}</Button>
      </Modal.Footer>
    </Form>
  );
};

const Trips = () => {
  const [trips, setTrips] = React.useState([]);
  const [buses, setBuses] = React.useState([]);
  const [showDialog, setShowDialog] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);
  const [currentTrip, setCurrentTrip] = React.useState(null);
  const [formValues, setFormValues] = React.useState({
    startPoint: '',
    endPoint: '',
    tripDate: '',
    departureTime: '',
    arrivalTime: '',
    availableSeats: '',
    busId: ''
  });

  const fetchTrips = async () => {
    try {
      const response = await axios.get('http://localhost:8081/trip/');
      setTrips(response.data);
    } catch (error) {
      console.error('There was an error fetching the trips!', error);
    }
  };

  const fetchBuses = async () => {
    try {
      const response = await axios.get('http://localhost:8081/bus/');
      setBuses(response.data);
    } catch (error) {
      console.error('There was an error fetching the buses!', error);
    }
  };

  React.useEffect(() => {
    fetchTrips();
    fetchBuses();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  const openDialog = (trip = null) => {
    setIsEditing(!!trip);
    setCurrentTrip(trip);
    setFormValues(trip ? {
      startPoint: trip.startPoint,
      endPoint: trip.endPoint,
      tripDate: trip.tripDate,
      departureTime: trip.departureTime,
      arrivalTime: trip.arrivalTime,
      availableSeats: trip.availableSeats,
      busId: trip.bus ? trip.bus.id : ''
    } : {
      startPoint: '',
      endPoint: '',
      tripDate: '',
      departureTime: '',
      arrivalTime: '',
      availableSeats: '',
      busId: ''
    });
    setShowDialog(true);
  };

  const closeDialog = () => setShowDialog(false);

  const handleSave = async () => {
    const validatedFormValues = {
      startPoint: formValues.startPoint || '',
      endPoint: formValues.endPoint || '',
      tripDate: formValues.tripDate || '',
      departureTime: formValues.departureTime || '',
      arrivalTime: formValues.arrivalTime || '',
      availableSeats: formValues.availableSeats || 0,
      bus: formValues.busId ? { id: parseInt(formValues.busId, 10) } : null
    };
  
    try {
      if (isEditing && currentTrip) {
        const response = await axios.put(`http://localhost:8081/trip/${currentTrip.id}`, validatedFormValues);
        setTrips(trips.map(trip => trip.id === response.data.id ? response.data : trip));
        // Replace alert with more sophisticated feedback if needed
        alert('Trip updated successfully!');
      } else {
        const response = await axios.post('http://localhost:8081/trip/', validatedFormValues);
        setTrips([...trips, response.data]);
        // Replace alert with more sophisticated feedback if needed
        alert('Trip added successfully!');
      }
      closeDialog();
    } catch (error) {
      console.error('There was an error saving the trip!', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/trip/${id}`);
      setTrips(trips.filter(trip => trip.id !== id));
      // Replace alert with more sophisticated feedback if needed
      alert('Trip deleted successfully!');
    } catch (error) {
      console.error('There was an error deleting the trip!', error);
    }
  };

  return (
    <div className="container">
      <Button variant="primary" onClick={() => openDialog()}>Add New Trip</Button>

      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Start Point</th>
            <th>End Point</th>
            <th>Trip Date</th>
            <th>Departure Time</th>
            <th>Arrival Time</th>
            <th>Available Seats</th>
            <th>Bus ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {trips.map(trip => (
            <tr key={trip.id}>
              <td>{trip.id}</td>
              <td>{trip.startPoint}</td>
              <td>{trip.endPoint}</td>
              <td>{trip.tripDate}</td>
              <td>{trip.departureTime}</td>
              <td>{trip.arrivalTime}</td>
              <td>{trip.availableSeats}</td>
              <td>{trip.bus ? trip.bus.id : 'N/A'}</td>
              <td>
                <Button variant="warning" onClick={() => openDialog(trip)} className="me-2">Edit</Button>
                <Button variant="danger" onClick={() => handleDelete(trip.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Dialog for adding/editing trips */}
      <Modal show={showDialog} onHide={closeDialog}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Edit Trip' : 'Add New Trip'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TripForm
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

export default Trips;
