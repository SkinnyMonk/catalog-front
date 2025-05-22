import React, { memo } from "react";
import { Box, Typography } from "@mui/material";

function StatisticsTab() {
  return (
    <div>
      <Box sx={{ marginLeft: "60px", width: "80%" }}>
        <Typography variant="h5" sx={{ mb: 2, color: "#1A243A" }}>
          Key Statistics
        </Typography>
        <Typography sx={{ color: "#6F7177", mb: 1 }}>
          <b>Market Cap:</b> $1.2T
        </Typography>
        <Typography sx={{ color: "#6F7177", mb: 1 }}>
          <b>P/E Ratio (TTM):</b> 18.5
        </Typography>
        <Typography sx={{ color: "#6F7177", mb: 1 }}>
          <b>EPS (TTM):</b> 3.25
        </Typography>
        <Typography sx={{ color: "#6F7177", mb: 1 }}>
          <b>Shares Outstanding:</b> 19,000,000
        </Typography>
        <Typography sx={{ color: "#6F7177", mb: 1 }}>
          <b>Dividend Yield:</b> 0.00%
        </Typography>
        <Typography sx={{ color: "#6F7177", mb: 1 }}>
          <b>Beta:</b> 1.2
        </Typography>
        <Typography sx={{ color: "#6F7177", mb: 1 }}>
          <b>Average Volume:</b> 1,000,000
        </Typography>
      </Box>
    </div>
  );
}

export default memo(StatisticsTab);
