import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
const defaultTheme = createTheme();

export default function SignUp() {
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errmsg, setErrMsg] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  
    const firstName = data.get('firstName');
    const lastName = data.get('lastName');
    const email = data.get('email');
    const password = data.get('password');
    const confirmPassword = data.get('confirmpassword');
  
    // Add your validation logic here
    if (!validateEmail(email)) {
      setErrMsg('Email is not valid');
      handleClick();
      return;
    }
  
    if (!validatePassword(password)) {
      setErrMsg('Password not valid. length should be greater than 3 and less than 7');
      handleClick();
      return;
    }
  
    if (password !== confirmPassword) {
      setErrMsg('Password and Confirm Password do not match');
      handleClick();
      return;
    }
  
    // Check if any field is empty
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setErrMsg('All fields are necessary. Please fill in all the required fields.');
      handleClick();
      return;
    }
  
    // If all validations pass, update the state with the new values
    setValues({ firstName, lastName, email, password, confirmPassword });
  
    try {
      // Make axios request here
      let val = { name: `${values.firstName} ${values.lastName}`, email: values.email, password: values.password };
      console.log(val);
      const response = await axios.post('http://localhost:8081/signup', val);
      console.log(response);
      navigate('/signIn');
    } catch (error) {
      console.log(error);
      setErrMsg('An error occurred. Please try again.');
      handleClick();
    }
  };
  

  const validateEmail = (email) => {
    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    // Password should be at least 6 characters long
    if (password.length >= 6 || password.length <=3) {
        return false;
    }
    return true;
};

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  useEffect(() => {
    let val = { name: `${values.firstName} ${values.lastName}`, email: values.email, password: values.password };
    console.log(val);
    
  }, [values]);
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmpassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmpassword"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="signIn" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* Snackbar for displaying error messages */}
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
                     {errmsg}
                    </Alert>
                </Snackbar>
      </Container>
    </ThemeProvider>
  );
}
