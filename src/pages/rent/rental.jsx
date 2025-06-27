import React, { useState, useEffect, useRef } from 'react';
import Car from "../Home/car"; // Adjust the path based on your actual structure
import CarRental from "./rentc";
import TourismLoginSignup from "../Home/login"; // Make sure this path is correct

// Reveal on Scroll Animation Component
const RevealOnScroll = ({ children, threshold = 0.1 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // When the element comes into view, set isVisible to true
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={`reveal-animation ${isVisible ? 'revealed' : ''}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
        transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
      }}
    >
      {children}
    </div>
  );
};

// Modal component for the login form with improved animations and cleanup
const LoginModal = ({ isOpen, onClose }) => {
  const [visible, setVisible] = useState(false);
  const modalContentRef = useRef(null);
  const modalOverlayRef = useRef(null);

  // Handle animation states when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [isOpen]);

  // If modal is not open, don't render anything
  if (!isOpen) return null;

  // Function to handle outside clicks with proper animation
  const handleOverlayClick = (e) => {
    if (e.target === modalOverlayRef.current) {
      setVisible(false);
      setTimeout(onClose, 300); // Wait for fade out animation before removing from DOM
    }
  };

  // Handle successful login closure
  const handleLoginSuccess = () => {
    setVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <div
      ref={modalOverlayRef}
      className="login-modal-overlay"
      onClick={handleOverlayClick}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: visible ? 'blur(5px)' : 'blur(0px)',
        WebkitBackdropFilter: visible ? 'blur(5px)' : 'blur(0px)',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.3s ease, backdrop-filter 0.3s ease'
      }}
    >
      {/* Modal content with animation */}
      <div
        ref={modalContentRef}
        onClick={(e) => e.stopPropagation()}
        style={{ 
          zIndex: 1001, 
          width: '100%', 
          maxWidth: '900px',
          opacity: visible ? 1 : 0,
          transform: visible ? 'scale(1)' : 'scale(0.95)',
          transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.4)'
        }}
      >
        <TourismLoginSignup onClose={handleLoginSuccess} />
      </div>
    </div>
  );
};

function Rent() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  // Check for logged in user on component mount
  useEffect(() => {
    const currentUser = localStorage.getItem('currentLoggedInUser');
    if (currentUser) {
      const user = JSON.parse(currentUser);
      setIsLoggedIn(true);
      setUserName(user.username);
    }
    
    // Listen for login/logout events
    const handleUserLogin = () => {
      const loggedInUser = localStorage.getItem('currentLoggedInUser');
      if (loggedInUser) {
        const user = JSON.parse(loggedInUser);
        setIsLoggedIn(true);
        setUserName(user.username);
        closeLoginModal();
      }
    };
    
    const handleUserLogout = () => {
      setIsLoggedIn(false);
      setUserName("");
    };
    
    window.addEventListener('userLoggedIn', handleUserLogin);
    window.addEventListener('userLoggedOut', handleUserLogout);
    
    return () => {
      window.removeEventListener('userLoggedIn', handleUserLogin);
      window.removeEventListener('userLoggedOut', handleUserLogout);
    };
  }, []);

  // Function to handle sign in button click from Navbar
  const handleSignInClick = () => {
    setIsLoginModalOpen(true);
    // Add a class to the body to prevent scrolling when modal is open
    document.body.style.overflow = 'hidden';
  };

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('currentLoggedInUser');
    setIsLoggedIn(false);
    setUserName("");
    // Dispatch event that user logged out
    window.dispatchEvent(new CustomEvent('userLoggedOut'));
  };

  // Function to close the login modal with enhanced cleanup
  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
    // Re-enable scrolling when modal is closed
    document.body.style.overflow = 'auto';
    
    // Ensure any backdrop filters or blurs are completely removed
    document.body.style.backdropFilter = 'none';
    document.body.style.WebkitBackdropFilter = 'none';
    
    // Force repaint to ensure blur is gone - this is key to fixing the blur issue
    document.body.style.transform = 'translateZ(0)';
    
    // Reset the transform after a short delay
    setTimeout(() => {
      document.body.style.transform = '';
    }, 50);
  };
  
  // Add the handleSignInClick function to the window object
  // so the Navbar component can access it
  useEffect(() => {
    window.openLoginModal = handleSignInClick;
    
    // Cleanup the global function when component unmounts
    return () => {
      delete window.openLoginModal;
      // Make sure to reset overflow in case component unmounts with modal open
      document.body.style.overflow = 'auto';
    };
  }, []);

  // Add ESC key event listener to close modal
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && isLoginModalOpen) {
        closeLoginModal();
      }
    };
    
    document.addEventListener('keydown', handleEscKey);
    
    // Cleanup
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isLoginModalOpen]);

  return (
    <div>
      <div style={{
        height: '550px',
        overflow: 'hidden',
      }}>
        <Car />
      </div>
      
      {/* Wrap CarRental with the RevealOnScroll component */}
      <RevealOnScroll threshold={0.2}>
        <CarRental />
      </RevealOnScroll>
      
      {/* Login Modal */}
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
    </div>
  );
}

export default Rent;