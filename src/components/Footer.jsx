// src/components/Footer.jsx
import {
  Box,
  Typography,
  Link as MuiLink,
  Grid,
  IconButton,
  Divider,
  useTheme, // <-- ADDED: useTheme hook
} from "@mui/material";
import { Link } from "react-router-dom";

// Import Icons
import PsychologyIcon from "@mui/icons-material/Psychology";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

function Footer() {
  const theme = useTheme(); // <-- Access theme

  // Removed local glassmorphismStyle object, applying directly using theme colors
  const socialIconSx = {
    color: theme.palette.text.secondary, // Use theme soft text color
    transition: "color 0.2s ease-in-out, transform 0.2s ease-in-out",
    "&:hover": {
      color: theme.palette.secondary.main, // Use Secondary accent color on hover
      transform: "scale(1.2)",
    },
  };

  const linkSx = {
    display: "block",
    mb: 1,
    textDecoration: "none",
    color: theme.palette.text.secondary, // Use theme soft text color
    "&:hover": { color: theme.palette.text.primary }, // Use theme primary text color on hover
  };

  return (
    <Box
      component="footer"
      sx={{
        // RE-APPLYING Glassmorphism styles using theme colors
        background: theme.palette.background.paper, // Use theme paper for semi-transparent background
        backdropFilter: "blur(10px)",
        borderTop: `1px solid ${theme.palette.divider}`, // Use theme divider color
        p: { xs: 6, md: 8 }, // Increased padding for an airy feel (p-6 md:p-8)
        mt: "auto", // Pushes the footer to the bottom
      }}
    >
      <Box sx={{ maxWidth: "1200px", mx: "auto" }}>
        <Grid container spacing={4} justifyContent="space-between">
          {/* Branding Section */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <PsychologyIcon
                sx={{
                  color: theme.palette.secondary.main,
                  mr: 1.5,
                  fontSize: "2.5rem",
                }} // Secondary accent color
              />
              <Typography
                variant="h5"
                component="div"
                sx={{
                  color: theme.palette.text.primary,
                  fontWeight: 800,
                }} // Primary text, heavy weight
              >
                Arogya{" "}
                <Box
                  component="span"
                  sx={{
                    // Gradient using theme colors
                    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  AI
                </Box>
              </Typography>
            </Box>
            <Typography variant="body2" color={theme.palette.text.secondary}>
              Your personal AI-powered health assistant. Get instant analysis of
              your medical reports.
            </Typography>
          </Grid>

          {/* Product Links Section (Retained structure) */}
          <Grid item xs={6} sm={3} md={2}>
            <Typography
              variant="h6"
              sx={{
                color: theme.palette.text.primary,
                fontWeight: "bold",
                mb: 2,
              }}
            >
              Product
            </Typography>
            <MuiLink component={Link} to="/dashboard" sx={linkSx}>
              Dashboard
            </MuiLink>
            <MuiLink component={Link} to="/history" sx={linkSx}>
              History
            </MuiLink>
          </Grid>

          {/* Company Links Section */}
          <Grid item xs={6} sm={3} md={2}>
            <Typography
              variant="h6"
              sx={{
                color: theme.palette.text.primary,
                fontWeight: "bold",
                mb: 2,
              }}
            >
              Company
            </Typography>
            <MuiLink component={Link} to="/about" sx={linkSx}>
              About Us
            </MuiLink>
            <MuiLink href="#" sx={linkSx}>
              Careers
            </MuiLink>
            <MuiLink href="#" sx={linkSx}>
              Contact
            </MuiLink>
          </Grid>

          {/* Resources Section */}
          <Grid item xs={6} sm={3} md={2}>
            <Typography
              variant="h6"
              sx={{
                color: theme.palette.text.primary,
                fontWeight: "bold",
                mb: 2,
              }}
            >
              Resources
            </Typography>
            <MuiLink href="#" sx={linkSx}>
              Blog
            </MuiLink>
            <MuiLink href="#" sx={linkSx}>
              FAQ
            </MuiLink>
          </Grid>

          {/* Legal Section */}
          <Grid item xs={6} sm={3} md={2}>
            <Typography
              variant="h6"
              sx={{
                color: theme.palette.text.primary,
                fontWeight: "bold",
                mb: 2,
              }}
            >
              Legal
            </Typography>
            <MuiLink href="#" sx={linkSx}>
              Privacy Policy
            </MuiLink>
            <MuiLink href="#" sx={linkSx}>
              Terms of Service
            </MuiLink>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: theme.palette.divider }} />

        {/* Bottom Bar: Copyright and Socials */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
          }}
        >
          <Typography
            variant="body2"
            sx={{ color: theme.palette.text.secondary }} // Use soft text color
          >
            &copy; {new Date().getFullYear()} **Arogya AI**. All Rights
            Reserved.
          </Typography>
          <Box>
            <IconButton href="#" sx={socialIconSx}>
              <TwitterIcon />
            </IconButton>
            <IconButton href="#" sx={socialIconSx}>
              <GitHubIcon />
            </IconButton>
            <IconButton href="#" sx={socialIconSx}>
              <LinkedInIcon />
            </IconButton>
          </Box>
        </Box>

        <Typography
          variant="caption"
          sx={{
            textAlign: "center",
            color: theme.palette.text.secondary,
            opacity: 0.6, // Dim the disclaimer slightly
            display: "block",
            mt: 4, // Increased margin top
          }}
        >
          **Disclaimer:** This is not a substitute for professional medical
          advice. Always consult with a qualified healthcare provider for any
          health concerns.
        </Typography>
      </Box>
    </Box>
  );
}

export default Footer;
