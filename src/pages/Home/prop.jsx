import React from 'react';
import { Box, Grid, Typography } from '@mui/material';

// Import Poppins font in your main file (like index.html or via CSS)
// If not already imported, you can include this in index.html:
// <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">

const propertyTypes = [
  { label: 'Hotels', image: 'HOTWLS.avif' },
  { label: 'Apartments', image: 'APPARTMENT.jpeg' },
  { label: 'Villas', image: 'VILLS.jpg' },
  { label: 'Resorts', image: 'RESORTS.jpg' },
];

const PropertySection = () => {
  return (
    <Box sx={{ backgroundColor: '#ffffff', px: '5%', py: '50px' }}>
      <Typography
        variant="h6"
        sx={{
          fontSize: '2rem',
          color: '#000000',
          textAlign: 'left',
          ml: '20px',
          mb: 3,
          fontFamily: 'Poppins, sans-serif', // Apply Poppins font
          fontWeight: 600,
        }}
      >
        Stays
      </Typography>

      <Grid
        container
        spacing={2}
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        }}
      >
        {propertyTypes.map((property, index) => (
          <Box
            key={index}
            sx={{
              textAlign: 'center',
              overflow: 'hidden',
            }}
          >
            <Box
              component="img"
              src={property.image}
              alt={property.label}
              sx={{
                width: '90%',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.03)',
                },
              }}
            />
            <Typography
              sx={{
                fontSize: '18px',
                mt: '10px',
                fontWeight: 'bold',
                fontFamily: 'Poppins, sans-serif',
              }}
            >
              {property.label}
            </Typography>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default PropertySection;
