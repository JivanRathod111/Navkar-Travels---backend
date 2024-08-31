import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, Table, Container, Row, Col, Alert } from 'react-bootstrap';

const BusSeatManager = () => {
  const [busId, setBusId] = useState('');
  const [busSeats, setBusSeats] = useState([]);
  const [error, setError] = useState(null);

  const createSeatsForBus = async (busId) => {
    const busSeats = [];

    // Generate seats for the upper deck (U-01 to U-18)
    for (let i = 1; i <= 18; i++) {
      busSeats.push({
        seatNumber: `U-${i.toString().padStart(2, '0')}`,
        isBooked: false,
        bus: { id: parseInt(busId, 10) },
      });
    }

    // Generate seats for the lower deck (L-01 to L-18)
    for (let i = 1; i <= 18; i++) {
      busSeats.push({
        seatNumber: `L-${i.toString().padStart(2, '0')}`,
        isBooked: false,
        bus: { id: parseInt(busId, 10) },
      });
    }

    try {
      for (let seat of busSeats) {
        const response = await axios.post('http://localhost:8081/seat/', seat);
        setBusSeats((prevSeats) => [...prevSeats, response.data]);
      }

      alert('All seats created successfully!');
    } catch (error) {
      console.error('There was an error creating the seats!', error);
      setError('There was an error creating the seats!');
    }
  };

  const fetchSeatsForBus = async (busId) => {
    try {
      const response = await axios.get(`http://localhost:8081/seats?busId=${busId}`);
      setBusSeats(response.data);
    } catch (error) {
      console.error('There was an error fetching the seats!', error);
      setError('There was an error fetching the seats!');
    }
  };

  const handleCreateSeats = () => {
    if (busId) {
      createSeatsForBus(busId);
    } else {
      alert('Please enter a valid Bus ID');
    }
  };

  const handleShowSeats = () => {
    if (busId) {
      fetchSeatsForBus(busId);
    } else {
      alert('Please enter a valid Bus ID');
    }
  };

  return (
    <Container>
      <Row className="my-4">
        <Col>
          <h2>Bus Seat Manager</h2>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Form.Group controlId="busId">
            <Form.Label>Bus ID</Form.Label>
            <Form.Control
              type="text"
              value={busId}
              onChange={(e) => setBusId(e.target.value)}
              placeholder="Enter Bus ID"
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="my-3">
        <Col md={6}>
          <Button variant="primary" onClick={handleCreateSeats} className="me-2">
            Create Seats
          </Button>
          <Button variant="secondary" onClick={handleShowSeats}>
            Show All Seats
          </Button>
        </Col>
      </Row>

      {error && (
        <Row>
          <Col>
            <Alert variant="danger">{error}</Alert>
          </Col>
        </Row>
      )}

      {busSeats.length > 0 && (
        <Row className="my-4">
          <Col>
            <h3>Seats for Bus ID: {busId}</h3>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Seat Number</th>
                  <th>Is Booked</th>
                </tr>
              </thead>
              <tbody>
                {busSeats.map((seat) => (
                  <tr key={seat.seatNumber}>
                    <td>{seat.seatNumber}</td>
                    <td>{seat.isBooked ? 'Yes' : 'No'}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default BusSeatManager;
