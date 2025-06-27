import React, { useState, useEffect, useRef } from 'react';
import Car from "../Home/car"; // Adjust the path based on your actual structure
import FlightSearch from './flightbook';
import TourismLoginSignup from "../Home/login"; 
import PopFly from "./popfly";
import WrapFly from "./wrapfly";

// CSS for animations
const styles = `
  /* Base animation styles */
  .scroll-animate {
    opacity: 0;
    transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    will-change: opacity, transform;
  }

  /* Animation directions */
  .animate-up {
    transform: translateY(40px);
  }
  
  .animate-down {
    transform: translateY(-40px);
  }
  
  .animate-left {
    transform: translateX(40px);
  }
  
  .animate-right {
    transform: translateX(-40px);
  }
  
  /* Enhanced zoom animation - starts small and grows to normal size */
  .animate-zoom-in {
    transform: scale(0.5);
    opacity: 0;
    transition: all 1s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  
  .animate-zoom-in.active {
    transform: scale(1);
    opacity: 1;
  }
  
  /* Zoom out animation - starts larger and shrinks to normal size */
  .animate-zoom-out {
    transform: scale(1.2);
    opacity: 0;
    transition: all 1s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  
  .animate-zoom-out.active {
    transform: scale(1);
    opacity: 1;
  }

  /* Active state - when element is in view */
  .scroll-animate.active {
    opacity: 1;
    transform: translateY(0) translateX(0) scale(1);
  }

  /* Different animation speeds */
  .animate-fast {
    transition-duration: 0.4s;
  }
  
  .animate-slow {
    transition-duration: 1.2s;
  }

  /* Staggered animations for children */
  .stagger-container > * {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  }
  
  .stagger-container.active > * {
    opacity: 1;
    transform: translateY(0);
  }
  
  /* Stagger delays */
  .stagger-container.active > *:nth-child(1) { transition-delay: 0.1s; }
  .stagger-container.active > *:nth-child(2) { transition-delay: 0.2s; }
  .stagger-container.active > *:nth-child(3) { transition-delay: 0.3s; }
  .stagger-container.active > *:nth-child(4) { transition-delay: 0.4s; }
  .stagger-container.active > *:nth-child(5) { transition-delay: 0.5s; }
  .stagger-container.active > *:nth-child(n+6) { transition-delay: 0.6s; }

  /* Special effects */
  .animate-bounce {
    transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }

  .animate-gradient::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100px;
    background: linear-gradient(to bottom, rgba(255,255,255,1), rgba(255,255,255,0));
    z-index: 2;
    opacity: 0;
    transition: opacity 1.2s ease;
  }
  
  .animate-gradient.active::before {
    opacity: 1;
  }
`;

// Enhanced Animation manager component with scroll direction awareness
const ScrollAnimation = ({ 
  children, 
  direction = 'up', 
  speed = 'normal', 
  stagger = false, 
  bounce = false, 
  gradient = false,
  zoomEffect = null, // 'in', 'out', or null
  delay = 0
}) => {
  const [isActive, setIsActive] = useState(false);
  const [scrollDirection, setScrollDirection] = useState(null); // 'up' or 'down'
  const ref = useRef();
  const lastScrollY = useRef(0);

  // Track scroll direction
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY.current) {
        setScrollDirection('down');
      } else if (currentScrollY < lastScrollY.current) {
        setScrollDirection('up');
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setIsActive(true);
            }, delay);
          } else {
            // Reset animation when element is no longer visible
            setIsActive(false);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [delay]);

  const getClassName = () => {
    let classes = ['scroll-animate'];
    
    if (isActive) classes.push('active');
    
    // Adjust animation based on scroll direction
    if (scrollDirection === 'down') {
      // When scrolling down, use the specified direction or default to 'up'
      if (zoomEffect === 'in') {
        classes.push('animate-zoom-in');
      } else if (zoomEffect === 'out') {
        classes.push('animate-zoom-out');
      } else {
        classes.push(`animate-${direction}`);
      }
    } else if (scrollDirection === 'up') {
      // When scrolling up, reverse the animation direction
      if (zoomEffect === 'in') {
        classes.push('animate-zoom-in');
      } else if (zoomEffect === 'out') {
        classes.push('animate-zoom-out');
      } else {
        // Reverse the direction
        const reverseDirection = {
          'up': 'down',
          'down': 'up',
          'left': 'right',
          'right': 'left'
        };
        classes.push(`animate-${reverseDirection[direction] || 'down'}`);
      }
    } else {
      // Default animation when no scroll direction is detected (initial page load)
      if (zoomEffect === 'in') {
        classes.push('animate-zoom-in');
      } else if (zoomEffect === 'out') {
        classes.push('animate-zoom-out');
      } else {
        classes.push(`animate-${direction}`);
      }
    }
    
    if (speed === 'fast') classes.push('animate-fast');
    if (speed === 'slow') classes.push('animate-slow');
    if (bounce) classes.push('animate-bounce');
    if (gradient) classes.push('animate-gradient');
    if (stagger) classes.push('stagger-container');
    
    return classes.join(' ');
  };

  return (
    <div ref={ref} className={getClassName()}>
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

// Create animated components for Flight
const AnimatedFlightSearch = () => (
  <ScrollAnimation zoomEffect="in" bounce>
    <FlightSearch />
  </ScrollAnimation>
);

const AnimatedPopFly = () => (
  <ScrollAnimation zoomEffect="in" delay={150}>
    <PopFly />
  </ScrollAnimation>
);

const AnimatedWrapFly = () => (
  <ScrollAnimation zoomEffect="in" delay={300} gradient>
    <WrapFly />
  </ScrollAnimation>
);

function Flight() {
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
      <style>{styles}</style>
      
      {/* User welcome or login button */}
      <div className="user-section" style={{
        padding: '10px 20px',
        textAlign: 'right',
        backgroundColor: '#f8f9fa'
      }}>
        {isLoggedIn ? (
          <div>
            <span style={{ marginRight: '10px' }}>Welcome, {userName}!</span>
            <button 
              onClick={handleLogout}
              style={{
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                padding: '5px 10px',
                cursor: 'pointer'
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <button 
            onClick={handleSignInClick}
            style={{
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              padding: '5px 10px',
              cursor: 'pointer'
            }}
          >
            Sign In / Register
          </button>
        )}
      </div>

      <div style={{
        height: '450px',
        overflow: 'hidden',
      }}>
        <ScrollAnimation zoomEffect="in" speed="slow">
          <Car />
        </ScrollAnimation>
      </div>
      
      {/* Apply enhanced animations to each component */}
      <AnimatedFlightSearch />
      <AnimatedPopFly />
      <AnimatedWrapFly />
      
      {/* Login Modal */}
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
    </div>
  );
}

export default Flight;