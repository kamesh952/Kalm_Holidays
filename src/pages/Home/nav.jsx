import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  Button,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Menu,
  MenuItem,
  Collapse,
  useMediaQuery,
  alpha,
  styled,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
  Search as SearchIcon,
  Home as HomeIcon,
  FlightTakeoff as FlightIcon,
  DirectionsCar as CarIcon,
  Inventory as PackageIcon,
  Business as CompanyIcon,
  Menu as MenuIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from '@mui/icons-material';

// Custom styled components
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '20px',
  backgroundColor: alpha(theme.palette.common.white, 1),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.95),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '130px',
  [theme.breakpoints.down('md')]: {
    width: '100%',
    marginRight: 0,
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  right: 0,
  color: theme.palette.primary.main,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 4, 1, 1.5),
    transition: theme.transitions.create('width'),
    width: '100%',
    borderRadius: '20px',
    fontSize: 14,
    '&:focus': {
      boxShadow: 'inset 4px 4px 8px rgba(0, 0, 0, 0.3)',
    },
  },
}));

const NavItem = styled(Box)(({ theme }) => ({
  position: 'relative',
  margin: '0 15px',
  '&:hover': {
    '& .MuiCollapse-root': {
      display: 'block',
    },
  },
}));

const NavLink = styled(Button)(({ theme }) => ({
  color: 'white',
  textTransform: 'none',
  fontWeight: 500,
  fontFamily: 'Poppins, sans-serif',
  padding: '10px 0',
  '&:hover': {
    backgroundColor: 'transparent',
    '&::after': {
      width: '80%',
    },
    '& .MuiSvgIcon-root': {
      color: '#ffcc00',
    },
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: 0,
    height: '2px',
    backgroundColor: '#ffcc00',
    borderRadius: '3px',
    transition: 'width 0.3s ease',
  },
}));

const DropdownMenu = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '100%',
  left: '50%',
  marginTop: '10px',
  transform: 'translateX(-50%)',
  backgroundColor: 'white',
  minWidth: '200px',
  boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
  borderRadius: '8px',
  zIndex: 1000,
  display: 'none',
}));

const DropdownItem = styled(MenuItem)(({ theme }) => ({
  color: '#333',
  padding: '10px 20px',
  borderBottom: '1px solid #f0f0f0',
  transition: 'all 0.2s ease',
  '&:first-of-type': {
    borderRadius: '8px 8px 0 0',
  },
  '&:last-child': {
    borderBottom: 'none',
    borderRadius: '0 0 8px 8px',
  },
  '&:hover': {
    backgroundColor: '#f5f5f5',
    color: theme.palette.primary.main,
    paddingLeft: '25px',
  },
}));

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
}));

const SignInButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.main,
  backgroundColor: 'white',
  borderRadius: '15px',
  padding: '6px 15px',
  textTransform: 'none',
  fontFamily: 'Poppins, sans-serif',
  '&:hover': {
    backgroundColor: 'white',
  },
}));

const FlagBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  padding: '8px 15px',
  color: 'white',
  position: 'relative',
  '&:hover': {
    '&::after': {
      width: '80%',
    },
    '& .MuiMenu-paper': {
      opacity: 1,
      visibility: 'visible',
    },
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: 0,
    height: '3px',
    backgroundColor: '#ffcc00',
    borderRadius: '3px',
    transition: 'width 0.3s ease',
  },
}));

