import { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  Link as MuiLink,
  CircularProgress,
  InputAdornment,
  useTheme, // <-- ADDED: Import useTheme
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

// Import the layout and icons
import AuthLayout from "../components/AuthLayout";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

function RegisterPage() {
  const theme = useTheme(); // <-- Access theme
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/register/",
        formData
      );
      // Navigate to the OTP verification page, passing the email for context
      navigate("/verify-otp", { state: { email: formData.email } });
    } catch (err) {
      const errorData = err.response?.data;
      // Provide more specific error messages from the backend if available
      const errorMsg =
        errorData?.username?.[0] ||
        errorData?.email?.[0] ||
        "Registration failed. A user with that username or email may already exist.";
      setError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  // Common style for text fields (copied from LoginPage)
  const textFieldSx = {
    mt: theme.spacing(3), // mt-3
    "& .MuiOutlinedInput-root": {
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
      "&:hover fieldset": {
        borderColor: theme.palette.primary.light,
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.primary.main,
      },
      "& input": {
        color: theme.palette.text.primary,
      },
    },
    "& .MuiInputLabel-root": {
      color: theme.palette.text.secondary,
    },
    "& .MuiInputAdornment-root .MuiSvgIcon-root": {
      color: theme.palette.text.secondary,
    },
  };

  return (
    <AuthLayout>
      <Typography
        variant="h4"
        component="h1"
        sx={{ fontWeight: 800, mb: 1, color: theme.palette.text.primary }}
      >
        Create an Account
      </Typography>
      <Typography sx={{ color: theme.palette.text.secondary, mb: 5 }}>
        Get started with your personal health assistant.
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: 3 }}>
          {error}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          required
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          sx={textFieldSx} // Apply custom styles
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonOutlineIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          fullWidth
          required
          label="Email Address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          sx={textFieldSx} // Apply custom styles
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailOutlinedIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          fullWidth
          required
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          sx={textFieldSx} // Apply custom styles
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockOutlinedIcon />
              </InputAdornment>
            ),
          }}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          sx={{ mt: 4, mb: 4, py: 1.5, fontWeight: "bold", borderRadius: 3 }}
          disabled={isLoading}
        >
          {isLoading ? (
            <CircularProgress size={26} color="inherit" />
          ) : (
            "Create Account"
          )}
        </Button>

        <Typography
          sx={{ textAlign: "center", color: theme.palette.text.secondary }}
        >
          Already have an account?{" "}
          <MuiLink
            component={Link}
            to="/login"
            sx={{
              fontWeight: "bold",
              textDecoration: "none",
              color: theme.palette.secondary.main, // Use secondary accent color
              "&:hover": { textDecoration: "underline" },
            }}
          >
            Log In
          </MuiLink>
        </Typography>
      </Box>
    </AuthLayout>
  );
}

export default RegisterPage;
