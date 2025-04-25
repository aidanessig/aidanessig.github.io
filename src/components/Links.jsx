import React from "react";
import {
  Container,
  Grid,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import DescriptionIcon from "@mui/icons-material/Description";

const links = [
  {
    label: "GitHub",
    icon: <GitHubIcon sx={{ fontSize: 50 }} />,
    url: "https://github.com/aidanessig",
  },
  {
    label: "LinkedIn",
    icon: <LinkedInIcon sx={{ fontSize: 50 }} />,
    url: "https://linkedin.com/in/aidanessig",
  },
  {
    label: "Twitter (X)",
    icon: <TwitterIcon sx={{ fontSize: 50 }} />,
    url: "https://x.com/AidanEssig",
  },
  {
    label: "Resume",
    icon: <DescriptionIcon sx={{ fontSize: 50 }} />,
    url: "https://drive.google.com/file/d/1qtLjkYvN4i73dCGH4LsX_DgCna4v9x_S/view?usp=sharing",
  },
];

const Links = () => {
  return (
    <Container sx={{ py: 6 }}>
      <Box textAlign="center" sx={{ mb: 6 }}>
        <Typography variant="h4" sx={{ fontWeight: 500, mb: 1 }}>
          Links / Contact
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Reach out to learn more!
        </Typography>
      </Box>

      <Grid
        container
        spacing={4}
        justifyContent="center"
        wrap="wrap"
      >
        {links.map((link, index) => (
          <Grid
            item
            key={index}
            sx={{ width: 180 }}
          >
            <Box textAlign="center">
              <IconButton
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: "white" }}
              >
                {link.icon}
              </IconButton>
              <Typography variant="body2">{link.label}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Links;
