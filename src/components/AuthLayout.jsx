import { Box, Paper, Typography, CssBaseline, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import PsychologyIcon from "@mui/icons-material/Psychology";

// --- Custom Dark Background for Auth Pages ---
const AuthBackground = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
        overflow: "hidden",
        // Deep dark indigo/slate background for the whole screen
        background: `linear-gradient(135deg, ${theme.palette.background.default}, ${theme.palette.background.paper})`,
      }}
    >
      {/* Subtle primary accent glow */}
      <Box
        sx={{
          position: "absolute",
          width: "500px",
          height: "500px",
          background: theme.palette.primary.main,
          borderRadius: "50%",
          top: "-150px",
          left: "-200px",
          opacity: 0.1,
          filter: "blur(150px)",
        }}
      />
      {/* Subtle secondary accent glow */}
      <Box
        sx={{
          position: "absolute",
          width: "500px",
          height: "500px",
          background: theme.palette.secondary.main,
          borderRadius: "50%",
          bottom: "-150px",
          right: "-200px",
          opacity: 0.1,
          filter: "blur(150px)",
        }}
      />
    </Box>
  );
};

function AuthLayout({ children }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      <CssBaseline />
      <AuthBackground />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Paper
          elevation={0}
          sx={{
            display: "flex",
            width: { xs: "90vw", md: "80vw", lg: "70vw" },
            maxWidth: "1000px",
            minHeight: "600px",
            borderRadius: 4,
            overflow: "hidden",

            // Glassmorphism container styling
            bgcolor: theme.palette.background.paper,
            backdropFilter: "blur(15px) saturate(180%)",
            border: `1px solid ${theme.palette.divider}`,
            boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.6)", // Darker shadow for depth
          }}
        >
          {/* 1. Branding Side (ACCENT GRADIENT) */}
          <Box
            sx={{
              flex: 1,
              p: { xs: 3, md: 5 },
              display: { xs: "none", md: "flex" },
              flexDirection: "column",
              justifyContent: "center",
              // Use theme colors for the brand's primary gradient
              background: `linear-gradient(160deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
              color: theme.palette.primary.contrastText,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <PsychologyIcon sx={{ mr: 1.5, fontSize: "3rem" }} />
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                Arogya AI
              </Typography>
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 400, opacity: 0.9 }}>
              Your AI-Powered Health Assistant.
            </Typography>
            <Typography variant="body1" sx={{ mt: 1, opacity: 0.8 }}>
              Upload medical reports and get instant, easy-to-understand
              analysis.
            </Typography>
          </Box>

          {/* 2. Form Side (DARK BACKGROUND) */}
          <Box
            sx={{
              flex: 1,
              p: { xs: 5, sm: 6 }, // Increased padding for airiness
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              // Use the standard dark page background for the form area
              backgroundColor: theme.palette.background.default,
              color: theme.palette.text.primary,
            }}
          >
            {children}
          </Box>
        </Paper>
      </motion.div>
    </Box>
  );
}

export default AuthLayout;
