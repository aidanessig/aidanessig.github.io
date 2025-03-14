import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box, useMediaQuery, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu"; // Mobile menu icon
import Sidebar from "./components/Sidebar";
import MobileDrawer from "./components/MobileDrawer";
import Map from "./components/Map";
import AboutMe from "./pages/AboutMe";
import Blog from "./pages/Blog";
import Links from "./pages/Links";

const App = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const [filters, setFilters] = useState({
    categories: [],
    yearRange: [2018, 2025],
    regions: ["Connecticut", "Massachusetts", "International"],
  });

  const [selectedJob, setSelectedJob] = useState(null);

  return (
    <Router>
      <Routes>
        {/* Home Page with Sidebar & Map */}
        <Route
          path="/"
          element={
            <Box
              sx={{
                display: "flex",
                height: "100svh",
                width: "100svw",
                overflow: "hidden",
                overscrollBehavior: "none",
              }}
            >
              {/* Sidebar for large screens */}
              {!isMobile && (
                <Sidebar setFilters={setFilters} filters={filters} />
              )}

              {/* Map on the right */}
              <Box sx={{ flexGrow: 1, position: "relative" }}>
                <Map
                  filters={filters}
                  selectedJob={selectedJob}
                  setSelectedJob={setSelectedJob}
                />
              </Box>

              {/* Bottom Drawer for mobile */}
              {isMobile && (
                <MobileDrawer setFilters={setFilters} filters={filters} />
              )}
            </Box>
          }
        />
        <Route path="/about" element={<AboutMe />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/links" element={<Links />} />
      </Routes>
    </Router>
  );
};

export default App;
