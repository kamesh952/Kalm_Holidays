import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Button,
  Divider,
  IconButton,
  Snackbar,
  Alert
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Wishlist = ({ onClose }) => {
  const [wishlist, setWishlist] = useState([]);
  const [bookedDestinations, setBookedDestinations] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  // Load wishlist and bookings from local storage
  useEffect(() => {
    const loadWishlist = () => {
      const storedWishlist = localStorage.getItem('wishlistDestinations');
      if (storedWishlist) {
        try {
          setWishlist(JSON.parse(storedWishlist));
        } catch (error) {
          console.error("Error parsing wishlist:", error);
        }
      }
    };

    const loadBookings = () => {
      const storedBookings = localStorage.getItem('bookedDestinations');
      if (storedBookings) {
        try {
          setBookedDestinations(JSON.parse(storedBookings));
        } catch (error) {
          console.error("Error parsing bookings:", error);
        }
      }
    };

    loadWishlist();
    loadBookings();

    // Set up event listeners
    window.addEventListener('wishlistUpdated', loadWishlist);
    window.addEventListener('bookingsUpdated', loadBookings);
    
    return () => {
      window.removeEventListener('wishlistUpdated', loadWishlist);
      window.removeEventListener('bookingsUpdated', loadBookings);
    };
  }, []);

  // Check if a destination is already booked
  const isDestinationBooked = (destId) => {
    return bookedDestinations.some(booking => booking.id === destId);
  };

  // Remove from wishlist
  const removeFromWishlist = (destination) => {
    const updatedWishlist = wishlist.filter(item => item.id !== destination.id);
    setWishlist(updatedWishlist);
    localStorage.setItem('wishlistDestinations', JSON.stringify(updatedWishlist));
    
    // Trigger event for other components to update
    window.dispatchEvent(new CustomEvent('wishlistUpdated', { 
      detail: { wishlist: updatedWishlist } 
    }));
    
    setSnackbarMessage(`${destination.label} removed from wishlist`);
    setSnackbarSeverity('success');
    setOpenSnackbar(true);
  };

  // Book a destination
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

  // Navigate to explore
  const handleExplore = () => {
    if (onClose) {
      onClose();
    } else {
      window.location.href = '/';
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '900px',
        margin: '0 auto',
        padding: '20px',
        fontFamily: 'Poppins, sans-serif',
        position: 'relative'
      }}
    >
      {/* Header with close button */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px'
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 'bold',
            color: '#2874f0',
            fontFamily: 'Poppins, sans-serif'
          }}
        >
          My Wishlist
        </Typography>
        {onClose && (
          <IconButton onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        )}
      </Box>
      
      <Divider sx={{ marginBottom: '20px' }} />
      
      {wishlist.length === 0 ? (
        <Paper
          sx={{
            padding: '30px',
            textAlign: 'center',
            backgroundColor: '#f9f9f9',
            borderRadius: '12px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.05)'
          }}
        >
          <Typography variant="h6" color="textSecondary">
            Your wishlist is empty.
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#2874f0',
              marginTop: '15px',
              '&:hover': {
                backgroundColor: '#1a65db'
              }
            }}
            onClick={handleExplore}
          >
            Explore Destinations
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {wishlist.map((item) => (
            <Grid item xs={12} sm={6} md={6} key={item.id}>
              <Card
                sx={{
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 6px 12px rgba(0,0,0,0.15)',
                  }
                }}
              >
                {/* Image container with fixed dimensions */}
                <Box 
                  sx={{ 
                    position: 'relative',
                    width: '100%', 
                    height: '220px', 
                    overflow: 'hidden'
                  }}
                >
                  <CardMedia
                    component="img"
                    image={item.img}
                    alt={item.label}
                    sx={{ 
                      width: '100%', 
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center'
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      backgroundColor: 'rgba(40, 116, 240, 0.85)',
                      color: 'white',
                      padding: '4px 8px',
                      borderRadius: '0 0 0 8px',
                      fontWeight: 'bold'
                    }}
                  >
                    {item.price}
                  </Box>
                  <IconButton
                    onClick={() => removeFromWishlist(item)}
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
                    <FavoriteIcon sx={{ color: '#ff3366' }} />
                  </IconButton>
                </Box>
                
                <CardContent>
                  <Typography 
                    gutterBottom 
                    variant="h6"
                    sx={{
                      fontWeight: 'bold',
                      fontFamily: 'Poppins, sans-serif'
                    }}
                  >
                    {item.label}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ 
                      mb: 2,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {item.description || 'No description available'}
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      mt: 1
                    }}
                  >
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        backgroundColor: '#2874f0',
                        '&:hover': {
                          backgroundColor: '#1a65db'
                        }
                      }}
                      onClick={() => handleBookDestination(item)}
                      disabled={isDestinationBooked(item.id)}
                    >
                      {isDestinationBooked(item.id) ? 'Already Booked' : 'Book Now'}
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => removeFromWishlist(item)}
                      sx={{
                        borderColor: '#ff3366',
                        color: '#ff3366',
                        '&:hover': {
                          borderColor: '#e61a4d',
                          backgroundColor: 'rgba(255, 51, 102, 0.05)'
                        }
                      }}
                    >
                      Remove
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      
      {/* Snackbar for notifications */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setOpenSnackbar(false)} 
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Wishlist;