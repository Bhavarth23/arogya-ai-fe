import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Box,
  Button,
  MobileStepper,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

const steps = [
  {
    label: "Welcome to Arogya AI",
    description: `This is your personal health dashboard. Here, you can get instant insights from your medical reports and ask general health questions.`,
  },
  {
    label: "Analyze a Report",
    description: `To begin, click the "Analyze New Report" card on your dashboard. You'll be taken to a screen where you can upload a PDF or image file of your medical report.`,
  },
  {
    label: "View Your Results",
    description: `After uploading, our AI will analyze your report and present the findings in a clear, easy-to-understand format with collapsible sections.`,
  },
  {
    label: "Ask Follow-up Questions",
    description: `Once you have your results, you can use the "Follow-up Chat" section to ask specific questions about the analyzed report.`,
  },
  {
    label: "Use the General Chat",
    description: `For any general medical questions not related to a specific report, you can always open the floating chat widget using the button in the bottom-right corner of your screen.`,
  },
];

function TutorialWidget({ open, handleClose }) {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = steps.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleFinish = () => {
    setActiveStep(0); // Reset for next time
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          bgcolor: theme.palette.background.paper,
          backdropFilter: "blur(10px)",
          color: theme.palette.text.primary,
          borderRadius: 4,
          border: `1px solid ${theme.palette.divider}`,
        },
      }}
    >
      <DialogTitle
        sx={{
          m: 0,
          p: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>
          How to Use Arogya AI
        </Typography>
        <IconButton aria-label="close" onClick={handleClose} color="inherit">
          <CloseIcon sx={{ color: theme.palette.text.secondary }} />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ px: 0, py: 0, border: "none" }} dividers={false}>
        <Box sx={{ p: 4, minHeight: "150px" }}>
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, mb: 1, color: theme.palette.primary.main }}
          >
            {steps[activeStep].label}
          </Typography>
          <Typography color={theme.palette.text.secondary}>
            {steps[activeStep].description}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions
        sx={{ p: 3, borderTop: `1px solid ${theme.palette.divider}` }}
      >
        {activeStep < maxSteps - 1 ? (
          <MobileStepper
            variant="dots"
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            sx={{
              flexGrow: 1,
              bgcolor: "transparent",
              "& .MuiMobileStepper-dotActive": {
                bgcolor: theme.palette.secondary.main,
              },
              "& .MuiMobileStepper-dot": {
                bgcolor: theme.palette.divider,
              },
            }}
            nextButton={
              <Button
                size="small"
                onClick={handleNext}
                disabled={activeStep === maxSteps - 1}
                color="secondary"
                sx={{ fontWeight: 600 }}
              >
                Next
                {theme.direction === "rtl" ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </Button>
            }
            backButton={
              <Button
                size="small"
                onClick={handleBack}
                disabled={activeStep === 0}
                color="inherit"
                sx={{ color: theme.palette.text.secondary, fontWeight: 600 }}
              >
                {theme.direction === "rtl" ? (
                  <KeyboardArrowRight />
                ) : (
                  <KeyboardArrowLeft />
                )}
                Back
              </Button>
            }
          />
        ) : (
          <Box
            sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-end" }}
          >
            <Button
              onClick={handleFinish}
              variant="contained"
              color="primary"
              size="large"
              sx={{ fontWeight: 700, borderRadius: 2 }}
            >
              Got It! Take Me to the Dashboard
            </Button>
          </Box>
        )}
      </DialogActions>
    </Dialog>
  );
}

export default TutorialWidget;
