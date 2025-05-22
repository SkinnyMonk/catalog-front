import React, { useState } from "react";
import { Typography, Box, Tab, Tabs } from "@mui/material";
import PropTypes from "prop-types";

import ChartTab from "../ChartTab/ChartTab";
import SummaryTab from "../SummaryTab/SummaryTab";
import StatisticsTab from "../StatisticsTab/StatisticsTab";
import AnalysisTab from "../AnalysisTab/AnalysisTab";
import SettingTab from "../SettingTab/SettingTab";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function StockDetails() {
  const [value, setValue] = useState(1);
  const [fullscreen, setFullscreen] = useState(false);
  const [compare, setCompare] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  console.log("full", fullscreen);
  return (
    <div style={{ marginTop: "60px" }}>
      {fullscreen ? (
        <ChartTab
          fullscreen={fullscreen}
          setFullscreen={setFullscreen}
          compare={compare}
          setCompare={setCompare}
        />
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              marginLeft: "60px",
              alignItems: "flex-start",
            }}
          >
            <Typography
              sx={{
                fontFamily: "Circular Std",
                fontWeight: 400,
                fontSize: "70px",
                lineHeight: 1,
                letterSpacing: 0,
                color: "#1A243A",
              }}
            >
              63179.71
            </Typography>
            <Typography
              sx={{
                fontFamily: "Circular Std",
                fontWeight: 400,
                fontSize: "24px",
                lineHeight: 1,
                letterSpacing: 0,
                color: " #BDBEBF",
              }}
            >
              USD
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{
                fontWeight: 400,
                fontSize: "18px",
                color: "#67BF6B",
                marginLeft: "60px",
              }}
            >
              +3179.71 (2.5%){" "}
            </Typography>
          </Box>
          <Box sx={{ width: "100%", marginTop: "40px" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                sx={{ marginLeft: "60px" }}
                aria-label="basic tabs example"
              >
                <Tab
                  label={
                    <span
                      style={{ color: value === 0 ? "#1A243A" : "#6F7177" }}
                    >
                      Summary
                    </span>
                  }
                  {...a11yProps(0)}
                />
                <Tab
                  label={
                    <span
                      style={{ color: value === 1 ? "#1A243A" : "#6F7177" }}
                    >
                      Chart
                    </span>
                  }
                  {...a11yProps(1)}
                />
                <Tab
                  label={
                    <span
                      style={{ color: value === 2 ? "#1A243A" : "#6F7177" }}
                    >
                      Statistics
                    </span>
                  }
                  {...a11yProps(2)}
                />
                <Tab
                  label={
                    <span
                      style={{ color: value === 3 ? "#1A243A" : "#6F7177" }}
                    >
                      Analysis
                    </span>
                  }
                  {...a11yProps(3)}
                />
                <Tab
                  label={
                    <span
                      style={{ color: value === 4 ? "#1A243A" : "#6F7177" }}
                    >
                      Settings
                    </span>
                  }
                  {...a11yProps(4)}
                />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              <SummaryTab />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <ChartTab
                fullscreen={fullscreen}
                setFullscreen={setFullscreen}
                compare={compare}
                setCompare={setCompare}
              />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              <StatisticsTab />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
              <AnalysisTab />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={4}>
              <SettingTab />
            </CustomTabPanel>
          </Box>
        </>
      )}
    </div>
  );
}

export default StockDetails;
