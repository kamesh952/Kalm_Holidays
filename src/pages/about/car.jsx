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
  height: '750px',
  overflow: 'hidden',
  [theme.breakpoints.down('md')]: {
    height: '500px',
  },
  [theme.breakpoints.down('sm')]: {
    height: '350px',
  },
}));

// Modified slide transition animation
const CarouselSlide = styled(Box)(({ theme, active, direction }) => ({
  position: 'absolute',
  width: '100%',
  height: '100%',
  opacity: active ? 1 : 0,
  // New transition effect: zoom and fade
  transition: 'opacity 1.2s ease, transform 1.2s ease',
  transform: active 
    ? 'scale(1)' 
    : direction === 'next' 
      ? 'scale(1.1)' 
      : direction === 'prev' 
        ? 'scale(0.9)' 
        : 'scale(1)',
  zIndex: active ? 1 : 0,
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

const CarouselTitle = styled(Typography)(({ theme, fontFamily, active }) => ({
  fontSize: '5rem',
  color: '#FFD700',
  fontFamily: fontFamily || 'Great Vibes, cursive',
  opacity: 0,
  transform: 'translateY(-20px)',
  animation: active ? 'fadeInDown 1.2s forwards 0.3s' : 'none',
  '@keyframes fadeInDown': {
    '0%': {
      opacity: 0,
      transform: 'translateY(-30px)',
    },
    '100%': {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
  [theme.breakpoints.down('md')]: {
    fontSize: '3.5rem',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '2.5rem',
  },
}));

const CarouselDescription = styled(Typography)(({ theme, fontFamily, active }) => ({
  fontSize: '3rem',
  marginTop: 0,
  maxWidth: '80%',
  color: '#FFFAFA',
  textShadow: '3px 3px 10px rgba(255, 255, 255, 0.5)',
  fontFamily: fontFamily || 'Dancing Script, cursive',
  opacity: 0,
  transform: 'translateY(20px)',
  animation: active ? 'fadeInUp 1.2s forwards 0.6s' : 'none',
  '@keyframes fadeInUp': {
    '0%': {
      opacity: 0,
      transform: 'translateY(30px)',
    },
    '100%': {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
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
  zIndex: 10,
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
  const [slideDirection, setSlideDirection] = useState('next');
  const [isAnimating, setIsAnimating] = useState(false);
  const slideIntervalRef = useRef(null);
  const videoRefs = useRef([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const slides = [
    {
      type: 'video',
      src: "videoplayback.webm",
      title: "Navigate the world",
      description: "Let the sounds of nature and breathtaking landscapes captivate you.",
      titleFont: "'Great Vibes', cursive",
      descFont: "'Dancing Script', cursive",
      duration: 20000 // 20 seconds for video
    },
    {
      type: 'video',
      src: "v2 (1).webm",
      title: "Live the Life Joyfully",
      description: "Experience the breathtaking beauty of unspoiled nature and luxury.",
      titleFont: "'Playfair Display', serif",
      descFont: "'Dancing Script', cursive",
      duration: 20000 // 20 seconds duration
    },
    {
      type: 'video',
      src: "v2 (2).webm",
      title: "",
      description: "Experience the vibrant energy and dazzling lights of the city.",
      titleFont: "'Marck Script', cursive",
      descFont: "'Dancing Script', cursive",
      duration: 20000 // 20 seconds for video
    },
    {
      type: 'video',
      src: "ht.mp4",
      title: "Explore the Unexplored",
      description: "Journey to places where adventure meets serenity.",
      titleFont: "'Playfair Display', serif",
      descFont: "'Dancing Script', cursive",
      duration: 20000 // 20 seconds duration
    },
    {
      type: 'video',
      src: "h.webm",
      title: "",
      description: "Immerse yourself in sun-kissed beaches and crystal-clear waters.",
      titleFont: "'Playfair Display', serif",
      descFont: "'Dancing Script', cursive",
      duration: 20000 // 20 seconds for video
    },
    {
      type: 'video',
      src: "ht.mp4",
      title: "The Land of Heaven",
      description: "Witness the wonders of modern architecture and cultural richness.",
      titleFont:"'Dancing Script', cursive",
      descFont: "'Playfair Display', serif",
      duration: 20000 // 20 seconds for video
    }
  ];

  // Create ref array for videos
  useEffect(() => {
    videoRefs.current = videoRefs.current.slice(0, slides.filter(slide => slide.type === 'video').length);
  }, [slides]);

  // Function to handle slide transitions
  const showSlide = (index, direction) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setSlideDirection(direction);
    
    setTimeout(() => {
      setCurrentSlide((index + slides.length) % slides.length);
      setIsAnimating(false);
    }, 50);
  };

  const nextSlide = () => showSlide(currentSlide + 1, 'next');
  const prevSlide = () => showSlide(currentSlide - 1, 'prev');

  // Enhanced auto slide function that respects each slide's duration
  const startAutoSlide = () => {
    stopAutoSlide(); // Clear any existing interval first
    
    const currentDuration = slides[currentSlide].duration;
    
    slideIntervalRef.current = setTimeout(() => {
      nextSlide();
    }, currentDuration);
  };

  const stopAutoSlide = () => {
    if (slideIntervalRef.current) {
      clearTimeout(slideIntervalRef.current);
    }
  };

  // Handle video events for slides 2 and 4 (indices 1 and 3)
  useEffect(() => {
    // Special handling for slides 2 and 4 (which are image slides)
    if (currentSlide === 1 || currentSlide === 3) {
      // For these special slides, we use the default 20-second duration
      // This is already handled by the slides array configuration
    }
    
    // Start auto-sliding with the current slide's duration
    startAutoSlide();
    
    // Cleanup function
    return () => stopAutoSlide();
  }, [currentSlide]);

  // Reset video playback when switching slides
  useEffect(() => {
    // When changing slides, ensure videos are reset/restarted when they come into view again
    slides.forEach((slide, index) => {
      if (slide.type === 'video' && index === currentSlide) {
        const videoIndex = slides.slice(0, index).filter(s => s.type === 'video').length;
        const videoElement = videoRefs.current[videoIndex];
        if (videoElement) {
          videoElement.currentTime = 0;
          videoElement.play();
        }
      }
    });
  }, [currentSlide]);

  // Indicator dots for navigation
  const SlideIndicators = styled(Box)(({ theme }) => ({
    position: 'absolute',
    bottom: '20px',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    zIndex: 5,
  }));

  const IndicatorDot = styled(Box)(({ theme, active }) => ({
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    margin: '0 5px',
    backgroundColor: active ? '#FFD700' : 'rgba(255, 255, 255, 0.5)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: active ? '#FFD700' : 'rgba(255, 255, 255, 0.8)',
    },
  }));

  // Progress indicator for current slide
  const ProgressBar = styled(Box)(({ theme }) => ({
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: '4px',
    backgroundColor: '#FFD700',
    transition: 'width 0.1s linear',
    zIndex: 5,
  }));

  // State for progress bar
  const [progress, setProgress] = useState(0);
  
  // Update progress bar
  useEffect(() => {
    const currentDuration = slides[currentSlide].duration;
    const startTime = Date.now();
    
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentProgress = (elapsed / currentDuration) * 100;
      
      if (currentProgress <= 100) {
        setProgress(currentProgress);
      } else {
        clearInterval(progressInterval);
      }
    }, 50);
    
    return () => {
      clearInterval(progressInterval);
      setProgress(0);
    };
  }, [currentSlide]);

  return (
    <CarouselContainer
      onMouseEnter={stopAutoSlide}
      onMouseLeave={startAutoSlide}
    >
      {slides.map((slide, index) => (
        <CarouselSlide 
          key={index} 
          active={index === currentSlide}
          direction={slideDirection}
        >
          {slide.type === 'video' ? (
            <VideoContainer 
              autoPlay 
              loop 
              muted
              ref={el => {
                const videoIndex = slides.slice(0, index).filter(s => s.type === 'video').length;
                videoRefs.current[videoIndex] = el;
              }}
            >
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
              <CarouselTitle 
                variant="h1" 
                fontFamily={slide.titleFont}
                active={index === currentSlide}
              >
                {slide.title}
              </CarouselTitle>
            )}
            <CarouselDescription 
              variant="body1" 
              fontFamily={slide.descFont}
              active={index === currentSlide}
            >
              {slide.description}
            </CarouselDescription>
          </Overlay>
        </CarouselSlide>
      ))}

      {/* Progress bar for current slide */}
      <ProgressBar sx={{ width: `${progress}%` }} />

      <NavButton 
        direction="left" 
        onClick={prevSlide} 
        aria-label="Previous slide"
      >
        <ChevronLeftIcon fontSize={isMobile ? "medium" : "large"} />
      </NavButton>
      <NavButton 
        direction="right" 
        onClick={nextSlide} 
        aria-label="Next slide"
      >
        <ChevronRightIcon fontSize={isMobile ? "medium" : "large"} />
      </NavButton>

      <SlideIndicators>
        {slides.map((_, index) => (
          <IndicatorDot 
            key={index} 
            active={index === currentSlide}
            onClick={() => showSlide(index, index > currentSlide ? 'next' : 'prev')}
          />
        ))}
      </SlideIndicators>
    </CarouselContainer>
  );
};

export default Car;