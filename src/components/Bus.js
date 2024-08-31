import React from 'react';


const Bus = () => {
  // Function to render a row of seats
  const renderRow = (rowLetter) => {
    // If rowLetter is 'B', return an empty div for the empty row
    if (rowLetter === 'B') {
      return <div className="empty-row" key={rowLetter}></div>;
    }

    // Render a row of seats
    return (
      <div className="row" key={rowLetter}>
        {Array.from({ length: 6 }).map((_, index) => (
          <div className="seat" key={index}>
            {rowLetter}{index + 1}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bus">
      <div className="deck">
        <h2>Lower Deck</h2>
        <div className="grid-container">
          {['A', 'B', 'C', 'D'].map((row) => renderRow(row))}
        </div>
      </div>
      <div className="deck">
        <h2>Upper Deck</h2>
        <div className="grid-container">
          {['A', 'B', 'C', 'D'].map((row) => renderRow(row))}
        </div>
      </div>
    </div>
  );
};

export default Bus;
