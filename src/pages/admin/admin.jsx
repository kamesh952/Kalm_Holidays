import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Container,
  Grid,
  Paper,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Badge,
  Button,
  CssBaseline,
  useMediaQuery
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import FlightIcon from '@mui/icons-material/Flight';
import HotelIcon from '@mui/icons-material/Hotel';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SearchIcon from '@mui/icons-material/Search';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PeopleIcon from '@mui/icons-material/People';
import TodayIcon from '@mui/icons-material/Today';

// Create a theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 500,
    },
  },
  components: {
    MuiListItem: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: 'rgba(25, 118, 210, 0.08)',
            '&:hover': {
              backgroundColor: 'rgba(25, 118, 210, 0.12)',
            },
          },
        },
      },
    },
  },
});

// Mock data
const recentBookings = [
  { id: 1, customer: "Emma Thompson", destination: "Bali", date: "2025-05-10", status: "Confirmed", amount: "$1,250" },
  { id: 2, customer: "John Smith", destination: "Paris", date: "2025-05-08", status: "Pending", amount: "$950" },
  { id: 3, customer: "Laura Wilson", destination: "Santorini", date: "2025-05-15", status: "Confirmed", amount: "$1,875" },
  { id: 4, customer: "Michael Brown", destination: "Tokyo", date: "2025-05-07", status: "Cancelled", amount: "$2,100" },
  { id: 5, customer: "Sarah Davis", destination: "Maldives", date: "2025-05-20", status: "Confirmed", amount: "$3,250" },
];

const popularDestinations = [
  { name: "Bali, Indonesia", percentage: 85 },
  { name: "Santorini, Greece", percentage: 73 },
  { name: "Maldives", percentage: 61 },
  { name: "Paris, France", percentage: 49 },
  { name: "Tokyo, Japan", percentage: 37 }
];

const upcomingTours = [
  { name: "Island Paradise Tour", date: "May 15, 2025", guests: 24 },
  { name: "European Capitals", date: "May 22, 2025", guests: 18 },
  { name: "Asian Adventure", date: "June 5, 2025", guests: 12 },
  { name: "African Safari", date: "June 15, 2025", guests: 8 },
  { name: "South American Trek", date: "July 1, 2025", guests: 15 }
];

