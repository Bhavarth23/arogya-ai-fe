import { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  TextField,
  Typography,
  InputAdornment,
  Grid,
  Alert,
  Link as MuiLink,
  CircularProgress,
  useTheme, // <-- ADDED: useTheme hook
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

// Import the layout and icons
import AuthLayout from "../components/AuthLayout";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

function LoginPage() {
  const theme = useTheme(); // <-- Access theme
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/token/",
        formData
      );

      const { access, refresh } = response.data;

      // Save tokens to localStorage (Note: For Canvas deployment, Firestore is preferred for persistent storage)
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);

      // Set the header for the current session
      axios.defaults.headers.common["Authorization"] = `Bearer ${access}`;

      // Navigate to the dashboard
      navigate("/dashboard");
    } catch (err) {
      setError("Login failed. Please check your username and password.");
      console.error("Login Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Common style for text fields to align with dark glassmorphism
  const textFieldSx = {
    mt: theme.spacing(3), // mt-3
    // Override default input background for dark theme look
    "& .MuiOutlinedInput-root": {
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
      // Change border color on hover/focus to theme primary color
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
      color: theme.palette.text.secondary, // Label color
    },
    "& .MuiInputAdornment-root .MuiSvgIcon-root": {
      color: theme.palette.text.secondary, // Icon color
    },
  };

  return (
    // Wrap the entire page with the professional AuthLayout
    <AuthLayout>
      <Typography
        variant="h4"
        component="h1"
        sx={{ fontWeight: 800, mb: 1, color: theme.palette.text.primary }}
      >
        Welcome Back!
      </Typography>
      <Typography sx={{ color: theme.palette.text.secondary, mb: 5 }}>
        Please enter your details to sign in.
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          autoFocus
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
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          sx={textFieldSx} // Apply custom styles
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockOutlinedIcon />
              </InputAdornment>
            ),
          }}
        />
        {error && (
          <Alert severity="error" sx={{ mt: 2, borderRadius: 3 }}>
            {error}
          </Alert>
        )}

        <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
          <Grid item>
            <MuiLink
              component={Link}
              to="/forgot-password"
              sx={{
                textDecoration: "none",
                color: theme.palette.primary.main,
                "&:hover": { textDecoration: "underline" },
              }}
              variant="body2"
            >
              Forgot Password?
            </MuiLink>
          </Grid>
        </Grid>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          disabled={isLoading}
          sx={{ mt: 4, mb: 4, py: 1.5, fontWeight: "bold", borderRadius: 3 }}
        >
          {isLoading ? (
            <CircularProgress size={26} color="inherit" />
          ) : (
            "Sign In"
          )}
        </Button>

        <Typography align="center" sx={{ color: theme.palette.text.secondary }}>
          Don't have an account?{" "}
          <MuiLink
            component={Link}
            to="/register"
            sx={{
              fontWeight: "bold",
              textDecoration: "none",
              color: theme.palette.secondary.main,
              "&:hover": { textDecoration: "underline" },
            }}
          >
            Sign Up
          </MuiLink>
        </Typography>
      </Box>
    </AuthLayout>
  );
}

export default LoginPage;
