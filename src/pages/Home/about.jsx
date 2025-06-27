import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './footer.css';
import './navbar.css';
import './model.css';
import './car.css';
import './mem.css';

const About = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const totalSlides = 6;

  useEffect(() => {
    // Initialize carousel
    const interval = setInterval(() => {
      setActiveSlide((prevSlide) => (prevSlide + 1) % totalSlides);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const navigateToHome = () => {
    window.location.href = '/';
  };

  const changeCountry = (currency, code) => {
    document.getElementById('current-country').innerText = currency;
    document.getElementById('current-flag').src = `https://flagcdn.com/w40/${code}.png`;
    document.getElementById('current-flag').alt = code.toUpperCase();
  };

  const openModal = () => {
    const modal = document.getElementById('loginModal');
    if (modal) {
      modal.style.display = 'flex';
      const iframe = modal.querySelector('iframe');
      if (iframe) {
        iframe.style.display = 'block';
      }
    }
  };

  const closeModal = (e) => {
    const modal = document.getElementById('loginModal');
    if (modal && e.target === modal) {
      modal.style.display = 'none';
      const iframe = modal.querySelector('iframe');
      if (iframe) {
        iframe.style.display = 'none';
      }
    }
  };

  const prevSlide = () => {
    setActiveSlide((prevSlide) => (prevSlide - 1 + totalSlides) % totalSlides);
  };

  const nextSlide = () => {
    setActiveSlide((prevSlide) => (prevSlide + 1) % totalSlides);
  };

  return (
    <>
      <div className="navbar" id="navbar" style={{ fontFamily: 'poppins,serif' }}>
        <div className="logo-container" onClick={navigateToHome}>
          <img src={process.env.PUBLIC_URL + '/KALM(1)(1)(1).png'} alt="KALM AI Logo" />
          <div className="logo">Kalm Holidays</div>
        </div>
        
        <div className="search-container">
          <input type="text" className="search-input" placeholder="Search destinations, hotels..." />
          <i className="fas fa-search search-icon"></i>
        </div>
       
        <div className="hamburger">&#9776;</div>
        
        <ul className="nav-items" id="navItems">
            <li className="nav-item">
                <Link to="/"><i className="fas fa-home"></i> Home</Link>
            </li>
            <li className="nav-item">
                <a href="#"><i className="fa fa-plane"></i> Flights</a>
                <div className="dropdown">
                    <a href="#">Domestic</a>
                    <a href="#">International</a>
                </div>
            </li>
          
            <li className="nav-item">
                <a href="#"><i className="fa fa-car"></i> Car rentals</a>
                <div className="dropdown">
                    <a href="#">Self Drive</a>
                    <a href="#">Chauffeur Driven</a>
                </div>
            </li>
           
            <li className="nav-item">
                <a href="#"><i className="fa fa-box"></i> Packages</a>
                <div className="dropdown">
                    <a href="#">Theme Parks</a>
                    <a href="#">Museums</a>
                    <a href="#">Nature & Wildlife</a>
                    <a href="#">Honeymoon</a>
                    <a href="#">International</a>
                    <a href="#">Asia</a>
                    <a href="#">Europe</a>
                    <a href="#">America</a>
                    <a href="#">Middle East</a>
                    <a href="#">Island</a>
                    <a href="#">View All Packages</a>
                </div>
            </li>
            <li className="nav-item">
                <a href="#"><i className="fas fa-building"></i> Company</a>
                <div className="dropdown">
                    <Link to="/history">History</Link>
                    <Link to="/about">About Us</Link>
                    <Link to="/contact">Contact Us</Link>
                    <Link to="/faq">FAQ</Link>
                </div>
            </li>
            
            <li className="nav-item country-selector">
                <div className="selected-flag">
                    <img id="current-flag" className="current-flag" src="https://flagcdn.com/w40/in.png" alt="India" />
                    <span id="current-country">INR</span>
                </div>
                <div className="country-dropdown" id="country-dropdown">
                    <a href="#" onClick={() => changeCountry('INR', 'in')}>
                        <img className="flag-icon" src="https://flagcdn.com/w40/in.png" alt="" /> India (INR)
                    </a>
                    <a href="#" onClick={() => changeCountry('USD', 'us')}>
                        <img className="flag-icon" src="https://flagcdn.com/w40/us.png" alt="" /> United States (USD)
                    </a>
                    <a href="#" onClick={() => changeCountry('GBP', 'gb')}>
                        <img className="flag-icon" src="https://flagcdn.com/w40/gb.png" alt="" /> United Kingdom (GBP)
                    </a>
                    <a href="#" onClick={() => changeCountry('AUD', 'au')}>
                        <img className="flag-icon" src="https://flagcdn.com/w40/au.png" alt="" /> Australia (AUD)
                    </a>
                    <a href="#" onClick={() => changeCountry('CAD', 'ca')}>
                        <img className="flag-icon" src="https://flagcdn.com/w40/ca.png" alt="" /> Canada (CAD)
                    </a>
                </div>
            </li>
            
            <li className="nav-item">
                <a href="#" className="sign-in no-hover-line" onClick={openModal} style={{color: '#0077cc', padding: '10px 15px', borderRadius: '15px', backgroundColor: '#ffffff', textDecoration: 'none', transition: 'background 0.3s', borderColor: '#000000'}}>Sign In</a>
            </li>
        </ul>
      </div>

      <div id="loginModal" className="modal" onClick={closeModal}>
        <iframe src="login.html" style={{ display: 'none' }} onClick={(e) => e.stopPropagation()}></iframe>
      </div>
      
      <div className="carousel" style={{ height: '550px' }}>
        <div className={`carousel-slide ${activeSlide === 0 ? 'active' : ''} slide3`}>
          <video autoPlay loop muted width="100%" height="100%">
            <source src={process.env.PUBLIC_URL + '/videoplayback.mp4'} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="overlay">
            <h1>About Us</h1>
            <p>Let the sounds of nature and breathtaking landscapes captivate you.</p>
          </div>
        </div>
      
        <div className={`carousel-slide ${activeSlide === 1 ? 'active' : ''} slide4`} style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/bang.jpg'})` }}>
          <div className="overlay">
            <h1>Discover Paradise</h1>
            <p>Experience the breathtaking beauty of unspoiled nature and luxury.</p>
          </div>
        </div>
        
        <div className={`carousel-slide ${activeSlide === 2 ? 'active' : ''} slide3`}>
          <video autoPlay loop muted width="100%" height="100%">
            <source src={process.env.PUBLIC_URL + '/videoplayback.mp4'} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="overlay">
            <p>Experience the vibrant energy and dazzling lights of the city.</p>
          </div>
        </div>
        
        <div className={`carousel-slide ${activeSlide === 3 ? 'active' : ''} slide5`} style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/BACK1.jpg'})` }}>
          <div className="overlay">
            <h1>Explore the Unexplored</h1>
            <p>Journey to places where adventure meets serenity.</p>
          </div>
        </div>
        
        <div className={`carousel-slide ${activeSlide === 4 ? 'active' : ''} slide6`}>
          <video autoPlay loop muted width="100%" height="100%">
            <source src={process.env.PUBLIC_URL + '/h.webm'} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="overlay">
            <h1></h1><br />
            <p>Immerse yourself in sun-kissed beaches and crystal-clear waters.</p>
          </div>
        </div>
        
        <div className={`carousel-slide ${activeSlide === 5 ? 'active' : ''} slide2`}>
          <video autoPlay loop muted width="100%" height="100%">
            <source src={process.env.PUBLIC_URL + '/ht.mp4'} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="overlay">
            <h1>The Land of Heaven</h1>
            <p>Witness the wonders of modern architecture and cultural richness.</p>
          </div>
        </div>
     
        <button className="carousel-button prev" onClick={prevSlide}>❮</button>
        <button className="carousel-button next" onClick={nextSlide}>❯</button>
      </div>
      
      <br /><br />
      
      <div className="container">
        <h2>Our Story</h2>
        <p>Established in 1968, Kalm Holidays is entirely owned and managed by Sangam Group of Hotels. The Sangam Group is recognized as one of the largest hotel chains in Tamil Nadu. Along with the Group, Kalm Holidays is striving hard for ultimate success and innovation.</p>
        <p>We are an ISO 9001: 2008 certified company that aims to set clear goals, fix priorities, and organize resources effectively. Kalm Holidays enables you to discover new destinations and offer unique travel ideas.</p>
        <div className="images" style={{ marginTop: '30px' }}>
          <img src={process.env.PUBLIC_URL + '/R (1).jpg'} alt="Camera Lens" />
          <img src={process.env.PUBLIC_URL + '/R.jpg'} alt="Vintage Compass" />
        </div>
        
        <div className="mission-vision">
          <div className="section" style={{ marginTop: '30px' }}>
            <h2>Our Mission</h2>
            <p>Kalm Holidays is a fully integrated travel company that offers comprehensive solutions for business and leisure travelers worldwide. We aim to satisfy client requirements with ultimate transparency and cost-effectiveness.</p>
          </div>
          <div className="section" style={{ marginTop: '30px' }}>
            <h2>Our Vision</h2>
            <p>Our team is striving to become a world-class travel company and industry leader in the near future. We focus on a customer-centric approach to gain recognition among worldwide clients and craft extraordinary moments for you.</p>
          </div>
        </div>
        
        <hr />
        
        <div className="cont">
          <div className="left-section">
            <img src={process.env.PUBLIC_URL + '/kamesh.jpg'} alt="Mr. Kamesh" className="ceo-image" />
            <p className="ceo-name">Mr. Kamesh</p>
            <p className="ceo-title">Founder & CEO</p>
          </div>
          
          <div className="content">
            <h2 style={{ textAlign: 'left' }}>CEO's Note</h2>
            <p className="ceo-note">
              "KALM Holidays was founded with a vision of excellence and a passion for travel. 
              With a dedicated team and unwavering commitment, we have built this company step by step. 
              Today, our reputation is built upon trust, exceptional service, and years of dedicated customer support. 
              KALM Holidays continues to set new standards in the travel industry, making every journey unforgettable."
            </p>
          </div>
        </div>
        
        <section className="section-team" style={{ marginTop: '0%' }}>
          <div className="container" style={{ marginTop: '0%' }}>
            <div className="section-header" style={{ textAlign: 'center' }}>
              <span className="section-subtitle">Our Travel Experts</span>
              <h2 className="section-title">Meet The Kalm Holidays Team</h2>
              <div className="divider"></div>
            </div>
            
            <div className="team-grid">
              <div className="team-member">
                <div className="member-image">
                  <img src={process.env.PUBLIC_URL + '/team1.jpg'} alt="Mr. Rajendran" />
                  <div className="member-social">
                    <a href="#"><i className="fab fa-linkedin"></i></a>
                    <a href="#"><i className="fab fa-twitter"></i></a>
                    <a href="#"><i className="fas fa-envelope"></i></a>
                  </div>
                </div>
                <div className="member-info">
                  <h3>Mr. Rajendran</h3>
                  <p className="member-role">Co-Founder & CEO</p>
                  <p className="member-bio">Passionate about creating seamless travel experiences worldwide.</p>
                </div>
              </div>
              
              <div className="team-member">
                <div className="member-image">
                  <img src={process.env.PUBLIC_URL + '/team2.jpg'} alt="Mr. Ravi Varman" />
                  <div className="member-social">
                    <a href="#"><i className="fab fa-linkedin"></i></a>
                    <a href="#"><i className="fab fa-twitter"></i></a>
                    <a href="#"><i className="fas fa-envelope"></i></a>
                  </div>
                </div>
                <div className="member-info">
                  <h3>Mr. Ravi Varman</h3>
                  <p className="member-role">Head of Operations</p>
                  <p className="member-bio">Ensuring every journey is smooth and stress-free.</p>
                </div>
              </div>
              
              <div className="team-member">
                <div className="member-image">
                  <img src={process.env.PUBLIC_URL + '/team3.jpg'} alt="Mr.Kannan" />
                  <div className="member-social">
                    <a href="#"><i className="fab fa-linkedin"></i></a>
                    <a href="#"><i className="fab fa-twitter"></i></a>
                    <a href="#"><i className="fas fa-envelope"></i></a>
                  </div>
                </div>
                <div className="member-info">
                  <h3>Mr.Kannan</h3>
                  <p className="member-role">Travel Consultant</p>
                  <p className="member-bio">Expert in crafting personalized vacation experiences.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <div className="stats" style={{ fontFamily: 'Poppins, serif' }}>
          <div className="stat-card">
            <div className="front">
              <span>1000+</span>
              <p>Partners</p>
            </div>
            <div className="back">We collaborate with over 1000 partners to provide the best travel experience.</div>
          </div>
          
          <div className="stat-card">
            <div className="front">
              <span>2k+</span>
              <p>Properties</p>
            </div>
            <div className="back">We have a wide range of 2000+ properties to make your stay comfortable.</div>
          </div>
          
          <div className="stat-card">
            <div className="front">
              <span>300k+</span>
              <p>Destinations</p>
            </div>
            <div className="back">Discover more than 300,000 destinations worldwide with us.</div>
          </div>
          
          <div className="stat-card">
            <div className="front">
              <span>40k+</span>
              <p>Booking</p>
            </div>
            <div className="back">We have successfully completed over 40,000 bookings for our customers.</div>
          </div>
        </div>
      </div>
      
      <footer id="foot" style={{ fontFamily: 'Playfair Display, serif' }}>
        <section className="newsletter">
          <div className="container">
            <div className="icon">📧</div>
            <div className="text">
              <h3>Get Updates & More</h3>
              <p>Thoughtful thoughts to your inbox</p>
            </div>
            <div className="subscribe">
              <input type="email" placeholder="Your Email" />
              <button>SUBSCRIBE</button>
            </div>
          </div>
        </section>
      
        <section className="footer-info">
          <div className="container">
            <div className="office">
              <h4>Corporate Office</h4>
              <p>Gandhi St,<br />Melpattampakkam,<br />Panruti,<br />Cuddalore-607104<br />TamilNadu, India.</p>
              <h5>Call Us</h5>
              <p>+91 8680892898</p>
            </div>
      
            <div className="office">
              <h4>Head Office</h4>
              <p>Kalm Holidays Pvt LTD,<br />No.1, Gemini Parsn,<br />Kodambakkam High Road,<br />Nungambakkam, Chennai – 600006<br />Tamilnadu, India.</p>
              <h5>Email Us</h5>
              <p>rkameshraj7@gmail.com</p>
            </div>
      
            <div className="branches">
              <h4>Our Branches</h4>
              <ul>
                <li>Mumbai</li>
                <li>Hyderabad</li>
                <li>Bangalore</li>
                <li>Chennai</li>
                <li>Coimbatore</li>
                <li>Erode</li>
                <li>Madurai</li>
                <li>Trichy</li>
                <li>Salem</li>
                <li>Kochi</li>
                <li>Vellore</li>
                <li>Pondicherry</li>
                <li>Nagercoil</li>
                <li>Kanyakumari</li>
              </ul>
            </div>
      
            <div className="social">
              <h5>Follow Us</h5>
              <a href="https://www.facebook.com/rkamesh.kamesh.754/"><img src="https://img.icons8.com/ios-filled/50/003366/facebook.png" alt="Facebook" /></a>
              <a href="https://www.instagram.com/kameshcrush96/"><img src="https://img.icons8.com/ios-filled/50/003366/instagram.png" alt="Instagram" /></a>
              <a href="https://github.com/kamesh952"><img src="https://img.icons8.com/ios-filled/50/003366/github.png" alt="GitHub" /></a>
            </div>
          </div>
        </section>
      
        <section className="footer-bottom">
          <p>Copyright © 2025 by Kalm Holidays Pvt Ltd. All Rights Reserved.</p>
          <nav>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms & Conditions</Link>
            <Link to="/cancellation">Cancellation & Refund Policy</Link>
          </nav>
        </section>
      </footer>
    </>
  );
};

export default About;