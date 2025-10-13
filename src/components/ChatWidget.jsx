import { useState, useRef, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Paper,
  Typography,
  TextField,
  IconButton,
  Avatar,
  CircularProgress,
  useTheme, // <-- ADDED: useTheme hook
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import PersonIcon from "@mui/icons-material/Person";
import { motion, AnimatePresence } from "framer-motion";

// Use the API URL from your Vite environment variables
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function ChatWidget({ open, handleClose }) {
  const theme = useTheme(); // <-- Access theme
  const [history, setHistory] = useState([
    {
      role: "model",
      parts: [
        {
          text: "Hello! I'm Arogya AI. How can I help with your general medical questions today?",
        },
      ],
    },
  ]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const newUserMessage = { role: "user", parts: [{ text: userInput }] };
    setHistory((prev) => [...prev, newUserMessage]);
    const currentInput = userInput;
    setUserInput("");
    setIsLoading(true);

    try {
      // Updated to use the correct API endpoint and payload
      const response = await axios.post(`${API_URL}/api/chat/query`, {
        message: currentInput,
      });

      // Updated to handle the correct response structure
      const aiResponse = {
        role: "model",
        parts: [{ text: response.data.reply }],
      };
      setHistory((prev) => [...prev, aiResponse]);
    } catch (err) {
      console.error("ChatWidget error:", err);
      const errorMessageText =
        err.response?.data?.error ||
        "Sorry, I couldn't connect. Please try again.";
      const errorMessage = {
        role: "model",
        parts: [{ text: errorMessageText }],
      };
      setHistory((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  return (
    <AnimatePresence>
      {open && (
        <Paper
          component={motion.div}
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          elevation={8}
          sx={{
            position: "fixed",
            bottom: { xs: 16, md: 32 },
            right: { xs: 16, md: 32 },
            width: { xs: "calc(100% - 32px)", sm: 400 },
            height: { xs: "70vh", sm: "80vh" },
            maxHeight: 600,
            display: "flex",
            flexDirection: "column",
            borderRadius: 4,
            zIndex: 1300,
            overflow: "hidden",
            // Apply Glassmorphism to the entire widget container
            bgcolor: theme.palette.background.paper,
            backdropFilter: "blur(12px) saturate(150%)",
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          {/* Custom Header */}
          <Box
            sx={{
              p: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              bgcolor: theme.palette.primary.main, // Use Primary accent for header
              color: theme.palette.primary.contrastText,
              borderBottom: `1px solid ${theme.palette.divider}`,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              AI Assistant
            </Typography>
            <IconButton
              onClick={handleClose}
              sx={{ color: theme.palette.primary.contrastText }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Chat History */}
          <Box
            sx={{
              flexGrow: 1,
              overflowY: "auto",
              p: 2,
              bgcolor: "transparent", // Use transparent here to show the glass background
            }}
          >
            {history.map((message, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent:
                    message.role === "user" ? "flex-end" : "flex-start",
                  mb: 2,
                }}
              >
                {/* AI Avatar (Secondary Color Accent) */}
                {message.role === "model" && (
                  <Avatar
                    sx={{
                      bgcolor: theme.palette.secondary.main,
                      mr: 1.5,
                      width: 32,
                      height: 32,
                    }}
                  >
                    <SmartToyIcon fontSize="small" />
                  </Avatar>
                )}
                <Paper
                  elevation={0}
                  sx={{
                    p: 1.5,
                    // AI Message: Use Paper background for subtle contrast
                    bgcolor:
                      message.role === "user"
                        ? theme.palette.primary.main // User Message: Primary
                        : theme.palette.background.default, // AI Message: Darker slate background
                    color:
                      message.role === "user"
                        ? theme.palette.primary.contrastText
                        : theme.palette.text.primary,
                    borderRadius:
                      message.role === "user"
                        ? "20px 20px 4px 20px"
                        : "20px 20px 20px 4px",
                    maxWidth: "80%",
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                  }}
                >
                  <Typography variant="body1">
                    {message.parts[0].text}
                  </Typography>
                </Paper>
                {/* User Avatar (Soft/Divider Color) */}
                {message.role === "user" && (
                  <Avatar
                    sx={{
                      bgcolor: theme.palette.divider,
                      ml: 1.5,
                      width: 32,
                      height: 32,
                    }}
                  >
                    <PersonIcon fontSize="small" />
                  </Avatar>
                )}
              </Box>
            ))}
            {isLoading && (
              <CircularProgress
                size={24}
                sx={{
                  display: "block",
                  mx: "auto",
                  my: 2,
                  color: theme.palette.secondary.main, // Secondary accent for loading
                }}
              />
            )}
            <div ref={chatEndRef} />
          </Box>

          {/* Input Form */}
          <Box
            component="form"
            onSubmit={handleSendMessage}
            sx={{
              display: "flex",
              p: 1.5, // Increased padding
              borderTop: 1,
              borderColor: theme.palette.divider,
              bgcolor: theme.palette.background.paper, // Consistent background
            }}
          >
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Ask a question..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              size="small"
              sx={{
                // Style the text field for the dark theme
                "& .MuiOutlinedInput-root": {
                  borderRadius: "20px",
                  bgcolor: theme.palette.background.default, // Dark background inside input
                  color: theme.palette.text.primary,
                  "& fieldset": { borderColor: theme.palette.divider },
                  "&.Mui-focused fieldset": {
                    borderColor: theme.palette.secondary.main,
                  }, // Secondary accent on focus
                  "&:hover fieldset": {
                    borderColor: theme.palette.text.secondary,
                  },
                },
                "& input": { color: theme.palette.text.primary },
              }}
            />
            <IconButton
              type="submit"
              color="primary"
              disabled={isLoading}
              sx={{
                ml: 1,
                bgcolor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                "&:hover": { bgcolor: theme.palette.primary.dark },
              }}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Paper>
      )}
    </AnimatePresence>
  );
}

export default ChatWidget;
