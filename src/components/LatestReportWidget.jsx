// src/components/LatestReportWidget.jsx
import { Link } from "react-router-dom";
import StatusChip from "./StatusChip";
import { FileText, ArrowRight } from "lucide-react";
import { Paper, Typography, Box, Button, useTheme } from "@mui/material"; // Added useTheme

// The widget now accepts a 'report' prop and an 'sx' prop for styling from the parent
function LatestReportWidget({ report, sx }) {
  const theme = useTheme();

  // A professional "empty state" for when no report is found
  if (!report) {
    return (
      <Paper
        elevation={0}
        sx={{
          ...sx, // Apply the glassmorphism style (from MuiPaper global override)
          p: 4, // Increased padding for airiness (p-4)
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "200px",
          // Add a subtle border accent to the empty state
          border: `2px dashed ${theme.palette.divider}`,
        }}
      >
        <FileText
          size={56} // Larger icon size
          color={theme.palette.text.secondary} // Use soft text color
          style={{ marginBottom: theme.spacing(2) }}
        />
        <Typography
          variant="h6"
          sx={{
            color: theme.palette.text.primary,
            fontWeight: "bold",
            mb: 0.5,
          }} // mb-0.5
        >
          No Reports Found
        </Typography>
        <Typography
          sx={{ color: theme.palette.text.secondary, mb: 1 }} // Use theme secondary text color
        >
          Upload your first report to see a summary here.
        </Typography>
        {/* Optional: Add a call-to-action button for a modern empty state */}
        <Button
          variant="outlined"
          size="small"
          sx={{
            mt: 2,
            color: theme.palette.secondary.main,
            borderColor: theme.palette.secondary.main,
          }}
        >
          Start Analysis
        </Button>
      </Paper>
    );
  }

  // Safely get the summary and map the status
  const summaryPreview = report.ai_description
    ? report.ai_description.split("\n")[0]
    : "No description available.";

  // Ensure "High Risk" maps to "Urgent" or is handled correctly
  const displayStatus =
    report.status === "High Risk" ? "Urgent" : report.status;

  return (
    <Paper
      elevation={0}
      sx={{
        ...sx,
        p: 4, // p-4
        display: "flex",
        flexDirection: "column",
        height: "100%",
        borderRadius: 4, // rounded-xl
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 3, // Increased margin bottom
            borderBottom: `1px solid ${theme.palette.divider}`,
            pb: 1.5,
          }}
        >
          <Box>
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, color: theme.palette.text.primary }} // font-bold
            >
              Your Latest Report
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: theme.palette.text.secondary }} // Use theme secondary text color
            >
              {new Date(report.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Typography>
          </Box>
          {/* StatusChip remains outside, using theme colors based on its status logic */}
          <StatusChip status={displayStatus} />
        </Box>
        <Typography
          variant="body2"
          sx={{
            color: theme.palette.text.primary, // Primary text color for high contrast reading
            mb: 4, // Increased margin bottom
            opacity: 0.9, // Slight opacity adjustment for depth
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          **Summary:** {summaryPreview}
        </Typography>
      </Box>
      <Button
        component={Link}
        to={`/history/${report.id}`} // Assuming you have a detailed view route
        variant="contained"
        size="large" // Larger button for clear action
        color="secondary" // Use secondary (Cyan) accent for this button
        endIcon={<ArrowRight size={18} />} // Larger icon
        sx={{
          alignSelf: "flex-start",
          fontWeight: 700,
          borderRadius: 2, // rounded-md
          mt: 1, // margin top
        }}
      >
        View Full Analysis
      </Button>
    </Paper>
  );
}

export default LatestReportWidget;
