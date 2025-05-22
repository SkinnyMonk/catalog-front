import React, { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Typography, Box } from "@mui/material";

import { stockData } from "../StockDetails/stockData";
import StockChart from "../StockChart/StockChart";
const DateRangeArray = [
  { label: "1d", value: "1" },
  { label: "3d", value: "1" },
  { label: "1w", value: "1" },
  { label: "1m", value: "1" },
  { label: "6m", value: "1" },
  { label: "1y", value: "1" },
  { label: "max", value: "1" },
];
function ChartTab({ fullscreen, setFullscreen, compare, setCompare }) {
  const [selectedDateRange, setSelectedDateRange] = useState("1d");
  const isMobile = useMediaQuery("(max-width:1000px)");
  return (
    <div>
      <Box
        sx={{
          marginLeft: "60px",
          width: "80%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", gap: 3 }}>
            <Typography
              sx={{
                frontSize: "18px",
                color: "#6F7177",
                display: "flex",
                gap: 1,
                cursor: "pointer",
                "&:hover": {
                  color: "#4B40EE",
                },
              }}
              onClick={() => {
                setFullscreen(!fullscreen);
              }}
            >
              <OpenInFullIcon />
              {fullscreen ? "Exit Fullscreen" : "Fullscreen"}
            </Typography>
            <Typography
              sx={{
                fontSize: "18px",
                color: "#6F7177",
                display: "flex",
                gap: 1,
                cursor: "pointer",
                "&:hover": {
                  color: "#4B40EE",
                },
              }}
              onClick={() => setCompare(!compare)}
            >
              <AddCircleOutlineIcon />
              Compare
            </Typography>
          </Box>

          {!isMobile ? (
            <Box sx={{ display: "flex", gap: 2 }}>
              {DateRangeArray.map((item) => (
                <Box
                  key={item.label}
                  sx={{
                    width: "100%",
                    height: "33px",
                    backgroundColor:
                      item?.label === selectedDateRange ? "#4B40EE" : "none",
                    color:
                      item?.label === selectedDateRange ? "#fff" : "#6F7177",
                    borderRadius: 1,
                    px: 2,
                  }}
                  onClick={() => {
                    setSelectedDateRange(item.label);
                  }}
                >
                  <Typography variant="h6">{item.label}</Typography>
                </Box>
              ))}
            </Box>
          ) : (
            <Box sx={{ minWidth: 120 }}>
              <select
                value={selectedDateRange}
                onChange={(e) => setSelectedDateRange(e.target.value)}
                style={{
                  height: 33,
                  borderRadius: 4,
                  padding: "0 12px",
                  fontSize: 16,
                  color: "#fff",
                  background: "#4B40EE",
                  border: "none",
                  outline: "none",
                }}
              >
                {DateRangeArray.map((item) => (
                  <option
                    key={item.label}
                    value={item.label}
                    style={{
                      color: "#1A243A",
                      background: "#fff",
                    }}
                  >
                    {item.label}
                  </option>
                ))}
              </select>
            </Box>
          )}
        </Box>

        <StockChart stockData={stockData} compare={compare} />
      </Box>
    </div>
  );
}

export default ChartTab;
