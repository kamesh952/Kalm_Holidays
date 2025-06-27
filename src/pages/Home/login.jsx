import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Button, 
  Container, 
  TextField, 
  Typography, 
  Paper, 
  IconButton,
  InputAdornment,
  useMediaQuery,
  CircularProgress,
  Backdrop,
  Fade
} from '@mui/material';
import { 
  Facebook as FacebookIcon, 
  Twitter as TwitterIcon, 
  Google as GoogleIcon, 
  LinkedIn as LinkedInIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Lock as LockIcon
} from '@mui/icons-material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const theme = createTheme({
  palette: {
    primary: {
      main: '#007bff',
    },
    secondary: {
      main: '#0056b3',
    },
  },
  typography: {
    fontFamily: '"Montserrat", "Roboto", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
      textShadow: '2px 5px 6px rgba(0, 0, 0, 0.2)',
    },
    h6: {
      fontFamily: '"Poppins", "Roboto", sans-serif',
    },
    button: {
      fontFamily: '"Poppins", "Roboto", sans-serif',
      fontWeight: 600,
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 25,
          padding: '12px',
          fontWeight: 'bold',
          fontSize: '16px',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 8px rgba(0, 123, 255, 0.3)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: '20px',
          '& .MuiOutlinedInput-root': {
            borderRadius: 25,
            '& .MuiOutlinedInput-input': {
              padding: '14px 14px',
              '&::placeholder': {
                fontFamily: '"Poppins", "Roboto", sans-serif',
                fontStyle: 'italic',
                opacity: 0.7,
              },
            },
            '& fieldset': {
              borderWidth: 2,
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#007bff',
            },
            '&:hover fieldset': {
              borderColor: '#0056b3',
            },
          },
          '& .MuiInputBase-input': {
            fontFamily: '"Poppins", "Roboto", sans-serif',
          },
          '& .MuiInputLabel-root': {
            fontFamily: '"Poppins", "Roboto", sans-serif',
          },
        },
      },
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: {
          color: '#007bff',
        },
      },
    },
  },
});

