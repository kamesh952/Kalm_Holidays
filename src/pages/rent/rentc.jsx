import React, { useState, useEffect } from 'react';

// Using a direct import for the car icon instead of Material UI
const DirectionsCarIcon = () => (
  <svg style={{ width: '16px', height: '16px', marginRight: '4px' }} viewBox="0 0 24 24">
    <path fill="currentColor" d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.85 7h10.29l1.08 3.11H5.77L6.85 7zM19 17H5v-5h14v5z"/>
    <circle cx="7.5" cy="14.5" r="1.5"/>
    <circle cx="16.5" cy="14.5" r="1.5"/>
  </svg>
);
// Heart icon for wishlist functionality
const HeartIcon = ({ filled }) => (
  <svg 
  style={{ 
    width: '24px', 
    height: '24px', 
    fill: filled ? '#ff3366' : 'none',
    stroke: 'white', // Always have white stroke
    strokeWidth: filled ? '1' : '2', // Thinner stroke when filled
    transition: 'all 0.2s ease'
  }} 
  viewBox="0 0 24 24"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);

const CarRental = () => {
  const [activeTab, setActiveTab] = useState('popular');
  const [hoveredCard, setHoveredCard] = useState(null);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [bookings, setBookings] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // Load any existing bookings and wishlist when component mounts and when updates occur
  const loadBookings = () => {
    const storedBookings = localStorage.getItem('bookedDestinations');
    if (storedBookings) {
      try {
        setBookings(JSON.parse(storedBookings));
      } catch (error) {
        console.error("Error parsing stored bookings:", error);
      }
    } else {
      setBookings([]);
    }
  };

  const loadWishlist = () => {
    const storedWishlist = localStorage.getItem('wishlistDestinations');
    if (storedWishlist) {
      try {
        setWishlist(JSON.parse(storedWishlist));
      } catch (error) {
        console.error("Error parsing stored wishlist:", error);
      }
    } else {
      setWishlist([]);
    }
  };

  useEffect(() => {
    // Initial load of bookings and wishlist
    loadBookings();
    loadWishlist();
    
    // Listen for booking and wishlist updates
    const handleBookingsUpdate = () => loadBookings();
    const handleWishlistUpdate = () => loadWishlist();
    
    window.addEventListener('bookingsUpdated', handleBookingsUpdate);
    window.addEventListener('wishlistUpdated', handleWishlistUpdate);
    
    return () => {
      window.removeEventListener('bookingsUpdated', handleBookingsUpdate);
      window.removeEventListener('wishlistUpdated', handleWishlistUpdate);
    };
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Popular car rental locations
  const popularLocations = [
    { id: 'p1', location: 'New Delhi', carType: 'SUV', image: 'delhi.jpg', price: '₹2,500/day', description: 'Explore India\'s capital with a comfortable SUV' },
    { id: 'p2', location: 'Mumbai', carType: 'Sedan', image: 'mumbai.jpg', price: '₹2,000/day', description: 'Navigate Mumbai\'s busy streets with a reliable sedan' },
    { id: 'p3', location: 'Bangalore', carType: 'Hatchback', image: 'bang.jpg', price: '₹1,800/day', description: 'Perfect for Bangalore\'s traffic conditions' },
    { id: 'p4', location: 'Chennai', carType: 'SUV', image: 'chenai.jpg', price: '₹2,300/day', description: 'Comfortable SUV for your Chennai adventures' },
    { id: 'p5', location: 'Goa', carType: 'Convertible', image: 'goa.jpg', price: '₹3,200/day', description: 'Feel the coastal breeze with a convertible in Goa' },
    { id: 'p6', location: 'Jaipur', carType: 'SUV', image: 'jai.jpg', price: '₹2,400/day', description: 'Perfect for exploring the Pink City and beyond' },
  ];

  // Car types data
  const carTypes = [
    { id: 'c1', name: 'Economy', image: 'economy.jpg', priceFrom: '₹1,500/day', label: 'Economy Car', description: 'Affordable and fuel-efficient cars' },
    { id: 'c2', name: 'Sedan', image: 'sedan.jpg', priceFrom: '₹2,000/day', label: 'Sedan Car', description: 'Comfortable sedans with ample trunk space' },
    { id: 'c3', name: 'SUV', image: 'suv.jpg', priceFrom: '₹2,500/day', label: 'SUV', description: 'Perfect for family trips and rough terrains' },
    { id: 'c4', name: 'Luxury', image: 'luxury.jpg', priceFrom: '₹5,000/day', label: 'Luxury Car', description: 'Premium vehicles for an elevated experience' },
    { id: 'c5', name: 'Convertible', image: 'convert.jpg', priceFrom: '₹6,000/day', label: 'Convertible', description: 'Feel the wind in your hair with our convertibles' },
    { id: 'c6', name: 'Electric', image: 'electric.jpg', priceFrom: '₹3,000/day', label: 'Electric Car', description: 'Eco-friendly electric vehicles' },
  ];

  // Rental companies data
  const rentalCompanies = [
    { id: 'r1', name: 'Zoomcar', image: 'zoom.webp', rating: '4.2★', price: '₹1,800/day', label: 'Zoomcar Rental', description: 'Self-drive car rental service with many locations' },
    { id: 'r2', name: 'Revv', image: 'revv.jpg', rating: '4.0★', price: '₹1,900/day', label: 'Revv Rental', description: 'Monthly car subscription and daily rental options' },
    { id: 'r3', name: 'Avis', image: 'avis.jpg', rating: '4.5★', price: '₹2,200/day', label: 'Avis Rental', description: 'Global car rental company with premium fleet' },
    { id: 'r4', name: 'Myles', image: 'myles.webp', rating: '3.9★', price: '₹1,750/day', label: 'Myles Rental', description: 'Various car options for all your needs' },
    { id: 'r5', name: 'Hertz', image: 'hertz.jpg', rating: '4.3★', price: '₹2,100/day', label: 'Hertz Rental', description: 'International car rental with quality service' },
    { id: 'r6', name: 'Savaari', image: 'https://i.ytimg.com/vi/HFVDUmDWJi8/maxresdefault.jpg', rating: '4.1★', price: '₹1,950/day', label: 'Savaari Rental', description: 'Chauffeur-driven car rental service' },
  ];

  // Regions/cities with best rates
  const bestRateRegions = [
    { id: 'b1', name: 'Delhi NCR', image: 'delhi.jpg', priceFrom: '₹1,200/day', label: 'Car in Delhi NCR', description: 'Best rates for Delhi and NCR region' },
    { id: 'b2', name: 'Mumbai', image: 'mumbai.jpg', priceFrom: '₹1,400/day', label: 'Car in Mumbai', description: 'Affordable car rentals throughout Mumbai' },
    { id: 'b3', name: 'Bangalore', image: 'bang.jpg', priceFrom: '₹1,300/day', label: 'Car in Bangalore', description: 'Special rates for Bangalore city travel' },
    { id: 'b4', name: 'Chennai', image: 'chenai.jpg', priceFrom: '₹1,250/day', label: 'Car in Chennai', description: 'Competitive prices in Chennai area' },
    { id: 'b5', name: 'Hyderabad', image: 'hyderabad.jpg', priceFrom: '₹1,350/day', label: 'Car in Hyderabad', description: 'Discounted rates in Hyderabad' },
    { id: 'b6', name: 'Kolkata', image: 'kolkata.jpg', priceFrom: '₹1,150/day', label: 'Car in Kolkata', description: 'Lowest rates guaranteed in Kolkata' },
  ];

  // Airport pickup locations
  const airportPickups = [
    { id: 'a1', name: 'Indira Gandhi International Airport (DEL)', location: 'New Delhi', image: 'https://www.tripbeam.ca/blog/wp-content/uploads/2022/12/Overview-of-the-Indira-Gandhi-International-airport-in-Delhi.jpg', priceFrom: '₹1,700/day', label: 'Delhi Airport Pickup', description: 'Convenient pickup at Delhi International Airport' },
    { id: 'a2', name: 'Chhatrapati Shivaji International Airport (BOM)', location: 'Mumbai', image: 'https://worldarchitecture.org/cdnimgfiles/extuploadc/openthechhatrapatishivajiinternation.jpg', priceFrom: '₹1,800/day', label: 'Mumbai Airport Pickup', description: 'Easy access at Mumbai International Airport' },
    { id: 'a3', name: 'Kempegowda International Airport (BLR)', location: 'Bangalore', image: 'https://www.dutyfreehunter.com/blog/wp-content/uploads/2022/11/AviewoftheKempegowdaInternationalAirportterminal-768x497.jpg', priceFrom: '₹1,600/day', label: 'Bangalore Airport Pickup', description: 'Fast car delivery at Bangalore Airport' },
    { id: 'a4', name: 'Chennai International Airport (MAA)', location: 'Chennai', image: 'https://www.airport-technology.com/wp-content/uploads/sites/14/2023/06/Feature-Image-Chennai-International-Airports-New-Integrated-Terminal-Building-T2.jpg', priceFrom: '₹1,550/day', label: 'Chennai Airport Pickup', description: 'Seamless pickup at Chennai Airport' },
    { id: 'a5', name: 'Rajiv Gandhi International Airport (HYD)', location: 'Hyderabad', image: 'https://www.hyderabad.aero/packages/images/photo-gallery/photo-7.jpg', priceFrom: '₹1,650/day', label: 'Hyderabad Airport Pickup', description: 'Easy car collection at Hyderabad Airport' },
    { id: 'a6', name: 'Netaji Subhash Chandra Bose International Airport (CCU)', location: 'Kolkata', image: 'https://i.ytimg.com/vi/Um4LwB_pbss/maxresdefault.jpg', priceFrom: '₹1,500/day', label: 'Kolkata Airport Pickup', description: 'Quick pickup service at Kolkata Airport' },
  ];

  // Get data based on active tab
  const getActiveData = () => {
    switch (activeTab) {
      case 'popular':
        return popularLocations;
      case 'carTypes':
        return carTypes;
      case 'companies':
        return rentalCompanies;
      case 'bestRates':
        return bestRateRegions;
      case 'airports':
        return airportPickups;
      default:
        return popularLocations;
    }
  };

  // Function to check if an item is already booked
  const isItemBooked = (id) => {
    return bookings.some(booking => booking.id === id);
  };

  // Function to check if an item is in wishlist
  const isItemInWishlist = (id) => {
    return wishlist.some(item => item.id === id);
  };

  // Handle booking a car
  const handleBookCar = (item) => {
    try {
      // Create booking object
      const bookingData = {
        ...item,
        bookingId: `B${Date.now().toString().substring(8)}`,
        bookingDate: new Date().toISOString(),
        img: item.image,
        label: item.label || item.name || item.location,
        price: item.priceFrom || item.price || '₹2,000/day'
      };

      // Get current bookings from localStorage
      const storedBookings = localStorage.getItem('bookedDestinations');
      let currentBookings = [];
      
      if (storedBookings) {
        currentBookings = JSON.parse(storedBookings);
      }

      // Check if this item is already booked
      if (currentBookings.some(booking => booking.id === item.id)) {
        setSnackbarMessage('This car is already booked!');
        setShowSnackbar(true);
        return;
      }

      // Add new booking
      const updatedBookings = [...currentBookings, bookingData];
      
      // Update localStorage
      localStorage.setItem('bookedDestinations', JSON.stringify(updatedBookings));
      
      // Update state
      setBookings(updatedBookings);
      
      // Show notification
      setSnackbarMessage(`${bookingData.label} booked successfully!`);
      setShowSnackbar(true);
      
      // Notify other components
      const event = new CustomEvent('bookingsUpdated', { 
        detail: { bookings: updatedBookings } 
      });
      window.dispatchEvent(event);
      
    } catch (error) {
      console.error("Error booking car:", error);
      setSnackbarMessage("Error booking car. Please try again.");
      setShowSnackbar(true);
    }
  };

  // Handle wishlist toggle (add/remove)
  const toggleWishlist = (item, event) => {
    // Prevent the click from affecting the card
    if (event) {
      event.stopPropagation();
    }

    try {
      // Create wishlist item object
      const wishlistItem = {
        id: item.id,
        label: item.label || item.name || item.location,
        img: item.image,
        price: item.priceFrom || item.price || '₹2,000/day',
        description: item.description || `${item.carType || ''} ${item.name || ''} rental in ${item.location || ''}`
      };
      
      // Get current wishlist from localStorage
      const storedWishlist = localStorage.getItem('wishlistDestinations');
      let currentWishlist = [];
      
      if (storedWishlist) {
        currentWishlist = JSON.parse(storedWishlist);
      }

      let updatedWishlist;
      let message;

      // Check if this item is already in wishlist
      if (currentWishlist.some(wishlistItem => wishlistItem.id === item.id)) {
        // Remove from wishlist if already there
        updatedWishlist = currentWishlist.filter(wishlistItem => wishlistItem.id !== item.id);
        message = `${wishlistItem.label} removed from wishlist`;
      } else {
        // Add to wishlist if not there
        updatedWishlist = [...currentWishlist, wishlistItem];
        message = `${wishlistItem.label} added to wishlist`;
      }
      
      // Update localStorage
      localStorage.setItem('wishlistDestinations', JSON.stringify(updatedWishlist));
      
      // Update state
      setWishlist(updatedWishlist);
      
      // Show notification
      setSnackbarMessage(message);
      setShowSnackbar(true);
      
      // Notify other components
      const event = new CustomEvent('wishlistUpdated', { 
        detail: { wishlist: updatedWishlist } 
      });
      window.dispatchEvent(event);
      
    } catch (error) {
      console.error("Error updating wishlist:", error);
      setSnackbarMessage("Error updating wishlist. Please try again.");
      setShowSnackbar(true);
    }
  };

  // Handle snackbar close
  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };

  // Add Poppins font import
  useEffect(() => {
    // Add Poppins font
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  // Component-specific styles with Poppins font
  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      fontFamily: "'Poppins', sans-serif",
      padding: '24px',
    },
    title: {
      fontSize: '28px',
      fontWeight: 'bold',
      marginBottom: '8px',
      fontFamily: "'Poppins', sans-serif",
      color: '#333'
    },
    subtitle: {
      fontSize: '16px',
      color: '#666',
      fontFamily: "'Poppins', sans-serif",
      marginBottom: '32px'
    },
    tabContainer: {
      display: 'flex',
      marginBottom: '32px',
      fontFamily: "'Poppins', sans-serif",
      borderBottom: '1px solid #eaeaea',
      flexWrap: 'wrap',
      paddingBottom: '8px'
    },
    tabButton: (tab) => ({
      marginRight: '12px',
      marginBottom: '8px',
      fontFamily: "'Poppins', sans-serif",
      padding: '8px 16px',
      borderRadius: '50px',
      border: activeTab === tab ? '1px solid #0078d4' : '1px solid transparent',
      backgroundColor: activeTab === tab ? '#e6f2fc' : 'transparent',
      color: activeTab === tab ? '#0078d4' : '#333',
      cursor: 'pointer',
      fontSize: '14px',
      transition: 'all 0.2s ease',
      outline: 'none'
    }),
    sectionHeading: {
      fontSize: '22px',
      fontWeight: '500',
      marginBottom: '24px',
      fontFamily: "'Poppins', sans-serif",
      color: '#333'
    },
    gridContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '24px',
      width: '100%',
      fontFamily: "'Poppins', sans-serif",
      marginBottom: '24px'
    },
    card: (index) => ({
      position: 'relative',
      height: '220px',
      borderRadius: '8px',
      fontFamily: "'Poppins', sans-serif",
      overflow: 'hidden',
      boxShadow: hoveredCard === index ? '0 8px 16px rgba(0,0,0,0.2)' : '0 2px 8px rgba(0,0,0,0.1)',
      transition: 'box-shadow 0.3s ease',
      cursor: 'pointer'
    }),
    cardImage: (index) => ({
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transition: 'transform 0.5s ease',
      transform: hoveredCard === index ? 'scale(1.15)' : 'scale(1)'
    }),
    heartButton: {
      position: 'absolute',
      top: '10px',
      right: '10px',
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      width: '34px',
      height: '34px',
      borderRadius: '50%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      transition: 'background-color 0.2s ease',
      border: 'none',
      zIndex: 10
    },
    cardOverlay: {
      position: 'absolute',
      bottom: 0,
      fontFamily: "'Poppins', sans-serif",
      left: 0,
      right: 0,
      padding: '16px',
      background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
      color: 'white'
    },
    locationText: {
      fontSize: '16px',
      fontFamily: "'Poppins', sans-serif",
      fontWeight: '600',
      marginBottom: '4px'
    },
    carTypeContainer: {
      display: 'flex',
      fontFamily: "'Poppins', sans-serif",
      alignItems: 'center',
      marginBottom: '8px'
    },
    smallText: {
      fontSize: '14px',
      marginBottom: '10px'
    },
    bookButton: (booked) => ({
      backgroundColor: booked ? '#888' : '#2874f0',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      padding: '6px 12px',
      fontSize: '14px',
      cursor: booked ? 'default' : 'pointer',
      width: '100%',
      fontWeight: '500',
      fontFamily: "'Poppins', sans-serif", // Added Poppins to the button
      transition: 'background-color 0.2s ease',
      marginTop: '6px'
    }),
    snackbar: {
      position: 'fixed',
      bottom: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: '#4CAF50',
      color: 'white',
      padding: '12px 24px',
      borderRadius: '4px',
      boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
      zIndex: 1000,
      fontFamily: "'Poppins', sans-serif",
      fontSize: '14px',
      textAlign: 'center',
      maxWidth: '80%'
    }
  };

  // Custom button component to avoid Material UI
  const TabButton = ({ tab, label }) => (
    <button 
      style={styles.tabButton(tab)}
      onClick={() => handleTabChange(tab)}
    >
      {label}
    </button>
  );

  // Render images and data in grid
  const renderCarRentals = () => {
    const data = getActiveData();
    
    // Split data into rows of 3 for consistent display
    const rows = [];
    for (let i = 0; i < data.length; i += 3) {
      rows.push(data.slice(i, i + 3));
    }

    return (
      <>
        {rows.map((row, rowIndex) => (
          <div key={`row-${rowIndex}`} style={styles.gridContainer}>
            {row.map((item, columnIndex) => {
              const index = rowIndex * 3 + columnIndex;
              const isBooked = isItemBooked(item.id);
              const isInWishlist = isItemInWishlist(item.id);
              
              return (
                <div 
                  key={`card-${index}`} 
                  style={styles.card(index)}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <img
                    style={styles.cardImage(index)}
                    src={item.image}
                    alt={item.name || item.location}
                  />
                  
                  {/* Heart button for wishlist */}
                  <button 
                    style={{
                      ...styles.heartButton,
                      backgroundColor: isInWishlist ? 'rgba(255, 51, 102, 0.8)' : 'rgba(0, 0, 0, 0.4)',
                    }}
                    onClick={(e) => toggleWishlist(item, e)}
                    aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    <HeartIcon filled={isInWishlist} />
                  </button>
                  
                  <div style={styles.cardOverlay}>
                    {item.location && item.carType ? (
                      <div>
                        <div style={styles.locationText}>
                          {item.location}
                        </div>
                        <div style={styles.carTypeContainer}>
                          <DirectionsCarIcon />
                          <div style={styles.smallText}>
                            {item.carType}
                          </div>
                        </div>
                        <div style={styles.smallText}>
                          {item.price}
                        </div>
                        <button
                          style={styles.bookButton(isBooked)}
                          onClick={() => !isBooked && handleBookCar(item)}
                          disabled={isBooked}
                        >
                          {isBooked ? 'Already Booked' : 'Book Now'}
                        </button>
                      </div>
                    ) : (
                      <div>
                        <div style={styles.locationText}>
                          {item.name}
                        </div>
                        {item.rating && (
                          <div style={styles.smallText}>
                            {item.rating}
                          </div>
                        )}
                        {(item.priceFrom || item.price) && (
                          <div style={styles.smallText}>
                            From {item.priceFrom || item.price}
                          </div>
                        )}
                        {item.location && (
                          <div style={styles.smallText}>
                            {item.location}
                          </div>
                        )}
                        <button
                          style={styles.bookButton(isBooked)}
                          onClick={() => !isBooked && handleBookCar(item)}
                          disabled={isBooked}
                        >
                          {isBooked ? 'Already Booked' : 'Book Now'}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </>
    );
  };

  // Get section heading based on active tab
  const getSectionHeading = () => {
    switch(activeTab) {
      case 'popular': return 'Popular Rental Locations';
      case 'carTypes': return 'Browse by Car Type';
      case 'companies': return 'Top Rental Companies';
      case 'bestRates': return 'Regions with Best Rates';
      case 'airports': return 'Airport Pickup Locations';
      default: return 'Popular Rental Locations';
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.title}>
        Top car rentals in India
      </div>
      <div style={styles.subtitle}>
        Explore car rental options across India and start planning your road trip
      </div>

      {/* Custom tab buttons with isolated styling */}
      <div style={styles.tabContainer}>
        <TabButton tab="popular" label="Popular locations" />
        <TabButton tab="carTypes" label="Car types" />
        <TabButton tab="companies" label="Rental companies" />
        <TabButton tab="bestRates" label="Best rates" />
        <TabButton tab="airports" label="Airport pickups" />
      </div>

      {/* Section heading based on active tab */}
      <div style={styles.sectionHeading}>
        {getSectionHeading()}
      </div>

      {/* Car Rental Options Grid with consistent sizing */}
      {renderCarRentals()}

      {/* Custom Snackbar notification */}
      {showSnackbar && (
        <div style={styles.snackbar}>
          {snackbarMessage}
          <span 
            style={{
              marginLeft: '10px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
            onClick={handleCloseSnackbar}
          >
            ✕
          </span>
        </div>
      )}
    </div>
  );
};

export default CarRental;