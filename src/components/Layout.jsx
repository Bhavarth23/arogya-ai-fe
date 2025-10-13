import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Box, Fab, CssBaseline, useTheme } from "@mui/material"; // ADDED: useTheme
import ChatIcon from "@mui/icons-material/Chat";
import Navbar from "./Navbar";
import ChatWidget from "./ChatWidget";
import Footer from "./Footer";
import TutorialWidget from "./TutorialWidget";
import AnimatedBackground from "./AnimatedBackground"; // <-- ADDED: Animated Background
import { motion, AnimatePresence } from "framer-motion";

function Layout() {
  const theme = useTheme(); // <-- Use theme hook
  const location = useLocation();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);

  // This listener allows other components (like Dashboard) to open the chat widget
  useEffect(() => {
    const handleOpenChat = () => setIsChatOpen(true);
    window.addEventListener("openChatWidget", handleOpenChat);
    return () => {
      window.removeEventListener("openChatWidget", handleOpenChat);
    };
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      <CssBaseline />

      {/* --- 1. ANIMATED BACKGROUND --- */}
      <AnimatedBackground />

      {/* 2. NAVBAR */}
      <Navbar onTutorialOpen={() => setIsTutorialOpen(true)} />

      {/* 3. MAIN CONTENT AREA */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 0,
          position: "relative", // Ensures content is above the background
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </Box>

      {/* 4. FOOTER */}
      <Footer />

      {/* --- 5. FLOATING CHAT BUTTON (Styled for Theme) --- */}
      <Fab
        color="primary"
        aria-label="chat"
        sx={{
          position: "fixed",
          bottom: 32,
          right: 32,
          zIndex: 1100, // Above content, below modals
          transform: isChatOpen ? "scale(0)" : "scale(1)",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
          // Apply theme styling for polished look
          bgcolor: theme.palette.secondary.main, // Use Secondary accent color
          "&:hover": {
            bgcolor: theme.palette.secondary.dark,
            boxShadow: `0 4px 12px ${theme.palette.secondary.main}60`,
          },
        }}
        onClick={() => setIsChatOpen(true)}
      >
        <ChatIcon />
      </Fab>

      {/* 6. WIDGETS */}
      <ChatWidget open={isChatOpen} handleClose={() => setIsChatOpen(false)} />
      <TutorialWidget
        open={isTutorialOpen}
        handleClose={() => setIsTutorialOpen(false)}
      />
    </Box>
  );
}

export default Layout;
