import { useState, useRef, useEffect, useCallback } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import {
  Typography,
  Box,
  Button,
  Paper,
  CircularProgress,
  Alert,
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider,
  TextField,
  IconButton,
  Avatar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tooltip,
  Menu,
  MenuItem,
  ListItemIcon,
  Dialog, // Added for pop-ups
  DialogTitle, // Added for pop-ups
  DialogContent, // Added for pop-ups
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Import Widgets and Components
import LatestReportWidget from "../components/LatestReportWidget";
import StatusChip from "../components/StatusChip";

// Import Icons
import SendIcon from "@mui/icons-material/Send";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DescriptionIcon from "@mui/icons-material/Description";
import HealingIcon from "@mui/icons-material/Healing";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import PersonIcon from "@mui/icons-material/Person";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import ForumIcon from "@mui/icons-material/Forum";
import HistoryIcon from "@mui/icons-material/History";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import InsightsIcon from "@mui/icons-material/Insights";
import PrintIcon from "@mui/icons-material/Print";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import TuneIcon from "@mui/icons-material/Tune"; // Icon for new features button
import CloseIcon from "@mui/icons-material/Close"; // Icon for dialog close button
import ArticleIcon from "@mui/icons-material/Article"; // Icon for report menu item

// --- Helper Components (Unchanged) ---
const HighlightKeywords = ({ text, keywords }) => {
  const theme = useTheme();
  if (!keywords || !text) {
    return (
      <Typography variant="body2" color={theme.palette.text.secondary}>
        {text || "N/A"}
      </Typography>
    );
  }
  const inputText = Array.isArray(text) ? text.join("\n") : text;
  const regex = new RegExp(`(${keywords.join("|")})`, "gi");
  const parts = inputText.split(regex);
  return (
    <Typography
      variant="body2"
      color={theme.palette.text.secondary}
      sx={{ whiteSpace: "pre-wrap" }}
    >
      {parts.map((part, index) =>
        keywords.some(
          (keyword) => keyword.toLowerCase() === part.toLowerCase()
        ) ? (
          <Box
            component="span"
            key={index}
            sx={{ color: theme.palette.secondary.main, fontWeight: "bold" }}
          >
            {part}
          </Box>
        ) : (
          part
        )
      )}
    </Typography>
  );
};
const AnalysisList = ({ items, keywords }) => {
  const theme = useTheme();
  if (!items || !Array.isArray(items) || items.length === 0) {
    return (
      <Typography variant="body2" color={theme.palette.text.secondary}>
        N/A
      </Typography>
    );
  }
  return (
    <List dense sx={{ p: 0, "& .MuiListItem-root": { py: 0.5, px: 0 } }}>
      {items.map((item, index) => (
        <ListItem key={index}>
          <ListItemText
            primaryTypographyProps={{
              variant: "body2",
              color: theme.palette.text.secondary,
            }}
            primary={<HighlightKeywords text={item} keywords={keywords} />}
          />
        </ListItem>
      ))}
    </List>
  );
};
const faqData = [
  {
    question: "What is Arogya AI?",
    answer:
      "Arogya AI is a personal health assistant that uses artificial intelligence to analyze your medical reports. It provides simple summaries, highlights key parameters, and offers general health suggestions to help you better understand your health data.",
  },
  {
    question: "What file formats can I upload?",
    answer:
      "You can upload medical reports in PDF, PNG, or JPG formats. Our system uses advanced Optical Character Recognition (OCR) to extract text from both documents and images.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes. We prioritize your privacy. Your reports are processed securely, and your personal data is handled with the utmost confidentiality. We do not share your data with third parties.",
  },
  {
    question: "Is the AI analysis a medical diagnosis?",
    answer:
      "No, absolutely not. Arogya AI is an informational tool only. The analysis it provides is not a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified doctor for any health concerns.",
  },
];
const FaqWidget = ({ sx }) => {
  const [expanded, setExpanded] = useState(false);
  const theme = useTheme();

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Paper elevation={0} sx={{ ...sx, p: 4 }}>
      <Typography
        variant="h5"
        sx={{ fontWeight: "bold", color: theme.palette.text.primary, mb: 3 }}
      >
        Frequently Asked Questions
      </Typography>
      {faqData.map((faq, index) => (
        <Accordion
          key={index}
          expanded={expanded === `panel${index}`}
          onChange={handleChange(`panel${index}`)}
          disableGutters
          elevation={0}
          sx={{
            background: "transparent",
            color: theme.palette.text.primary,
            "&:before": { display: "none" },
            borderBottom:
              index < faqData.length - 1
                ? `1px solid ${theme.palette.divider}`
                : "none",
          }}
        >
          <AccordionSummary
            expandIcon={
              <ExpandMoreIcon sx={{ color: theme.palette.secondary.main }} />
            }
          >
            <Typography sx={{ fontWeight: 500 }}>{faq.question}</Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{ bgcolor: theme.palette.background.paper, borderRadius: 2 }}
          >
            <Typography variant="body2" color={theme.palette.text.secondary}>
              {faq.answer}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Paper>
  );
};
const HealthTrendWidget = ({ sx }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    const fetchHistoryData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/reports/");
        const chartData = response.data
          .map((report) => {
            let statusValue = 0;
            if (report.status === "Normal") statusValue = 1;
            if (report.status === "Action Needed") statusValue = 2;
            if (report.status === "Urgent") statusValue = 3;
            return {
              date: new Date(report.created_at).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              }),
              Status: statusValue,
            };
          })
          .reverse();
        setData(chartData);
      } catch (error) {
        console.error("Failed to fetch history for chart:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHistoryData();
  }, []);
  return (
    <Paper
      elevation={0}
      sx={{ ...sx, p: 4, display: "flex", flexDirection: "column" }}
    >
      {loading ? (
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "250px",
          }}
        >
          <CircularProgress sx={{ color: theme.palette.secondary.main }} />
        </Box>
      ) : data.length > 1 ? (
        <Box sx={{ flexGrow: 1, width: "100%", height: "250px" }}>
          <ResponsiveContainer>
            <LineChart
              data={data}
              margin={{ top: 5, right: 20, left: -15, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={theme.palette.divider}
              />
              <XAxis
                dataKey="date"
                stroke={theme.palette.text.secondary}
                fontSize={12}
              />
              <YAxis
                stroke={theme.palette.text.secondary}
                fontSize={12}
                domain={[0, 4]}
                ticks={[1, 2, 3]}
                tickFormatter={(value) =>
                  ["Normal", "Action", "Urgent"][value - 1]
                }
              />
              <RechartsTooltip
                contentStyle={{
                  backgroundColor: "rgba(30, 41, 59, 0.9)",
                  borderColor: theme.palette.divider,
                  borderRadius: "8px",
                }}
                labelStyle={{
                  color: theme.palette.text.primary,
                  fontWeight: "bold",
                }}
              />
              <Legend
                wrapperStyle={{
                  color: theme.palette.text.primary,
                  fontSize: "14px",
                }}
              />
              <Line
                type="monotone"
                dataKey="Status"
                stroke={theme.palette.secondary.main}
                strokeWidth={3}
                activeDot={{ r: 6, fill: theme.palette.secondary.main }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      ) : (
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "250px",
          }}
        >
          <Typography color={theme.palette.text.secondary}>
            Not enough data to display a trend. Upload at least two reports.
          </Typography>
        </Box>
      )}
    </Paper>
  );
};
const ActionCard = ({ title, description, icon, onClick }) => {
  const theme = useTheme();

  return (
    <Paper
      onClick={onClick}
      elevation={0}
      sx={{
        p: 4,
        borderRadius: 4,
        height: "100%",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        border: `2px solid ${theme.palette.divider}`,
        transition:
          "transform 0.3s ease, box-shadow 0.3s ease, border 0.3s ease",

        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: `0 0 20px 0 ${theme.palette.primary.main}50, 0 10px 20px 0 rgba(0, 0, 0, 0.4)`,
          backgroundColor: "rgba(99, 102, 241, 0.05)",
          border: `2px solid ${theme.palette.primary.main}`,
        },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Avatar
          sx={{
            bgcolor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            mr: 3,
            boxShadow: `0 0 10px ${theme.palette.primary.main}50`,
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
      <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
        {description}
      </Typography>
    </Paper>
  );
};
const calculateMockWellnessScore = (report) => {
  if (!report) {
    return {
      score: "N/A",
      status: "No Data",
      trend: "Stable",
      TrendIcon: TrendingFlatIcon,
      trendColor: "text.secondary",
    };
  }

  const statusMap = { Normal: 85, "Action Needed": 60, Urgent: 35 };
  const scoreValue = statusMap[report.status] || 50;

  let trend = "Stable";
  let TrendIcon = TrendingFlatIcon;
  let trendColor = "text.secondary";

  if (scoreValue > 75) {
    trend = "Improving";
    TrendIcon = TrendingUpIcon;
    trendColor = "success.main";
  } else if (scoreValue < 50) {
    trend = "Declining";
    TrendIcon = TrendingDownIcon;
    trendColor = "error.main";
  }

  return {
    score: `${scoreValue}%`,
    status: report.status || "Average",
    trend,
    TrendIcon,
    trendColor,
  };
};
const KeyMetricSnapshotWidget = ({ latestReport }) => {
  // The isScoreVisible state has been removed.
  const { score, status, trend, TrendIcon, trendColor } =
    calculateMockWellnessScore(latestReport);

  const scoreCalculationInfo = (
    <>
      <Typography color="inherit" sx={{ fontWeight: "bold", mb: 1 }}>
        Score Calculation
      </Typography>
      <Typography variant="body2" color="inherit" component="div">
        The score is a simplified wellness indicator based on the latest
        report's AI-assessed status:
        <ul style={{ paddingLeft: "20px", margin: "8px 0 0 0" }}>
          <li>
            <b>Normal:</b> 85%
          </li>
          <li>
            <b>Action Needed:</b> 60%
          </li>
          <li>
            <b>Urgent:</b> 35%
          </li>
          <li>
            <b>No Data:</b> N/A
          </li>
        </ul>
      </Typography>
    </>
  );

  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        borderRadius: 4,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "space-between",
        border: (theme) => `2px solid ${theme.palette.secondary.main}`,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: 700, color: "text.primary" }}
        >
          Overall Wellness Score
        </Typography>
        <Tooltip title={scoreCalculationInfo} arrow>
          <IconButton size="small" sx={{ ml: 0.5 }}>
            <HelpOutlineIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          mt: 2,
        }}
      >
        {/* --- MODIFIED PART --- */}
        <Typography
          variant="h3"
          sx={{
            fontWeight: 900,
            color: "secondary.main",
            lineHeight: 1,
          }}
        >
          {score}
        </Typography>
        {/* --- END MODIFIED PART --- */}

        <Box sx={{ textAlign: "right" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              color: trendColor,
            }}
          >
            <TrendIcon sx={{ fontSize: 20, mr: 0.5 }} />
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {trend}
            </Typography>
          </Box>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            Based on latest report status.
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

