import React from "react";
import { Box, Typography } from "@mui/material";
import Header from "../components/Header";

const AboutMe = () => {
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
        {/* Profile Picture */}
        <Box
          component="img"
          src="/images/headshot.jpeg"
          alt="Aidan Essig"
          sx={{
            width: 150,
            height: 150,
            borderRadius: "50%",
            objectFit: "cover",
            border: "3px solid white",
            marginBottom: 2,
          }}
        />

        {/* About Me Text */}
        <Typography variant="h4">About Me</Typography>
        <Typography variant="body1" sx={{ mt: 2, mx: 3, maxWidth: "600px" }}>
          Hi, I'm Aidan! I'm a Computer Science and Math student at Northeastern 
          Univesity. I will be graduating in Spring of 2026 with over 2 years of
          technical experience with roles at Conair, MIT Lincoln Laboratory, and most recently 
          Riverside Research. I am originally from Connecticut, however, I have moved all my life
          spending time in Ohio (Go Browns!) and Germany (Forza SGE!) for parts of my childhood. 
          Outside of classes, I enjoy being active including cycling and playing squash, as well as
          finding opportunities to meet interestig people.
        </Typography>
        <Typography variant="body1" sx={{ mt: 2, mx: 3, maxWidth: "600px" }}>
          Please reach out to me if you would like to connect, and feel free to explore my
          blog and links as well!
        </Typography>
      </Box>
    </>
  );
};

export default AboutMe;
