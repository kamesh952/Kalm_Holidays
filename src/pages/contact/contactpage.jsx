import React from 'react';
import { Box, Typography, Button, Grid, Card, CardContent } from '@mui/material';
import { Phone, Email } from '@mui/icons-material';
import { styled } from '@mui/system';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Create a theme that doesn't affect global styles
const theme = createTheme({
  typography: {
    fontFamily: [
      'Playfair Display',
      'serif'
    ].join(','),
    h2: {
      fontSize: '2.5rem',
      color: '#003580',
    },
    h5: {
      fontSize: '1.25rem',
    },
    body1: {
      fontSize: '1.125rem',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: "'Poppins', serif",
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '24px',
          '&:last-child': {
            paddingBottom: '24px',
          },
        },
      },
    },
  },
});

const OfficeCard = styled(Card)(({ theme }) => ({
  marginTop: '60px',
  background: 'white',
  borderRadius: '10px',
  boxShadow: '6px 4px 6px rgba(0, 0, 0, 0.1)',
  width: '350px',
  height: '100%',
  minHeight: '320px',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
}));

const ContactLink = styled('a')({
  textDecoration: 'none',
  color: '#ff8c00',
  fontWeight: 'bold',
  display: 'block',
  marginBottom: '10px',
  fontFamily: "'Playfair Display', serif",
});

const StyledButton = styled(Button)({
  fontFamily: "'Poppins', serif",
  background: '#0357cc',
  color: 'rgb(255, 255, 255)',
  padding: '10px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontWeight: 'bold',
  textAlign: 'center',
  display: 'block',
  width: '100%',
  marginTop: 'auto',
  '&:hover': {
    background: '#e0a800',
  },
});

const BranchesPage = () => {
  const branches = [
    {
      city: 'MUMBAI',
      address: 'The Boardroom Modi House, 1st Floor, Near Fun Republic, Mumbai, India – 400058.',
      phone: '+91 9940882200',
      email: 'kalmholidays45@gmail.com'
    },
    {
      city: 'HYDERABAD',
      address: '108, Workafella, Opp to Taj Deccan Hotel, Hyderabad, India – 500082.',
      phone: '+91 9940882200',
      email: 'kalmholidays45@gmail.com'
    },
    {
      city: 'BANGALORE',
      address: 'Novel Tech Park, Opposite 1 MG Mall, Bangalore, India – 560042.',
      phone: '+91 9940882200',
      email: 'kalmholidays45@gmail.com'
    },
    {
      city: 'CHENNAI',
      address: 'No.1, Gemini Parson Complex, Kodambakkam High Road, Chennai, India – 600006.',
      phone: '+91 9940882200',
      email: 'kalmholidays45@gmail.com'
    },
    {
      city: 'COIMBATORE',
      address: '2nd Floor, Diwan Bahadur Road, Coimbatore, India – 641002.',
      phone: '+91 9940882200',
      email: 'kalmholidays45@gmail.com'
    },
    {
      city: 'ERODE',
      address: 'No. 84/1, Perundurai Road, Opposite to Collectorate, Erode, India – 638011.',
      phone: '+91 9940882200',
      email: 'kalmholidays45@gmail.com'
    }
  ];

  return (
    // Removed ThemeProvider to avoid global style conflicts
    <Box sx={{ 
      backgroundColor: '#f9f9f9',
      padding: '20px',
      // Removed minHeight: '100vh' which could cause layout issues
    }}>
      <Typography variant="h2" sx={{ 
        textAlign: 'center',
        marginBottom: '40px',
        fontFamily: "'Playfair Display', serif", // Explicitly set font family
        color: '#003580' // Explicitly set color
      }}>
        Branches Over the State
      </Typography>
      
      <Grid container spacing={3} sx={{ 
        maxWidth: '1400px',
        margin: '0 auto',
        marginBottom: '60px',
        justifyContent: 'center'
      }}>
        {branches.map((branch, index) => (
          <Grid item key={index} xs={12} sm={6} lg={4}>
            <OfficeCard>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" component="h3" sx={{ 
                  marginBottom: '10px',
                  fontFamily: "'Playfair Display', serif" // Explicitly set font family
                }}>
                  {branch.city}
                </Typography>
                <Typography variant="body1" sx={{ 
                  color: '#555', 
                  marginBottom: '5px',
                  fontFamily: "'Playfair Display', serif" // Explicitly set font family 
                }}>
                  {branch.address}
                </Typography>
                <ContactLink href={`tel:${branch.phone}`}>
                  <Phone sx={{ verticalAlign: 'middle', marginRight: '5px' }} />
                  {branch.phone}
                </ContactLink>
                <ContactLink href={`mailto:${branch.email}`}>
                  <Email sx={{ verticalAlign: 'middle', marginRight: '5px' }} />
                  {branch.email}
                </ContactLink>
              </CardContent>
              <Box sx={{ padding: '0 24px 24px' }}>
                <StyledButton variant="contained">
                  OFFICE DETAILS
                </StyledButton>
              </Box>
            </OfficeCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BranchesPage;