import React from 'react';
import { 
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  List,
  ListItem,
  IconButton,
  Link,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { styled } from '@mui/material/styles';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';

// Import Playfair Display font
// You would also need to add this to your public/index.html:
// <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap" rel="stylesheet">

// Custom styled components to match original design with increased height
const NewsletterSection = styled(Box)(({ theme }) => ({
  background: '#87cdff',
  color: '#003366',
  textAlign: 'center',
  padding: theme.spacing(5), // Increased padding for height
  fontFamily: "'Playfair Display', serif",
}));

const FooterInfoSection = styled(Box)(() => ({
  background: '#ffffff',
  color: '#003366',
  padding: '80px 0', // Increased padding for height
  fontFamily: "'Playfair Display', serif",
}));

const FooterBottomSection = styled(Box)(() => ({
  textAlign: 'center',
  padding: '30px 0', // Increased padding for height
  background: '#87cdff',
  color: '#003366',
  fontFamily: "'Playfair Display', serif",
}));

const StyledTextField = styled(TextField)(() => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '25px',
    backgroundColor: '#ffffff',
    height: '50px', // Increased height
    '& fieldset': {
      borderColor: '#003366',
    },
    '&:hover fieldset': {
      borderColor: '#003366',
    },
  },
  margin: '10px 0', // Add some margin
}));

const SubscribeButton = styled(Button)(() => ({
  background: '#003366',
  color: '#ffffff',
  borderRadius: '25px',
  padding: '14px 30px', // Increased padding for height
  fontFamily: "'Playfair Display', serif",
  textTransform: 'none',
  fontSize: '16px',
  height: '50px', // Match height with input field
  '&:hover': {
    background: '#005bb5',
  },
}));

const NavLink = styled(Link)(() => ({
  margin: '0 15px',
  color: '#003366',
  textDecoration: 'none',
  fontFamily: "'Playfair Display', serif",
  fontSize: '16px',
  padding: '8px 0',
  display: 'inline-block',
  '&:hover': {
    textDecoration: 'underline',
  },
}));

const SocialIcon = styled(IconButton)(() => ({
  color: '#003366',
  marginRight: '15px',
  transition: 'transform 0.3s ease',
  padding: '12px', // Bigger clickable area
  '&:hover': {
    transform: 'scale(1.2)',
    backgroundColor: 'transparent',
  },
}));

