import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  List, 
  ListItem, 
  ListItemText,
  Link,
  ThemeProvider,
  createTheme
} from '@mui/material';
import { styled } from '@mui/system';

// Create a custom theme that only applies to this component
const theme = createTheme({
  typography: {
    fontFamily: "'Playfair Display', serif",
    h1: {
      color: '#003580',
      fontSize: '2.5em',
      textAlign: 'center',
    },
    h2: {
      color: '#003580',
      fontSize: '2.5em',
      textAlign: 'center',
      marginTop: '20px',
    },
    h3: {
      fontSize: '1.5em',
      color: '#0357cc',
    },
    body1: {
      fontSize: '1.2em',
      color: '#555',
      fontFamily: "'Lora', serif",
    },
  },
});

// Custom styled components to match original styling
const StyledListItem = styled(ListItem)({
  '& .MuiTypography-root': {
    fontSize: '1.2em',
  },
  padding: '4px 0',
});

// Styled container that doesn't affect global styles
const PolicyContainer = styled(Container)(({ theme }) => ({
  backgroundColor: '#f9f9f9',
  color: '#333',
  lineHeight: 1.6,
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(4),
  '& a': {
    color: '#0357cc',
  }
}));

const CancellationRefundPolicy = () => {
  return (
    <ThemeProvider theme={theme}>
      <PolicyContainer maxWidth={false} disableGutters={false} sx={{ width: '80%', margin: 'auto', padding: '20px' }}>
        <Typography variant="h2" component="h2">Cancellation & Refund Policy</Typography>

        <Box mt={4}>
          <Typography variant="h3" component="h3">1. General Policy</Typography>
          <Typography variant="body1">
            At <strong>Kalm Holidays</strong>, we aim to provide the best travel experiences. However, we understand that plans can change, and we offer a fair cancellation and refund policy to accommodate our customers.
          </Typography>
        </Box>

        <Box mt={3}>
          <Typography variant="h3" component="h3">2. Cancellation Policy</Typography>
          <List>
            <StyledListItem>
              <ListItemText 
                primary={<><strong>More than 30 days before departure:</strong> Full refund (minus a 5% processing fee).</>} 
                disableTypography 
              />
            </StyledListItem>
            <StyledListItem>
              <ListItemText 
                primary={<><strong>15 to 29 days before departure:</strong> 50% refund.</>} 
                disableTypography 
              />
            </StyledListItem>
            <StyledListItem>
              <ListItemText 
                primary={<><strong>7 to 14 days before departure:</strong> 25% refund.</>} 
                disableTypography 
              />
            </StyledListItem>
            <StyledListItem>
              <ListItemText 
                primary={<><strong>Less than 7 days before departure:</strong> No refund.</>} 
                disableTypography 
              />
            </StyledListItem>
            <StyledListItem>
              <ListItemText 
                primary={<><strong>No-show or early departure:</strong> No refund applicable.</>} 
                disableTypography 
              />
            </StyledListItem>
          </List>
        </Box>

        <Box mt={3}>
          <Typography variant="h3" component="h3">3. Refund Policy</Typography>
          <List>
            <StyledListItem>
              <ListItemText 
                primary={<>Refunds will be processed within <strong>14 business days</strong>.</>} 
                disableTypography 
              />
            </StyledListItem>
            <StyledListItem>
              <ListItemText 
                primary={<>Refunds will be credited to the original payment method.</>} 
                disableTypography 
              />
            </StyledListItem>
            <StyledListItem>
              <ListItemText 
                primary={<>Processing times may vary depending on the bank.</>} 
                disableTypography 
              />
            </StyledListItem>
          </List>
        </Box>

        <Box mt={3}>
          <Typography variant="h3" component="h3">4. Flight, Hotel, and Package Cancellations</Typography>
          <List>
            <StyledListItem>
              <ListItemText 
                primary={<>Flight cancellations follow the airline's policy.</>} 
                disableTypography 
              />
            </StyledListItem>
            <StyledListItem>
              <ListItemText 
                primary={<>Hotel cancellations depend on the hotel's terms.</>} 
                disableTypography 
              />
            </StyledListItem>
            <StyledListItem>
              <ListItemText 
                primary={<>Package cancellations may have different rules based on the destination.</>} 
                disableTypography 
              />
            </StyledListItem>
          </List>
        </Box>

        <Box mt={3}>
          <Typography variant="h3" component="h3">5. Non-Refundable Bookings</Typography>
          <List>
            <StyledListItem>
              <ListItemText 
                primary={<>Some promotional or last-minute bookings are <strong>non-refundable</strong>.</>} 
                disableTypography 
              />
            </StyledListItem>
            <StyledListItem>
              <ListItemText 
                primary={<>Non-refundable bookings will be clearly indicated during booking.</>} 
                disableTypography 
              />
            </StyledListItem>
          </List>
        </Box>

        <Box mt={3}>
          <Typography variant="h3" component="h3">6. Changes & Rescheduling</Typography>
          <List>
            <StyledListItem>
              <ListItemText 
                primary={<>Date changes may be allowed with a <strong>rescheduling fee</strong>.</>} 
                disableTypography 
              />
            </StyledListItem>
            <StyledListItem>
              <ListItemText 
                primary={<>Changes must be requested at least <strong>10 days before travel</strong>.</>} 
                disableTypography 
              />
            </StyledListItem>
          </List>
        </Box>

        <Box mt={3}>
          <Typography variant="h3" component="h3">7. Travel Insurance & Force Majeure</Typography>
          <List>
            <StyledListItem>
              <ListItemText 
                primary={<>We highly recommend purchasing <strong>travel insurance</strong> to cover unforeseen cancellations.</>} 
                disableTypography 
              />
            </StyledListItem>
            <StyledListItem>
              <ListItemText 
                primary={<>In case of natural disasters, political unrest, or pandemics, refunds will be subject to the <strong>supplier's policies</strong>.</>} 
                disableTypography 
              />
            </StyledListItem>
          </List>
        </Box>

        <Box mt={3}>
          <Typography variant="h3" component="h3">8. Refund Process & Timeline</Typography>
          <List>
            <StyledListItem>
              <ListItemText 
                primary={<>Once cancellation is confirmed, the refund will be initiated within <strong>14 business days</strong>.</>} 
                disableTypography 
              />
            </StyledListItem>
            <StyledListItem>
              <ListItemText 
                primary={<>If the refund is delayed, customers can contact their bank or payment provider.</>} 
                disableTypography 
              />
            </StyledListItem>
          </List>
        </Box>

        <Box mt={3}>
          <Typography variant="h3" component="h3">9. Contact for Cancellations & Refunds</Typography>
          <Typography variant="body1">
            For cancellation or refund requests, please contact our customer support team:
          </Typography>
          <Typography variant="body1">
            If you have any questions, please feel free to <Link href="contact.html">contact us</Link>.
          </Typography>
          <Typography variant="body1">
            📞 <strong>+91 8680892898</strong>
          </Typography>
          <Typography variant="body1">
            📧 <strong>rkameshraj7@gmail.com</strong>
          </Typography>
        </Box>
      </PolicyContainer>
    </ThemeProvider>
  );
};

export default CancellationRefundPolicy;