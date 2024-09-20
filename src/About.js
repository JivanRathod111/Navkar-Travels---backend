import React from 'react';
import { Box, Typography, Container, Grid, Paper, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';

// Sample images URLs for demonstration
const imageUrls = [
  '../images/image (1).png',
  '../images/image (2).png',
  '../images/image (3).png',
 
];

// Styled components for better layout
const Header = styled(Box)(({ theme }) => ({
  backgroundColor: "#b85042",
  color: theme.palette.common.white,
  padding: theme.spacing(4),
  textAlign: 'center',
}));

const Section = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
}));

const TeamMember = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const About = () => {
  return (
    <div style={{height:"auto" , padding:"50px"}}>
      <Container >
      <Header sx={{borderRadius:"8px"}}>
        <Typography variant="h2">About Us</Typography>
        <Typography variant="h6">Providing Quality Bus Services Since 2020</Typography>
      </Header>

      <Section>
        <Container>
          <Typography variant="h4" gutterBottom>
            Our Mission
          </Typography>
          <Typography variant="body1" paragraph>
            We are committed to delivering top-notch bus services that ensure comfort, safety, and reliability for all our passengers. Our fleet of modern buses and dedicated staff work tirelessly to make your journey pleasant and memorable.
          </Typography>

          <Grid container spacing={4}>
            {imageUrls.map((url, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
                  <img src={url} alt={`Bus ${index + 1}`} style={{ width: '100%', borderRadius: '8px' }} />
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Section>

      <Section bgcolor="#f4f4f4" borderRadius="8px">
        <Container>
          <Typography variant="h4" gutterBottom>
            Meet Our Team
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={4}>
              <TeamMember elevation={3}>
                <Avatar
                  src="https://randomuser.me/api/portraits/men/1.jpg"
                  alt="Team Member 1"
                  sx={{ width: 100, height: 100, margin: 'auto' }}
                />
                <Typography variant="h6">John Doe</Typography>
                <Typography variant="body2">CEO</Typography>
              </TeamMember>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TeamMember elevation={3}>
                <Avatar
                  src="https://randomuser.me/api/portraits/women/2.jpg"
                  alt="Team Member 2"
                  sx={{ width: 100, height: 100, margin: 'auto' }}
                />
                <Typography variant="h6">Jane Smith</Typography>
                <Typography variant="body2">Operations Manager</Typography>
              </TeamMember>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TeamMember elevation={3}>
                <Avatar
                  src="https://randomuser.me/api/portraits/men/3.jpg"
                  alt="Team Member 3"
                  sx={{ width: 100, height: 100, margin: 'auto' }}
                />
                <Typography variant="h6">Mike Johnson</Typography>
                <Typography variant="body2">Customer Support</Typography>
              </TeamMember>
            </Grid>
          </Grid>
        </Container>
      </Section>
      </Container>
    </div>
  );
};

export default About;

