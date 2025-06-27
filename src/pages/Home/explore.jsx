import React, { useRef, useState } from 'react';
import { 
  Box,
  Typography,
  IconButton,
  useTheme,
  useMediaQuery,
  styled,
  Tooltip,
  Snackbar,
  Alert
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import '@fontsource/poppins'; // Import Poppins font

const destinations = [
  { 
    id: 'dest-1',
    img: 'tamil.jpg', 
    name: 'Tamil Nadu', 
    properties: '1000+ property',
    price: '₹1,499/night',
    label: 'Tamil Nadu',
    description: 'Explore the cultural heritage of Tamil Nadu'
  },
  { 
    id: 'dest-2',
    img: 'tajmahal.jpg', 
    name: 'New Delhi', 
    properties: '2,919 properties',
    price: '₹2,499/night',
    label: 'New Delhi',
    description: 'Visit the historical monuments in the capital'
  },
  { 
    id: 'dest-3',
    img: 'var.jpg', 
    name: 'Varanasi', 
    properties: '554 properties',
    price: '₹1,299/night',
    label: 'Varanasi',
    description: 'Experience the spiritual city on the banks of Ganges'
  },
  { 
    id: 'dest-4',
    img: 'Mumbai.jpg', 
    name: 'Mumbai', 
    properties: '1,652 properties',
    price: '₹3,499/night',
    label: 'Mumbai',
    description: 'Explore the city that never sleeps'
  },
  { 
    id: 'dest-5',
    img: 'A-Beautiful-Beach-in-Goa-1024x683-1.jpg', 
    name: 'Goa', 
    properties: '5,251 properties',
    price: '₹2,999/night',
    label: 'Goa',
    description: 'Enjoy beaches and nightlife in this coastal paradise'
  },
  { 
    id: 'dest-6',
    img: 'bang.jpg', 
    name: 'Bangalore', 
    properties: '2,044 properties',
    price: '₹2,299/night',
    label: 'Bangalore',
    description: 'Visit the garden city and tech hub of India'
  },
  { 
    id: 'dest-7',
    img: 'jai.jpg', 
    name: 'Jaipur', 
    properties: '1,500 properties',
    price: '₹1,899/night',
    label: 'Jaipur',
    description: 'Discover the pink city and its royal heritage'
  },
  { 
    id: 'dest-8',
    img: 'Hyderabad.jpg', 
    name: 'Hyderabad', 
    properties: '3,000 properties',
    price: '₹1,999/night',
    label: 'Hyderabad',
    description: 'Experience the perfect blend of tradition and modernity'
  },
  { 
    id: 'dest-9',
    img: 'kasmir.png', 
    name: 'Kashmir', 
    properties: '3,000 properties',
    price: '₹3,999/night',
    label: 'Kashmir',
    description: 'Visit the paradise on earth with stunning landscapes'
  },
  { 
    id: 'dest-10',
    img: 'Munnar.jpg', 
    name: 'Munnar', 
    properties: '700 properties',
    price: '₹2,199/night',
    label: 'Munnar',
    description: 'Explore the beautiful hill station with tea plantations'
  },
];

const DestinationCard = styled('div')(({ theme }) => ({
  flex: '0 0 auto',
  width: '140px',
  textAlign: 'center',
  margin: '0 4px',
  fontFamily: 'Poppins, sans-serif',
  position: 'relative',
  [theme.breakpoints.down('sm')]: {
    width: '110px',
  },
}));

const DestinationImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: '90px',
  objectFit: 'cover',
  borderRadius: '8px',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.03)',
  },
}));

const ActionIconsContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  right: 0,
  display: 'flex',
  flexDirection: 'column',
  padding: '2px',
  backgroundColor: 'rgba(255, 255, 255, 0.7)',
  borderRadius: '0 8px 0 8px',
  opacity: 0,
  transition: 'opacity 0.3s ease',
  '.destination-card:hover &': {
    opacity: 1,
  },
}));

