import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardMedia, 
  CardContent, 
  Divider,
  IconButton,
  styled
} from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import EmailIcon from '@mui/icons-material/Email';

// Custom styling to match the original CSS
const StyledContainer = styled(Container)(({ theme }) => ({
  width: '80%',
  margin: 'auto',
  padding: '20px',
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontFamily: '"Playfair Display", serif',
  color: '#003580',
  fontSize: '2.5em',
}));

const SectionText = styled(Typography)(({ theme }) => ({
  fontSize: '1.2em',
  color: '#555',
  fontFamily: '"Playfair Display", serif',
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  gap: '40px',
  flexWrap: 'wrap',
  marginTop: '30px',
  fontFamily: '"Playfair Display", serif',
}));

const StyledImage = styled('img')(({ theme }) => ({
  width: '500px',
  height: '300px',
  objectFit: 'cover',
  fontFamily: '"Playfair Display", serif',
  borderRadius: '5px',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'scale(1.02)',
  },
  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
}));

const MissionVisionContainer = styled(Grid)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '40px',
  alignItems: 'start',
  fontFamily: '"Playfair Display", serif',
  justifyContent: 'center',
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr',
  },
}));

const CeoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  maxWidth: '900px',
  margin: 'auto',
  fontFamily: '"Playfair Display", serif',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
  },
}));

const CeoLeftSection = styled(Box)(({ theme }) => ({
  marginTop: '30px',
  display: 'flex',
  fontFamily: '"Playfair Display", serif',
  flexDirection: 'column',
  alignItems: 'center',
}));

const CeoImage = styled('img')(({ theme }) => ({
  width: '200px',
  height: '200px',
  fontFamily: '"Playfair Display", serif',
  borderRadius: '50%',
  '&:hover': {
   
    transition: 'transform 0.5s',
  },
}));

const CeoContent = styled(Box)(({ theme }) => ({
  textAlign: 'right',
  fontFamily: '"Playfair Display", serif',
  maxWidth: '600px',
  [theme.breakpoints.down('md')]: {
    textAlign: 'center',
    marginTop: '20px',
  },
}));

const TeamSection = styled(Box)(({ theme }) => ({
  padding: '100px 0',
  fontFamily: '"Playfair Display", serif',
  Width: '1900px',
  marginTop: '0%',
}));

const TeamGrid = styled(Grid)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: '30px',
  fontFamily: '"Playfair Display", serif',
  marginTop: '50px',
}));

const TeamMember = styled(Card)(({ theme }) => ({
  borderRadius: '10px',
  fontFamily: '"Playfair Display", serif',
  overflow: 'hidden',
  boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
  },
}));

// Updated the MemberImageContainer to handle hover effects
const MemberImageContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: '200px',
  overflow: 'hidden',
}));

const MemberImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  transition: 'all 0.3s ease',
}));

// Fixed the MemberSocial component with correct hover logic
const MemberSocial = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: '-60px',
  left: 0,
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  background: 'linear-gradient(to top, rgba(42, 42, 114, 0.9), transparent)',
  padding: '20px 0',
  transition: 'all 0.3s ease',
  
  '.team-member-container:hover &': {
    bottom: 0,
  },
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  width: '40px',
  height: '40px',
  margin: '0 10px',
  backgroundColor: '#f8f9fa',
  color: '#2a2a72',
  '&:hover': {
    backgroundColor: '#ffa400',
    transform: 'translateY(-5px)',
  },
}));

const MemberInfo = styled(CardContent)(({ theme }) => ({
  padding: '25px',
  fontFamily: '"Playfair Display", serif',
  textAlign: 'center',
}));

const StatsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  gap: '40px',
  fontFamily: '"Playfair Display", serif',
  marginTop: '40px',
  flexWrap: 'wrap',
  paddingBottom: '20px',
  fontFamily: '"Poppins", serif',
}));

const StatCard = styled(Box)(({ theme }) => ({
  width: '200px',
  fontFamily: '"Playfair Display", serif',
  height: '150px',
  border: '5px solid #FFC107',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '1.0em',
  fontWeight: 'bold',

  position: 'relative',
  transition: 'transform 0.5s',
  transformStyle: 'preserve-3d',
  cursor: 'pointer',
  '&:hover': {
    transform: 'rotateY(180deg)',
    width: '200px',
    height: '150px',
  },
}));

