import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TextField, Button, Typography, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Umbrella from '../components/UmbrellaIcon';
import Droplet from 'react-feather/dist/icons/droplet';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Create a dark mode theme
const darkTheme = createTheme({
  palette: {
    mode: 'dark', // Set the palette mode to dark
    primary: {
      main: '#90caf9', // Adjust primary color if needed
    },
    secondary: {
      main: '#f48fb1', // Adjust secondary color if needed
    },
    // Add more palette colors or overrides as needed
  },
});

  const rootStyle = {
    backgroundColor: 'black',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    padding: '24px', // Adjust as needed
  };

  const inputStyle = {
    marginBottom: '16px',
    width: '300px',
    color: 'white', // Set text color to white
    '& input': {
      color: 'white', // Set input text color to white
      border: '1px solid white', // Set the input border to a solid white line
      borderRadius: '4px', // Optionally, add border radius for a rounded look
      padding: '8px', // Optionally, add padding for better visual spacing
      backgroundColor: 'transparent', // Optionally, make the background transparent
    },
  };
  
  
  const buttonStyle = {
    width: '300px',
    color: 'white', // Set text color to white
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Adjust opacity (in this case, 50%)
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.7)', // Adjust opacity on hover (70%)
    },
    border: 'rgba(255, 255, 255, 0.5)'
  };
  

  const handleLogin = () => {
    // Perform authentication (you would replace this with your authentication logic)
    // For simplicity, just check if both fields are filled
    if (username && password) {
      onLogin(username);
    } else {
      alert('Please enter both username and password.');
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
<div style={rootStyle}>

<Box display="flex" alignItems="center">
  <Typography variant="h2" gutterBottom style={{ fontFamily: 'Montserrat, sans-serif' }}>
    Dew | Point
  </Typography>
  <Box marginBottom={2} marginLeft={2}> {/* Adjust margin as needed */}
    <Droplet style={{ width: '50px', height: '50px' }} />
  </Box>
</Box>


      <Box display="flex" flexDirection="column" alignItems="center">
        <TextField
          style={inputStyle}
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          variant="outlined"
          color="secondary"
        />
        <TextField
          style={inputStyle}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="outlined"
          color="secondary"
        />
        <Button
          style={buttonStyle}
          variant="contained"
          color="secondary"
          onClick={handleLogin}
        >
          Login
        </Button>
      </Box>

      {/* Link to the Main page */}
      {/* <Typography variant="body1" gutterBottom>
        Don't have an account?{' '}
        <Link to="/main" style={{ color: 'white' }}>
          Go to Main Page
        </Link>
      </Typography> */}
    </div>
      
    </ThemeProvider>
    
  );
};

export default Login;
