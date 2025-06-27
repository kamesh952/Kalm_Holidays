import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Car from "./car";
import BookingForm from "./book";
import Wrap from "./wrap";
import PropertySection from "./prop";
import TrendingDestinations from "./gal";
import ExploreSection from "./explore";
import TourismLoginSignup from "./login";

// Animation CSS (same as before)
const styles = `/*... your animation styles ...*/`; // Keep all your existing CSS here

// ScrollAnimation Component (same as before)
const ScrollAnimation = ({ 
  children, direction = 'up', speed = 'normal', stagger = false, bounce = false, gradient = false,
  zoomEffect = null 
}) => {
  const [isActive, setIsActive] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsActive(true);
          } else if (!entry.isIntersecting && entry.boundingClientRect.top > 0) {
            setIsActive(false);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, []);

  const getClassName = () => {
    let classes = ['scroll-animate'];
    if (isActive) classes.push('active');
    if (zoomEffect === 'in') classes.push('animate-zoom-in');
    else if (zoomEffect === 'out') classes.push('animate-zoom-out');
    else classes.push(`animate-${direction}`);
    if (speed === 'fast') classes.push('animate-fast');
    if (speed === 'slow') classes.push('animate-slow');
    if (bounce) classes.push('animate-bounce');
    if (gradient) classes.push('animate-gradient');
    if (stagger) classes.push('stagger-container');
    return classes.join(' ');
  };

  return <div ref={ref} className={getClassName()}>{children}</div>;
};

// Animated Wrappers
const AnimatedCar = () => <ScrollAnimation zoomEffect="in" speed="slow"><Car /></ScrollAnimation>;
const PlainBookingForm = () => <BookingForm />;
const AnimatedWrap = () => <ScrollAnimation zoomEffect="in" gradient><Wrap /></ScrollAnimation>;
const AnimatedPropertySection = () => <ScrollAnimation zoomEffect="in" bounce><PropertySection /></ScrollAnimation>;
const AnimatedExploreSection = () => <ScrollAnimation zoomEffect="in" stagger><ExploreSection /></ScrollAnimation>;
const AnimatedTrendingDestinations = () => <ScrollAnimation zoomEffect="in" speed="slow"><TrendingDestinations /></ScrollAnimation>;

// Login Modal
const LoginModal = ({ isOpen, onClose }) => {
  const [visible, setVisible] = useState(false);
  const modalRef = useRef();

  useEffect(() => {
    setVisible(isOpen);
  }, [isOpen]);

  const handleOverlayClick = (e) => {
    if (e.target === modalRef.current) {
      setVisible(false);
      setTimeout(onClose, 300);
    }
  };

  const handleLoginSuccess = () => {
    setVisible(false);
    setTimeout(onClose, 300);
  };

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      onClick={handleOverlayClick}
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.8)',
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        zIndex: 1000,
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.3s ease',
        backdropFilter: visible ? 'blur(5px)' : 'blur(0px)',
        WebkitBackdropFilter: visible ? 'blur(5px)' : 'blur(0px)'
      }}
    >
      <div 
        style={{
          width: '90%', maxWidth: '900px',
          opacity: visible ? 1 : 0,
          transform: visible ? 'scale(1)' : 'scale(0.95)',
          transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.4)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <TourismLoginSignup onClose={handleLoginSuccess} />
      </div>
    </div>
  );
};

// MAIN HOME COMPONENT
function Home() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [backendMessage, setBackendMessage] = useState("");

  useEffect(() => {
    const currentUser = localStorage.getItem('currentLoggedInUser');
    if (currentUser) {
      const user = JSON.parse(currentUser);
      setIsLoggedIn(true);
      setUserName(user.username);
    }

    const handleUserLogin = () => {
      const loggedInUser = localStorage.getItem('currentLoggedInUser');
      if (loggedInUser) {
        const user = JSON.parse(loggedInUser);
        setIsLoggedIn(true);
        setUserName(user.username);
        closeLoginModal();
      }
    };

    window.addEventListener('userLoggedIn', handleUserLogin);

    return () => {
      window.removeEventListener('userLoggedIn', handleUserLogin);
    };
  }, []);

  useEffect(() => {
    // ✅ Axios request to backend
    const fetchBackendData = async () => {
      try {
        const response = await axios.get('/api/example'); // backend route must exist
        setBackendMessage(response.data.message || "No message");
      } catch (error) {
        console.error("Error fetching backend data:", error.message);
      }
    };

    fetchBackendData();
  }, []);

  const handleSignInClick = () => {
    setIsLoginModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
    document.body.style.overflow = 'auto';
    document.body.style.backdropFilter = 'none';
    document.body.style.WebkitBackdropFilter = 'none';
    document.body.style.transform = 'translateZ(0)';
    setTimeout(() => {
      document.body.style.transform = '';
    }, 50);
  };

  const handleLogout = () => {
    localStorage.removeItem('currentLoggedInUser');
    setIsLoggedIn(false);
    setUserName("");
    window.dispatchEvent(new CustomEvent('userLoggedOut'));
  };

  useEffect(() => {
    window.openLoginModal = handleSignInClick;
    return () => {
      delete window.openLoginModal;
      document.body.style.overflow = 'auto';
    };
  }, []);

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && isLoginModalOpen) {
        closeLoginModal();
      }
    };
    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [isLoginModalOpen]);

  return (
    <div>
      <style>{styles}</style>

      {/* 🟢 Backend Message Display */}
      {backendMessage && (
        <div style={{ background: '#000', color: '#0f0', padding: '10px', textAlign: 'center' }}>
          Backend says: {backendMessage}
        </div>
      )}

      <AnimatedCar />
      <PlainBookingForm />
      <AnimatedPropertySection />
      <AnimatedWrap />
      <AnimatedExploreSection />
      <AnimatedTrendingDestinations />
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
    </div>
  );
}

export default Home;