const StatFront = styled(Box)(({ theme }) => ({
  position: 'absolute',
  width: '100%',
  fontFamily: '"Playfair Display", serif',
  height: '100%',
  backfaceVisibility: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '20px',
}));

const StatBack = styled(Box)(({ theme }) => ({
  position: 'absolute',
  width: '100%',
  height: '100%',
  border: '5px solid #FFC107',
  fontFamily: '"Playfair Display", serif',
  backfaceVisibility: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '20px',
  background: 'black',
 
  color: 'white',
  transform: 'rotateY(180deg)',
}));

function HistoryPage() {
  // Add Google Fonts to document head
  React.useEffect(() => {
    
    const link1 = document.createElement('link');
    link1.rel = 'stylesheet';
    link1.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Poppins:wght@300;500;700&family=Lora:wght@400;700&family=Raleway:wght@300;400;700&display=swap';
    document.head.appendChild(link1);
    
    return () => {
      document.head.removeChild(link1);
    };
  }, []);

  return (
    <StyledContainer>
      <SectionTitle variant="h2">Our Story</SectionTitle>
      <SectionText>
        Established in 1968, Kalm Holidays is entirely owned and managed by Sangam Group of Hotels. The Sangam Group is recognized as one of the largest hotel chains in Tamil Nadu. Along with the Group, Kalm Holidays is striving hard for ultimate success and innovation.
      </SectionText>
      <SectionText>
        We are an ISO 9001: 2008 certified company that aims to set clear goals, fix priorities, and organize resources effectively. Kalm Holidays enables you to discover new destinations and offer unique travel ideas.
      </SectionText>
      
      <ImageContainer>
        <StyledImage src="R (1).jpg" alt="Camera Lens" />
        <StyledImage src="R.jpg" alt="Vintage Compass" />
      </ImageContainer>
      
      <MissionVisionContainer container>
        <Box sx={{ marginTop: '30px' }}>
          <SectionTitle variant="h2">Our Mission</SectionTitle>
          <SectionText>
            Kalm Holidays is a fully integrated travel company that offers comprehensive solutions for business and leisure travelers worldwide. We aim to satisfy client requirements with ultimate transparency and cost-effectiveness.
          </SectionText>
        </Box>
        <Box sx={{ marginTop: '30px' }}>
          <SectionTitle variant="h2">Our Vision</SectionTitle>
          <SectionText>
            Our team is striving to become a world-class travel company and industry leader in the near future. We focus on a customer-centric approach to gain recognition among worldwide clients and craft extraordinary moments for you.
          </SectionText>
        </Box>
      </MissionVisionContainer>
      
      <Divider sx={{ my: 3 }} />
      
      <CeoContainer>
        <CeoLeftSection>
          <CeoImage src="kamesh.jpg" alt="Mr. Kamesh" />
          <Typography sx={{ fontWeight: 'bold', marginTop: '10px',fontFamily: '"Playfair Display", serif' }}>Mr. Kamesh</Typography>
          <Typography sx={{ color: 'gray', marginBottom: '20px',fontFamily: '"Playfair Display", serif', }}>Founder & CEO</Typography>
        </CeoLeftSection>
        
        <CeoContent>
          <SectionTitle variant="h2" sx={{ textAlign: { xs: 'center', md: 'left' } }}>CEO's Note</SectionTitle>
          <SectionText sx={{ fontStyle: 'italic', color: '#555' }}>
            "KALM Holidays was founded with a vision of excellence and a passion for travel. 
            With a dedicated team and unwavering commitment, we have built this company step by step. 
            Today, our reputation is built upon trust, exceptional service, and years of dedicated customer support. 
            KALM Holidays continues to set new standards in the travel industry, making every journey unforgettable."
          </SectionText>
        </CeoContent>
      </CeoContainer>
      
      <TeamSection>
        <Container>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="subtitle1"sx={{ fontFamily: '"Playfair Display", serif',fontSize: '1.9rem'}}>Our Travel Experts</Typography>
            <SectionTitle variant="h2">Meet The Kalm Holidays Team</SectionTitle>
            <Divider sx={{ width: '50px', margin: '20px auto' }} />
          </Box>
          
          <TeamGrid container>
            {/* First Team Member with fixed hover effect */}
            <TeamMember>
              {/* Using sx prop for the hover effect instead of styled components for more direct control */}
              <Box 
                className="team-member-container"
                sx={{ 
                  position: 'relative',
                  height: '200px',
                  overflow: 'hidden',
                  '&:hover .member-social': {
                    bottom: 0,
                  },
                  '&:hover img': {
                    transform: 'scale(1.05)',
                  }
                }}
              >
                <Box
                  component="img"
                  src="https://img.freepik.com/premium-photo/candid-shot-businessman-writing-sign-document-office-ceo-manager-work-space-meetings_141345-2974.jpg"
                  alt="Mr. Rajendran"
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'all 0.3s ease',
                  }}
                />
                <Box
                  className="member-social"
                  sx={{
                    position: 'absolute',
                    bottom: '-60px',
                    left: 0,
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    background: 'linear-gradient(to top, rgba(42, 42, 114, 0.9), transparent)',
                    padding: '20px 0',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <StyledIconButton>
                    <LinkedInIcon />
                  </StyledIconButton>
                  <StyledIconButton>
                    <TwitterIcon />
                  </StyledIconButton>
                  <StyledIconButton>
                    <EmailIcon />
                  </StyledIconButton>
                </Box>
              </Box>
              <MemberInfo>
                <Typography variant="h5" component="h3" sx={{ fontFamily: '"Playfair Display", serif', fontSize: '1.3rem', marginBottom: '5px' }}>Mr. Rajendran</Typography>
                <Typography variant="body2" sx={{ color: '#ffa400', fontWeight: 600, fontSize: '0.9rem',fontFamily: '"Playfair Display", serif', marginBottom: '15px' }}>Co-Founder & CEO</Typography>
                <Typography variant="body2" sx={{ color: '#6c757d', fontSize: '0.9rem',fontFamily: '"Playfair Display", serif' }}>Passionate about creating seamless travel experiences worldwide.</Typography>
              </MemberInfo>
            </TeamMember>
            
            {/* Second Team Member with fixed hover effect */}
            <TeamMember>
              <Box 
                className="team-member-container"
                sx={{ 
                  position: 'relative',
                  height: '200px',
                  overflow: 'hidden',
                  '&:hover .member-social': {
                    bottom: 0,
                  },
                  '&:hover img': {
                    transform: 'scale(1.05)',
                  }
                }}
              >
                <Box
                  component="img"
                  src="https://as1.ftcdn.net/v2/jpg/02/94/62/14/1000_F_294621430_9dwIpCeY1LqefWCcU23pP9i11BgzOS0N.jpg"
                  alt="Mr. Ravi Varman"
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'all 0.3s ease',
                  }}
                />
                <Box
                  className="member-social"
                  sx={{
                    position: 'absolute',
                    bottom: '-60px',
                    left: 0,
                    width: '100%',
                    display: 'flex',
                    fontFamily: '"Playfair Display", serif',

                    justifyContent: 'center',
                    background: 'linear-gradient(to top, rgba(42, 42, 114, 0.9), transparent)',
                    padding: '20px 0',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <StyledIconButton>
                    <LinkedInIcon />
                  </StyledIconButton>
                  <StyledIconButton>
                    <TwitterIcon />
                  </StyledIconButton>
                  <StyledIconButton>
                    <EmailIcon />
                  </StyledIconButton>
                </Box>
              </Box>
              <MemberInfo>
                <Typography variant="h5" component="h3" sx={{ fontFamily: '"Playfair Display", serif', fontSize: '1.3rem', marginBottom: '5px' }}>Mr. Ravi Varman</Typography>
                <Typography variant="body2" sx={{ color: '#ffa400', fontWeight: 600, fontSize: '0.9rem',fontFamily: '"Playfair Display", serif', marginBottom: '15px' }}>Head of Operations</Typography>
                <Typography variant="body2" sx={{ color: '#6c757d', fontSize: '0.9rem',fontFamily: '"Playfair Display", serif' }}>Ensuring every journey is smooth and stress-free.</Typography>
              </MemberInfo>
            </TeamMember>
            
            {/* Third Team Member with fixed hover effect */}
            <TeamMember>
              <Box 
                className="team-member-container"
                sx={{ 
                  position: 'relative',
                  height: '200px',
                  overflow: 'hidden',
                  '&:hover .member-social': {
                    bottom: 0,
                  },
                  '&:hover img': {
                    transform: 'scale(1.05)',
                  }
                }}
              >
                <Box
                  component="img"
                  src="https://tse1.mm.bing.net/th/id/OIP.ydIb5N45qtLb4wiMe2_GLAAAAA?rs=1&pid=ImgDetMain"
                  alt="Mr.Kannan"
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'all 0.3s ease',
                  }}
                />
                <Box
                  className="member-social"
                  sx={{
                    position: 'absolute',
                    bottom: '-60px',
                    left: 0,
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    background: 'linear-gradient(to top, rgba(42, 42, 114, 0.9), transparent)',
                    padding: '20px 0',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <StyledIconButton>
                    <LinkedInIcon />
                  </StyledIconButton>
                  <StyledIconButton>
                    <TwitterIcon />
                  </StyledIconButton>
                  <StyledIconButton>
                    <EmailIcon />
                  </StyledIconButton>
                </Box>
              </Box>
              <MemberInfo>
                <Typography variant="h5" component="h3" sx={{ fontFamily: '"Playfair Display", serif', fontSize: '1.3rem', marginBottom: '5px' }}>Mr.Kannan</Typography>
                <Typography variant="body2" sx={{ color: '#ffa400', fontWeight: 600, fontSize: '0.9rem', fontFamily: '"Playfair Display", serif',marginBottom: '15px' }}>Travel Consultant</Typography>
                <Typography variant="body2" sx={{ color: '#6c757d',fontFamily: '"Playfair Display", serif', fontSize: '0.9rem' ,}}>Expert in crafting personalized vacation experiences.</Typography>
              </MemberInfo>
            </TeamMember>
          </TeamGrid>
        </Container>
      </TeamSection>
      
      <StatsContainer>
        <StatCard>
          <StatFront>
            <Typography variant="h6" sx={{  fontFamily: '"Playfair Display", serif' }}>1000+</Typography>
            <Typography sx={{  fontFamily: '"Playfair Display", serif' }}>Partners</Typography>
          </StatFront>
          <StatBack>
            <Typography sx={{  fontFamily: '"Playfair Display", serif' }}>We collaborate with over 1000 partners to provide the best travel experience.</Typography>
          </StatBack>
        </StatCard>
        
        <StatCard>
          <StatFront>
            <Typography variant="h6" sx={{  fontFamily: '"Playfair Display", serif' }}>2k+</Typography>
            <Typography sx={{  fontFamily: '"Playfair Display", serif' }}>Properties</Typography>
          </StatFront>
          <StatBack>
            <Typography sx={{  fontFamily: '"Playfair Display", serif' }}>We have a wide range of 2000+ properties to make your stay comfortable.</Typography>
          </StatBack>
        </StatCard>
        
        <StatCard>
          <StatFront>
            <Typography variant="h6" sx={{  fontFamily: '"Playfair Display", serif' }}>300k+</Typography>
            <Typography sx={{  fontFamily: '"Playfair Display", serif' }}>Destinations</Typography>
          </StatFront>
          <StatBack>
            <Typography sx={{  fontFamily: '"Playfair Display", serif' }}>Discover more than 300,000 destinations worldwide with us.</Typography>
          </StatBack>
        </StatCard>
        
        <StatCard>
          <StatFront>
            <Typography variant="h6" sx={{  fontFamily: '"Playfair Display", serif' }}>40k+</Typography>
            <Typography sx={{  fontFamily: '"Playfair Display", serif' }}>Booking</Typography>
          </StatFront>
          <StatBack>
            <Typography sx={{  fontFamily: '"Playfair Display", serif' }}>We have successfully completed over 40,000 bookings for our customers.</Typography>
          </StatBack>
        </StatCard>
      </StatsContainer>
    </StyledContainer>
  );
}

export default HistoryPage;