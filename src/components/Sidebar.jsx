import React from "react";
import { Box, Typography, Divider, Button, Slider } from "@mui/material";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import ComputerIcon from "@mui/icons-material/Computer";
import WorkIcon from "@mui/icons-material/Work";
import jobs from "../data/jobs";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const categories = [
  { id: "studied", label: "Studied", icon: <SchoolIcon fontSize="large" /> },
  {
    id: "work-technical",
    label: "Work (Technical)",
    icon: <ComputerIcon fontSize="large" />,
  },
  {
    id: "work-other",
    label: "Work (Other)",
    icon: <WorkIcon fontSize="large" />,
  },
];

const minYear = 2018;
const maxYear = 2025;

const regions = ["Connecticut", "Massachusetts", "International"];

const Sidebar = ({ filters, setFilters }) => {
  const navigate = useNavigate();

  const toggleRegion = (region) => {
    setFilters((prev) => ({
      ...prev,
      regions: prev.regions.includes(region)
        ? prev.regions.filter((r) => r !== region) // remove if already selected
        : [...prev.regions, region], // add if not selected
    }));
  };
  const toggleCategory = (id) => {
    setFilters((prev) => {
      const isSelected = prev.categories.includes(id);
      return {
        ...prev,
        categories: isSelected
          ? prev.categories.filter((cat) => cat !== id) // Rrmove if selected
          : [...prev.categories, id], // add if not selected
      };
    });
  };

  const handleYearChange = (event, newValue) => {
    setFilters((prev) => ({ ...prev, yearRange: newValue }));
  };

  return (
    <Box
      sx={{
        width: "min(350px, 30%)",
        backgroundColor: "#1E1E1E",
        color: "white",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        height: "100svh",
        maxHeight: "100svh",
        overflowY: "auto",
        scrollBehavior: "none",
      }}
    >
      {/* Name Section */}
      <Typography
        variant="h6"
        sx={{
          fontSize: "clamp(16px, 4vw, 32px)",
          textAlign: "center",
          whiteSpace: "nowrap",
        }}
      >
        Hi! My Name Is:
      </Typography>
      <Typography
        variant="h4"
        sx={{
          fontSize: "clamp(20px, 5vw, 40px)",
          textAlign: "center",
          whiteSpace: "nowrap",
          fontWeight: "bold",
        }}
      >
        Aidan Essig
      </Typography>

      {/* Divider */}
      <Divider sx={{ width: "100%", backgroundColor: "grey", my: 2 }} />

      {/* Navigation Links */}
      <Box sx={{ display: "flex", gap: 2 }}>
        <Link to="/about" style={{ textDecoration: "none", color: "white" }}>
          <Typography
            variant="body1"
            sx={{
              borderBottom: "1px solid transparent",
              "&:hover": { borderBottom: "1px solid white" },
            }}
          >
            About Me
          </Typography>
        </Link>
        <Link to="/blog" style={{ textDecoration: "none", color: "white" }}>
          <Typography
            variant="body1"
            sx={{
              borderBottom: "1px solid transparent",
              "&:hover": { borderBottom: "1px solid white" },
            }}
          >
            Blog
          </Typography>
        </Link>
        <Link to="/links" style={{ textDecoration: "none", color: "white" }}>
          <Typography
            variant="body1"
            sx={{
              borderBottom: "1px solid transparent",
              "&:hover": { borderBottom: "1px solid white" },
            }}
          >
            Links
          </Typography>
        </Link>
      </Box>

      {/* Divider */}
      <Divider sx={{ width: "100%", backgroundColor: "grey", my: 2 }} />

      {/* Introduction Section */}
      <Typography
        variant="body1"
        sx={{
          fontSize: "clamp(14px, 3vw, 18px)",
          textAlign: "center",
          overflowWrap: "break-word",
        }}
      >
        Welcome to my website! My interest in geography motivated me to 
        design this site around a globe. Use the filters below to learn
        a little bit about my journey and click the map icons to view more from that location.
        More information can be found in the pages listed above too. Thank you!
      </Typography>

      {/* Divider */}
      <Divider sx={{ width: "100%", backgroundColor: "grey", my: 2 }} />

      {/* Category Selection */}
      <Typography
        variant="subtitle1"
        sx={{ textAlign: "center", mb: 1, fontWeight: 600 }}
      >
        Select a Category:
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: "0.5vw",
          width: "100%",
        }}
      >
        {categories.map(({ id, label, icon }) => (
          <Button
            key={id}
            onClick={() => toggleCategory(id)}
            variant="contained"
            sx={{
              backgroundColor: filters.categories.includes(id)
                ? "#1976d2"
                : "#F5F5F5",
              color: filters.categories.includes(id) ? "white" : "black",
              flex: "1 1 auto",
              width: "calc(100% / 3 - 8px)",
              maxWidth: "33%",
              aspectRatio: "1 / 1",
              borderRadius: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5vw",
              transition: "background-color 0.1s ease-in-out",
              "&:hover": {
                backgroundColor: filters.categories.includes(id)
                  ? "#1565c0"
                  : "#E0E0E0",
              },
            }}
          >
            {icon}
            <Typography
              variant="body2"
              sx={{ fontSize: "clamp(10px, 1.5vw, 14px)" }}
            >
              {label}
            </Typography>
          </Button>
        ))}
      </Box>

      {/* Year Range Selector */}
      <Typography
        variant="subtitle1"
        sx={{ textAlign: "center", mt: 3, mb: 3.5, fontWeight: 600 }}
      >
        Select a Year Range:
      </Typography>
      <Slider
        value={filters.yearRange}
        onChange={handleYearChange}
        valueLabelDisplay="auto"
        min={minYear}
        max={maxYear}
        step={1}
        sx={{
          width: "100%",
          color: "#1976d2",
          "& .MuiSlider-thumb": {
            width: 18,
            height: 18,
            backgroundColor: "white",
            border: "2px solid #1976d2",
          },
          "& .MuiSlider-track": { height: 4, borderRadius: 2 },
          "& .MuiSlider-rail": {
            height: 4,
            borderRadius: 2,
            backgroundColor: "#E0E0E0",
          },
        }}
      />
      <Typography
        variant="body2"
        sx={{
          fontWeight: 600,
          color: "gray",
          mt: 1,
          mb: 3,
          textAlign: "center",
        }}
      >
        {filters.yearRange[0]} - {filters.yearRange[1]}
      </Typography>

      {/* Region Filter UI */}
      <Typography
        variant="subtitle1"
        sx={{ textAlign: "center", mt: 1, mb: 1.5, fontWeight: 600 }}
      >
        Select Region:
      </Typography>
      <FormGroup
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          alignItems: "flex-start",
          width: "110%",
        }}
      >
        {regions.map((region) => (
          <FormControlLabel
            key={region}
            control={
              <Checkbox
                checked={filters.regions.includes(region)}
                onChange={() => toggleRegion(region)}
                sx={{
                  color: "#1976d2",
                  "&.Mui-checked": { color: "#1976d2" },
                }}
              />
            }
            label={region}
            sx={{
              color: "white",
              fontSize: "clamp(14px, 3vw, 16px)",
              ml: 1,
            }}
          />
        ))}
      </FormGroup>
    </Box>
  );
};

export default Sidebar;
