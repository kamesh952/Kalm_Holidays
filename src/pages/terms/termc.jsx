import React from 'react';
import { 
  Container, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  Link,
  Box,
  useTheme
} from '@mui/material';

const TermsAndConditions = () => {
  const theme = useTheme();

  return (
    <Container 
      maxWidth="lg" 
      sx={{ 
        marginTop: '65px', 
        width: '80%',
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
        Terms & Conditions
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
          1. Acceptance of Terms
        </Typography>
        <Typography 
          variant="body1"
          sx={{ 
            fontSize: '1.2em',
            color: '#555',
            fontFamily: "'Playfair Display', serif",
          }}
        >
          By using our website and services, you agree to comply with and be bound by these Terms & Conditions. If you do not agree, please do not proceed with our services.
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
          2. Booking & Payment Policy
        </Typography>
        <List>
          <ListItem>
            <ListItemText 
              primary="All bookings are subject to availability and confirmation."
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
              primary="Customers must provide accurate details when booking."
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
              primary="Full or partial payment must be made at the time of booking, as specified."
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
              primary="Prices are subject to change due to fluctuations in airline fares, hotel rates, and currency exchange."
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
          3. Cancellation & Refund Policy
        </Typography>
        <List>
          <ListItem>
            <ListItemText 
              primary="Cancellations must be made in writing or through our online system."
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
              primary={
                <React.Fragment>
                  Refunds will be processed according to our <Link href="cancel.html" sx={{ fontFamily: "'Playfair Display', serif" }}>Cancellation & Refund Policy</Link>.
                </React.Fragment>
              }
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
              primary="Refunds, if applicable, will be processed within 14 business days."
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
              primary="Some bookings, including promotional offers and last-minute deals, may be non-refundable."
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
          4. Travel Documents & Responsibilities
        </Typography>
        <List>
          <ListItem>
            <ListItemText 
              primary="Customers must ensure they have valid passports, visas, and other travel documents."
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
              primary="Kalm Holidays is not responsible for denied entries due to missing or incorrect documents."
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
              primary="Customers must comply with local laws and regulations at their travel destinations."
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
          5. User Obligations
        </Typography>
        <List>
          <ListItem>
            <ListItemText 
              primary="You must provide truthful and accurate information when using our services."
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
              primary="You agree not to use our website or services for fraudulent activities."
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
              primary="You must respect the policies and conditions set by our partner airlines, hotels, and service providers."
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
          6. Prohibited Activities
        </Typography>
        <List>
          <ListItem>
            <ListItemText 
              primary="Using false identities or misleading information for booking."
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
              primary="Engaging in fraudulent credit card transactions or chargebacks."
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
              primary="Reselling, redistributing, or unauthorized commercial use of our services."
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
              primary="Hacking, data scraping, or attempting to manipulate website content."
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
          7. Liability Disclaimer
        </Typography>
        <List>
          <ListItem>
            <ListItemText 
              primary="Kalm Holidays is not responsible for any delays, losses, accidents, or unforeseen circumstances beyond our control."
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
              primary="We act as an intermediary between customers and service providers (hotels, airlines, transportation services) and are not liable for their actions."
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
              primary="Travel insurance is strongly recommended to cover any unexpected situations."
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
          8. Force Majeure
        </Typography>
        <Typography 
          variant="body1"
          sx={{ 
            fontSize: '1.2em',
            color: '#555',
            fontFamily: "'Playfair Display', serif",
          }}
        >
          Kalm Holidays shall not be liable for failure to perform obligations due to events beyond our control, including natural disasters, strikes, war, pandemics, government restrictions, or acts of terrorism.
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
          9. Changes & Modifications
        </Typography>
        <Typography 
          variant="body1"
          sx={{ 
            fontSize: '1.2em',
            color: '#555',
            fontFamily: "'Playfair Display', serif",
          }}
        >
          We reserve the right to modify these Terms & Conditions at any time. Customers will be notified of significant changes via email or website updates.
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
          10. Governing Law & Jurisdiction
        </Typography>
        <Typography 
          variant="body1"
          sx={{ 
            fontSize: '1.2em',
            color: '#555',
            fontFamily: "'Playfair Display', serif",
          }}
        >
          These Terms & Conditions are governed by the laws of India. Any disputes shall be resolved in the courts of Chennai, Tamil Nadu.
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
          11. Contact Us
        </Typography>
        <Typography 
          variant="body1"
          sx={{ 
            fontSize: '1.2em',
            color: '#555',
            fontFamily: "'Playfair Display', serif",
          }}
        >
          If you have any questions, please feel free to <Link href="/contact" sx={{ fontFamily: "'Playfair Display', serif" }}>contact us</Link>.
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

export default TermsAndConditions;