const NavBar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [countryMenuAnchor, setCountryMenuAnchor] = useState(null);
  const [currentCurrency, setCurrentCurrency] = useState('INR');
  const [currentFlag, setCurrentFlag] = useState('in');

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDropdownToggle = (key) => {
    if (isMobile) {
      setOpenDropdowns(prev => ({
        ...prev,
        [key]: !prev[key]
      }));
    }
  };

  const handleCountryMenuOpen = (event) => {
    setCountryMenuAnchor(event.currentTarget);
  };

  const handleCountryMenuClose = () => {
    setCountryMenuAnchor(null);
  };

  const changeCountry = (currency, flag) => {
    setCurrentCurrency(currency);
    setCurrentFlag(flag);
    handleCountryMenuClose();
  };

  const countries = [
    { code: 'in', currency: 'INR', name: 'India' },
    { code: 'us', currency: 'USD', name: 'United States' },
    { code: 'gb', currency: 'GBP', name: 'United Kingdom' },
    { code: 'au', currency: 'AUD', name: 'Australia' },
    { code: 'ca', currency: 'CAD', name: 'Canada' },
  ];

  const navItems = [
    { 
      text: 'Home', 
      icon: <HomeIcon />, 
      link: '/home' 
    },
    { 
      text: 'Flights', 
      icon: <FlightIcon />, 
      link: '#',
      dropdown: ['Domestic', 'International']
    },
    { 
      text: 'Car rentals', 
      icon: <CarIcon />, 
      link: '#',
      dropdown: ['Self Drive', 'Chauffeur Driven']
    },
    { 
      text: 'Packages', 
      icon: <PackageIcon />, 
      link: '#',
      dropdown: ['Theme Parks', 'Museums', 'Nature & Wildlife', 'Honeymoon', 'International', 
                'Asia', 'Europe', 'America', 'Middle East', 'Island', 'View All Packages']
    },
    { 
      text: 'Company', 
      icon: <CompanyIcon />, 
      link: '#',
      dropdown: ['History', 'About Us', 'Contact Us', 'FAQ']
    },
  ];

  const renderMobileMenu = (
    <Drawer
      variant="temporary"
      open={mobileOpen}
      onClose={handleDrawerToggle}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        '& .MuiDrawer-paper': { 
          width: 240,
          backgroundColor: theme.palette.primary.main,
          color: 'white'
        },
      }}
    >
      <List>
        {navItems.map((item, index) => (
          <React.Fragment key={item.text}>
            <ListItem 
              button 
              onClick={() => handleDropdownToggle(item.text)}
              sx={{ 
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                py: 1
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {item.icon}
                <ListItemText primary={item.text} sx={{ ml: 1 }} />
              </Box>
              {item.dropdown && (
                openDropdowns[item.text] ? <ExpandLessIcon /> : <ExpandMoreIcon />
              )}
            </ListItem>
            
            {item.dropdown && (
              <Collapse in={openDropdowns[item.text] || false} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.dropdown.map((subItem) => (
                    <ListItem button key={subItem} sx={{ pl: 4, py: 0.5 }}>
                      <ListItemText primary={subItem} />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        ))}
        
        <ListItem button onClick={handleCountryMenuOpen}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img 
              src={`https://flagcdn.com/w40/${currentFlag}.png`} 
              alt={currentCurrency}
              style={{ width: 24, height: 24, borderRadius: '50%', marginRight: 8 }}
            />
            <ListItemText primary={currentCurrency} />
          </Box>
        </ListItem>
        
        <ListItem>
          <SignInButton fullWidth>
            Sign In
          </SignInButton>
        </ListItem>
      </List>
    </Drawer>
  );

  return (
    <>
      <StyledAppBar position="fixed">
        <Toolbar>
          {/* Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <img 
              src="/KALM.png" 
              alt="KALM AI Logo" 
              style={{ height: 40, marginRight: 10 }}
            />
            <Typography
              variant="h6"
              sx={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 700,
                color: 'white',
                display: { xs: 'none', sm: 'block' }
              }}
            >
              Kalm Holidays
            </Typography>
          </Box>

          {/* Spacer */}
          <Box sx={{ flexGrow: 1 }} />
          
          {/* Search box - hide on mobile */}
          <Search sx={{ display: { xs: 'none', md: 'block' } }}>
            <StyledInputBase
              placeholder="Search destinations, hotels..."
              inputProps={{ 'aria-label': 'search' }}
            />
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
          </Search>

          {/* Navigation Items - hide on mobile */}
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {navItems.map((item) => (
                <NavItem key={item.text}>
                  <NavLink 
                    startIcon={item.icon}
                    href={item.link}
                  >
                    {item.text}
                  </NavLink>
                  
                  {item.dropdown && (
                    <DropdownMenu className="MuiCollapse-root">
                      {item.dropdown.map((subItem) => (
                        <DropdownItem key={subItem}>
                          {subItem}
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  )}
                </NavItem>
              ))}
              
              {/* Country selector */}
              <NavItem>
                <FlagBox onClick={handleCountryMenuOpen}>
                  <img 
                    src={`https://flagcdn.com/w40/${currentFlag}.png`} 
                    alt={currentCurrency}
                    style={{ 
                      width: 24, 
                      height: 24, 
                      borderRadius: '50%', 
                      marginRight: 8,
                      border: '2px solid white'
                    }}
                  />
                  <Typography>{currentCurrency}</Typography>
                </FlagBox>
              </NavItem>
              
              {/* Sign in button */}
              <NavItem>
                <SignInButton>
                  Sign In
                </SignInButton>
              </NavItem>
            </Box>
          )}
          
          {/* Mobile menu button */}
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
        
        {/* Search Box for mobile - show only on mobile */}
        {isMobile && (
          <Box sx={{ p: 1, pb: 2 }}>
            <Search sx={{ width: '100%' }}>
              <StyledInputBase
                placeholder="Search destinations, hotels..."
                inputProps={{ 'aria-label': 'search' }}
                fullWidth
              />
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
            </Search>
          </Box>
        )}
      </StyledAppBar>
      
      {/* Country Menu */}
      <Menu
        anchorEl={countryMenuAnchor}
        open={Boolean(countryMenuAnchor)}
        onClose={handleCountryMenuClose}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 200,
            boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
            borderRadius: '8px',
          }
        }}
      >
        {countries.map((country) => (
          <MenuItem 
            key={country.code} 
            onClick={() => changeCountry(country.currency, country.code)}
            sx={{
              display: 'flex',
              alignItems: 'center',
              padding: '10px 15px',
              borderBottom: '1px solid #f0f0f0',
              '&:last-child': {
                borderBottom: 'none',
              },
              '&:hover': {
                backgroundColor: '#f5f5f5'
              }
            }}
          >
            <img 
              src={`https://flagcdn.com/w40/${country.code}.png`} 
              alt={country.name}
              style={{ width: 30, height: 25, marginRight: 8 }}
            />
            {country.name} ({country.currency})
          </MenuItem>
        ))}
      </Menu>
      
      {/* Mobile Navigation Drawer */}
      {renderMobileMenu}
      
      {/* Toolbar spacer to prevent content from hiding behind AppBar */}
      <Toolbar />
      <Toolbar sx={{ display: { xs: 'block', md: 'none' } }} />
    </>
  );
};

export default NavBar;