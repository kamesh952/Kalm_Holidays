import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Snackbar,
  Alert,
  IconButton
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import '@fontsource/poppins';

const destinations = [
  { id: 1, img: 'swit.webp', label: 'Switzerland - Snowy Peaks', price: '₹1,02,000' },
  { id: 2, img: 'japan.jpg', label: 'Japan - Cherry Blossoms', price: '₹1,27,500' },
  { id: 3, img: 'duabi.jpg', label: 'Dubai - Luxury Redefined', price: '₹1,53,000' },
  { id: 4, img: 'egypt.jpg', label: 'Egypt - Ancient Wonders', price: '₹80,750' },
  { id: 5, img: 'italy.jpg', label: 'Italy - Cultural Delight', price: '₹93,500' },
  { id: 6, img: 'australia.jpg', label: 'Australia - Scenic Coastlines', price: '₹1,87,000' },
  { id: 7, img: 'thialan.avif', label: 'Thailand - Beach Paradise', price: '₹72,250' },
  { id: 8, img: 'malaysia.jpg', label: 'Malaysia - Urban Adventures', price: '₹76,500' },
  { id: 9, img: 'swit.avif', label: 'Switzerland-Land of Joy', price: '₹1,10,500' },
  { id: 10, img: 'spain.jpg', label: 'Spain - Acheive Your Dreams', price: '₹76,500' },
  { id: 11, img: 'germany.jpeg', label: 'Germany-A Land Of Techs', price: '₹1,10,500' },
  { id: 12, img: 'china.jpg', label: 'China-A Competitor to India', price: '₹1,10,500' },
];

