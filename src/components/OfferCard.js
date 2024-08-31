import React from 'react';

const OfferCard = ({ offer }) => {
    return (
        <div className="offer-card">
            <h3>{offer.title}</h3>
            <p>{offer.description}</p>
            <p><strong>Code:</strong> {offer.code}</p>
        </div>
    );
};

export default OfferCard;