// --- Main Dashboard Page Component ---
function DashboardPage() {
  const theme = useTheme();
  const [view, setView] = useState("dashboard");
  const navigate = useNavigate();

  // State for controlling which pop-up dialog is open
  const [openDialog, setOpenDialog] = useState(null);

  // State for the features menu itself
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const [selectedFile, setSelectedFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [expandedAccordion, setExpandedAccordion] = useState("panel0");
  const [extractedText, setExtractedText] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);
  const chatEndRef = useRef(null);
  const [latestReport, setLatestReport] = useState(null);
  const [isWidgetLoading, setIsWidgetLoading] = useState(true);

  const medicalKeywords = [
    "anemia",
    "low hemoglobin",
    "infection",
    "leukocytes",
    "platelet",
    "glucose",
    "diabetes",
    "fever",
    "cough",
  ];

  const fetchLatestReport = useCallback(async () => {
    setIsWidgetLoading(true);
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/reports/");
      if (response.data && response.data.length > 0) {
        setLatestReport(response.data[0]);
      } else {
        setLatestReport(null);
      }
    } catch (err) {
      console.error("Failed to fetch latest report:", err);
    } finally {
      setIsWidgetLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLatestReport();
  }, [fetchLatestReport]);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setSelectedFile(acceptedFiles[0]);
      setAnalysis(null);
      setError("");
      setChatHistory([]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/jpeg": [], "image/png": [], "application/pdf": [] },
    multiple: false,
  });

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select a file first.");
      return;
    }
    setIsLoading(true);
    setError("");
    setAnalysis(null);
    setChatHistory([]);
    setExpandedAccordion("panel0");
    const formData = new FormData();
    formData.append("report_file", selectedFile);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/reports/upload/",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setAnalysis(response.data);
      setExtractedText(response.data.extracted_text);
      fetchLatestReport();
    } catch (err) {
      setError(err.response?.data?.error || "Upload failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;
    const newUserMessage = { role: "user", parts: [{ text: userInput }] };
    const newHistory = [...chatHistory, newUserMessage];
    setChatHistory(newHistory);
    setUserInput("");
    setIsChatLoading(true);
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/chat/", {
        report_text: extractedText,
        history: newHistory,
      });
      const aiMessage = {
        role: "model",
        parts: [{ text: response.data.response }],
      };
      setChatHistory((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error("Follow-up chat error:", err);
      const errorMessage = {
        role: "model",
        parts: [{ text: "Sorry, I encountered an error. Please try again." }],
      };
      setChatHistory((prev) => [...prev, errorMessage]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpandedAccordion(isExpanded ? panel : false);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  const handlePrint = () => {
    window.print();
  };

  // Handlers for the features menu
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleDialogOpen = (dialogName) => {
    setOpenDialog(dialogName);
    handleMenuClose();
  };
  const handleDialogClose = () => {
    setOpenDialog(null);
  };

  const analysisSections = [
    {
      panel: "panel0",
      title: "Description",
      Icon: DescriptionIcon,
      content: (
        <HighlightKeywords
          text={analysis?.description}
          keywords={medicalKeywords}
        />
      ),
    },
    {
      panel: "panel1",
      title: "Medicine Recommendation",
      Icon: HealingIcon,
      content: (
        <AnalysisList
          items={analysis?.medicine_recommendation}
          keywords={medicalKeywords}
        />
      ),
    },
    {
      panel: "panel2",
      title: "Home Remedies",
      Icon: HealthAndSafetyIcon,
      content: (
        <AnalysisList
          items={analysis?.home_remedies}
          keywords={medicalKeywords}
        />
      ),
    },
    {
      panel: "panel3",
      title: "Precautions",
      Icon: ReportProblemIcon,
      content: (
        <AnalysisList
          items={analysis?.precautions}
          keywords={medicalKeywords}
        />
      ),
    },
  ];

  const pageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  const openChatWidget = () => {
    window.dispatchEvent(new CustomEvent("openChatWidget"));
  };

  return (
    <Box
      sx={{
        p: { xs: 4, sm: 6, lg: 10 },
        minHeight: "calc(100vh - 72px)",
        color: "text.primary",
      }}
    >
      <AnimatePresence mode="wait">
        {view === "dashboard" ? (
          <motion.div
            key="dashboard"
            variants={pageVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* --- HEADER WITH FEATURES POPOVER --- */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography
                variant="h3"
                component="h1"
                gutterBottom
                sx={{ fontWeight: 800, color: "text.primary", mb: 0 }}
              >
                Welcome to Arogya{" "}
                <Box
                  component="span"
                  sx={{
                    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    lineHeight: 1,
                  }}
                >
                  AI
                </Box>
              </Typography>
              <Tooltip title="Dashboard Features">
                <IconButton
                  id="features-button"
                  aria-controls={isMenuOpen ? "features-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={isMenuOpen ? "true" : undefined}
                  onClick={handleMenuClick}
                  sx={{
                    bgcolor: "primary.main",
                    color: "primary.contrastText",
                    "&:hover": { bgcolor: "primary.dark" },
                  }}
                >
                  <TuneIcon />
                </IconButton>
              </Tooltip>
              <Menu
                id="features-menu"
                anchorEl={anchorEl}
                open={isMenuOpen}
                onClose={handleMenuClose}
                MenuListProps={{ "aria-labelledby": "features-button" }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem onClick={() => handleDialogOpen("wellness")}>
                  <ListItemIcon>
                    <HealthAndSafetyIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Wellness Score Checker</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => handleDialogOpen("report")}>
                  <ListItemIcon>
                    <ArticleIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Latest Report</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => handleDialogOpen("trend")}>
                  <ListItemIcon>
                    <TrendingUpIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Health Trend</ListItemText>
                </MenuItem>
              </Menu>
            </Box>

            <Typography
              color="text.secondary"
              sx={{ mb: 4, fontSize: "1.1rem" }}
            >
              Your personal AI-powered health assistant.
            </Typography>

            {/* --- KEY ACTIONS GRID --- */}
            <Grid container spacing={4} sx={{ mb: 4 }}>
              <Grid item xs={12} sm={6} lg={4}>
                <ActionCard
                  title="Analyze Report"
                  description="Upload a medical report to get an instant AI analysis."
                  icon={<AnalyticsIcon />}
                  onClick={() => setView("analyzer")}
                />
              </Grid>
              <Grid item xs={12} sm={6} lg={4}>
                <ActionCard
                  title="View History"
                  description="Browse and manage all of your past report analyses."
                  icon={<HistoryIcon />}
                  onClick={() => navigate("/history")}
                />
              </Grid>
              <Grid item xs={12} sm={12} lg={4}>
                <ActionCard
                  title="General Chat"
                  description="Ask our AI assistant any general medical questions."
                  icon={<ForumIcon />}
                  onClick={openChatWidget}
                />
              </Grid>
            </Grid>

            {/* --- FAQ WIDGET (Now takes full width) --- */}
            <FaqWidget />

            {/* --- DIALOGS FOR FEATURES --- */}
            <Dialog
              open={openDialog === "wellness"}
              onClose={handleDialogClose}
              fullWidth
              maxWidth="sm"
            >
              <DialogTitle>
                Wellness Score{" "}
                <IconButton
                  aria-label="close"
                  onClick={handleDialogClose}
                  sx={{ position: "absolute", right: 8, top: 8 }}
                >
                  <CloseIcon />
                </IconButton>
              </DialogTitle>
              <DialogContent>
                <KeyMetricSnapshotWidget latestReport={latestReport} />
              </DialogContent>
            </Dialog>

            <Dialog
              open={openDialog === "report"}
              onClose={handleDialogClose}
              fullWidth
              maxWidth="md"
            >
              <DialogTitle>
                Latest Report{" "}
                <IconButton
                  aria-label="close"
                  onClick={handleDialogClose}
                  sx={{ position: "absolute", right: 8, top: 8 }}
                >
                  <CloseIcon />
                </IconButton>
              </DialogTitle>
              <DialogContent sx={{ pt: "20px !important" }}>
                {isWidgetLoading ? (
                  <CircularProgress />
                ) : (
                  <LatestReportWidget report={latestReport} />
                )}
              </DialogContent>
            </Dialog>

            <Dialog
              open={openDialog === "trend"}
              onClose={handleDialogClose}
              fullWidth
              maxWidth="lg"
            >
              <DialogTitle>
                Health Trend{" "}
                <IconButton
                  aria-label="close"
                  onClick={handleDialogClose}
                  sx={{ position: "absolute", right: 8, top: 8 }}
                >
                  <CloseIcon />
                </IconButton>
              </DialogTitle>
              <DialogContent>
                <HealthTrendWidget />
              </DialogContent>
            </Dialog>
          </motion.div>
        ) : (
          /* --- THE REPORT ANALYZER VIEW (Unchanged) --- */
          <motion.div
            key="analyzer"
            variants={pageVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={() => setView("dashboard")}
              color="secondary"
              variant="outlined"
              sx={{
                mb: 6,
                borderColor: "secondary.main",
                color: "secondary.main",
                transition: "all 0.3s",
                "&:hover": {
                  bgcolor: "rgba(56, 189, 248, 0.1)",
                  borderColor: "secondary.main",
                },
              }}
            >
              Back to Dashboard
            </Button>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Paper elevation={0} sx={{ p: { xs: 4, sm: 6 }, mb: 4 }}>
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ fontWeight: 700, color: "text.primary", mb: 3 }}
                  >
                    Upload Your Medical Report
                  </Typography>
                  <Box
                    {...getRootProps()}
                    sx={{
                      p: 6,
                      mt: 2,
                      border: (theme) =>
                        `2px dashed ${
                          isDragActive
                            ? theme.palette.secondary.main
                            : theme.palette.divider
                        }`,
                      borderRadius: 3,
                      textAlign: "center",
                      cursor: "pointer",
                      backgroundColor: isDragActive
                        ? "rgba(56, 189, 248, 0.05)"
                        : "transparent",
                      transition: "all 0.3s",
                    }}
                  >
                    <input {...getInputProps()} />
                    <UploadFileIcon
                      sx={{ fontSize: 56, color: "secondary.main", mb: 2 }}
                    />
                    <Typography color="text.secondary">
                      Drag & drop, or{" "}
                      <Box
                        component="span"
                        sx={{ color: "secondary.light", fontWeight: "bold" }}
                      >
                        click to browse
                      </Box>
                    </Typography>
                  </Box>
                  {selectedFile && (
                    <Typography
                      sx={{
                        mt: 2,
                        fontStyle: "italic",
                        color: "text.secondary",
                      }}
                    >
                      Selected: {selectedFile.name}
                    </Typography>
                  )}
                  <Button
                    variant="contained"
                    onClick={handleUpload}
                    disabled={!selectedFile || isLoading}
                    sx={{
                      width: "100%",
                      mt: 4,
                      py: 1.5,
                      fontWeight: "bold",
                      fontSize: "1.1rem",
                    }}
                  >
                    {isLoading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      "Analyze Report"
                    )}
                  </Button>
                </Paper>
                {error && (
                  <Alert severity="error" sx={{ mb: 4, borderRadius: 3 }}>
                    {error}
                  </Alert>
                )}
                {analysis && (
                  <>
                    <div id="printable-analysis">
                      <Paper
                        elevation={0}
                        sx={{ color: "text.primary", mb: 4 }}
                      >
                        <Box
                          sx={{
                            p: 3,
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            borderBottom: 1,
                            borderColor: "divider",
                            flexWrap: "wrap",
                          }}
                        >
                          <Typography
                            variant="h6"
                            sx={{ fontWeight: 700, mb: { xs: 2, sm: 0 } }}
                          >
                            {" "}
                            AI Analysis Results{" "}
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              gap: 2,
                              alignItems: "center",
                            }}
                            className="no-print"
                          >
                            <StatusChip status={analysis.status} />
                            <Button
                              onClick={handlePrint}
                              variant="contained"
                              color="secondary"
                              size="small"
                              startIcon={<PrintIcon />}
                              sx={{ fontWeight: 700, borderRadius: 2 }}
                            >
                              {" "}
                              Print / Export{" "}
                            </Button>
                          </Box>
                        </Box>
                        <Box
                          className="print-only"
                          sx={{ p: 3, textAlign: "center" }}
                        >
                          <Typography
                            variant="h5"
                            sx={{
                              fontWeight: 700,
                              color: "text.primary",
                              mb: 1,
                            }}
                          >
                            Arogya AI Medical Analysis
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ color: "text.secondary" }}
                          >
                            Report Date: {new Date().toLocaleDateString()}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ color: "text.secondary", mt: 0.5 }}
                          >
                            Generated for Physician Review (Non-Diagnostic)
                          </Typography>
                        </Box>
                        {analysisSections.map((section, index) => (
                          <Accordion
                            key={section.panel}
                            expanded={expandedAccordion === section.panel}
                            onChange={handleAccordionChange(section.panel)}
                            disableGutters
                            elevation={0}
                            sx={{
                              background: "transparent",
                              color: "text.primary",
                              "&:before": { display: "none" },
                              borderBottom:
                                index < analysisSections.length - 1
                                  ? `1px solid ${theme.palette.divider}`
                                  : "none",
                            }}
                          >
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon color="primary" />}
                            >
                              <section.Icon
                                sx={{ mr: 2, color: "secondary.main" }}
                              />
                              <Typography sx={{ fontWeight: 500 }}>
                                {section.title}
                              </Typography>
                            </AccordionSummary>
                            <AccordionDetails
                              sx={{ bgcolor: "background.paper" }}
                            >
                              {section.content}
                            </AccordionDetails>
                          </Accordion>
                        ))}
                      </Paper>
                    </div>
                    <Paper
                      className="no-print"
                      sx={{ color: "text.primary", mt: 4 }}
                    >
                      <Box
                        sx={{
                          p: 3,
                          bgcolor: "background.paper",
                          borderTop: 1,
                          borderColor: "divider",
                          borderRadius: 4,
                        }}
                      >
                        <Typography
                          variant="h6"
                          gutterBottom
                          sx={{ fontWeight: 700 }}
                        >
                          {" "}
                          Follow-up Chat{" "}
                        </Typography>
                        <Box
                          sx={{
                            minHeight: "150px",
                            maxHeight: "300px",
                            overflowY: "auto",
                            mb: 2,
                            p: 2,
                            borderRadius: 2,
                            bgcolor: "background.default",
                          }}
                        >
                          {chatHistory.length === 0 && (
                            <Box
                              sx={{
                                display: "flex",
                                height: "100%",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Typography color="text.secondary">
                                {" "}
                                Ask a follow-up question.{" "}
                              </Typography>
                            </Box>
                          )}
                          {chatHistory.map((message, index) => (
                            <Box
                              key={index}
                              sx={{
                                display: "flex",
                                justifyContent:
                                  message.role === "user"
                                    ? "flex-end"
                                    : "flex-start",
                                mb: 2,
                              }}
                            >
                              {message.role === "model" && (
                                <Avatar
                                  sx={{
                                    bgcolor: "secondary.main",
                                    width: 32,
                                    height: 32,
                                    mr: 1.5,
                                  }}
                                >
                                  {" "}
                                  <SmartToyIcon fontSize="small" />{" "}
                                </Avatar>
                              )}
                              <Paper
                                elevation={0}
                                sx={{
                                  p: 1.5,
                                  bgcolor:
                                    message.role === "user"
                                      ? "primary.main"
                                      : "background.default",
                                  color:
                                    message.role === "user"
                                      ? "primary.contrastText"
                                      : "text.primary",
                                  borderRadius:
                                    message.role === "user"
                                      ? "20px 20px 4px 20px"
                                      : "20px 20px 20px 4px",
                                  maxWidth: "80%",
                                  wordBreak: "break-word",
                                }}
                              >
                                <Typography variant="body2" component="div">
                                  <ReactMarkdown>
                                    {message.parts[0].text}
                                  </ReactMarkdown>
                                </Typography>
                              </Paper>
                              {message.role === "user" && (
                                <Avatar
                                  sx={{
                                    bgcolor: "divider",
                                    width: 32,
                                    height: 32,
                                    ml: 1.5,
                                  }}
                                >
                                  {" "}
                                  <PersonIcon fontSize="small" />{" "}
                                </Avatar>
                              )}
                            </Box>
                          ))}
                          {isChatLoading && (
                            <CircularProgress
                              size={24}
                              sx={{
                                display: "block",
                                mx: "auto",
                                color: "secondary.main",
                              }}
                            />
                          )}
                          <div ref={chatEndRef} />
                        </Box>
                        <Box
                          component="form"
                          onSubmit={handleSendMessage}
                          sx={{ display: "flex", gap: 1 }}
                        >
                          <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Ask a follow-up question..."
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            size="small"
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                bgcolor: "background.default",
                                borderRadius: "20px",
                                "& fieldset": { borderColor: "divider" },
                                "&:hover fieldset": {
                                  borderColor: "text.secondary",
                                },
                                "&.Mui-focused fieldset": {
                                  borderColor: "primary.main",
                                },
                                "& input": { color: "text.primary" },
                              },
                            }}
                          />
                          <IconButton
                            type="submit"
                            color="primary"
                            disabled={isChatLoading}
                            sx={{
                              flexShrink: 0,
                              bgcolor: "primary.main",
                              "&:hover": { bgcolor: "primary.dark" },
                            }}
                          >
                            <SendIcon />
                          </IconButton>
                        </Box>
                      </Box>
                    </Paper>
                  </>
                )}
              </Grid>
            </Grid>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
}

export default DashboardPage;
