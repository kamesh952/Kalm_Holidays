import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Button,
  Snackbar,
  Alert
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import '@fontsource/poppins';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  // Load bookings from local storage
  const loadBookings = () => {
    console.log("Loading bookings from localStorage");
    const storedBookings = localStorage.getItem('bookedDestinations');
    if (storedBookings) {
      try {
        const parsedBookings = JSON.parse(storedBookings);
        console.log("Bookings loaded:", parsedBookings);
        setBookings(parsedBookings);
      } catch (error) {
        console.error("Error parsing booked destinations:", error);
        setBookings([]);
        setSnackbarMessage("Error loading bookings. Please try refreshing the page.");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      }
    } else {
      console.log("No bookings found in localStorage");
      setBookings([]);
    }
  };

  useEffect(() => {
    loadBookings();
    
    // Listen for booking updates from other components
    const handleBookingsUpdate = (event) => {
      console.log("bookingsUpdated event received", event.detail);
      loadBookings();
    };
    
    window.addEventListener('bookingsUpdated', handleBookingsUpdate);
    
    return () => {
      window.removeEventListener('bookingsUpdated', handleBookingsUpdate);
    };
  }, []);

  // Handle cancel booking
  const handleCancelBooking = (booking) => {
    console.log("Cancelling booking:", booking);
    try {
      // Get current bookings from localStorage
      const currentBookings = JSON.parse(localStorage.getItem('bookedDestinations')) || [];
      
      // Filter out the booking to cancel
      const updatedBookings = currentBookings.filter(
        item => item.bookingId !== booking.bookingId && item.id !== booking.id
      );
      
      console.log("Updated bookings after cancellation:", updatedBookings);
      
      // Update localStorage first
      localStorage.setItem('bookedDestinations', JSON.stringify(updatedBookings));
      
      // Update state
      setBookings(updatedBookings);
      
      // Notify other components
      const event = new CustomEvent('bookingsUpdated', { 
        detail: { bookings: updatedBookings } 
      });
      console.log("Dispatching bookingsUpdated event:", event);
      window.dispatchEvent(event);
      
      setSnackbarMessage(`Booking for ${booking.label} cancelled successfully!`);
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error cancelling booking:", error);
      setSnackbarMessage("Error cancelling booking. Please try again.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  // Close snackbar
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  // Format booking date
  const formatBookingDate = (dateString) => {
    try {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Unknown date";
    }
  };

  return (
    <Box
      sx={{
        padding: '50px 5%',
        backgroundColor: '#f8f9fa',
        fontFamily: 'Poppins, sans-serif',
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
        My Bookings
      </Typography>

      {bookings.length === 0 ? (
        <Card
          sx={{
            padding: '30px',
            textAlign: 'center',
            borderRadius: '12px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Typography variant="h6">No bookings found</Typography>
          <Typography variant="body1" sx={{ mt: 2, color: '#666' }}>
            Start exploring our trending destinations and book your next adventure!
          </Typography>
        </Card>
      ) : (
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
          {bookings.map((booking) => (
            <Card
              key={booking.bookingId || booking.id}
              sx={{
                backgroundColor: '#fff',
                borderRadius: '12px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                overflow: 'hidden',
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.02)',
                },
              }}
            >
              <Box sx={{ height: '200px', overflow: 'hidden' }}>
                <CardMedia
                  component="img"
                  image={booking.img}
                  alt={booking.label}
                  sx={{ 
                    width: '100%', 
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center'
                  }}
                />
              </Box>
              <CardContent
                sx={{
                  padding: '20px',
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
                    {booking.label}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '1.1rem',
                      color: '#2874f0',
                      fontWeight: 'bold',
                      fontFamily: 'Poppins, sans-serif',
                    }}
                  >
                    {booking.price}
                  </Typography>
                </Box>
                
                <Box sx={{ mt: 2, mb: 3 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#666',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <span>Booking ID:</span> 
                    <span style={{ fontWeight: 'bold' }}>{booking.bookingId || booking.id}</span>
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#666',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      mt: 1
                    }}
                  >
                    <span>Booked on:</span> 
                    <span style={{ fontWeight: 'bold' }}>
                      {booking.bookingDate ? formatBookingDate(booking.bookingDate) : "Recent booking"}
                    </span>
                  </Typography>
                </Box>
                
                <Button
                  variant="contained"
                  startIcon={<DeleteIcon />}
                  onClick={() => handleCancelBooking(booking)}
                  sx={{
                    backgroundColor: '#ff3366',
                    color: '#fff',
                    padding: '10px 16px',
                    borderRadius: '8px',
                    width: '100%',
                    fontSize: '1rem',
                    textTransform: 'none',
                    '&:hover': {
                      backgroundColor: '#e91e63',
                    },
                  }}
                >
                  Cancel Booking
                </Button>
              </CardContent>
            </Card>
          ))}
        </Grid>
      )}

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

export default MyBookings;