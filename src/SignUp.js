import React, { useState } from 'react';
import axios from 'axios';
import { Box, InputAdornment, TextField, Button, Typography, Paper, IconButton } from '@mui/material';
import { Person, Lock, Email, Phone, Visibility, VisibilityOff } from '@mui/icons-material'; // Material You Icons
import { Formik, Field, Form } from 'formik';

const SignUp = ({ setIsSignUp }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = async (values, { setSubmitting, setFieldError, resetForm }) => {
    try {
      sessionStorage.setItem('isLoggedIn', false);
      const response = await axios.post('http://localhost:8081/user/', values);
      if (response.status === 200) {
        console.log('Sign-Up successful:', response.data);
        resetForm(); // Clear the form fields
      }
    } catch (error) {
      setFieldError('general', 'Sign-Up failed. Please try again.');
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
    if (!values.name) {
      errors.name = 'Name is required';
    }
    if (!values.phoneNumber) {
      errors.phoneNumber = 'Phone number is required';
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
          Sign Up
        </Typography>
        <Formik
          initialValues={{ email: '', password: '', name: '', phoneNumber: '' }}
          validate={validation}
          onSubmit={handleSignUp}
        >
          {({ isSubmitting, errors, touched, setFieldValue }) => (
            <Form>
              {errors.general && (
                <Typography color="error" align="center">
                  {errors.general}
                </Typography>
              )}
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
                        <Person /> {/* Material You Person Icon */}
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => setFieldValue('name', e.target.value)}
                />
              </Box>
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
                        <Email /> {/* Material You Email Icon */}
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => setFieldValue('email', e.target.value)}
                />
              </Box>
              <Box sx={{ mb: 2 }}>
                <Field
                  name="phoneNumber"
                  as={TextField}
                  label="Phone Number"
                  variant="standard"
                  fullWidth
                  error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                  helperText={touched.phoneNumber && errors.phoneNumber}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Phone /> {/* Material You Phone Icon */}
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => setFieldValue('phoneNumber', e.target.value)}
                />
              </Box>
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
                        <Lock /> {/* Material You Lock Icon */}
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword((prev) => !prev)}
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
                Sign Up
              </Button>
              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Typography variant="body2">
                  Already have an account?{' '}
                  <Button
                    variant="text"
                    color="secondary"
                    onClick={() => setIsSignUp(false)}
                  >
                    Login
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

export default SignUp;
