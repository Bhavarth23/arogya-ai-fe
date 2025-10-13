import { Chip, useTheme } from "@mui/material";
import {
  CheckCircle,
  AlertTriangle,
  AlertOctagon,
  HelpCircle,
} from "lucide-react";

// Map status strings to MUI color palette keys and Lucide icons
const getStatusConfig = (theme) => ({
  Normal: {
    label: "Normal",
    Icon: CheckCircle,
    colorKey: "success",
  },
  "Action Needed": {
    label: "Action Needed",
    Icon: AlertTriangle,
    colorKey: "warning",
  }, // 'Urgent' maps to MUI 'error' color for high visibility
  Urgent: {
    label: "Urgent",
    Icon: AlertOctagon,
    colorKey: "error",
  },
  default: {
    label: "Unknown",
    Icon: HelpCircle,
    colorKey: "text.secondary", // Use a soft color for unknown/default
  },
});

function StatusChip({ status }) {
  const theme = useTheme();
  const configMap = getStatusConfig(theme);
  const config = configMap[status] || configMap.default;
  const { label, Icon, colorKey } = config;

  // Helper function to safely retrieve the color (main if object, string if direct color)
  const getColor = (key) => {
    const parts = key.split(".");
    let color = theme.palette;
    for (const part of parts) {
      if (color && color[part]) {
        color = color[part];
      } else {
        return theme.palette.text.secondary;
      }
    }
    return typeof color === "string"
      ? color
      : color.main || theme.palette.text.secondary;
  };

  const accentColor = getColor(colorKey);
  // Create a subtle background tint using the accent color (approx 10% opacity)
  const backgroundColor = `${accentColor}1A`;

  return (
    <Chip
      label={label} // Use the Lucide icon as the standard icon for the Chip
      icon={<Icon size={16} />}
      size="small"
      sx={{
        // Chip Styling for dark glassmorphism theme
        color: accentColor,
        backgroundColor: backgroundColor,
        borderRadius: "16px", // Fully rounded pill shape
        fontWeight: 700,
        height: "24px", // Override default icon styling to ensure correct sizing and color
        "& .MuiChip-icon": {
          color: accentColor, // Ensure icon color matches text
          fontSize: "16px",
          marginLeft: theme.spacing(0.5),
          marginRight: "-4px", // Tighten the spacing
        },
      }}
    />
  );
}

export default StatusChip;
