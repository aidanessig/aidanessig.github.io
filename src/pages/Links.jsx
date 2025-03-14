import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import DescriptionIcon from "@mui/icons-material/Description";
import Header from "../components/Header";

const Links = () => {
  return (
    <>
      <Header />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: "100px",
          minHeight: "100vh",
          backgroundColor: "#1E1E1E",
          color: "white",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" sx={{ mb: 2 }}>
          Links / Contact
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)", // 2x2 Grid
            gap: "24px",
            maxWidth: "400px",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* GitHub */}
          <Box sx={{ textAlign: "center" }}>
            <IconButton
              href="https://github.com/aidanessig"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: "white" }}
            >
              <GitHubIcon sx={{ fontSize: 50 }} />
            </IconButton>
            <Typography variant="body2">GitHub</Typography>
          </Box>

          {/* LinkedIn */}
          <Box sx={{ textAlign: "center" }}>
            <IconButton
              href="https://www.linkedin.com/in/aidanessig/"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: "white" }}
            >
              <LinkedInIcon sx={{ fontSize: 50 }} />
            </IconButton>
            <Typography variant="body2">LinkedIn</Typography>
          </Box>

          {/* Twitter (X) */}
          <Box sx={{ textAlign: "center" }}>
            <IconButton
              href="https://x.com/AidanEssig"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: "white" }}
            >
              <TwitterIcon sx={{ fontSize: 50 }} />
            </IconButton>
            <Typography variant="body2">Twitter (X)</Typography>
          </Box>

          {/* Resume */}
          <Box sx={{ textAlign: "center" }}>
            <IconButton
              href="https://drive.google.com/file/d/1qtLjkYvN4i73dCGH4LsX_DgCna4v9x_S/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: "white" }}
            >
              <DescriptionIcon sx={{ fontSize: 50 }} />
            </IconButton>
            <Typography variant="body2">Resume</Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Links;
