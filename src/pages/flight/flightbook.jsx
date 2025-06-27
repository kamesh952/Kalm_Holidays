import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Radio, 
  RadioGroup, 
  FormControlLabel, 
  TextField, 
  InputAdornment,
  Select,
  MenuItem,
  Paper,
  Container,
  FormControl
} from '@mui/material';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DateRangeIcon from '@mui/icons-material/DateRange';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import PersonIcon from '@mui/icons-material/Person';

// Custom styles contained within the component only - no global theme override
const flightSearchStyles = {
  paper: {
    p: 0,
    borderRadius: 1,
    background: 'linear-gradient(to bottom, #f8fafc, #ffffff)',
  },
  heading: {
    fontSize: 32,
    ml: 0,
    fontWeight: 600,
    color: 'black',
    textAlign: 'left',
    fontFamily: '"Poppins", sans-serif',
    // Moved left by removing any margin
    marginLeft: 0,
    paddingLeft: 0,
  },
  subheading: {
    mb: 2,
    mt: 1,
    fontSize: '16px',
    fontWeight: 'light',
    color: 'black',
    textAlign: 'left',
    fontFamily: '"Poppins", sans-serif',
    // Moved left by removing any margin
    marginLeft: 0,
    paddingLeft: 0,
  },
  filterBox: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 2,
    mb: 3,
    marginLeft: 0, // Removed the margin to align with headings
  },
  radioGroup: {
    display: 'flex',
    gap: 2,
    fontFamily: '"Playfair Display", serif',
    // Adding bold font
  },
  selectClass: {
    fontFamily: '"Playfair Display", serif',
    // Adding bold font
    '&::before': { borderBottom: 'none' },
    '&::after': { borderBottom: 'none' },
    '&:hover:not(.Mui-disabled)::before': { borderBottom: 'none' },
  },
  formLayout: {
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    gap: 2,
    alignItems: 'left',
    flexWrap: 'wrap',
    fontFamily: '"Playfair Display", serif',
    marginLeft: 0, // Removed the margin to align with headings
  },
  formControl: {
    minWidth: 50,
    flex: 1,
    fontFamily: '"Playfair Display", serif',
    // Adding bold font
    '& .MuiInputLabel-root': {
      fontFamily: '"Playfair Display", serif',
     
    },
    '& .MuiOutlinedInput-root': {
      fontFamily: '"Playfair Display", serif',
     
    },
  },
  dateField: {
    minWidth: 180,
    flex: 1,
    fontFamily: '"Playfair Display", serif',
    // Adding bold font
    '& .MuiInputLabel-root': {
      fontFamily: '"Playfair Display", serif',
     
    },
    '& .MuiOutlinedInput-root': {
      fontFamily: '"Playfair Display", serif',
     
    },
  },
  searchButton: {
    px: 6,
    py: 1.5,
    fontSize: '1.1rem',
    fontWeight: 'bold',
    textTransform: 'none',
    borderRadius: '8px',
    fontFamily: '"Playfair Display", serif', // Changed from Playfair Display to Poppins
    background: 'linear-gradient(45deg, #2A5C99, #3A7BC8)',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 16px rgba(42, 92, 153, 0.3)',
    },
    transition: 'all 0.3s ease'
  }
};

const airports = [
  { code: 'MAA', name: 'Chennai International Airport' },
  { code: 'DEL', name: 'Indira Gandhi International Airport' },
  { code: 'BOM', name: 'Chhatrapati Shivaji Maharaj International Airport' },
  { code: 'BLR', name: 'Kempegowda International Airport' },
  { code: 'HYD', name: 'Rajiv Gandhi International Airport' },
  { code: 'CCU', name: 'Netaji Subhash Chandra Bose International Airport' },
];

