import { Box, Typography } from "@mui/material";

function AnalysisTab() {
  return (
    <div>
      <Box sx={{ marginLeft: "60px", width: "80%" }}>
        <Typography variant="h5" sx={{ mb: 2, color: "#1A243A" }}>
          Analyst Analysis
        </Typography>
        <Typography sx={{ color: "#6F7177", mb: 1 }}>
          <b>Analyst Recommendation:</b> Buy
        </Typography>
        <Typography sx={{ color: "#6F7177", mb: 1 }}>
          <b>Target Price:</b> $70,000.00
        </Typography>
        <Typography sx={{ color: "#6F7177", mb: 1 }}>
          <b>Sentiment:</b> Positive
        </Typography>
        <Typography sx={{ color: "#6F7177", mb: 1 }}>
          <b>Recent News:</b> Bitcoin continues to show strength as
          institutional adoption increases.
        </Typography>
        <Typography sx={{ color: "#6F7177", mb: 1 }}>
          <b>Technical Outlook:</b> Uptrend with strong support at $60,000.
        </Typography>
      </Box>
    </div>
  );
}

export default AnalysisTab;
