import React from "react";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import {
  CssBaseline,
  Box,
  Typography,
  SwipeableDrawer,
  Divider,
  Button,
  Slider,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import SchoolIcon from "@mui/icons-material/School";
import ComputerIcon from "@mui/icons-material/Computer";
import WorkIcon from "@mui/icons-material/Work";
import jobs from "../data/jobs";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { Link } from "react-router-dom";

const drawerBleeding = 48;
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

// puller styling - positioned inside the drawer
const Puller = styled("div")(() => ({
  width: 50,
  height: 8,
  backgroundColor: grey[300],
  borderRadius: 3,
  position: "absolute",
  top: 12,
  left: "calc(50% - 25px)",
}));

const StyledBox = styled("div")(() => ({
  backgroundColor: "#1E1E1E",
  color: "white",
  borderTopLeftRadius: 8,
  borderTopRightRadius: 8,
  visibility: "visible",
  position: "absolute",
  top: -drawerBleeding,
  right: 0,
  left: 0,
  textAlign: "center",
}));

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

export default function MobileDrawer({ filters, setFilters }) {
  const [open, setOpen] = React.useState(true); // open by default

  const regions = ["Connecticut", "Massachusetts", "International"];

  const toggleRegion = (region) => {
    setFilters((prev) => ({
      ...prev,
      regions: prev.regions.includes(region)
        ? prev.regions.filter((r) => r !== region) // remove if already selected
        : [...prev.regions, region], // add if not selected
    }));
  };

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const toggleCategory = (id) => {
    setFilters((prev) => {
      const isSelected = prev.categories.includes(id);
      return {
        ...prev,
        categories: isSelected
          ? prev.categories.filter((cat) => cat !== id) // remove if selected
          : [...prev.categories, id], // add if not selected
      };
    });
  };

  const handleYearChange = (event, newValue) => {
    setFilters((prev) => ({ ...prev, yearRange: newValue }));
  };

  return (
    <>
      <CssBaseline />
      <Global
        styles={{
          "body, html": {
            overscrollBehavior: "none",
            height: "100svh",
            overflow: "hidden",
          },
          ".MuiDrawer-root > .MuiPaper-root": {
            height: `calc(75% - ${drawerBleeding}px)`,
            overflow: "visible",
            backgroundColor: "#1E1E1E",
          },
        }}
      />
      <SwipeableDrawer
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)} // restored toggleDrawer
        onOpen={toggleDrawer(true)} // restored toggleDrawer
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        keepMounted
      >
        <StyledBox
          onClick={toggleDrawer(!open)}
          sx={{
            pointerEvents: isMobile ? "none" : "all",
          }}
        >
          <Puller />
          <Typography sx={{ p: 3, color: "white" }} />
        </StyledBox>

        <Box
          sx={{
            px: 2,
            pb: 2,
            maxHeight: "70vh",
            overflowY: "auto",
            backgroundColor: "#1E1E1E",
            color: "white",
            touchAction: "pan-y",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {/* Name Section */}
          <Typography
            variant="h6"
            sx={{ fontSize: "clamp(20px, 6vw, 36px)", textAlign: "center" }}
          >
            Hi! My Name Is:
          </Typography>
          <Typography
            variant="h4"
            sx={{
              fontSize: "clamp(24px, 8vw, 42px)",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Aidan Essig
          </Typography>

          {/* Divider */}
          <Divider sx={{ width: "100%", backgroundColor: "grey", my: 2 }} />

          {/* Navigation Links */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 3,
              width: "100%",
              flexWrap: "wrap", 
              textAlign: "center",
              mt: 1, 
            }}
          >
            <Link
              to="/about"
              style={{ textDecoration: "none", color: "white" }}
            >
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
            <Link
              to="/links"
              style={{ textDecoration: "none", color: "white" }}
            >
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
              mb: 2,
            }}
          >
        Welcome to my website! My interest in geography motivated me to 
        design this site around a globe. Use the filters below to learn
        a little bit about my journey and click the map icons to view more from that location.
        More information can be found in the pages listed above too. Thank you!
          </Typography>

          {/* Divider */}
          <Divider sx={{ width: "100%", backgroundColor: "grey", my: 1 }} />

          {/* Category Selection Label */}
          <Typography
            variant="subtitle1"
            sx={{ textAlign: "center", mb: 1, fontWeight: 600 }}
          >
            Select a Category:
          </Typography>

          {/* Category Buttons - Allow multiple selection */}
          <Box
            sx={{
              display: "flex",
              gap: 1,
              justifyContent: "center",
              flexWrap: "wrap",
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
                  width: 100,
                  height: 100,
                  borderRadius: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 0.5,
                  transition: "background-color 0.1s ease-in-out",
                  "&:hover": {
                    backgroundColor: filters.categories.includes(id)
                      ? "#1565c0"
                      : "#E0E0E0",
                  },
                }}
              >
                {icon}
                <Typography variant="body2" sx={{ fontSize: 14 }}>
                  {label}
                </Typography>
              </Button>
            ))}
          </Box>

          {/* Year Range Selector */}
          <Typography
            variant="subtitle1"
            sx={{ textAlign: "center", mt: 3, mb: 3, fontWeight: 600 }}
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
              width: "80%",
              margin: "0 auto",
              display: "block",
              color: "#1976d2",
            }}
          />
          <Typography
            variant="body2"
            sx={{
              fontWeight: 600,
              color: "gray",
              mt: 0.5,
              textAlign: "center",
            }}
          >
            {filters.yearRange[0]} - {filters.yearRange[1]}
          </Typography>

          {/* Region Filter UI */}
          <Typography
            variant="subtitle1"
            sx={{ textAlign: "center", mt: 3, mb: 1, fontWeight: 600 }}
          >
            Select Region:
          </Typography>
          <FormGroup
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              alignItems: "flex-start",
              width: "100%",
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
      </SwipeableDrawer>
    </>
  );
}