// Dashboard component
export default function AdminDashboard() {
  const [open, setOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState('Dashboard');
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const drawerWidth = 240;

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon /> },
    { text: 'Bookings', icon: <TodayIcon /> },
    { text: 'Customers', icon: <PersonIcon /> },
    { text: 'Destinations', icon: <FlightIcon /> },
    { text: 'Hotels', icon: <HotelIcon /> },
    { text: 'Transportation', icon: <DirectionsBusIcon /> },
    { text: 'Settings', icon: <SettingsIcon /> }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed':
        return 'success';
      case 'Pending':
        return 'warning';
      case 'Cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const drawer = (
    <div>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', py: 2 }}>
        <Typography variant="h6" component="div" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
          Kalm Holidays
        </Typography>
      </Box>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem 
            button 
            key={item.text}
            selected={selectedMenu === item.text}
            onClick={() => {
              setSelectedMenu(item.text);
              if (isMobile) setOpen(false);
            }}
          >
            <ListItemIcon>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem button>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Log Out" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
              Admin Dashboard
            </Typography>
            <IconButton color="inherit">
              <SearchIcon />
            </IconButton>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton sx={{ ml: 1 }} color="inherit">
              <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}>A</Avatar>
            </IconButton>
          </Toolbar>
        </AppBar>
        
        <Box
          component="nav"
          sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        >
          {/* Mobile drawer */}
          <Drawer
            variant="temporary"
            open={open}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better mobile performance
            }}
            sx={{
              display: { xs: 'block', md: 'none' },
              '& .MuiDrawer-paper': { 
                boxSizing: 'border-box', 
                width: drawerWidth 
              },
            }}
          >
            {drawer}
          </Drawer>
          
          {/* Desktop drawer */}
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', md: 'block' },
              '& .MuiDrawer-paper': { 
                boxSizing: 'border-box', 
                width: drawerWidth,
                marginTop: '64px' // Height of AppBar
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        
        <Box
          component="main"
          sx={{ 
            flexGrow: 1, 
            p: 3, 
            width: { md: `calc(100% - ${drawerWidth}px)` },
            marginTop: '64px' // Height of AppBar
          }}
        >
          <Container maxWidth="xl">
            <Box sx={{ mb: 4 }}>
              <Typography variant="h4" component="h1" gutterBottom>
                {selectedMenu}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Welcome back, Admin! Here's what's happening with your business today.
              </Typography>
            </Box>

            <Grid container spacing={3}>
              {/* Stats Cards */}
              <Grid item xs={12} sm={6} md={3}>
                <Paper elevation={2} sx={{ p: 3, display: 'flex', flexDirection: 'column', height: 140 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography color="text.secondary" variant="body2">Total Bookings</Typography>
                    <Avatar sx={{ bgcolor: 'primary.light', width: 40, height: 40 }}>
                      <TodayIcon fontSize="small" />
                    </Avatar>
                  </Box>
                  <Typography component="p" variant="h4" sx={{ mt: 2 }}>
                    258
                  </Typography>
                  <Typography color="success.main" sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <TrendingUpIcon fontSize="small" sx={{ mr: 0.5 }} />
                    +15% from last month
                  </Typography>
                </Paper>
              </Grid>
              
              <Grid item xs={12} sm={6} md={3}>
                <Paper elevation={2} sx={{ p: 3, display: 'flex', flexDirection: 'column', height: 140 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography color="text.secondary" variant="body2">Revenue</Typography>
                    <Avatar sx={{ bgcolor: 'success.light', width: 40, height: 40 }}>
                      <AttachMoneyIcon fontSize="small" />
                    </Avatar>
                  </Box>
                  <Typography component="p" variant="h4" sx={{ mt: 2 }}>
                    $42,589
                  </Typography>
                  <Typography color="success.main" sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <TrendingUpIcon fontSize="small" sx={{ mr: 0.5 }} />
                    +23% from last month
                  </Typography>
                </Paper>
              </Grid>
              
              <Grid item xs={12} sm={6} md={3}>
                <Paper elevation={2} sx={{ p: 3, display: 'flex', flexDirection: 'column', height: 140 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography color="text.secondary" variant="body2">Customers</Typography>
                    <Avatar sx={{ bgcolor: 'info.light', width: 40, height: 40 }}>
                      <PeopleIcon fontSize="small" />
                    </Avatar>
                  </Box>
                  <Typography component="p" variant="h4" sx={{ mt: 2 }}>
                    189
                  </Typography>
                  <Typography color="success.main" sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <TrendingUpIcon fontSize="small" sx={{ mr: 0.5 }} />
                    +7% from last month
                  </Typography>
                </Paper>
              </Grid>
              
              <Grid item xs={12} sm={6} md={3}>
                <Paper elevation={2} sx={{ p: 3, display: 'flex', flexDirection: 'column', height: 140 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography color="text.secondary" variant="body2">Active Tours</Typography>
                    <Avatar sx={{ bgcolor: 'warning.light', width: 40, height: 40 }}>
                      <FlightIcon fontSize="small" />
                    </Avatar>
                  </Box>
                  <Typography component="p" variant="h4" sx={{ mt: 2 }}>
                    14
                  </Typography>
                  <Typography color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    Current ongoing tours
                  </Typography>
                </Paper>
              </Grid>

              {/* Recent Bookings */}
              <Grid item xs={12}>
                <Paper elevation={2} sx={{ overflow: 'hidden' }}>
                  <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6">Recent Bookings</Typography>
                    <Button size="small" color="primary">View All</Button>
                  </Box>
                  <TableContainer>
                    <Table sx={{ minWidth: 650 }} aria-label="bookings table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Booking ID</TableCell>
                          <TableCell>Customer</TableCell>
                          <TableCell>Destination</TableCell>
                          <TableCell>Date</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell align="right">Amount</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {recentBookings.map((booking) => (
                          <TableRow key={booking.id} hover>
                            <TableCell component="th" scope="row">
                              #{booking.id.toString().padStart(4, '0')}
                            </TableCell>
                            <TableCell>{booking.customer}</TableCell>
                            <TableCell>{booking.destination}</TableCell>
                            <TableCell>{booking.date}</TableCell>
                            <TableCell>
                              <Chip 
                                label={booking.status} 
                                color={getStatusColor(booking.status)} 
                                size="small" 
                              />
                            </TableCell>
                            <TableCell align="right">{booking.amount}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              </Grid>

              {/* Popular Destinations */}
              <Grid item xs={12} md={6}>
                <Paper elevation={2} sx={{ height: '100%' }}>
                  <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
                    <Typography variant="h6">Popular Destinations</Typography>
                  </Box>
                  <List sx={{ p: 0 }}>
                    {popularDestinations.map((destination, index) => (
                      <ListItem key={index} divider={index !== popularDestinations.length - 1}>
                        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar 
                              sx={{ 
                                bgcolor: 'primary.light', 
                                color: 'primary.main', 
                                width: 32, 
                                height: 32, 
                                mr: 2,
                                fontSize: '0.875rem'
                              }}
                            >
                              {index + 1}
                            </Avatar>
                            <Typography variant="body1">{destination.name}</Typography>
                          </Box>
                          <Typography variant="body2" color="text.secondary">
                            {destination.percentage}% booked
                          </Typography>
                        </Box>
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </Grid>

              {/* Upcoming Tours */}
              <Grid item xs={12} md={6}>
                <Paper elevation={2} sx={{ height: '100%' }}>
                  <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
                    <Typography variant="h6">Upcoming Tours</Typography>
                  </Box>
                  <List sx={{ p: 0 }}>
                    {upcomingTours.map((tour, index) => (
                      <ListItem key={index} divider={index !== upcomingTours.length - 1}>
                        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                          <Box>
                            <Typography variant="body1">{tour.name}</Typography>
                            <Typography variant="body2" color="text.secondary">{tour.date}</Typography>
                          </Box>
                          <Chip 
                            label={`${tour.guests} guests`} 
                            color="primary" 
                            variant="outlined" 
                            size="small" 
                          />
                        </Box>
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}