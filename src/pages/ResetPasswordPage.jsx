// src/pages/ResetPasswordPage.jsx
import { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  CircularProgress,
  InputAdornment,
} from "@mui/material";
import { useParams, Link } from "react-router-dom";

// Import the layout and icons
import AuthLayout from "../components/AuthLayout";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

function ResetPasswordPage() {
  const { uidb64, token } = useParams();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // --- NEW: Add validation for matching passwords ---
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    setMessage("");
    setError("");

    try {
      await axios.post(
        `http://127.0.0.1:8000/api/password-reset-confirm/${uidb64}/${token}/`,
        { password: formData.password }
      );
      setMessage(
        "Your password has been reset successfully! You can now log in."
      );
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "Invalid or expired link. Please request a new one."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <Typography
        variant="h4"
        component="h1"
        sx={{ fontWeight: "bold", mb: 1 }}
      >
        Reset Your Password
      </Typography>

      {message ? (
        // --- NEW: A more professional success state ---
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <CheckCircleOutlineIcon
            color="success"
            sx={{ fontSize: 64, mb: 2 }}
          />
          <Alert severity="success" sx={{ mb: 3 }}>
            {message}
          </Alert>
          <Button
            component={Link}
            to="/login"
            fullWidth
            variant="contained"
            size="large"
          >
            Back to Login
          </Button>
        </Box>
      ) : (
        <>
          <Typography sx={{ color: "text.secondary", mb: 4 }}>
            Please enter your new password below.
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              required
              name="password"
              type="password"
              label="New Password"
              margin="normal"
              variant="outlined"
              value={formData.password}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon sx={{ color: "text.secondary" }} />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              required
              name="confirmPassword"
              type="password"
              label="Confirm New Password"
              margin="normal"
              variant="outlined"
              value={formData.confirmPassword}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon sx={{ color: "text.secondary" }} />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ mt: 3, mb: 2, py: 1.5, fontWeight: "bold" }}
              disabled={isLoading}
            >
              {isLoading ? (
                <CircularProgress size={26} color="inherit" />
              ) : (
                "Reset Password"
              )}
            </Button>
          </Box>
        </>
      )}
    </AuthLayout>
  );
}

export default ResetPasswordPage;
