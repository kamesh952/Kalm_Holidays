import React from 'react';
import { 
  Container, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  Link,
  Box
} from '@mui/material';

const PrivacyPolicy = () => {
  return (
    <Container 
      maxWidth="lg" 
      sx={{ 
        width: '80%',
        margin: 'auto',
        padding: '20px',
        fontFamily: "'Playfair Display', serif",
      }}
    >
      <Typography 
        variant="h2" 
        component="h2" 
        sx={{ 
          color: '#003580',
          fontSize: '2.5em',
          textAlign: 'center',
          marginTop: '20px',
          fontFamily: "'Playfair Display', serif",
        }}
      >
        Privacy Policy
      </Typography>

      <Box mt={4}>
        <Typography 
          variant="h3" 
          component="h3"
          sx={{ 
            fontSize: '1.5em',
            color: '#0357cc',
            fontFamily: "'Playfair Display', serif",
          }}
        >
          1. Introduction
        </Typography>
        <Typography 
          variant="body1"
          sx={{ 
            fontSize: '1.2em',
            color: '#555',
            fontFamily: "'Playfair Display', serif",
          }}
        >
          At Kalm Holidays, we are committed to protecting your privacy. This Privacy Policy outlines how we collect, use, and safeguard your personal information when you use our website and services.
        </Typography>
      </Box>

      <Box mt={2}>
        <Typography 
          variant="h3" 
          component="h3"
          sx={{ 
            fontSize: '1.5em',
            color: '#0357cc',
            fontFamily: "'Playfair Display', serif",
          }}
        >
          2. Information We Collect
        </Typography>
        <List>
          <ListItem>
            <ListItemText 
              primary={<span><strong>Personal Information:</strong> Name, email, phone number, address, passport details (if required for visa processing), and payment details.</span>}
              primaryTypographyProps={{ 
                sx: { 
                  fontSize: '1.2em',
                  fontFamily: "'Playfair Display', serif",
                }
              }}
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary={<span><strong>Booking Information:</strong> Travel details, preferences, and purchase history.</span>}
              primaryTypographyProps={{ 
                sx: { 
                  fontSize: '1.2em',
                  fontFamily: "'Playfair Display', serif",
                }
              }}
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary={<span><strong>Technical Information:</strong> IP address, browser type, device information, and cookies.</span>}
              primaryTypographyProps={{ 
                sx: { 
                  fontSize: '1.2em',
                  fontFamily: "'Playfair Display', serif",
                }
              }}
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary={<span><strong>Communication Data:</strong> Emails, chat messages, or customer support interactions.</span>}
              primaryTypographyProps={{ 
                sx: { 
                  fontSize: '1.2em',
                  fontFamily: "'Playfair Display', serif",
                }
              }}
            />
          </ListItem>
        </List>
      </Box>

      <Box mt={2}>
        <Typography 
          variant="h3" 
          component="h3"
          sx={{ 
            fontSize: '1.5em',
            color: '#0357cc',
            fontFamily: "'Playfair Display', serif",
          }}
        >
          3. How We Use Your Information
        </Typography>
        <List>
          <ListItem>
            <ListItemText 
              primary="To process your bookings and payments."
              primaryTypographyProps={{ 
                sx: { 
                  fontSize: '1.2em',
                  fontFamily: "'Playfair Display', serif",
                }
              }}
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="To send booking confirmations, invoices, and travel-related updates."
              primaryTypographyProps={{ 
                sx: { 
                  fontSize: '1.2em',
                  fontFamily: "'Playfair Display', serif",
                }
              }}
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="To improve user experience through personalized recommendations."
              primaryTypographyProps={{ 
                sx: { 
                  fontSize: '1.2em',
                  fontFamily: "'Playfair Display', serif",
                }
              }}
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="To send promotional offers and newsletters (you can opt out anytime)."
              primaryTypographyProps={{ 
                sx: { 
                  fontSize: '1.2em',
                  fontFamily: "'Playfair Display', serif",
                }
              }}
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="To comply with legal and regulatory requirements."
              primaryTypographyProps={{ 
                sx: { 
                  fontSize: '1.2em',
                  fontFamily: "'Playfair Display', serif",
                }
              }}
            />
          </ListItem>
        </List>
      </Box>

      <Box mt={2}>
        <Typography 
          variant="h3" 
          component="h3"
          sx={{ 
            fontSize: '1.5em',
            color: '#0357cc',
            fontFamily: "'Playfair Display', serif",
          }}
        >
          4. How We Protect Your Information
        </Typography>
        <List>
          <ListItem>
            <ListItemText 
              primary="We use **SSL encryption** to protect online transactions."
              primaryTypographyProps={{ 
                sx: { 
                  fontSize: '1.2em',
                  fontFamily: "'Playfair Display', serif",
                }
              }}
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="We do not store full credit card details on our servers."
              primaryTypographyProps={{ 
                sx: { 
                  fontSize: '1.2em',
                  fontFamily: "'Playfair Display', serif",
                }
              }}
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Access to personal information is restricted to authorized employees only."
              primaryTypographyProps={{ 
                sx: { 
                  fontSize: '1.2em',
                  fontFamily: "'Playfair Display', serif",
                }
              }}
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="We implement firewalls and secure data storage methods to prevent unauthorized access."
              primaryTypographyProps={{ 
                sx: { 
                  fontSize: '1.2em',
                  fontFamily: "'Playfair Display', serif",
                }
              }}
            />
          </ListItem>
        </List>
      </Box>

      <Box mt={2}>
        <Typography 
          variant="h3" 
          component="h3"
          sx={{ 
            fontSize: '1.5em',
            color: '#0357cc',
            fontFamily: "'Playfair Display', serif",
          }}
        >
          5. Sharing Your Information with Third Parties
        </Typography>
        <Typography 
          variant="body1"
          sx={{ 
            fontSize: '1.2em',
            color: '#555',
            fontFamily: "'Playfair Display', serif",
          }}
        >
          We do not sell your personal data. However, we may share your information with:
        </Typography>
        <List>
          <ListItem>
            <ListItemText 
              primary={<span><strong>Travel Partners:</strong> Airlines, hotels, tour operators, and car rental companies to fulfill your bookings.</span>}
              primaryTypographyProps={{ 
                sx: { 
                  fontSize: '1.2em',
                  fontFamily: "'Playfair Display', serif",
                }
              }}
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary={<span><strong>Payment Providers:</strong> Banks and payment processors for transaction security.</span>}
              primaryTypographyProps={{ 
                sx: { 
                  fontSize: '1.2em',
                  fontFamily: "'Playfair Display', serif",
                }
              }}
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary={<span><strong>Legal Authorities:</strong> If required by law enforcement or government regulations.</span>}
              primaryTypographyProps={{ 
                sx: { 
                  fontSize: '1.2em',
                  fontFamily: "'Playfair Display', serif",
                }
              }}
            />
          </ListItem>
        </List>
      </Box>

      <Box mt={2}>
        <Typography 
          variant="h3" 
          component="h3"
          sx={{ 
            fontSize: '1.5em',
            color: '#0357cc',
            fontFamily: "'Playfair Display', serif",
          }}
        >
          6. Use of Cookies
        </Typography>
        <List>
          <ListItem>
            <ListItemText 
              primary="Cookies help us enhance your browsing experience."
              primaryTypographyProps={{ 
                sx: { 
                  fontSize: '1.2em',
                  fontFamily: "'Playfair Display', serif",
                }
              }}
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="You can manage or disable cookies through your browser settings."
              primaryTypographyProps={{ 
                sx: { 
                  fontSize: '1.2em',
                  fontFamily: "'Playfair Display', serif",
                }
              }}
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="We use cookies for analytics, advertising, and remembering your preferences."
              primaryTypographyProps={{ 
                sx: { 
                  fontSize: '1.2em',
                  fontFamily: "'Playfair Display', serif",
                }
              }}
            />
          </ListItem>
        </List>
      </Box>

      <Box mt={2}>
        <Typography 
          variant="h3" 
          component="h3"
          sx={{ 
            fontSize: '1.5em',
            color: '#0357cc',
            fontFamily: "'Playfair Display', serif",
          }}
        >
          7. Your Rights
        </Typography>
        <List>
          <ListItem>
            <ListItemText 
              primary={<span><strong>Access & Correction:</strong> You can request access to your personal data and request corrections if needed.</span>}
              primaryTypographyProps={{ 
                sx: { 
                  fontSize: '1.2em',
                  fontFamily: "'Playfair Display', serif",
                }
              }}
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary={<span><strong>Data Deletion:</strong> You may request us to delete your data, subject to legal obligations.</span>}
              primaryTypographyProps={{ 
                sx: { 
                  fontSize: '1.2em',
                  fontFamily: "'Playfair Display', serif",
                }
              }}
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary={<span><strong>Marketing Preferences:</strong> You can opt out of receiving promotional emails at any time.</span>}
              primaryTypographyProps={{ 
                sx: { 
                  fontSize: '1.2em',
                  fontFamily: "'Playfair Display', serif",
                }
              }}
            />
          </ListItem>
        </List>
      </Box>

      <Box mt={2}>
        <Typography 
          variant="h3" 
          component="h3"
          sx={{ 
            fontSize: '1.5em',
            color: '#0357cc',
            fontFamily: "'Playfair Display', serif",
          }}
        >
          8. Changes to This Privacy Policy
        </Typography>
        <Typography 
          variant="body1"
          sx={{ 
            fontSize: '1.2em',
            color: '#555',
            fontFamily: "'Playfair Display', serif",
          }}
        >
          We may update this Privacy Policy periodically. Any significant changes will be notified via email or our website.
        </Typography>
      </Box>

      <Box mt={2}>
        <Typography 
          variant="h3" 
          component="h3"
          sx={{ 
            fontSize: '1.5em',
            color: '#0357cc',
            fontFamily: "'Playfair Display', serif",
          }}
        >
          9. Contact Us
        </Typography>
        <Typography 
          variant="body1"
          sx={{ 
            fontSize: '1.2em',
            color: '#555',
            fontFamily: "'Playfair Display', serif",
          }}
        >
          If you have any questions or concerns about our Privacy Policy, please <Link href="/contact" sx={{ fontFamily: "'Playfair Display', serif" }}>contact us</Link>.
        </Typography>
        <Typography 
          variant="body1"
          sx={{ 
            fontSize: '1.2em',
            color: '#555',
            fontFamily: "'Playfair Display', serif",
          }}
        >
          📞 <strong>+91 8680892898</strong>
        </Typography>
        <Typography 
          variant="body1"
          sx={{ 
            fontSize: '1.2em',
            color: '#555',
            fontFamily: "'Playfair Display', serif",
          }}
        >
          📧 <strong>rkameshraj7@gmail.com</strong>
        </Typography>
      </Box>
    </Container>
  );
};

export default PrivacyPolicy;