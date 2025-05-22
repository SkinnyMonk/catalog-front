import React, { memo } from "react";
import { Box, Typography } from "@mui/material";
function SummaryTab() {
  return (
    <div>
      <Box sx={{ marginLeft: "60px", width: "80%" }}>
        <Typography variant="h5" sx={{ mb: 2, color: "#1A243A" }}>
          Stock Summary
        </Typography>
        <Typography sx={{ color: "#6F7177", mb: 1 }}>
          <b>Symbol:</b> APPL
        </Typography>
        <Typography sx={{ color: "#6F7177", mb: 1 }}>
          <b>Market Cap:</b> $1.2T
        </Typography>
        <Typography sx={{ color: "#6F7177", mb: 1 }}>
          <b>Open:</b> 62,000.00
        </Typography>
        <Typography sx={{ color: "#6F7177", mb: 1 }}>
          <b>Previous Close:</b> 61,500.00
        </Typography>
        <Typography sx={{ color: "#6F7177", mb: 1 }}>
          <b>Day Range:</b> 61,000.00 - 63,500.00
        </Typography>
        <Typography sx={{ color: "#6F7177", mb: 1 }}>
          <b>52 Week Range:</b> 16,000.00 - 68,000.00
        </Typography>
        <Typography sx={{ color: "#6F7177", mb: 1 }}>
          <b>Volume:</b> 1,200,000
        </Typography>
      </Box>
    </div>
  );
}

export default memo(SummaryTab);
