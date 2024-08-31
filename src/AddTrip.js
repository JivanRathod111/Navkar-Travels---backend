import React, { useState } from "react";
import axios from "axios";

function AddTrip() {
  const [startPoint, setStartPoint] = useState("");
  const [endPoint, setEndPoint] = useState("");
  const [tripDate, setTripDate] = useState("");
  const [status, setStatus] = useState("");
  const [busId, setBusId] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const handleAddTrip = async () => {
    try {
      const response = await axios.post("http://localhost:8080/add", {
        startPoint,
        endPoint,
        tripDate,
        status,
        bus: { id: busId } // Assuming bus ID is provided
      });
      setResponseMessage(`Trip added successfully: ${JSON.stringify(response.data)}`);
    } catch (err) {
      console.error("Error adding trip:", err);
      setResponseMessage("An error occurred while adding the trip.");
    }
  };

  return (
    <div>
      <h2>Add New Trip</h2>
      <label>From</label>
      <input
        type="text"
        value={startPoint}
        onChange={(e) => setStartPoint(e.target.value)}
      />
      <label>To</label>
      <input
        type="text"
        value={endPoint}
        onChange={(e) => setEndPoint(e.target.value)}
      />
      <label>Date</label>
      <input
        type="datetime-local"
        value={tripDate}
        onChange={(e) => setTripDate(e.target.value)}
      />
      <label>Status</label>
      <input
        type="text"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      />
      <label>Bus ID</label>
      <input
        type="number"
        value={busId}
        onChange={(e) => setBusId(e.target.value)}
      />
      <button onClick={handleAddTrip}>Add Trip</button>
      <p>{responseMessage}</p>
    </div>
  );
}

export default AddTrip;