const ExploreSection = () => {
  const containerRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [wishlist, setWishlist] = useState(() => {
    try {
      const storedWishlist = localStorage.getItem('wishlistDestinations');
      return storedWishlist ? JSON.parse(storedWishlist) : [];
    } catch (error) {
      console.error("Error loading wishlist from localStorage:", error);
      return [];
    }
  });
  const [bookings, setBookings] = useState(() => {
    try {
      const storedBookings = localStorage.getItem('bookedDestinations');
      return storedBookings ? JSON.parse(storedBookings) : [];
    } catch (error) {
      console.error("Error loading bookings from localStorage:", error);
      return [];
    }
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  // Check if destination is in wishlist
  const isInWishlist = (destId) => {
    return wishlist.some(item => item.id === destId);
  };

  // Check if destination is booked
  const isBooked = (destId) => {
    return bookings.some(item => item.id === destId);
  };

  // Toggle wishlist
  const handleToggleWishlist = (destination, event) => {
    event.stopPropagation();
    
    let updatedWishlist;
    if (isInWishlist(destination.id)) {
      // Remove from wishlist
      updatedWishlist = wishlist.filter(item => item.id !== destination.id);
      setSnackbarMessage(`${destination.name} removed from wishlist`);
    } else {
      // Add to wishlist
      updatedWishlist = [...wishlist, destination];
      setSnackbarMessage(`${destination.name} added to wishlist`);
    }
    
    setWishlist(updatedWishlist);
    localStorage.setItem('wishlistDestinations', JSON.stringify(updatedWishlist));
    
    // Notify other components
    window.dispatchEvent(new CustomEvent('wishlistUpdated', { 
      detail: { wishlist: updatedWishlist } 
    }));
    
    setSnackbarSeverity('success');
    setOpenSnackbar(true);
  };

  // Toggle booking
  const handleToggleBooking = (destination, event) => {
    event.stopPropagation();
    
    let updatedBookings;
    if (isBooked(destination.id)) {
      // Cancel booking
      updatedBookings = bookings.filter(item => item.id !== destination.id);
      setSnackbarMessage(`Booking for ${destination.name} cancelled`);
    } else {
      // Book destination
      const newBooking = {
        ...destination,
        bookingDate: new Date().toISOString(),
        bookingId: `BK-${Math.floor(Math.random() * 1000000)}`
      };
      updatedBookings = [...bookings, newBooking];
      setSnackbarMessage(`${destination.name} booked successfully!`);
    }
    
    setBookings(updatedBookings);
    localStorage.setItem('bookedDestinations', JSON.stringify(updatedBookings));
    
    // Notify other components
    window.dispatchEvent(new CustomEvent('bookingsUpdated', { 
      detail: { bookings: updatedBookings } 
    }));
    
    setSnackbarSeverity('success');
    setOpenSnackbar(true);
  };

  const scrollContainer = (scrollOffset) => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += scrollOffset;
    }
  };

  return (
    <Box sx={{ 
      px: 2, // Reduced horizontal padding
      py: 4,
      maxWidth: '1290px', // Slightly increased section width
      margin: '0 auto', // Center the section
      position: 'relative',
      backgroundColor: 'background.paper',
      fontFamily: 'Poppins, sans-serif',
    }}>
      <Typography 
        variant="h5" 
        sx={{ 
          fontWeight: 'bold', 
          mb: 3,
          fontSize: '2rem',
          textAlign: 'left',
          color: 'text.primary',
          fontFamily: 'Poppins, sans-serif',
        }}
      >
        Explore India
      </Typography>

      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center',
        position: 'relative',
      }}>
        <IconButton
          onClick={() => scrollContainer(-200)}
          sx={{
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            left: isMobile ? -10 : -20,
            zIndex: 1,
            backgroundColor: 'white',
            boxShadow: 3,
            '&:hover': {
              backgroundColor: 'grey.100',
            },
          }}
        >
          <ChevronLeftIcon />
        </IconButton>

        <Box
          ref={containerRef}
          sx={{
            display: 'flex',
            gap: 0.5, // Reduce gap between images
            overflowX: 'auto',
            scrollBehavior: 'smooth',
            py: 1,
            px: isMobile ? 0 : 2,
            '&::-webkit-scrollbar': {
              display: 'none',
            },
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
            fontFamily: 'Poppins, sans-serif',
          }}
        >
          {destinations.map((destination, index) => (
            <DestinationCard key={index} className="destination-card">
              <Box sx={{ position: 'relative' }}>
                <DestinationImage 
                  src={destination.img} 
                  alt={destination.name} 
                />
                
                {/* Action icons */}
                <ActionIconsContainer>
                  <Tooltip title={isInWishlist(destination.id) ? "Remove from wishlist" : "Add to wishlist"}>
                    <IconButton 
                      size="small" 
                      onClick={(e) => handleToggleWishlist(destination, e)}
                      sx={{ 
                        padding: '2px',
                        '&:hover': { 
                          backgroundColor: 'rgba(255, 255, 255, 0.9)' 
                        }
                      }}
                    >
                      {isInWishlist(destination.id) ? 
                        <FavoriteIcon fontSize="small" sx={{ color: '#ff3366' }} /> : 
                        <FavoriteBorderIcon fontSize="small" sx={{ color: '#555' }} />
                      }
                    </IconButton>
                  </Tooltip>
                  
                  <Tooltip title={isBooked(destination.id) ? "Cancel booking" : "Book now"}>
                    <IconButton 
                      size="small" 
                      onClick={(e) => handleToggleBooking(destination, e)}
                      sx={{ 
                        padding: '2px',
                        '&:hover': { 
                          backgroundColor: 'rgba(255, 255, 255, 0.9)' 
                        }
                      }}
                    >
                      {isBooked(destination.id) ? 
                        <BookmarkIcon fontSize="small" sx={{ color: '#2874f0' }} /> : 
                        <BookmarkBorderIcon fontSize="small" sx={{ color: '#555' }} />
                      }
                    </IconButton>
                  </Tooltip>
                </ActionIconsContainer>
              </Box>
              <Typography 
                variant="body1" 
                sx={{ 
                  fontWeight: 'bold', 
                  mt: 0.3, // Reduce space between image and name
                  fontFamily: 'Poppins, sans-serif',
                }}
              >
                {destination.name}
              </Typography>
              <Typography 
                variant="caption" 
                sx={{ 
                  color: 'text.secondary',
                  fontFamily: 'Poppins, sans-serif',
                }}
              >
                {destination.properties}
              </Typography>
            </DestinationCard>
          ))}
        </Box>

        <IconButton
          onClick={() => scrollContainer(200)}
          sx={{
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            right: isMobile ? -10 : -20,
            zIndex: 1,
            backgroundColor: 'white',
            boxShadow: 3,
            '&:hover': {
              backgroundColor: 'grey.100',
            },
          }}
        >
          <ChevronRightIcon />
        </IconButton>
      </Box>
      
      {/* Notification Snackbar */}
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

export default ExploreSection;