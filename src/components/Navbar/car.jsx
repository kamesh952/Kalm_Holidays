import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, IconButton, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useTheme } from '@mui/material/styles';
import 'typeface-great-vibes';
import 'typeface-dancing-script';
import 'typeface-playfair-display';

// Styled components
const CarouselContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '730px',
  overflow: 'hidden',
  [theme.breakpoints.down('md')]: {
    height: '500px',
  },
  [theme.breakpoints.down('sm')]: {
    height: '350px',
  },
}));

const CarouselSlide = styled(Box)(({ theme, active }) => ({
  display: active ? 'block' : 'none',
  width: '100%',
  height: '100%',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  animation: active ? 'fade 1s ease-in-out' : 'none',
  '@keyframes fade': {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
}));

const VideoContainer = styled('video')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

const Overlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  textAlign: 'center',
  color: 'white',
  textShadow: '3px 3px 10px rgba(0, 0, 0, 0.5)',
}));

const CarouselTitle = styled(Typography)(({ theme, fontFamily }) => ({
  fontSize: '5rem',
  color: '#FFD700',
  fontFamily: fontFamily || 'Great Vibes, cursive',
  [theme.breakpoints.down('md')]: {
    fontSize: '3.5rem',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '2.5rem',
  },
}));

const CarouselDescription = styled(Typography)(({ theme, fontFamily }) => ({
  fontSize: '3rem',
  marginTop: 0,
  maxWidth: '80%',
  color: '#FFFAFA',
  textShadow: '3px 3px 10px rgba(255, 255, 255, 0.5)',
  fontFamily: fontFamily || 'Dancing Script, cursive',
  [theme.breakpoints.down('md')]: {
    fontSize: '2rem',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.5rem',
    maxWidth: '90%',
  },
}));

const NavButton = styled(IconButton)(({ theme, direction }) => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  left: direction === 'left' ? '40px' : 'auto',
  right: direction === 'right' ? '40px' : 'auto',
  background: 'rgba(255, 255, 255, 0.2)',
  backdropFilter: 'blur(15px)',
  color: 'white',
  padding: '10px',
  borderRadius: '15px',
  transition: 'all 0.3s ease',
  boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.3)',
  '&:hover': {
    background: 'rgba(134, 134, 134, 0.2)',
    boxShadow: 'inset 2px 2px 10px rgba(0, 0, 0, 0.3)',
  },
  [theme.breakpoints.down('sm')]: {
    left: direction === 'left' ? '10px' : 'auto',
    right: direction === 'right' ? '10px' : 'auto',
  },
}));

// Main component
export const Car = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideIntervalRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const slides = [
    {
      type: 'video',
      src: "videoplayback.webm",
      title: "Navigate the world",
      description: "Let the sounds of nature and breathtaking landscapes captivate you.",
      titleFont: "'Great Vibes', cursive",
      descFont: "'Dancing Script', cursive"
    },
    {
      type: 'image',
      src: "bang.jpg",
      title: "Discover Paradise",
      description: "Experience the breathtaking beauty of unspoiled nature and luxury.",
      titleFont: "'Playfair Display', serif",
      descFont: "'Marck Script', cursive"
    },
    {
      type: 'video',
      src: "videoplayback.mp4",
      title: "",
      description: "Experience the vibrant energy and dazzling lights of the city.",
      titleFont:"'Playfair Display', serif",
      descFont: "'Dancing Script', cursive"
    },
    {
      type: 'image',
      src: "BACK1.jpg",
      title: "Explore the Unexplored",
      description: "Journey to places where adventure meets serenity.",
      titleFont: "'Playfair Display', serif",
      descFont: "'Dancing Script', cursive"
    },
    {
      type: 'video',
      src: "h.webm",
      title: "",
      description: "Immerse yourself in sun-kissed beaches and crystal-clear waters.",
      titleFont: "'Dancing Script', cursive",
      descFont: "'Dancing Script', cursive"
    },
    {
      type: 'video',
      src: "ht.mp4",
      title: "The Land of Heaven",
      description: "Witness the wonders of modern architecture and cultural richness.",
      titleFont: "'Playfair Display', serif",
      descFont: "'Playfair Display', serif"
    }
  ];

  const showSlide = (index) => {
    setCurrentSlide((index + slides.length) % slides.length);
  };

  const nextSlide = () => showSlide(currentSlide + 1);
  const prevSlide = () => showSlide(currentSlide - 1);

  const startAutoSlide = () => {
    slideIntervalRef.current = setInterval(nextSlide, 20000);
  };

  const stopAutoSlide = () => {
    if (slideIntervalRef.current) {
      clearInterval(slideIntervalRef.current);
    }
  };

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, [currentSlide]);

  return (
    <CarouselContainer
      onMouseEnter={stopAutoSlide}
      onMouseLeave={startAutoSlide}
    >
      {slides.map((slide, index) => (
        <CarouselSlide key={index} active={index === currentSlide}>
          {slide.type === 'video' ? (
            <VideoContainer autoPlay loop muted>
              <source src={slide.src} type="video/mp4" />
              Your browser does not support the video tag.
            </VideoContainer>
          ) : (
            <Box
              sx={{
                backgroundImage: `url(${slide.src})`,
                width: '100%',
                height: '100%',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          )}
          <Overlay>
            {slide.title && (
              <CarouselTitle variant="h1" fontFamily={slide.titleFont}>
                {slide.title}
              </CarouselTitle>
            )}
            <CarouselDescription variant="body1" fontFamily={slide.descFont}>
              {slide.description}
            </CarouselDescription>
          </Overlay>
        </CarouselSlide>
      ))}

      <NavButton direction="left" onClick={prevSlide} aria-label="Previous slide">
        <ChevronLeftIcon fontSize={isMobile ? "medium" : "large"} />
      </NavButton>
      <NavButton direction="right" onClick={nextSlide} aria-label="Next slide">
        <ChevronRightIcon fontSize={isMobile ? "medium" : "large"} />
      </NavButton>
    </CarouselContainer>
  );
};

export default Car;