// src/theme.js

import { createTheme } from "@mui/material/styles";

// Define the core dark palette colors
const DARK_SLATE = "#151c27"; // Deep indigo/slate for the main background
const DEEP_PAPER = "#1e293b"; // Slightly lighter slate for default Paper/Cards
const PRIMARY_BLUE = "#6366f1"; // A rich, vibrant indigo/violet for primary actions
const ACCENT_CYAN = "#38bdf8"; // Bright cyan for highlights and secondary accents
const LIGHT_TEXT = "#e2e8f0"; // Light grey for primary text
const SOFT_TEXT = "#94a3b8"; // Softer grey for secondary text

export const theme = createTheme({
  palette: {
    mode: "dark", // Crucial: sets up dark mode defaults
    primary: {
      main: PRIMARY_BLUE,
    },
    secondary: {
      main: ACCENT_CYAN,
    },
    background: {
      default: DARK_SLATE, // Deep indigo/slate background
      paper: DEEP_PAPER, // Used for non-glass cards
    },
    text: {
      primary: LIGHT_TEXT,
      secondary: SOFT_TEXT,
    },
    // Keep other colors (success, warning, error) as they are standard
    divider: "#334155", // A dark divider to separate content
  },

  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
      color: LIGHT_TEXT, // Ensure headings are light
    },
    h5: {
      fontWeight: 700,
      color: LIGHT_TEXT,
    },
    h6: {
      fontWeight: 600,
      color: LIGHT_TEXT,
    },
  },

  components: {
    // 1. **THE GLASS EFFECT** on all MuiPaper components (Cards, Modals, etc.)
    MuiPaper: {
      styleOverrides: {
        root: {
          // This creates the semi-transparent "glass" background
          backgroundColor: "rgba(30, 41, 59, 0.4)", // Darker slate with transparency
          backdropFilter: "blur(10px) saturate(150%)", // The essential glass effect
          WebkitBackdropFilter: "blur(10px) saturate(150%)", // For Safari support

          backgroundImage: "none",
          borderRadius: "16px",
          // Refined, subtle dark shadow
          boxShadow:
            "0 8px 32px 0 rgba(0, 0, 0, 0.37), 0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          // Subtle light border for definition
          border: `1px solid rgba(255, 255, 255, 0.1)`,
          transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
        },
      },
    },

    // 2. AppBar (Navbar) Glass Effect
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(21, 28, 39, 0.8)", // Semi-transparent dark slate
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          boxShadow: "none",
          borderBottom: "1px solid #334155", // Dark, subtle border
        },
      },
    },

    // 3. Buttons (Focus on the vibrant primary blue)
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "10px",
          fontWeight: "bold",
          boxShadow: "none",
          paddingTop: "10px",
          paddingBottom: "10px",
          transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
          "&:hover": {
            // Use a deep glow on hover
            boxShadow: `0 0 20px rgba(99, 102, 241, 0.5), 0 4px 15px rgba(0, 0, 0, 0.2)`,
            transform: "translateY(-3px)",
          },
        },
      },
    },

    // 4. Input Fields (Clean, defined look)
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          backgroundColor: DEEP_PAPER, // Solid dark background for inputs
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: PRIMARY_BLUE, // Highlight with primary color on focus
          },
        },
        notchedOutline: {
          borderColor: "#475569", // Subtle border for unfocused state
        },
      },
    },

    // 5. Accordion (For the FAQ section)
    MuiAccordion: {
      styleOverrides: {
        root: {
          // Apply the same glass style as MuiPaper for consistency
          backgroundColor: "rgba(30, 41, 59, 0.4)",
          backdropFilter: "blur(10px) saturate(150%)",
          border: `1px solid rgba(255, 255, 255, 0.05)`,
          borderRadius: "16px",
          boxShadow: "none",
          "&:before": {
            // Remove default accordion divider
            display: "none",
          },
        },
      },
    },
  },
});
