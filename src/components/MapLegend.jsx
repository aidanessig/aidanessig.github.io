import React, { useEffect, useState } from "react";
import { Box, Typography, Divider } from "@mui/material";

const typeColorMap = {
  "Studied": "#4dabf7",
  "Work (technical)": "#e03131",
  "Work (other)": "#f59f00",
};

const MapLegend = () => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const checkTouch = () =>
      window.matchMedia("(pointer: coarse)").matches;
    setIsTouchDevice(checkTouch());
  }, []);

  return (
    <Box
      sx={{
        position: "absolute",
        bottom: 24,
        right: 24,
        bgcolor: "background.paper",
        color: "text.primary",
        borderRadius: 1,
        px: 2,
        py: 1.5,
        boxShadow: 4,
        display: "flex",
        flexDirection: "column",
        gap: 1.25,
        fontFamily: "'Inter', sans-serif",
        minWidth: "200px",
      }}
    >
      <Typography
        variant="body2"
        sx={{ fontSize: "0.75rem", opacity: 0.8 }}
      >
        {isTouchDevice
          ? "Tap map icons to learn more"
          : "Hover over map icons to learn more"}
      </Typography>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.2)" }} />

      {Object.entries(typeColorMap).map(([label, color]) => (
        <Box
          key={label}
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          <Box
            sx={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: color,
              flexShrink: 0,
            }}
          />
          <Typography variant="body2">{label}</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default MapLegend;