function FlightSearch() {
  const [tripType, setTripType] = useState('round-trip');
  const [cabinClass, setCabinClass] = useState('economy');
  const [directFlights, setDirectFlights] = useState(false);
  const [fromAirport, setFromAirport] = useState('MAA');
  const [toAirport, setToAirport] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [passengers, setPassengers] = useState(1);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log({
      tripType,
      cabinClass,
      directFlights,
      fromAirport,
      toAirport,
      departureDate,
      returnDate,
      passengers
    });
    alert('Search functionality would be implemented here!');
  };

  // Add Poppins font import
  React.useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap';
    document.head.appendChild(link);
    
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    // No ThemeProvider or CssBaseline to avoid global style conflicts
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={0} sx={flightSearchStyles.paper}>
        <Typography sx={flightSearchStyles.heading}>
          Compare and book cheap flights with ease
        </Typography>
        
        <Typography sx={flightSearchStyles.subheading}>
          Discover your next dream destination
        </Typography>
        
        <Box sx={flightSearchStyles.filterBox}>
          <RadioGroup
            row
            value={tripType}
            onChange={(e) => setTripType(e.target.value)}
            sx={flightSearchStyles.radioGroup}
          >
            <FormControlLabel
              value="round-trip"
              control={<Radio size="medium" />}
              label="Round-trip"
              sx={{  fontFamily: '"Playfair Display", serif',}}
           
            />
            <FormControlLabel
              value="one-way"
              control={<Radio size="medium" />}
              label="One-way" sx={{  fontFamily: '"Playfair Display", serif',}}
           
            />
            <FormControlLabel
              value="multi-city"
              control={<Radio size="medium" />}
              label="Multi-city" sx={{  fontFamily: '"Playfair Display", serif',}}
           
            />
          </RadioGroup>

          <FormControl variant="standard" sx={{ minWidth: 160 }}>
            <Select
              value={cabinClass}
              onChange={(e) => setCabinClass(e.target.value)}
              disableUnderline
              displayEmpty
              IconComponent={() => null}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', alignItems: 'center', fontFamily: '"Playfair Display", serif', }}>
                  {selected || 'Cabin Class'}
                  <ArrowDropDownIcon sx={{ fontSize: 20, ml: '5px' }} />
                </Box>
              )}
              sx={flightSearchStyles.selectClass}
            >
              <MenuItem disabled value="">
                Cabin Class
              </MenuItem>
              <MenuItem value="economy">Economy</MenuItem>
              <MenuItem value="business">Business</MenuItem>
              <MenuItem value="first">First</MenuItem>
              <MenuItem value="Direct flights only">Direct flights only</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box component="form" onSubmit={handleSearch}>
          <Box sx={flightSearchStyles.formLayout}>
            {/* From Airport */}
            <FormControl sx={flightSearchStyles.formControl}>
              <TextField
                select
                fullWidth
                size="medium"
                label="From"
                value={fromAirport}
                onChange={(e) => setFromAirport(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FlightTakeoffIcon color="primary" />
                    </InputAdornment>
                  ),
                
                }}
                InputLabelProps={{
                  sx: { fontFamily: '"Poppins", sans-serif' }
                }}
              >
                {airports.map((airport) => (
                  <MenuItem key={airport.code} value={airport.code} sx={{ fontFamily: '"Poppins", sans-serif' }}>
                    {airport.name} ({airport.code})
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>

            {/* To Airport */}
            <FormControl sx={flightSearchStyles.formControl}>
              <TextField
                select
                fullWidth
                size="medium"
                label="To"
                value={toAirport}
                onChange={(e) => setToAirport(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOnIcon color="primary" />
                    </InputAdornment>
                  ),
               
                }}
                InputLabelProps={{
                  sx: { fontFamily: '"Poppins", sans-serif'}
                }}
              >
                {airports.map((airport) => (
                  <MenuItem key={airport.code} value={airport.code} sx={{ fontFamily: '"Poppins", sans-serif' }}>
                    {airport.name} ({airport.code})
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>

            {/* Departure Date */}
            <FormControl sx={flightSearchStyles.dateField}>
              <TextField
                fullWidth
                size="medium"
                type="date"
                label="Departure"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
                InputLabelProps={{ 
                  shrink: true,
                 
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <DateRangeIcon color="primary" />
                    </InputAdornment>
                  ),
                  
                }}
              />
            </FormControl>

            {/* Return Date (conditionally rendered) */}
            {tripType === 'round-trip' && (
              <FormControl sx={flightSearchStyles.dateField}>
                <TextField
                  fullWidth
                  size="medium"
                  type="date"
                  label="Return"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  InputLabelProps={{ 
                    shrink: true,
                    sx: { fontFamily: '"Poppins", sans-serif' }
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <DateRangeIcon color="primary" />
                      </InputAdornment>
                    ),
                    sx: { fontFamily: '"Poppins", sans-serif'}
                  }}
                />
              </FormControl>
            )}

            {/* Passengers */}
            <FormControl sx={flightSearchStyles.dateField}>
              <TextField
                fullWidth
                size="medium"
                type="number"
                label="Passengers"
                value={passengers}
                onChange={(e) => setPassengers(Math.max(1, e.target.value))}
                InputProps={{
                  inputProps: { min: 1 },
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon color="primary" />
                    </InputAdornment>
                  ),
                  sx: { fontFamily: '"Poppins", sans-serif' }
                }}
                InputLabelProps={{
                  sx: { fontFamily: '"Poppins", sans-serif' }
                }}
              />
            </FormControl>
          </Box>

          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              type="submit"
              sx={flightSearchStyles.searchButton}
            >
              Search Flights
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default FlightSearch;