import React from 'react';
import { Form, Modal, Button } from 'react-bootstrap';

const SeatForm = ({ formValues, onInputChange, onSave, onClose, isEditing, buses, bookings }) => {
  return (
    <Form>
      <Form.Group controlId="seatNumber">
        <Form.Label>Seat Number</Form.Label>
        <Form.Control
          type="text"
          name="seatNumber"
          value={formValues.seatNumber}
          onChange={onInputChange}
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
        >
          <option value="">Select a Bus</option>
          {buses.map(bus => (
            <option key={bus.id} value={bus.id}>
              {bus.busNumber} - {bus.model}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="bookingId">
        <Form.Label>Booking</Form.Label>
        <Form.Control
          as="select"
          name="bookingId"
          value={formValues.bookingId}
          onChange={onInputChange}
        >
          <option value="">Select a Booking</option>
          {bookings.map(booking => (
            <option key={booking.id} value={booking.id}>
              Booking {booking.id}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={onSave}>
          {isEditing ? 'Update Seat' : 'Add Seat'}
        </Button>
      </Modal.Footer>
    </Form>
  );
};

export default SeatForm;
