import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, IconButton, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useTheme } from '@mui/material/styles';
import '@fontsource/great-vibes';         // Great Vibes
import '@fontsource/dancing-script';      // Dancing Script
import '@fontsource/playfair-display';    // Playfair Display


// Styled Components
const CarouselContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '750px',
  overflow: 'hidden',
  [theme.breakpoints.down('md')]: { height: '500px' },
  [theme.breakpoints.down('sm')]: { height: '350px' },
}));

const CarouselSlide = styled(Box)(({ active, direction }) => ({
  position: 'absolute',
  width: '100%',
  height: '100%',
  opacity: active ? 1 : 0,
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

const Overlay = styled(Box)({
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
});

const CarouselTitle = styled(Typography)(({ fontFamily, active, delayedAnimation }) => ({
  fontSize: '5rem',
  color: '#FFD700',
  fontFamily: fontFamily || 'Great Vibes, cursive',
  opacity: 0,
  transform: 'translateY(-20px)',
  animation: active 
    ? `fadeInDown 1.2s forwards ${delayedAnimation ? '3s' : '0.3s'}` 
    : 'none',
  '@keyframes fadeInDown': {
    '0%': { opacity: 0, transform: 'translateY(-30px)' },
    '100%': { opacity: 1, transform: 'translateY(0)' },
  },
}));

const CarouselDescription = styled(Typography)(({ fontFamily, active, delayedAnimation }) => ({
  fontSize: '3rem',
  marginTop: 0,
  maxWidth: '80%',
  color: '#FFFAFA',
  fontFamily: fontFamily || 'Dancing Script, cursive',
  opacity: 0,
  transform: 'translateY(20px)',
  animation: active 
    ? `fadeInUp 1.2s forwards ${delayedAnimation ? '3s' : '0.6s'}` 
    : 'none',
  '@keyframes fadeInUp': {
    '0%': { opacity: 0, transform: 'translateY(30px)' },
    '100%': { opacity: 1, transform: 'translateY(0)' },
  },
}));

const NavButton = styled(IconButton)(({ direction }) => ({
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
  zIndex: 10,
  '&:hover': {
    background: 'rgba(134, 134, 134, 0.2)',
  },
}));

const SlideIndicators = styled(Box)({
  position: 'absolute',
  bottom: '20px',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  zIndex: 5,
});

const IndicatorDot = styled(Box)(({ active }) => ({
  width: '12px',
  height: '12px',
  borderRadius: '50%',
  margin: '0 5px',
  backgroundColor: active ? '#FFD700' : 'rgba(255, 255, 255, 0.5)',
  cursor: 'pointer',
}));

const ProgressBar = styled(Box)({
  position: 'absolute',
  bottom: 0,
  left: 0,
  height: '4px',
  backgroundColor: '#FFD700',
  zIndex: 5,
});

export const Car = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideDirection, setSlideDirection] = useState('next');
  const [isAnimating, setIsAnimating] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const [progress, setProgress] = useState(0);
  const slideIntervalRef = useRef(null);
  const videoRefs = useRef([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const slides = [
    {
      type: 'video',
      src: "2.mp4",
      title: "Navigate the world",
      description: "Let the sounds of nature and breathtaking landscapes captivate you.",
      titleFont: "'Great Vibes', cursive",
      descFont: "'Dancing Script', cursive",
      duration: 20000,
      delayedAnimation: true
    },
    {
      type: 'video',
      src: "1.mp4",
      title: "Live the Life Joyfully",
      description: "Experience the breathtaking beauty of unspoiled nature and luxury.",
      titleFont: "'Satisfy', cursive",
      descFont: "'Sacramento', cursive",
      duration: 20000,
      delayedAnimation: true
    },
    {
      type: 'video',
      src: "3.mp4",
      title: "Experiences the Adventures",
      description: "Experience the vibrant energy and dazzling lights of the city.",
      titleFont: "'Parisienne', cursive",
      descFont: "'Alex Brush', cursive",
      duration: 20000,
    },
    {
      type: 'video',
      src: "4.mp4",
      title: "Explore the Unexplored",
      description: "Journey to places where adventure meets serenity.",
      titleFont: "'Playfair Display', serif",
      descFont: "'Petit Formal Script', cursive",
      duration: 20000,
    },
    {
      type: 'video',
      src: "5.mp4",
      title: "Loves the Nature",
      description: "Immerse yourself in sun-kissed beaches and crystal-clear waters.",
      titleFont: "'Pinyon Script', cursive",
      descFont: "'Playfair Display', serif",
      duration: 20000,
      delayedAnimation: true
    },
   
  ];

  useEffect(() => {
    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Great+Vibes&family=Dancing+Script&family=Playfair+Display&family=Sacramento&family=Parisienne&family=Alex+Brush&family=Satisfy&family=Pinyon+Script&family=Petit+Formal+Script&display=swap';
    document.head.appendChild(fontLink);
    return () => document.head.removeChild(fontLink);
  }, []);

  useEffect(() => {
    const handleInteraction = () => {
      setUserInteracted(true);
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };
    window.addEventListener('click', handleInteraction);
    window.addEventListener('touchstart', handleInteraction);
    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };
  }, []);

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

  const startAutoSlide = () => {
    stopAutoSlide();
    const currentDuration = slides[currentSlide].duration;
    slideIntervalRef.current = setTimeout(() => {
      nextSlide();
    }, currentDuration);
  };

  const stopAutoSlide = () => {
    if (slideIntervalRef.current) clearTimeout(slideIntervalRef.current);
  };

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, [currentSlide]);

  useEffect(() => {
    const slide = slides[currentSlide];
    if (slide.type === 'video' && userInteracted) {
      const videoIndex = slides.slice(0, currentSlide).filter(s => s.type === 'video').length;
      const videoEl = videoRefs.current[videoIndex];
      if (videoEl) {
        videoEl.currentTime = 0;
        videoEl.play().catch((e) => {
          console.warn('Autoplay failed', e);
        });
      }
    }
  }, [currentSlide, userInteracted]);

  useEffect(() => {
    const duration = slides[currentSlide].duration;
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      setProgress(Math.min((elapsed / duration) * 100, 100));
    }, 50);
    return () => {
      clearInterval(interval);
      setProgress(0);
    };
  }, [currentSlide]);

  return (
    <CarouselContainer onMouseEnter={stopAutoSlide} onMouseLeave={startAutoSlide}>
      {slides.map((slide, index) => (
        <CarouselSlide key={index} active={index === currentSlide} direction={slideDirection}>
          {slide.type === 'video' ? (
            <VideoContainer
              autoPlay
              muted
              loop
              playsInline
              ref={(el) => {
                const videoIndex = slides.slice(0, index).filter(s => s.type === 'video').length;
                videoRefs.current[videoIndex] = el;
              }}
            >
              <source src={slide.src} type="video/mp4" />
            </VideoContainer>
          ) : null}
          <Overlay>
            <CarouselTitle
              variant="h1"
              fontFamily={slide.titleFont}
              active={index === currentSlide}
              delayedAnimation={slide.delayedAnimation}
            >
              {slide.title}
            </CarouselTitle>
            <CarouselDescription
              variant="body1"
              fontFamily={slide.descFont}
              active={index === currentSlide}
              delayedAnimation={slide.delayedAnimation}
            >
              {slide.description}
            </CarouselDescription>
          </Overlay>
        </CarouselSlide>
      ))}
      <ProgressBar sx={{ width: `${progress}%` }} />
      <NavButton direction="left" onClick={prevSlide}>
        <ChevronLeftIcon fontSize={isMobile ? 'medium' : 'large'} />
      </NavButton>
      <NavButton direction="right" onClick={nextSlide}>
        <ChevronRightIcon fontSize={isMobile ? 'medium' : 'large'} />
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