const TourismLoginSignup = ({ onClose }) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: ''
  });
  
  const [signupForm, setSignupForm] = useState({
    username: '',
    email: '',
    password: ''
  });
  
  const [loginErrors, setLoginErrors] = useState({
    username: false,
    password: false
  });
  
  const [signupErrors, setSignupErrors] = useState({
    username: false,
    email: false,
    password: false
  });

  useEffect(() => {
    const storedUsers = localStorage.getItem('register user details');
    if (storedUsers) {
      setRegisteredUsers(JSON.parse(storedUsers));
    }
    
    const currentUser = localStorage.getItem('currentLoggedInUser');
    if (currentUser) {
      navigateToHome();
    }
  }, []);

  const navigateToHome = () => {
    navigate('/');
  };
  
  const toggleForm = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsLogin(!isLogin);
      setIsAnimating(false);
    }, 500);
    setSuccessMessage('');
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginForm({
      ...loginForm,
      [name]: value
    });
    
    if (name === 'username' && value.trim()) {
      setLoginErrors({ ...loginErrors, username: false });
    }
    if (name === 'password' && value.length >= 6) {
      setLoginErrors({ ...loginErrors, password: false });
    }
  };

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupForm({
      ...signupForm,
      [name]: value
    });
    
    if (name === 'username' && value.trim()) {
      setSignupErrors({ ...signupErrors, username: false });
    }
    if (name === 'email' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setSignupErrors({ ...signupErrors, email: false });
    }
    if (name === 'password' && value.length >= 6) {
      setSignupErrors({ ...signupErrors, password: false });
    }
  };

  const validateLogin = () => {
    const newErrors = {
      username: !loginForm.username.trim(),
      password: loginForm.password.length < 6
    };
    
    setLoginErrors(newErrors);
    return !newErrors.username && !newErrors.password;
  };

  const validateSignup = () => {
    const newErrors = {
      username: !signupForm.username.trim(),
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupForm.email),
      password: signupForm.password.length < 6
    };
    
    setSignupErrors(newErrors);
    return !newErrors.username && !newErrors.email && !newErrors.password;
  };

  const closeLoginModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      if (onClose && typeof onClose === 'function') {
        onClose();
      }
    }, 300);
  };

  const handleLoginSubmit = () => {
    if (validateLogin()) {
      setIsLoading(true);
      
      setTimeout(() => {
        const userExists = registeredUsers.some(
          user => user.username === loginForm.username && user.password === loginForm.password
        );
        
        if (userExists) {
          const loggedInUser = registeredUsers.find(
            user => user.username === loginForm.username && user.password === loginForm.password
          );
          
          localStorage.setItem('currentLoggedInUser', JSON.stringify({
            username: loggedInUser.username,
            password: loggedInUser.password
          }));
          
          window.dispatchEvent(new CustomEvent('userLoggedIn'));
          
          setSuccessMessage('Login successful! Welcome back.');
          
          setIsLoading(false);
          
          // Close modal and navigate to home after successful login
          setTimeout(() => {
            closeLoginModal();
          }, 1000);
        } else {
          setSuccessMessage('Invalid username or password. Please try again.');
          setIsLoading(false);
        }
      }, 1500);
    }
  };

  const handleSignupSubmit = () => {
    if (validateSignup()) {
      setIsLoading(true);
      
      setTimeout(() => {
        const usernameTaken = registeredUsers.some(user => user.username === signupForm.username);
        const emailTaken = registeredUsers.some(user => user.email === signupForm.email);
        
        if (usernameTaken) {
          setSignupErrors(prev => ({ ...prev, username: true }));
          setSuccessMessage('Username already taken. Please choose another one.');
          setIsLoading(false);
          return;
        }
        
        if (emailTaken) {
          setSignupErrors(prev => ({ ...prev, email: true }));
          setSuccessMessage('Email already registered. Please use another email.');
          setIsLoading(false);
          return;
        }
        
        const newUser = {
          username: signupForm.username,
          email: signupForm.email,
          password: signupForm.password,
          registeredAt: new Date().toISOString()
        };
        
        const updatedUsers = [...registeredUsers, newUser];
        
        setRegisteredUsers(updatedUsers);
        localStorage.setItem('register user details', JSON.stringify(updatedUsers));
        
        setSuccessMessage('Registration successful! You can now log in.');
        
        setSignupForm({
          username: '',
          email: '',
          password: ''
        });
        
        setIsLoading(false);
        
        setTimeout(() => {
          if (!isLogin) toggleForm();
        }, 1500);
      }, 1500);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  
  const renderLoadingOverlay = () => (
    <Backdrop
      sx={{
        position: 'absolute',
        zIndex: 9999,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        display: 'flex',
        flexDirection: 'column',
        gap: 2
      }}
      open={isLoading}
    >
      <CircularProgress color="primary" size={60} thickness={4} />
      <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
        {isLogin ? 'Logging in...' : 'Creating your account...'}
      </Typography>
    </Backdrop>
  );

  if (isClosing) return null;

  return (
    <ThemeProvider theme={theme}>
      <Fade in={!isClosing} timeout={300}>
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1300,
            backgroundColor: 'rgba(0,0,0,0.5)'
          }}
        >
          <Container maxWidth="md" sx={{ px: isMobile ? 1 : isTablet ? 2 : 0 }}>
            <Paper
              elevation={10}
              sx={{
                borderRadius: isMobile ? 2 : 4,
                overflow: 'hidden',
                height: isMobile 
                  ? (isLogin ? '450px' : '520px') 
                  : isTablet 
                    ? '500px' 
                    : '490px',
                width: '100%',
                maxWidth: isTablet ? '700px' : '950px',
                height:'540px',
                bgcolor: 'rgba(255, 255, 255, 0.95)',
                position: 'relative',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                margin: '0 auto',
                transition: 'transform 0.3s ease, opacity 0.3s ease',
                transform: isClosing ? 'scale(0.95)' : 'scale(1)',
                opacity: isClosing ? 0 : 1,
              }}
            >
              {renderLoadingOverlay()}
              
              <Box
                sx={{
                  display: 'flex',
                  width: '200%',
                  height: '100%',
                  transition: 'transform 0.5s ease-in-out',
                  transform: isLogin ? 'translateX(0)' : 'translateX(-50%)',
                }}
              >
                {/* Login Form */}
                <Box
                  sx={{
                    width: '50%',
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                  }}
                >
                  <Box
                    sx={{
                      flex: 1,
                      p: isMobile ? 2 : isTablet ? 3 : 5,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center'
                    }}
                  >
                    <Typography 
                      variant="h4" 
                      color="primary" 
                      align="center" 
                      gutterBottom
                      sx={{ 
                        fontSize: isMobile ? '1.5rem' : isTablet ? '1.7rem' : '2.125rem',
                        mb: isMobile ? 2 : 3
                      }}
                    >
                      Explore the World - Log in
                    </Typography>
                    
                    {successMessage && (
                      <Typography
                        variant="body2"
                        color={successMessage.includes('successful') ? 'success.main' : 'error.main'}
                        align="center"
                        sx={{ mb: 2 }}
                      >
                        {successMessage}
                      </Typography>
                    )}
                    
                    <TextField
                      fullWidth
                      name="username"
                      placeholder="Username"
                      value={loginForm.username}
                      onChange={handleLoginChange}
                      error={loginErrors.username}
                      helperText={loginErrors.username ? "Username is required" : ""}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonIcon />
                          </InputAdornment>
                        ),
                        sx: {
                          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.15)'
                        }
                      }}
                      disabled={isLoading}
                    />
                    
                    <TextField
                      fullWidth
                      name="password"
                      placeholder="Password"
                      type={showPassword ? 'text' : 'password'}
                      value={loginForm.password}
                      onChange={handleLoginChange}
                      error={loginErrors.password}
                      helperText={loginErrors.password ? "Password must be at least 6 characters" : ""}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockIcon />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={handleClickShowPassword}
                              edge="end"
                              disabled={isLoading}
                            >
                              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </IconButton>
                          </InputAdornment>
                        ),
                        sx: {
                          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.15)'
                        }
                      }}
                      disabled={isLoading}
                    />
                    
                    <Button 
                      variant="contained" 
                      color="primary" 
                      fullWidth 
                      onClick={handleLoginSubmit}
                      sx={{ 
                        mt: 2,
                        height: isMobile ? '48px' : '56px',
                        position: 'relative'
                      }}
                      disabled={isAnimating || isLoading}
                    >
                      LOGIN
                    </Button>
                    
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'center', 
                      gap: isMobile ? 0.5 : 1, 
                      mt: 3,
                      flexWrap: isMobile ? 'wrap' : 'nowrap'
                    }}>
                      <IconButton 
                        color="primary" 
                        sx={{ 
                          border: '1px solid #007bff',
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            transform: 'scale(1.1)',
                            boxShadow: '0 2px 5px rgba(0, 123, 255, 0.3)'
                          }
                        }}
                        disabled={isLoading}
                      >
                        <FacebookIcon />
                      </IconButton>
                      <IconButton 
                        color="primary" 
                        sx={{ 
                          border: '1px solid #007bff',
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            transform: 'scale(1.1)',
                            boxShadow: '0 2px 5px rgba(0, 123, 255, 0.3)'
                          }
                        }}
                        disabled={isLoading}
                      >
                        <TwitterIcon />
                      </IconButton>
                      <IconButton 
                        color="primary" 
                        sx={{ 
                          border: '1px solid #007bff',
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            transform: 'scale(1.1)',
                            boxShadow: '0 2px 5px rgba(0, 123, 255, 0.3)'
                          }
                        }}
                        disabled={isLoading}
                      >
                        <GoogleIcon />
                      </IconButton>
                      <IconButton 
                        color="primary" 
                        sx={{ 
                          border: '1px solid #007bff',
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            transform: 'scale(1.1)',
                            boxShadow: '0 2px 5px rgba(0, 123, 255, 0.3)'
                          }
                        }}
                        disabled={isLoading}
                      >
                        <LinkedInIcon />
                      </IconButton>
                    </Box>
                    
                    {isMobile && (
                      <Button 
                        variant="text" 
                        color="primary" 
                        fullWidth 
                        onClick={toggleForm}
                        disabled={isAnimating || isLoading}
                        sx={{ mt: 2 }}
                      >
                        New to Adventure? SIGN UP
                      </Button>
                    )}
                  </Box>
                  
                  <Box
                    sx={{
                      flex: 1,
                      backgroundImage: 'url("/Munnar.jpg")',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      p: isMobile ? 3 : isTablet ? 4 : 5,
                      display: isMobile ? 'none' : 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      position: 'relative',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.3)',
                        zIndex: 1
                      }
                    }}
                  >
                    <Typography 
                      variant="h4" 
                      align="center" 
                      color="white" 
                      gutterBottom
                      sx={{ 
                        textShadow: '2px 5px 6px rgba(0, 0, 0, 0.8)',
                        position: 'relative',
                        zIndex: 2,
                        fontSize: isTablet ? '1.6rem' : '2.125rem'
                      }}
                    >
                      New to Adventure?
                    </Typography>
                    <Typography 
                      variant="h6" 
                      align="center" 
                      color="white" 
                      paragraph
                      sx={{ 
                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)', 
                        fontWeight: 'bold',
                        position: 'relative',
                        zIndex: 2,
                        fontSize: isTablet ? '0.9rem' : '1.25rem',
                        px: isTablet ? 1 : 2
                      }}
                    >
                      Join us and start exploring the most beautiful places on Earth.
                    </Typography>
                    <Button 
                      variant="contained" 
                      color="primary" 
                      onClick={toggleForm}
                      disabled={isAnimating || isLoading}
                      sx={{
                        mt: 2,
                        width: isTablet ? '80%' : '380px',
                        bgcolor: '#007bff',
                        position: 'relative',
                        zIndex: 2,
                        '&:hover': {
                          bgcolor: '#0056b3',
                        }
                      }}
                    >
                      SIGN UP
                    </Button>
                  </Box>
                </Box>

                {/* Signup Form */}
                <Box
                  sx={{
                    width: '50%',
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                  }}
                >
                  <Box
                    sx={{
                      flex: 1,
                      backgroundImage: 'url("/Munnar.jpg")',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      p: isMobile ? 3 : isTablet ? 4 : 5,
                      display: isMobile ? 'none' : 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      position: 'relative',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.3)',
                        zIndex: 1
                      }
                    }}
                  >
                    <Typography 
                      variant="h4" 
                      align="center" 
                      color="white" 
                      gutterBottom
                      sx={{ 
                        textShadow: '2px 5px 6px rgba(0, 0, 0, 0.8)',
                        position: 'relative',
                        zIndex: 2,
                        fontSize: isTablet ? '1.6rem' : '2.125rem'
                      }}
                    >
                      Welcome Back!
                    </Typography>
                    <Typography 
                      variant="h6" 
                      align="center" 
                      color="white" 
                      paragraph
                      sx={{ 
                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)', 
                        fontWeight: 'bold',
                        position: 'relative',
                        zIndex: 2,
                        fontSize: isTablet ? '0.9rem' : '1.25rem',
                        px: isTablet ? 1 : 2
                      }}
                    >
                      Already have an account? Log in and continue your journey with us.
                    </Typography>
                    <Button 
                      variant="contained" 
                      color="primary" 
                      onClick={toggleForm}
                      disabled={isAnimating || isLoading}
                      sx={{
                        mt: 2,
                        width: isTablet ? '80%' : '380px',
                        position: 'relative',
                        zIndex: 2,
                        '&:hover': {
                          bgcolor: '#0056b3',
                        }
                      }}
                    >
                      LOG IN
                    </Button>
                  </Box>
                  
                  <Box
                    sx={{
                      flex: 1,
                      p: isMobile ? 2 : isTablet ? 3 : 5,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center'
                    }}
                  >
                    <Typography 
                      variant="h4" 
                      color="primary" 
                      align="center" 
                      gutterBottom
                      sx={{ 
                        fontSize: isMobile ? '1.5rem' : isTablet ? '1.7rem' : '2.125rem',
                        mb: isMobile ? 2 : 3
                      }}
                    >
                      Start Your Adventure - Sign Up
                    </Typography>
                    
                    {successMessage && (
                      <Typography
                        variant="body2"
                        color={successMessage.includes('successful') ? 'success.main' : 'error.main'}
                        align="center"
                        sx={{ mb: 2 }}
                      >
                        {successMessage}
                      </Typography>
                    )}
                    
                    <TextField
                      fullWidth
                      name="username"
                      placeholder="Username"
                      value={signupForm.username}
                      onChange={handleSignupChange}
                      error={signupErrors.username}
                      helperText={signupErrors.username ? "Username is required or already taken" : ""}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonIcon />
                          </InputAdornment>
                        ),
                        sx: {
                          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.15)'
                        }
                      }}
                      disabled={isLoading}
                    />
                    
                    <TextField
                      fullWidth
                      name="email"
                      placeholder="Email"
                      type="email"
                      value={signupForm.email}
                      onChange={handleSignupChange}
                      error={signupErrors.email}
                      helperText={signupErrors.email ? "Please enter a valid email or email already registered" : ""}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailIcon />
                          </InputAdornment>
                        ),
                        sx: {
                          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.15)'
                        }
                      }}
                      disabled={isLoading}
                    />
                    
                    <TextField
                      fullWidth
                      name="password"
                      placeholder="Password"
                      type={showPassword ? 'text' : 'password'}
                      value={signupForm.password}
                      onChange={handleSignupChange}
                      error={signupErrors.password}
                      helperText={signupErrors.password ? "Password must be at least 6 characters" : ""}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockIcon />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={handleClickShowPassword}
                              edge="end"
                              disabled={isLoading}
                            >
                              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </IconButton>
                          </InputAdornment>
                        ),
                        sx: {
                          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.15)'
                        }
                      }}
                      disabled={isLoading}
                    />
                    
                    <Button 
                      variant="contained" 
                      color="primary" 
                      fullWidth 
                      onClick={handleSignupSubmit}
                      disabled={isAnimating || isLoading}
                      sx={{ 
                        mt: 2,
                        height: isMobile ? '48px' : '56px'
                      }}
                    >
                      SIGN UP
                    </Button>
                    
                    {isMobile && (
                      <Button 
                        variant="text" 
                        color="primary" 
                        fullWidth 
                        onClick={toggleForm}
                        disabled={isAnimating || isLoading}
                        sx={{ mt: 2 }}
                      >
                       Already have an account? LOG IN
                      </Button>
                    )}
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Container>
        </Box>
      </Fade>
    </ThemeProvider>
  );
};

export default TourismLoginSignup;