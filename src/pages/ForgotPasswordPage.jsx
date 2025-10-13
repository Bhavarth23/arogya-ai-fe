// src/pages/ForgotPasswordPage.jsx
import { useState } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Typography, Alert } from '@mui/material';
import { Link } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import { useTheme } from '@mui/material/styles';

function ForgotPasswordPage() {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    setError('');
    try {
      await axios.post('http://127.0.0.1:8000/api/password-reset/', { email });
      setMessage('If an account with that email exists, a password reset link has been sent. Please check your email.');
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <Typography variant="h5" component="h1" gutterBottom sx={{ fontWeight: 600, textAlign: 'center' }}>
        Forgot Password
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3, textAlign: 'center' }}>
        Enter your email and we'll send you a link to reset your password.
      </Typography>
      
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth required type="email" label="Email Address" margin="normal" variant="outlined"
          value={email} onChange={(e) => setEmail(e.target.value)}
        />
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Send Reset Link'}
        </Button>
      </Box>

      {message && <Alert severity="success" sx={{ mt: 2 }}>{message}</Alert>}
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Typography align="center" sx={{ mt: 2 }}>
          <Link to="/login" style={{ textDecoration: 'none', color: theme.palette.primary.main }}>
              Back to Login
          </Link>
      </Typography>
    </AuthLayout>
  );
}

export default ForgotPasswordPage;