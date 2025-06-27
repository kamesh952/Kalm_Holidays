import React, { useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  Button,
  Box,
  Container,
  styled
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  HelpOutline as HelpOutlineIcon,
  Send as SendIcon
} from '@mui/icons-material';

const FaqPage = () => {
  const [expanded, setExpanded] = useState(null);
  const [userQuestion, setUserQuestion] = useState('');
  const [chatOutput, setChatOutput] = useState([]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };

  const handleAskQuestion = () => {
    if (userQuestion.trim()) {
      const response = "Thank you for your question. Our team will get back to you shortly.";
      setChatOutput([...chatOutput, { question: userQuestion, answer: response }]);
      setUserQuestion('');
    }
  };

  const faqs = [
    {
      question: "Why should we book your tour packages?",
      answer: "We offer the best deals with excellent service and customer satisfaction."
    },
    {
      question: "Are you a legitimate tour operator?",
      answer: "Yes, we are a licensed and registered travel agency."
    },
    {
      question: "How do we contact you?",
      answer: "You can contact us via email or phone."
    },
    {
      question: "What kind of vehicles do you use?",
      answer: "The vehicles used by us are fully air-conditioned with comfort features."
    },
    {
      question: "How do we get to know about your holiday packages, events and peak times?",
      answer: "You can check our website or subscribe to our newsletter for updates."
    },
    {
      question: "What does a Group Tour mean?",
      answer: "A group tour is a planned itinerary for a group of travelers with shared experiences."
    },
    {
      question: "Do you arrange attraction entries and accommodation?",
      answer: "Yes, we arrange attraction tickets and accommodation as part of our packages."
    },
    {
      question: "How can we book the tour packages? Is there any list available?",
      answer: "You can book online through our website or contact us for a detailed list."
    }
  ];

  const StyledAccordion = styled(Accordion)(({ theme }) => ({
    boxShadow: 'none',
    borderBottom: `1px solid ${theme.palette.divider}`,
    '&:before': {
      display: 'none',
    },
  }));

  const StyledAccordionSummary = styled(AccordionSummary)({
    padding: '10px 0',
    '& .MuiAccordionSummary-content': {
      alignItems: 'center',
      margin: '0',
    },
  });

  const StyledAccordionDetails = styled(AccordionDetails)({
    padding: '0 10px 10px 40px',
    color: '#555',
    display: 'flex',
    alignItems: 'center',
  });

  return (
    <Box sx={{ 
      width: '80%', // Matches original HTML's 80% width
      margin: '0 auto', // Center the container
      padding: '20px 0',
      fontFamily: "'Poppins', serif",
      lineHeight: 1.6,
      backgroundColor: 'ffffff',
      color: '#333'
    }}>
      <Typography variant="h4" component="h2" gutterBottom sx={{ 
        fontFamily: "'Playfair Display', serif",
        fontWeight: 700,
        mb: 4,
        padding: '0 20px' // Add side padding to match original
      }}>
        FAQs
      </Typography>

      <Box sx={{ padding: '0 20px' }}> {/* Add side padding to match original */}
        {faqs.map((faq, index) => (
          <StyledAccordion
            key={index}
            expanded={expanded === `panel${index}`}
            onChange={handleChange(`panel${index}`)}
          >
            <StyledAccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index}bh-content`}
              id={`panel${index}bh-header`}
            >
              <HelpOutlineIcon sx={{ mr: 2 }} />
              <Typography sx={{ 
                fontFamily: "'Playfair Display', serif",
                flexGrow: 1,
                textAlign: 'left',
                fontSize: '1.25rem' // Increased question size
              }}>
                {faq.question}
              </Typography>
            </StyledAccordionSummary>
            <StyledAccordionDetails>
              <Typography sx={{ fontFamily: "'Playfair Display', serif" }}>
                {faq.answer}
              </Typography>
            </StyledAccordionDetails>
          </StyledAccordion>
        ))}
      </Box>

      <Box sx={{ 
        mt: 4,
        p: 3,
        borderRadius: 2,
        margin: '20px', // Matches original spacing
        backgroundColor: 'white' // Added background to match original
      }}>
        <Typography variant="h5" component="h3" gutterBottom sx={{ 
          fontFamily: "'Playfair Display', serif",
          fontWeight: 700,
          mb: 2,
          fontSize: '1.3rem'
        }}>
          Ask a Question
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type your question here..."
            value={userQuestion}
            onChange={(e) => setUserQuestion(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                height: '50px',
                fontSize: '1.05rem'
              },
              '& .MuiOutlinedInput-input': {
                padding: '13px 14px' // Match original input padding
              }
            }}
          />
          <Button
            variant="contained"
            onClick={handleAskQuestion}
            sx={{
              height: '50px',
              minWidth: '120px',
              fontSize: '1.05rem',
              padding: '0 16px' // Match original button padding
            }}
            endIcon={<SendIcon />}
          >
            Ask
          </Button>
        </Box>

        <Box sx={{ mt: 3 }}>
          {chatOutput.map((item, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Typography variant="body1" sx={{ 
                fontWeight: 'bold', 
                fontSize: '1.05rem',
                fontFamily: "'Playfair Display', serif"
              }}>
                Q: {item.question}
              </Typography>
              <Typography variant="body1" sx={{ 
                fontSize: '1.05rem',
                fontFamily: "'Playfair Display', serif"
              }}>
                A: {item.answer}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default FaqPage;