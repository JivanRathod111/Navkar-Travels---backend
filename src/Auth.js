import React, { useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Paper from '@mui/material/Paper';
import { Formik, Field, Form } from 'formik';

const Auth = (props) => {
  const [isSignUp, setIsSignUp] = useState(false); // State to toggle between sign-up and login
  const [showPassword, setShowPassword] = useState(false);

  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
    name: '',
    phoneNumber: ''
  });

  const handleLogin = async (values, { setSubmitting, setFieldError, resetForm }) => {
    try {
      const response = await axios.get('http://localhost:8081/user/login', {
        params: {
          email: values.email,
          password: values.password,
        },
      });
      if (response.status === 200) {
        sessionStorage.setItem('userId', response.data.id);
        sessionStorage.setItem('isLoggedIn', true);
        console.log('Login successful:', response.data);
        props.setHasAccess(true);
        sessionStorage.setItem('customerId', response.data.id);
        console.log(response.data.id);
        resetForm(); // Clear the form fields
        setFormValues({
          email: '',
          password: '',
          name: '',
          phoneNumber: ''
        }); // Reset local state
      }
    } catch (error) {
      setFieldError('general', 'Login failed. Please check your credentials.');
      console.error('Login failed:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSignUp = async (values, { setSubmitting, setFieldError, resetForm }) => {
    try {
      sessionStorage.setItem('isLoggedIn', false);
      const response = await axios.post('http://localhost:8081/user/', values);
      if (response.status === 200) {
        console.log('Sign-Up successful:', response.data);
        // Keep the user on the sign-up page
        resetForm(); // Clear the form fields
        setFormValues({
          email: '',
          password: '',
          name: '',
          phoneNumber: ''
        }); // Reset local state
      }
    } catch (error) {
      setFieldError('general', 'Sign-Up failed. Please try again.');
      console.error('Sign-Up error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const validation = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Invalid email address';
    }
    if (!values.password) {
      errors.password = 'Password is required';
    }
    if (isSignUp) {
      if (!values.name) {
        errors.name = 'Name is required';
      }
      if (!values.phoneNumber) {
        errors.phoneNumber = 'Phone number is required';
      }
    }
    return errors;
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'beige',
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: '400px',
          margin: 'auto',
          padding: '20px',
          borderRadius: '4px',
          backgroundColor: 'white',
          color: '#333',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s ease-in-out',
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          {isSignUp ? 'Sign Up' : 'Login'}
        </Typography>
        <Formik
          initialValues={formValues}
          validate={validation}
          onSubmit={isSignUp ? handleSignUp : handleLogin}
        >
          {({ isSubmitting, errors, touched, setFieldValue }) => (
            <Form>
              {errors.general && (
                <Typography color="error" align="center">
                  {errors.general}
                </Typography>
              )}
              {isSignUp && (
                <Box sx={{ mb: 2 }}>
                  <Field
                    name="name"
                    as={TextField}
                    label="Name"
                    variant="standard"
                    fullWidth
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircle />
                        </InputAdornment>
                      ),
                    }}
                    onChange={(e) => setFieldValue('name', e.target.value)}
                  />
                </Box>
              )}
              <Box sx={{ mb: 2 }}>
                <Field
                  name="email"
                  as={TextField}
                  label="Email"
                  variant="standard"
                  fullWidth
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => setFieldValue('email', e.target.value)}
                />
              </Box>
              {isSignUp && (
                <Box sx={{ mb: 2 }}>
                  <Field
                    name="phoneNumber"
                    as={TextField}
                    label="Phone Number"
                    variant="standard"
                    fullWidth
                    error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                    helperText={touched.phoneNumber && errors.phoneNumber}
                    onChange={(e) => setFieldValue('phoneNumber', e.target.value)}
                  />
                </Box>
              )}
              <Box sx={{ mb: 2, position: 'relative' }}>
                <Field
                  name="password"
                  as={TextField}
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  variant="standard"
                  fullWidth
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <VpnKeyIcon />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => setFieldValue('password', e.target.value)}
                />
              </Box>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ width: '100%', mt: 2 }}
                disabled={isSubmitting}
              >
                {isSignUp ? 'Sign Up' : 'Login'}
              </Button>
              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Typography variant="body2">
                  {isSignUp
                    ? "Already have an account? "
                    : "Don't have an account? "}
                  <Button
                    variant="text"
                    color="secondary"
                    onClick={() => setIsSignUp(!isSignUp)}
                  >
                    {isSignUp ? 'Login' : 'Sign Up'}
                  </Button>
                </Typography>
              </Box>
            </Form>
          )}
        </Formik>
      </Paper>
    </Box>
  );
};

export default Auth;
