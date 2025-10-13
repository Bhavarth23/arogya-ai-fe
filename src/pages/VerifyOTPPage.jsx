// src/pages/VerifyOTPPage.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useLocation, useNavigate, Link } from "react-router-dom";

// Import the layout and a success icon
import AuthLayout from "../components/AuthLayout";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

function VerifyOTPPage() {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  // Safely get the email from the location state passed by the RegisterPage
  const email = location.state?.email;

  // --- NEW: A professional check to prevent direct access ---
  // If a user lands on this page without coming from the register page,
  // we redirect them to prevent errors.
  useEffect(() => {
    if (!email) {
      console.error("No email provided to OTP page, redirecting to register.");
      navigate("/register");
    }
  }, [email, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    setError("");
    try {
      await axios.post("http://127.0.0.1:8000/api/verify-otp/", { email, otp });
      setMessage("Verification successful! You can now log in.");
    } catch (err) {
      setError(
        err.response?.data?.error || "An error occurred. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Render nothing while redirecting to prevent a flicker
  if (!email) {
    return null;
  }

  return (
    <AuthLayout>
      <Typography
        variant="h4"
        component="h1"
        sx={{ fontWeight: "bold", mb: 1 }}
      >
        Verify Your Email
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
            Proceed to Login
          </Button>
        </Box>
      ) : (
        <>
          <Typography
            sx={{ color: "text.secondary", mb: 4, textAlign: "center" }}
          >
            An OTP has been sent to <strong>{email}</strong>. Please enter it
            below.
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
              label="6-Digit OTP"
              name="otp"
              margin="normal"
              variant="outlined"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              // --- NEW: Styling for a more prominent OTP input field ---
              inputProps={{
                maxLength: 6,
                style: {
                  textAlign: "center",
                  fontSize: "1.5rem",
                  letterSpacing: "0.5rem", // Adds space between characters
                },
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
                "Verify Account"
              )}
            </Button>
          </Box>
        </>
      )}
    </AuthLayout>
  );
}

export default VerifyOTPPage;
