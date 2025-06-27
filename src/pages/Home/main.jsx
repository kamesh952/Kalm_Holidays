import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  List, 
  ListItem, 
  ListItemText,
  ListItemIcon,
  CssBaseline,
  useMediaQuery,
  ThemeProvider,
  createTheme
} from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

// Custom theme to match the original styling
const theme = createTheme({
  palette: {
    primary: {
      main: '#003580',
    },
    text: {
      primary: '#333',
      secondary: '#555',
    },
    background: {
      default: '#f9f9f9',
    }
  },
  typography: {
    fontFamily: "'Playfair Display', serif",
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#003580',
      marginBottom: '1rem',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
      color: '#003580',
      marginTop: '2rem',
      marginBottom: '1rem',
    },
    mainbody1: {
      fontFamily: "'Lora', serif",
      fontSize: '1.2rem',
      color: '#555',
      marginBottom: '1rem',
    },
  },
});

function Content() {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ padding: isMobile ? 2 : 4 }}>
          <Typography variant="h1" component="h1" gutterBottom>
            Content of Kalm Holidays
          </Typography>
          
          <Typography variant="mainbody1">
            Global tourism has seen unprecedented growth in recent years, and India has emerged as a key player. With more travelers exploring international destinations, Kalm Holidays was founded in 2007 by travel enthusiast and hospitality expert Karthik Manikandan. His vision was to create a premier travel service that caters to both leisure and corporate clients.
          </Typography>
          
          <Typography variant="mainbody1">
            Starting as a small venture, Kalm Holidays has grown into one of the top 10 tour operators, recognized by the Australian, Singaporean, and Thai tourism boards. The company specializes in tailor-made travel experiences, offering everything from luxury vacations and corporate retreats to incentive trips and international voyages.
          </Typography>
          
          <Typography variant="h2" component="h2">
            Our Vision and Mission
          </Typography>
          
          <Typography variant="mainbody1">
            Kalm Holidays aims to revolutionize the travel industry by offering unique and personalized travel experiences. We believe in making travel accessible, enjoyable, and hassle-free for everyone. Our mission is to craft unforgettable journeys that blend adventure, relaxation, and cultural immersion.
          </Typography>
          
          <Typography variant="mainbody1">
            By leveraging advanced technology and an extensive global network, we ensure that our customers receive top-notch service at every step of their journey. Our commitment to sustainability and responsible tourism also sets us apart in the industry.
          </Typography>
          
          <Typography variant="h2" component="h2">
            Why Kalm Holidays is Number 1?
          </Typography>
          
          <Typography variant="mainbody1">
            Kalm Holidays is known for its customer-centric approach, ensuring prompt responses and seamless booking experiences. From personalized packages to priority services like visa assistance and international currency exchange, the company leaves no stone unturned in delivering a hassle-free journey.
          </Typography>
          
          <Typography variant="mainbody1">
            With a PAN India presence and multilingual guides, Kalm Holidays continues to redefine travel by introducing new destinations and offering curated experiences. The company has achieved a turnover of Rs.140 crore annually and is set to reach Rs.200 crore in the coming years.
          </Typography>
          
          <Typography variant="h2" component="h2">
            Our Exclusive Services
          </Typography>
          
          <List sx={{ pl: 2 }}>
            {[
              'Customized tour packages for families, couples, and corporate groups',
              'Luxury travel experiences with premium accommodations',
              'Visa and passport assistance for seamless international travel',
              '24/7 customer support and real-time travel assistance',
              'Educational and adventure travel packages',
              'Special deals on cruises, airlines, and luxury resorts'
            ].map((item, index) => (
              <ListItem key={index} sx={{ py: 0.5 }}>
                <ListItemIcon sx={{ minWidth: '30px' }}>
                  <ArrowRightIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary={item} 
                  primaryTypographyProps={{ 
                    fontFamily: "'Lora', serif",
                    fontSize: '1.1rem',
                    color: theme.palette.text.secondary
                  }} 
                />
              </ListItem>
            ))}
          </List>
          
          <Typography variant="h2" component="h2">
            Looking Ahead
          </Typography>
          
          <Typography variant="mainbody1">
            As a trusted name in the travel industry, Kalm Holidays envisions expanding its reach to new markets and introducing innovative travel solutions. Our future plans include exclusive travel memberships, AI-based travel planning, and strategic partnerships with global tourism boards.
          </Typography>
          
          <Typography variant="mainbody1">
            With a customer-first approach and a passion for creating extraordinary experiences, Kalm Holidays continues to set new benchmarks in the travel industry.
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Content;