import React, { useState, useEffect } from 'react';

const BusDetails = () => {
  const [busData, setBusData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBusDetails = async () => {
      try {
        const response = await fetch('YOUR_BACKEND_API_URL'); // Replace with your API URL
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setBusData(data);
      } catch (error) {
        console.error('Error fetching bus details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBusDetails();
  }, []);

  if (loading) {
    return <div className="text-gray-500">Loading...</div>;
  }

  if (!busData) {
    return <div className="text-gray-500">No bus details available.</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800">{busData.operator} (Regd)</h2>
      <div className="flex justify-between mt-4 text-lg text-gray-700">
        <span>{busData.departure} - {busData.duration}</span>
        <span>{busData.arrival}</span>
      </div>
      <div className="mt-4 text-gray-600">
        <span>Seats available: {busData.seatsAvailable}</span>
      </div>
      <div className="mt-4 text-lg font-semibold text-gray-800">
        <span>Starts from INR {busData.fare}</span>
      </div>
      <div className="mt-4">
        <span className={`text-lg font-medium ${busData.redDeal ? 'text-green-600' : 'text-red-600'}`}>
          {busData.redDeal ? 'redDeal applied' : 'No redDeal'}
        </span>
      </div>
      <button className="mt-6 w-full bg-blue-600 text-white hover:bg-blue-700 p-3 rounded-lg font-semibold">
        VIEW SEATS
      </button>
    </div>
  );
};

export default BusDetails;

  