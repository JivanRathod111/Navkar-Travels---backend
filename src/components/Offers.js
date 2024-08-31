import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button, Typography, Container, Box } from '@mui/material';

const offers = [
  {
    id: 1,
    title: 'Flat 50% Off',
    description: 'Get 50% off on your next bus booking!',
    gradient: 'linear-gradient(to right, #ff7e5f, #feb47b)', // Gradient example
  },
  {
    id: 2,
    title: 'Buy 1 Get 1 Free',
    description: 'Book one ticket and get the second one absolutely free!',
    gradient: 'linear-gradient(to right, #43cea2, #185a9d)', // Gradient example
  },
  {
    id: 3,
    title: '20% Cashback',
    description: 'Earn 20% cashback on all bookings made with our app.',
    gradient: 'linear-gradient(to right, #00c6ff, #0072ff)', // Gradient example
  },
];

const Offers = () => {
  return (
    <Container sx={{marginTop:"-30px",padding:"10px",background:"#ccc",borderRadius:"8px", marginBottom:"10px"}}>
      <Typography variant="h4" align="center" gutterBottom sx={{color : "black", margin:"30px"}}>
        Special Offers
      </Typography>
      <Carousel sx={{height:"350px"}}>
        {offers.map((offer) => (
          <Paper
            key={offer.id}
            style={{
              position: 'relative',
              height: '300px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: offer.gradient,
              color: 'white',
              padding: '20px',
              borderRadius: '8px',
            }}
          >
            <div
              style={{
                textAlign: 'center',
                maxWidth: '80%',
              }}
            >
              <Typography variant="h5" gutterBottom>
                {offer.title}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {offer.description}
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                style={{ marginTop: '10px' }}
              >
                Book Now
              </Button>
            </div>
          </Paper>
        ))}
      </Carousel>
    </Container>
  );
};

export default Offers;

