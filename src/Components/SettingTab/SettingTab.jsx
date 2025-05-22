import { Box, Typography } from "@mui/material";

function SettingTab() {
  return (
    <div>
      <Box sx={{ marginLeft: "60px", width: "80%" }}>
        <Typography variant="h5" sx={{ mb: 2, color: "#1A243A" }}>
          Chart Settings
        </Typography>
        <Typography sx={{ color: "#6F7177", mb: 1 }}>
          <b>Theme:</b> Light / Dark
        </Typography>
        <Typography sx={{ color: "#6F7177", mb: 1 }}>
          <b>Show Volume:</b> Yes
        </Typography>
        <Typography sx={{ color: "#6F7177", mb: 1 }}>
          <b>Show Moving Average:</b> No
        </Typography>
        <Typography sx={{ color: "#6F7177", mb: 1 }}>
          <b>Notifications:</b> Enabled
        </Typography>
        <Typography sx={{ color: "#6F7177", mb: 1 }}>
          <b>Export Data:</b> CSV, PDF
        </Typography>
      </Box>
    </div>
  );
}

export default SettingTab;
