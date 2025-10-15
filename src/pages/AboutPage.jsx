import { Typography, Box, Paper, Grid, Avatar, useTheme } from "@mui/material";
import { motion } from "framer-motion";

// Import relevant icons
import AnalyticsIcon from "@mui/icons-material/Analytics";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";

const howItWorksSteps = [
  {
    step: "01",
    icon: <UploadFileIcon />,
    title: "Upload Your Report",
    description:
      "Navigate to the dashboard and use the uploader to select a medical report file from your device. We securely accept PDF and common image formats like PNG and JPG.",
    accentColor: "primary",
  },
  {
    step: "02",
    icon: <AnalyticsIcon />,
    title: "Instant AI Analysis",
    description:
      "Our advanced AI processes the document, extracting key medical data and terminology. It then generates a comprehensive, easy-to-understand breakdown of the findings.",
    accentColor: "secondary",
  },
  {
    step: "03",
    icon: <FactCheckIcon />,
    title: "Review Your Results",
    description:
      "Your results are displayed in organized sections, including a main description, a table of key parameters, recommended medications, home remedies, and necessary precautions.",
    accentColor: "warning",
  },
  {
    step: "04",
    icon: <QuestionAnswerIcon />,
    title: "Ask Follow-up Questions",
    description:
      "Use the integrated chat feature on the results page to ask specific questions about your report. The AI will provide answers based on the context of the analyzed document.",
    accentColor: "error",
  },
];

// Reusable component for the step card with a colored side accent
const StepCard = ({ step, icon, title, description, accentColor }) => {
  const theme = useTheme();

  return (
    <Paper
      elevation={0}
      sx={{
        height: "100%",
        p: 0,
        borderRadius: 4,
        overflow: "hidden",
        position: "relative",
        display: "flex",
        transition: "all 0.3s",
        border: `1px solid ${theme.palette.divider}`,
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: `0 8px 20px 0 ${theme.palette[accentColor].main}40`,
          border: `1px solid ${theme.palette[accentColor].main}`,
        },
      }}
    >
      {/* Colored Accent Strip */}
      <Box
        sx={{
          width: 10,
          minWidth: 10,
          bgcolor: theme.palette[accentColor].main,
          flexShrink: 0,
          height: "100%",
        }}
      />

      {/* Content Area */}
      <Box sx={{ p: { xs: 3, md: 4 }, flexGrow: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          {/* Large Step Number (Dimmed) */}
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              color: theme.palette.divider,
              mr: 3,
              lineHeight: 1,
              flexShrink: 0,
            }}
          >
            {step}
          </Typography>

          {/* Title and Icon */}
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Avatar
                sx={{
                  bgcolor: theme.palette[accentColor].main,
                  color: theme.palette.primary.contrastText,
                  mr: 2,
                  width: 32,
                  height: 32,
                  opacity: 0.9,
                }}
              >
                {icon}
              </Avatar>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: theme.palette.text.primary }}
              >
                {title}
              </Typography>
            </Box>

            <Typography
              variant="body2"
              sx={{ color: theme.palette.text.secondary }}
            >
              {description}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

// Reusable SVG for the Step Background (Abstract wave graphic)
const AbstractWaveSVG = ({ color }) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 400 200"
    xmlns="http://www.w3.org/2000/svg"
    style={{ position: "absolute", top: 0, right: 0, opacity: 0.1, zIndex: 0 }}
    preserveAspectRatio="none"
  >
    <path d="M0,150 C100,100 200,180 300,130 L300,0 L0,0 Z" fill={color} />
  </svg>
);

function AboutPage() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        p: { xs: 4, sm: 6, lg: 10 },
        minHeight: "calc(100vh - 72px)",
        color: theme.palette.text.primary,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* --- Hero Section --- */}
        <Box sx={{ textAlign: "center", py: { xs: 4, md: 8 } }}>
          <Typography
            variant="h3"
            component="h1"
            sx={{ fontWeight: 800, mb: 2 }}
          >
            About Arogya{" "}
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
          <Typography
            variant="h6"
            sx={{
              color: theme.palette.text.secondary,
              maxWidth: "700px",
              mx: "auto",
            }}
          >
            Our mission is to empower individuals by making complex medical
            information simple, accessible, and understandable through the power
            of artificial intelligence.
          </Typography>
        </Box>

        {/* --- How It Works Section --- */}
        <Box sx={{ my: { xs: 6, md: 10 } }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              textAlign: "center",
              mb: 6,
              color: theme.palette.text.primary,
            }}
          >
            Simple Steps to Clarity
          </Typography>
          <Grid container spacing={4}>
            {howItWorksSteps.map((step, index) => (
              <Grid item xs={12} md={6} key={index}>
                <StepCard {...step} />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* --- Our Technology Section --- */}
        <Box sx={{ my: { xs: 6, md: 10 } }}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 4 },
              maxWidth: "800px",
              mx: "auto",
              textAlign: "center",
              borderRadius: 4,
              bgcolor: "background.paper",
              border: `1px solid ${theme.palette.divider}`,
              backdropFilter: "blur(10px)",
              transition: "all 0.3s",
              "&:hover": {
                transform: "none",
                boxShadow: "none",
                border: `1px solid ${theme.palette.divider}`,
              },
            }}
          >
            <AbstractWaveSVG color={theme.palette.primary.main} />
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                mb: 1,
                color: theme.palette.text.primary,
                position: "relative",
                zIndex: 1,
              }}
            >
              Powered by Advanced AI
            </Typography>
            <Typography
              variant="body2"
              color={theme.palette.text.secondary}
              sx={{ position: "relative", zIndex: 1 }}
            >
              Arogya AI utilizes state-of-the-art Large Language Models from
              Google to analyze your documents. This technology allows us to
              extract and interpret complex medical data with high accuracy,
              providing you with a summary that is both comprehensive and easy
              to understand. Your data is processed securely, ensuring
              confidentiality and peace of mind.
            </Typography>
          </Paper>
        </Box>

        {/* --- Disclaimer Section --- */}
        <Box sx={{ my: { xs: 6, md: 10 }, textAlign: "center" }}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 4 },
              maxWidth: "800px",
              mx: "auto",
              borderRadius: 4,
              bgcolor: "background.paper",
              border: `1px solid ${theme.palette.warning.main}`,
              backdropFilter: "blur(10px)",
              transition: "all 0.3s",
              "&:hover": {
                transform: "none",
                boxShadow: "none",
                border: `1px solid ${theme.palette.warning.main}`,
              },
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, mb: 1, color: theme.palette.warning.main }}
            >
              Important Disclaimer
            </Typography>
            <Typography variant="body2" color={theme.palette.text.secondary}>
              Arogya AI is an informational tool and is not a substitute for
              professional medical advice, diagnosis, or treatment. Always seek
              the advice of your physician or other qualified health provider
              with any questions you may have regarding a medical condition.
            </Typography>
          </Paper>
        </Box>
      </motion.div>
    </Box>
  );
}

export default AboutPage;
