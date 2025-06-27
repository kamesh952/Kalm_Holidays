import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  CardMedia,
  Button,
  IconButton,
  Snackbar,
  Alert
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';

// Create theme with Poppins font - but moved inside component to avoid affecting navbar
const WrapFly = () => {
  // Theme definition inside component to prevent affecting external elements
  const theme = createTheme({
    typography: {
      fontFamily: 'Poppins, Arial, sans-serif',
    },
    palette: {
      primary: {
        main: '#0078d4',
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: `
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        `,
      },
    },
  });

  const [activeTab, setActiveTab] = useState('popular');
  const [hoveredCard, setHoveredCard] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [bookedDestinations, setBookedDestinations] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  // Load wishlist and bookings from local storage on component mount
  useEffect(() => {
    const storedWishlist = localStorage.getItem('wishlistDestinations');
    if (storedWishlist) {
      try {
        setWishlist(JSON.parse(storedWishlist));
      } catch (error) {
        console.error("Error parsing wishlist:", error);
      }
    }

    const storedBookings = localStorage.getItem('bookedDestinations');
    if (storedBookings) {
      try {
        setBookedDestinations(JSON.parse(storedBookings));
      } catch (error) {
        console.error("Error parsing bookings:", error);
      }
    }
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Popular routes data (Chennai to various destinations)
  const popularRoutes = [
    { id: 'pr1', from: 'Chennai', to: 'Delhi', image: 'delhi.jpg', price: '₹4,999', description: 'Explore the capital city with its rich history and vibrant culture.' },
    { id: 'pr2', from: 'Chennai', to: 'Mumbai', image: 'mumbai.jpg', price: '₹5,299', description: 'Visit the financial capital of India with its beautiful coastline.' },
    { id: 'pr3', from: 'Chennai', to: 'Bangkok', image: 'alleypey.jpg', price: '₹15,899', description: 'Experience Thailand\'s bustling capital with stunning temples and vibrant street life.' },
    { id: 'pr4', from: 'Chennai', to: 'Bangalore', image: 'bang.jpg', price: '₹2,599', description: 'Visit the Silicon Valley of India with pleasant weather and beautiful gardens.' },
    { id: 'pr5', from: 'Chennai', to: 'Dubai', image: 'duabi.jpg', price: '₹18,999', description: 'Discover the ultramodern architecture and luxury shopping experience.' },
    { id: 'pr6', from: 'Chennai', to: 'London', image: 'numa.webp', price: '₹48,999', description: 'Explore the historic capital with its iconic landmarks and rich culture.' },
  ];

  // Cities data
  const cities = [
    { id: 'c1', name: 'New Delhi', image: 'delhi.jpg', price: '₹4,999', description: 'India\'s capital territory with historic monuments and vibrant markets.' },
    { id: 'c2', name: 'Mumbai', image: 'mumbai.jpg', price: '₹5,299', description: 'The financial capital with beaches, colonial architecture, and Bollywood.' },
    { id: 'c3', name: 'Bangkok', image: 'apart.jpg', price: '₹15,899', description: 'Thailand\'s vibrant capital with ornate shrines and lively street life.' },
    { id: 'c4', name: 'Bangalore', image: 'bang.jpg', price: '₹2,599', description: 'The IT hub of India with pleasant climate and beautiful parks.' },
    { id: 'c5', name: 'Dubai', image: 'duabi.jpg', price: '₹18,999', description: 'A luxury destination with futuristic architecture and shopping malls.' },
    { id: 'c6', name: 'Panaji', image: 'chenai.jpg', price: '₹3,999', description: 'Goa\'s charming capital with Portuguese-era buildings and relaxed vibes.' },
  ];

  // Countries data
  const countries = [
    { id: 'co1', name: 'Japan', image: 'japan.jpg', price: '₹45,999', description: 'Land of the rising sun with unique blend of tradition and modernity.' },
    { id: 'co2', name: 'Egypt', image: 'egypt.jpg', price: '₹32,999', description: 'Ancient civilization with magnificent pyramids and rich history.' },
    { id: 'co3', name: 'Italy', image: 'italy.jpg', price: '₹38,999', description: 'Home to art, architecture, and delicious cuisine.' },
    { id: 'co4', name: 'Malaysia', image: 'chenai.jpg', price: '₹18,999', description: 'A diverse country with modern cities, rainforests, and beautiful islands.' },
    { id: 'co5', name: 'Thailand', image: 'thialan.avif', price: '₹15,899', description: 'Famous for tropical beaches, opulent palaces, and ancient ruins.' },
    { id: 'co6', name: 'Australia', image: 'australia.jpg', price: '₹62,999', description: 'Down under with unique wildlife, stunning beaches, and vibrant cities.' },
  ];

  // Regions data
  const regions = [
    { id: 'r1', name: 'Maharashtra', image: 'jai.jpg', price: '₹5,299', description: 'Western Indian state known for its caves, beaches, and metropolitan cities.' },
    { id: 'r2', name: 'Bangkok Province', image: 'BACK4.jpg', price: '₹15,899', description: 'Central Thai province surrounding the vibrant capital city.' },
    { id: 'r3', name: 'Karnataka', image: 'bang.jpg', price: '₹2,599', description: 'Southern Indian state with ancient ruins, beaches, and tech hubs.' },
    { id: 'r4', name: 'Dubai Emirate', image: 'duabi.jpg', price: '₹18,999', description: 'UAE\'s most populous emirate known for modern luxury.' },
    { id: 'r5', name: 'Goa', image: 'goa.jpg', price: '₹3,999', description: 'India\'s smallest state with beaches, nightlife, and Portuguese heritage.' },
    { id: 'r6', name: 'Greater London', image: 'australia.jpg', price: '₹48,999', description: 'Metropolitan region encompassing the UK\'s capital city.' },
  ];

  // Airports data
  const airports = [
    { id: 'a1', name: 'Indira Gandhi International Airport (DEL)', location: 'New Delhi', image: 'https://www.tripbeam.ca/blog/wp-content/uploads/2022/12/Overview-of-the-Indira-Gandhi-International-airport-in-Delhi.jpg', price: '₹4,999', description: 'India\'s busiest airport with modern terminals and excellent connectivity.' },
    { id: 'a2', name: 'Chhatrapati Shivaji International Airport (BOM)', location: 'Mumbai', image: 'https://worldarchitecture.org/cdnimgfiles/extuploadc/openthechhatrapatishivajiinternation.jpg', price: '₹5,299', description: 'Award-winning airport with state-of-the-art terminals in Mumbai.' },
    { id: 'a3', name: 'Kempegowda International Airport (BLR)', location: 'Bangalore', image: 'https://www.dutyfreehunter.com/blog/wp-content/uploads/2022/11/AviewoftheKempegowdaInternationalAirportterminal-768x497.jpg', price: '₹2,599', description: 'Modern airport serving Silicon Valley of India with efficient services.' },
    { id: 'a4', name: 'Chennai International Airport (MAA)', location: 'Chennai', image: 'https://www.airport-technology.com/wp-content/uploads/sites/14/2023/06/Feature-Image-Chennai-International-Airports-New-Integrated-Terminal-Building-T2.jpg', price: '₹1,999', description: 'Major international gateway to South India with new integrated terminal.' },
    { id: 'a5', name: 'Rajiv Gandhi International Airport (HYD)', location: 'Hyderabad', image: 'https://www.hyderabad.aero/packages/images/photo-gallery/photo-7.jpg', price: '₹3,499', description: 'Modern airport serving Hyderabad with excellent passenger experience.' },
    { id: 'a6', name: 'Netaji Subhash Chandra Bose International Airport (CCU)', location: 'Kolkata', image: 'https://i.ytimg.com/vi/Um4LwB_pbss/maxresdefault.jpg', price: '₹4,599', description: 'Major hub serving eastern India with modern facilities.' },
  ];

  // Get data based on active tab
  const getActiveData = () => {
    switch (activeTab) {
      case 'popular':
        return popularRoutes.map(route => ({
          ...route,
          id: route.id,
          label: `${route.from} to ${route.to}`,
          img: route.image
        }));
      case 'cities':
        return cities.map(city => ({
          ...city,
          id: city.id,
          label: city.name,
          img: city.image
        }));
      case 'countries':
        return countries.map(country => ({
          ...country,
          id: country.id,
          label: country.name,
          img: country.image
        }));
      case 'regions':
        return regions.map(region => ({
          ...region,
          id: region.id,
          label: region.name,
          img: region.image
        }));
      case 'airports':
        return airports.map(airport => ({
          ...airport,
          id: airport.id,
          label: airport.name,
          img: airport.image
        }));
      default:
        return popularRoutes;
    }
  };

  // Get section title based on active tab
  const getSectionTitle = () => {
    switch (activeTab) {
      case 'popular':
        return 'Popular Routes';
      case 'cities':
        return 'Popular Cities';
      case 'countries':
        return 'Popular Countries';
      case 'regions':
        return 'Popular Regions';
      case 'airports':
        return 'Major Airports';
      default:
        return 'Popular Destinations';
    }
  };

  // Check if item is in wishlist
  const isInWishlist = (itemId) => {
    return wishlist.some(item => item.id === itemId);
  };

  // Check if item is booked
  const isBooked = (itemId) => {
    return bookedDestinations.some(item => item.id === itemId);
  };

  // Add to wishlist
  const handleAddToWishlist = (item, event) => {
    event.stopPropagation();
    
    if (isInWishlist(item.id)) {
      // Remove from wishlist
      const updatedWishlist = wishlist.filter(wishItem => wishItem.id !== item.id);
      setWishlist(updatedWishlist);
      localStorage.setItem('wishlistDestinations', JSON.stringify(updatedWishlist));
      
      // Notify other components
      window.dispatchEvent(new CustomEvent('wishlistUpdated', { 
        detail: { wishlist: updatedWishlist } 
      }));
      
      setSnackbarMessage(`${item.label} removed from wishlist`);
    } else {
      // Add to wishlist
      const updatedWishlist = [...wishlist, item];
      setWishlist(updatedWishlist);
      localStorage.setItem('wishlistDestinations', JSON.stringify(updatedWishlist));
      
      // Notify other components
      window.dispatchEvent(new CustomEvent('wishlistUpdated', { 
        detail: { wishlist: updatedWishlist } 
      }));
      
      setSnackbarMessage(`${item.label} added to wishlist`);
    }
    
    setSnackbarSeverity('success');
    setOpenSnackbar(true);
  };

  // Book destination
  const handleBookDestination = (item, event) => {
    event.stopPropagation();
    
    if (isBooked(item.id)) {
      setSnackbarMessage(`${item.label} is already booked`);
      setSnackbarSeverity('info');
      setOpenSnackbar(true);
      return;
    }
    
    const booking = {
      ...item,
      bookingDate: new Date().toISOString(),
      bookingId: `BK-${Math.floor(Math.random() * 1000000)}`
    };
    
    const updatedBookings = [...bookedDestinations, booking];
    setBookedDestinations(updatedBookings);
    localStorage.setItem('bookedDestinations', JSON.stringify(updatedBookings));
    
    // Notify other components
    window.dispatchEvent(new CustomEvent('bookingsUpdated', { 
      detail: { bookings: updatedBookings } 
    }));
    
    setSnackbarMessage(`${item.label} booked successfully!`);
    setSnackbarSeverity('success');
    setOpenSnackbar(true);
  };

  // Close snackbar
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  // Render destinations with CSS Grid for consistent 3 items per row
  const renderDestinations = () => {
    const data = getActiveData();
    
    return (
      <Box 
        sx={{ 
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',                     // 1 column on extra small screens
            sm: 'repeat(2, 1fr)',          // 2 columns on small screens
            md: 'repeat(3, 1fr)'           // 3 columns on medium and larger screens
          },
          gap: 3
        }}
      >
        {data.map((item, index) => (
          <Box 
            key={index}
            sx={{ 
              position: 'relative', 
              height: 180, 
              borderRadius: 2, 
              overflow: 'hidden',
              cursor: 'pointer' 
            }}
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <CardMedia
              component="img"
              sx={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover',
                transition: 'transform 0.5s ease',
                transform: hoveredCard === index ? 'scale(1.1)' : 'scale(1)'
              }}
              image={item.img}
              alt={item.label}
            />

            {/* Price tag */}
            <Box 
              sx={{ 
                position: 'absolute', 
                top: 10, 
                left: 10, 
                backgroundColor: 'rgba(0, 120, 212, 0.9)',
                color: 'white',
                padding: '4px 8px',
                borderRadius: '4px',
                fontWeight: 'bold',
                fontSize: '0.8rem'
              }}
            >
              {item.price}
            </Box>

            {/* Wishlist button */}
            <IconButton
              onClick={(e) => handleAddToWishlist(item, e)}
              sx={{
                position: 'absolute',
                top: 10,
                right: 10,
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                }
              }}
            >
              {isInWishlist(item.id) ? (
                <FavoriteIcon sx={{ color: '#ff3366' }} />
              ) : (
                <FavoriteBorderIcon sx={{ color: '#ff3366' }} />
              )}
            </IconButton>

            {/* Book button */}
            <IconButton
              onClick={(e) => handleBookDestination(item, e)}
              sx={{
                position: 'absolute',
                top: 10,
                right: 50,
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                }
              }}
            >
              {isBooked(item.id) ? (
                <BookmarkAddedIcon sx={{ color: '#0078d4' }} />
              ) : (
                <BookmarkAddIcon sx={{ color: '#0078d4' }} />
              )}
            </IconButton>

            <Box 
              sx={{ 
                position: 'absolute', 
                bottom: 0, 
                left: 0, 
                right: 0, 
                p: 2, 
                background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                color: 'white'
              }}
            >
              {item.from && item.to ? (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="body1" fontWeight={600}>
                    {item.from}
                  </Typography>
                  <ArrowRightAltIcon sx={{ mx: 1 }} />
                  <Typography variant="body1" fontWeight={600}>
                    {item.to}
                  </Typography>
                </Box>
              ) : (
                <Typography variant="body1" fontWeight={600}>
                  {item.name}
                </Typography>
              )}
              {item.location && (
                <Typography variant="body2">
                  {item.location}
                </Typography>
              )}
            </Box>
          </Box>
        ))}
      </Box>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
        <Typography 
          variant="h4" 
          component="h1" 
          fontWeight="bold" 
          sx={{ mb: 1 }}
        >
          Top flights from India
        </Typography>
        <Typography 
          variant="body1" 
          color="text.secondary" 
          sx={{ mb: 4 }}
        >
          Explore destinations you can reach from India and start making new plans
        </Typography>

        {/* Tab buttons */}
        <Box sx={{ display: 'flex', mb: 4, borderBottom: '1px solid #eaeaea', flexWrap: 'wrap', pb: 1 }}>
          <Button
            sx={{
              mr: 2,
              mb: 1,
              py: 1,
              px: 3,
              textTransform: 'none',
              borderRadius: '50px',
              color: activeTab === 'popular' ? '#0078d4' : 'inherit',
              backgroundColor: activeTab === 'popular' ? '#e6f2fc' : 'transparent',
              border: activeTab === 'popular' ? '1px solid #0078d4' : '1px solid transparent',
              '&:hover': {
                backgroundColor: activeTab === 'popular' ? '#e6f2fc' : '#f5f5f5'
              }
            }}
            onClick={() => handleTabChange('popular')}
          >
            Popular routes
          </Button>
          <Button
            sx={{
              mr: 2,
              mb: 1,
              py: 1,
              px: 3,
              textTransform: 'none',
              borderRadius: '50px',
              color: activeTab === 'cities' ? '#0078d4' : 'inherit',
              backgroundColor: activeTab === 'cities' ? '#e6f2fc' : 'transparent',
              border: activeTab === 'cities' ? '1px solid #0078d4' : '1px solid transparent',
              '&:hover': {
                backgroundColor: activeTab === 'cities' ? '#e6f2fc' : '#f5f5f5'
              }
            }}
            onClick={() => handleTabChange('cities')}
          >
            Cities
          </Button>
          <Button
            sx={{
              mr: 2,
              mb: 1,
              py: 1,
              px: 3,
              textTransform: 'none',
              borderRadius: '50px',
              color: activeTab === 'countries' ? '#0078d4' : 'inherit',
              backgroundColor: activeTab === 'countries' ? '#e6f2fc' : 'transparent',
              border: activeTab === 'countries' ? '1px solid #0078d4' : '1px solid transparent',
              '&:hover': {
                backgroundColor: activeTab === 'countries' ? '#e6f2fc' : '#f5f5f5'
              }
            }}
            onClick={() => handleTabChange('countries')}
          >
            Countries
          </Button>
          <Button
            sx={{
              mr: 2,
              mb: 1,
              py: 1,
              px: 3,
              textTransform: 'none',
              borderRadius: '50px',
              color: activeTab === 'regions' ? '#0078d4' : 'inherit',
              backgroundColor: activeTab === 'regions' ? '#e6f2fc' : 'transparent',
              border: activeTab === 'regions' ? '1px solid #0078d4' : '1px solid transparent',
              '&:hover': {
                backgroundColor: activeTab === 'regions' ? '#e6f2fc' : '#f5f5f5'
              }
            }}
            onClick={() => handleTabChange('regions')}
          >
            Regions
          </Button>
          <Button
            sx={{
              py: 1,
              px: 3,
              mb: 1,
              textTransform: 'none',
              borderRadius: '50px',
              color: activeTab === 'airports' ? '#0078d4' : 'inherit',
              backgroundColor: activeTab === 'airports' ? '#e6f2fc' : 'transparent',
              border: activeTab === 'airports' ? '1px solid #0078d4' : '1px solid transparent',
              '&:hover': {
                backgroundColor: activeTab === 'airports' ? '#e6f2fc' : '#f5f5f5'
              }
            }}
            onClick={() => handleTabChange('airports')}
          >
            Airports
          </Button>
        </Box>

        {/* Section title - dynamic based on active tab */}
        <Typography 
          variant="h5" 
          sx={{ mb: 3, fontWeight: 500 }}
        >
          {getSectionTitle()}
        </Typography>

        {/* Destinations Grid */}
        {renderDestinations()}
      </Box>
      
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
    </ThemeProvider>
  );
};

export default WrapFly;