// Typography variants with Playfair font
const CustomTypography = styled(Typography)(({ variant }) => ({
  fontFamily: "'Playfair Display', serif",
  ...(variant === 'h6' && {
    fontSize: '1.4rem',
    fontWeight: 600,
    marginBottom: '16px',
  }),
  ...(variant === 'body2' && {
    fontSize: '1rem',
    lineHeight: 1.8, // Increased line height
  }),
}));

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box 
      component="footer" 
      sx={{ 
        fontFamily: "'Playfair Display', serif",
        padding: 0,
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Newsletter Section */}
      <NewsletterSection>
        <Container>
          <Grid container alignItems="center" justifyContent="center" spacing={3}>
            <Grid item>
              <EmailIcon sx={{ fontSize: '3rem' }} /> {/* Increased icon size */}
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box textAlign={isMobile ? 'center' : 'left'}>
                <CustomTypography variant="h6">Get Updates & More</CustomTypography>
                <CustomTypography variant="body2">Thoughtful thoughts to your inbox</CustomTypography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box 
                display="flex" 
                flexDirection={isMobile ? 'column' : 'row'} 
                alignItems="center" 
                gap={2} // Increased gap
                sx={{ py: 2 }} // Added vertical padding
              >
                <StyledTextField
                  placeholder="Your Email"
                  variant="outlined"
                  size="medium" // Changed from small to medium
                  fullWidth={isMobile}
                  inputProps={{ style: { fontFamily: "'Playfair Display', serif" } }}
                />
                <SubscribeButton variant="contained">SUBSCRIBE</SubscribeButton>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </NewsletterSection>

      {/* Footer Info Section */}
      <FooterInfoSection>
        <Container>
          <Grid container spacing={5} justifyContent="space-between"> {/* Increased spacing */}
            <Grid item xs={12} sm={6} md={3}>
              <CustomTypography variant="h6">
                Corporate Office
              </CustomTypography>
              <CustomTypography variant="body2">
                Gandhi St,<br />Melpattampakkam,<br />Panruti,<br />Cuddalore-607104<br />TamilNadu, India.
              </CustomTypography>
              <CustomTypography variant="h6" sx={{ mt: 3 }}> {/* Increased margin top */}
                Call Us
              </CustomTypography>
              <CustomTypography variant="body2">+91 8680892898</CustomTypography>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <CustomTypography variant="h6">
                Head Office
              </CustomTypography>
              <CustomTypography variant="body2">
                Kalm Holidays Pvt LTD,<br />No.1, Gemini Parsn,<br />Kodambakkam High Road,<br />Nungambakkam, Chennai – 600006<br />Tamilnadu, India.
              </CustomTypography>
              <CustomTypography variant="h6" sx={{ mt: 3 }}> {/* Increased margin top */}
                Email Us
              </CustomTypography>
              <CustomTypography variant="body2">rkameshraj7@gmail.com</CustomTypography>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <CustomTypography variant="h6">
                Our Branches
              </CustomTypography>
              <Grid container>
                <Grid item xs={6}>
                  <List dense disablePadding>
                    {['Mumbai', 'Hyderabad', 'Bangalore', 'Chennai', 'Coimbatore', 'Erode', 'Madurai'].map((city) => (
                      <ListItem key={city} disablePadding sx={{ pb: 1 }}> {/* Increased padding bottom */}
                        <CustomTypography variant="body2">{city}</CustomTypography>
                      </ListItem>
                    ))}
                  </List>
                </Grid>
                <Grid item xs={6}>
                  <List dense disablePadding>
                    {['Trichy', 'Salem', 'Kochi', 'Vellore', 'Pondicherry', 'Nagercoil', 'Kanyakumari'].map((city) => (
                      <ListItem key={city} disablePadding sx={{ pb: 1 }}> {/* Increased padding bottom */}
                        <CustomTypography variant="body2">{city}</CustomTypography>
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <CustomTypography variant="h6">
                Follow Us
              </CustomTypography>
              <Box sx={{ mt: 2 }}> {/* Added margin top */}
                <SocialIcon href="https://www.facebook.com/rkamesh.kamesh.754/" target="_blank" aria-label="Facebook">
                  <FacebookIcon sx={{ fontSize: '2rem' }} /> {/* Increased icon size */}
                </SocialIcon>
                <SocialIcon href="https://www.instagram.com/kameshcrush96/" target="_blank" aria-label="Instagram">
                  <InstagramIcon sx={{ fontSize: '2rem' }} /> {/* Increased icon size */}
                </SocialIcon>
                <SocialIcon href="https://github.com/kamesh952" target="_blank" aria-label="GitHub">
                  <GitHubIcon sx={{ fontSize: '2rem' }} /> {/* Increased icon size */}
                </SocialIcon>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </FooterInfoSection>

      {/* Footer Bottom Section */}
      <FooterBottomSection>
        <Container>
          <CustomTypography variant="body2" sx={{ mb: 2 }}> {/* Increased margin bottom */}
            Copyright © 2025 by Kalm Holidays Pvt Ltd. All Rights Reserved.
          </CustomTypography>
          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: isTablet ? 'column' : 'row', 
              justifyContent: 'center', 
              gap: isTablet ? 2 : 0,
              py: 1 // Added vertical padding
            }}
          >
            <NavLink href="/privacy">Privacy Policy</NavLink>
            <NavLink href="/terms">Terms & Conditions</NavLink>
            <NavLink href="/cancel">Cancellation & Refund Policy</NavLink>
          </Box>
        </Container>
      </FooterBottomSection>
    </Box>
  );
};

export default Footer;