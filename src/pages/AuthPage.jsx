// src/pages/AuthPage.jsx
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
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import PsychologyIcon from "@mui/icons-material/Psychology";

function AuthPage() {
  const [isLoginView, setIsLoginView] = useState(true);
  const navigate = useNavigate();

  // State for forms
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginChange = (e) =>
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  const handleRegisterChange = (e) =>
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/token/",
        loginData
      );
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.access}`;
      navigate("/dashboard");
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      // Assuming your backend returns the user data upon registration
      const response = await axios.post(
        "http://127.0.0.1:8000/api/register/",
        registerData
      );
      // Redirect to the OTP verification page with the email
      navigate(`/verify-otp?email=${response.data.email}`);
    } catch (err) {
      const errorMessage =
        err.response?.data?.username?.[0] ||
        err.response?.data?.email?.[0] ||
        "Registration failed. Please try again.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const formVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
    exit: { opacity: 0, x: -30, transition: { duration: 0.2, ease: "easeIn" } },
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        bgcolor: "grey.100",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          maxWidth: "1000px",
          minHeight: "600px",
          boxShadow:
            "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
          borderRadius: "1.5rem",
          overflow: "hidden",
          m: 2,
        }}
      >
        {/* --- BRANDING SIDE --- */}
        <Box
          sx={{
            flex: 1,
            p: { xs: 4, md: 6 },
            display: { xs: "none", md: "flex" },
            flexDirection: "column",
            justifyContent: "center",
            background: "linear-gradient(160deg, #0ea5e9 0%, #2563eb 100%)",
            color: "white",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <PsychologyIcon sx={{ mr: 1.5, fontSize: "3rem" }} />
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                Arogya AI
              </Typography>
            </Box>
            <Typography variant="h6" sx={{ fontWeight: "400", opacity: 0.9 }}>
              Your AI-Powered Health Assistant.
            </Typography>
            <Typography variant="body1" sx={{ mt: 1, opacity: 0.8 }}>
              Upload medical reports and get instant, easy-to-understand
              analysis.
            </Typography>
          </motion.div>
        </Box>

        {/* --- FORM SIDE --- */}
        <Box
          sx={{
            flex: 1,
            p: { xs: 3, sm: 6 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            backgroundColor: "white",
          }}
        >
          <AnimatePresence mode="wait">
            {isLoginView ? (
              <motion.div
                key="login"
                variants={formVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <Typography
                  variant="h5"
                  component="h1"
                  sx={{ fontWeight: "bold", mb: 1 }}
                >
                  Welcome Back!
                </Typography>
                <Typography sx={{ color: "text.secondary", mb: 3 }}>
                  Please enter your details to log in.
                </Typography>

                {error && (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                  </Alert>
                )}

                <Box component="form" onSubmit={handleLoginSubmit}>
                  <TextField
                    label="Username"
                    name="username"
                    value={loginData.username}
                    onChange={handleLoginChange}
                    fullWidth
                    required
                    margin="normal"
                  />
                  <TextField
                    label="Password"
                    name="password"
                    type="password"
                    value={loginData.password}
                    onChange={handleLoginChange}
                    fullWidth
                    required
                    margin="normal"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    sx={{
                      mt: 2,
                      py: 1.5,
                      textTransform: "none",
                      fontWeight: "bold",
                    }}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      "Login"
                    )}
                  </Button>
                  <Typography sx={{ textAlign: "center", mt: 3 }}>
                    Don't have an account?{" "}
                    <MuiLink
                      component="button"
                      type="button"
                      variant="body2"
                      onClick={() => setIsLoginView(false)}
                      sx={{ fontWeight: "bold" }}
                    >
                      Sign up
                    </MuiLink>
                  </Typography>
                </Box>
              </motion.div>
            ) : (
              <motion.div
                key="register"
                variants={formVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <Typography
                  variant="h5"
                  component="h1"
                  sx={{ fontWeight: "bold", mb: 1 }}
                >
                  Create an Account
                </Typography>
                <Typography sx={{ color: "text.secondary", mb: 3 }}>
                  Get started with your personal health assistant.
                </Typography>

                {error && (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                  </Alert>
                )}

                <Box component="form" onSubmit={handleRegisterSubmit}>
                  <TextField
                    label="Username"
                    name="username"
                    value={registerData.username}
                    onChange={handleRegisterChange}
                    fullWidth
                    required
                    margin="normal"
                  />
                  <TextField
                    label="Email"
                    name="email"
                    type="email"
                    value={registerData.email}
                    onChange={handleRegisterChange}
                    fullWidth
                    required
                    margin="normal"
                  />
                  <TextField
                    label="Password"
                    name="password"
                    type="password"
                    value={registerData.password}
                    onChange={handleRegisterChange}
                    fullWidth
                    required
                    margin="normal"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    sx={{
                      mt: 2,
                      py: 1.5,
                      textTransform: "none",
                      fontWeight: "bold",
                    }}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                  <Typography sx={{ textAlign: "center", mt: 3 }}>
                    Already have an account?{" "}
                    <MuiLink
                      component="button"
                      type="button"
                      variant="body2"
                      onClick={() => setIsLoginView(true)}
                      sx={{ fontWeight: "bold" }}
                    >
                      Log in
                    </MuiLink>
                  </Typography>
                </Box>
              </motion.div>
            )}
          </AnimatePresence>
        </Box>
      </Box>
    </Box>
  );
}

export default AuthPage;
