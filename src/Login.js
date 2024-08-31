import React from 'react';
import axios from 'axios';
import { Box, InputAdornment, TextField, Button, Typography, IconButton, Paper } from '@mui/material';
import { AccountCircle, VpnKey as VpnKeyIcon, Visibility, VisibilityOff } from '@mui/icons-material';
import { Formik, Field, Form } from 'formik';

const Login = ({ setHasAccess, setIsSignUp }) => { // Destructure setIsSignUp directly
  const [showPassword, setShowPassword] = React.useState(false);

  const handleLogin = async (values, { setSubmitting, setFieldError, resetForm }) => {
    try {
      const response = await axios.get('http://localhost:8081/user/login', {
        params: {
          email: values.email,
          password: values.password,
        },
      });
      if (response.status === 200) {
        sessionStorage.setItem('isLoggedIn', "true");
        sessionStorage.setItem('userId', response.data.id); 

        setHasAccess(true);
        resetForm(); // Clear the form fields
      }
    } catch (error) {
      setFieldError('general', 'Login failed. Please check your credentials.');
      console.error('Login failed:', error); // Added logging for debugging
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
          Login
        </Typography>
        <Formik
          initialValues={{ email: '', password: '' }}
          validate={validation}
          onSubmit={handleLogin}
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
                Login
              </Button>
              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Typography variant="body2">
                  Don't have an account?{' '}
                  <Button
                    variant="text"
                    color="secondary"
                    onClick={() => setIsSignUp(true)}
                  >
                    Sign Up
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

export default Login;
