import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <AppBar position="fixed" sx={{ bgcolor: "#121212" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">Aidan Essig</Typography>
        <Box sx={{ display: "flex", gap: 3 }}>
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <Typography
              variant="body1"
              sx={{
                borderBottom: "1px solid transparent",
                "&:hover": { borderBottom: "1px solid white" },
              }}
            >
              Home
            </Typography>
          </Link>
          <Link to="/about" style={{ textDecoration: "none", color: "white" }}>
            <Typography
              variant="body1"
              sx={{
                borderBottom: "1px solid transparent",
                "&:hover": { borderBottom: "1px solid white" },
              }}
            >
              About
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
      </Toolbar>
    </AppBar>
  );
};

export default Header;