const TrendingDestinations = () => {
  const [bookedDestinations, setBookedDestinations] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  // Load booked destinations from local storage on component mount
  useEffect(() => {
    const loadBookings = () => {
      const storedBookings = localStorage.getItem('bookedDestinations');
      if (storedBookings) {
        try {
          setBookedDestinations(JSON.parse(storedBookings));
        } catch (error) {
          console.error("Error parsing booked destinations:", error);
        }
      }
    };

    loadBookings();
    
    // Listen for booking updates
    window.addEventListener('bookingsUpdated', loadBookings);
    
    return () => {
      window.removeEventListener('bookingsUpdated', loadBookings);
    };
  }, []);
  
  // Load wishlist from local storage
  useEffect(() => {
    const loadWishlist = () => {
      const storedWishlist = localStorage.getItem('wishlistDestinations');
      if (storedWishlist) {
        try {
          setWishlist(JSON.parse(storedWishlist));
        } catch (error) {
          console.error("Error parsing wishlist destinations:", error);
        }
      }
    };
    
    loadWishlist();
    
    // Listen for wishlist updates
    window.addEventListener('wishlistUpdated', loadWishlist);
    
    return () => {
      window.removeEventListener('wishlistUpdated', loadWishlist);
    };
  }, []);

  // Check if a destination is already booked
  const isDestinationBooked = (destId) => {
    return bookedDestinations.some(booking => booking.id === destId);
  };
  
  // Check if a destination is in wishlist
  const isInWishlist = (destId) => {
    return wishlist.some(item => item.id === destId);
  };

  // Handle booking a destination
  const handleBookDestination = (destination) => {
    if (isDestinationBooked(destination.id)) {
      setSnackbarMessage('This destination is already booked!');
      setSnackbarSeverity('warning');
      setOpenSnackbar(true);
      return;
    }

    const booking = {
      ...destination,
      bookingDate: new Date().toISOString(),
      bookingId: `BK-${Math.floor(Math.random() * 1000000)}`
    };

    const updatedBookings = [...bookedDestinations, booking];
    setBookedDestinations(updatedBookings);
    localStorage.setItem('bookedDestinations', JSON.stringify(updatedBookings));
    
    // Trigger an event for other components to update
    window.dispatchEvent(new CustomEvent('bookingsUpdated', { detail: { bookings: updatedBookings } }));
    
    setSnackbarMessage('Destination booked successfully!');
    setSnackbarSeverity('success');
    setOpenSnackbar(true);
  };
  
  // Toggle wishlist status for a destination
  const toggleWishlist = (destination) => {
    let updatedWishlist;
    
    if (isInWishlist(destination.id)) {
      // Remove from wishlist
      updatedWishlist = wishlist.filter(item => item.id !== destination.id);
      setSnackbarMessage(`${destination.label} removed from wishlist!`);
    } else {
      // Add to wishlist
      updatedWishlist = [...wishlist, destination];
      setSnackbarMessage(`${destination.label} added to wishlist!`);
    }
    
    setWishlist(updatedWishlist);
    localStorage.setItem('wishlistDestinations', JSON.stringify(updatedWishlist));
    
    // Trigger an event for other components to update
    window.dispatchEvent(new CustomEvent('wishlistUpdated', { detail: { wishlist: updatedWishlist } }));
    
    setSnackbarSeverity('success');
    setOpenSnackbar(true);
  };

  // Close snackbar
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box
      sx={{
        padding: '50px 5%',
        backgroundColor: '#f4f4f4',
        fontFamily: 'Poppins, sans-serif',
        boxSizing: 'border-box',
      }}
    >
      <Typography
        variant="h6"
        sx={{
          color: '#000000',
          textAlign: 'left',
          fontSize: '2rem',
          margin: '20px 0',
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 'bold',
        }}
      >
        Trending Destinations
      </Typography>
      <Grid
        container
        spacing={3}
        sx={{
          padding: '20px 0',
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(auto-fit, minmax(300px, 1fr))',
          },
          gap: '20px',
        }}
      >
        {destinations.map((dest) => (
          <Card
            key={dest.id}
            sx={{
              backgroundColor: '#fff',
              borderRadius: '12px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden',
              textAlign: 'left',
              padding: '10px',
              transition: 'transform 0.2s ease-in-out',
              '&:hover': {
                transform: 'scale(1.03)',
              },
            }}
          >
            <Box sx={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
              <CardMedia
                component="img"
                image={dest.img}
                alt={dest.label}
                sx={{ 
                  width: '100%', 
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center'
                }}
              />
              {/* Wishlist Heart Icon */}
              <IconButton 
                onClick={() => toggleWishlist(dest)}
                sx={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  backgroundColor: 'rgba(255, 255, 255, 0.7)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  }
                }}
              >
                {isInWishlist(dest.id) ? (
                  <FavoriteIcon sx={{ color: '#ff3366' }} />
                ) : (
                  <FavoriteBorderIcon sx={{ color: '#555' }} />
                )}
              </IconButton>
            </Box>
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: '15px',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                  marginBottom: '10px'
                }}
              >
                <Typography
                  sx={{
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    fontFamily: 'Poppins, sans-serif',
                  }}
                >
                  {dest.label}
                </Typography>
                <Typography
                  sx={{
                    fontSize: '1.1rem',
                    color: '#2874f0',
                    fontWeight: 'bold',
                    fontFamily: 'Poppins, sans-serif',
                  }}
                >
                  {dest.price}
                </Typography>
              </Box>
              <Button
                variant="contained"
                onClick={() => handleBookDestination(dest)}
                disabled={isDestinationBooked(dest.id)}
                sx={{
                  backgroundColor: isDestinationBooked(dest.id) ? '#cccccc' : '#2874f0',
                  color: '#fff',
                  padding: '10px 23px',
                  borderRadius: '10px',
                  fontSize: '1rem',
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: isDestinationBooked(dest.id) ? '#cccccc' : '#ffcc00',
                  },
                }}
              >
                {isDestinationBooked(dest.id) ? 'Booked' : 'Book Now'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </Grid>

      {/* Snackbar for notifications */}
      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={4000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbarSeverity} 
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default TrendingDestinations;