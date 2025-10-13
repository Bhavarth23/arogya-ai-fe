// src/components/Navbar.jsx
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  useTheme,
} from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

// Import modern icons
import PsychologyIcon from "@mui/icons-material/Psychology";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

function Navbar({ onTutorialOpen }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    delete axios.defaults.headers.common["Authorization"];
    navigate("/login");
  };

  // Styles for navigation links
  const navLinkSx = {
    color: theme.palette.text.secondary,
    fontWeight: 600,
    textTransform: "none",
    fontSize: "1rem",
    padding: theme.spacing(1, 2),
    margin: theme.spacing(0, 1),
    borderRadius: theme.shape.borderRadius,
    transition: "background-color 0.2s ease-in-out, color 0.2s ease-in-out",
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
      color: theme.palette.text.primary,
    },
    "&.active": {
      backgroundColor: theme.palette.action.selected,
      color: theme.palette.primary.main,
    },
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        px: { xs: 2, md: 4 },
      }}
    >
      <Toolbar sx={{ height: "72px", px: 0, justifyContent: "space-between" }}>
        {/* Logo and App Name */}
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <PsychologyIcon
            sx={{
              color: theme.palette.secondary.main,
              mr: 1.5,
              fontSize: "2.5rem",
            }}
          />
          <Typography
            variant="h5"
            component="div"
            sx={{ color: theme.palette.text.primary, fontWeight: 800 }}
          >
            Arogya{" "}
            <Box
              component="span"
              sx={{
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              AI
            </Box>
          </Typography>
        </Box>

        {/* Navigation Links */}
        <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
          <Button component={NavLink} to="/dashboard" sx={navLinkSx}>
            Dashboard
          </Button>
          <Button component={NavLink} to="/history" sx={navLinkSx}>
            Report History
          </Button>
          <Button component={NavLink} to="/about" sx={navLinkSx}>
            About
          </Button>
          <IconButton
            onClick={onTutorialOpen}
            sx={{
              color: theme.palette.secondary.main,
              ml: 2,
              "&:hover": {
                color: theme.palette.secondary.light,
                bgcolor: theme.palette.action.hover,
              },
            }}
          >
            <HelpOutlineIcon />
          </IconButton>
        </Box>

        {/* User Menu */}
        <Box sx={{ ml: 4 }}>
          <IconButton onClick={handleMenuOpen} size="small" sx={{ p: 0 }}>
            <Avatar
              sx={{
                width: 42,
                height: 42,
                bgcolor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                fontWeight: "bold",
                border: `2px solid ${theme.palette.divider}`,
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                "&:hover": {
                  transform: "scale(1.1)",
                  boxShadow: `0 4px 12px ${theme.palette.primary.main}40`,
                },
              }}
            >
              U
            </Avatar>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 4px 12px rgba(0,0,0,0.3))",
                mt: 1.5,
                bgcolor: theme.palette.background.paper,
                backdropFilter: "blur(10px)",
                color: theme.palette.text.primary,
                borderRadius: "12px",
                border: `1px solid ${theme.palette.divider}`,
                "& .MuiMenuItem-root": {
                  "&:hover": {
                    backgroundColor: theme.palette.action.hover,
                  },
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: theme.palette.background.paper,
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                  borderLeft: `1px solid ${theme.palette.divider}`,
                  borderTop: `1px solid ${theme.palette.divider}`,
                },
              },
            }}
          >
            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon>
                <AccountCircleIcon
                  fontSize="small"
                  sx={{ color: theme.palette.text.primary }}
                />
              </ListItemIcon>
              Profile
            </MenuItem>
            <Divider sx={{ borderColor: theme.palette.divider }} />
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" color="error" />
              </ListItemIcon>
              <Typography color="error">Logout</Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
