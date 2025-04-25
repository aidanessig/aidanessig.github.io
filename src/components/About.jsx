import React from "react";
import {
  Box,
  Typography,
  Avatar,
  Container,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Timeline from "@mui/lab/Timeline";
import TimelineCard from "./TimelineCard";
import headshot from "../assets/headshot.jpeg";

const timelineItems = [
  {
    year: "May 2024–Present",
    title: "Software Engineering Co-op",
    place: "Riverside Research",
    category: "technical",
  },
  {
    year: "August 2023-December 2023",
    title: "DevSecOps Co-op",
    place: "MIT Lincoln Laboratory",
    category: "technical",
  },
  {
    year: "June 2023-August 2023",
    title: "Web Development Intern",
    place: "Conair",
    category: "technical",
  },
  {
    year: "2021–2026",
    title: "Student",
    place: "Northeastern University",
    category: "studied",
  },
];

const About = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Container
      maxWidth="md"
      sx={{
        textAlign: "center",
        color: "white",
        py: 8,
      }}
    >
      <Avatar
        src={headshot}
        alt="Aidan Essig"
        sx={{
          width: 120,
          height: 120,
          margin: "0 auto",
          border: "3px solid white",
        }}
      />

      <Typography
        variant="h4"
        component="h1"
        sx={{ mt: 4, mb: 3, fontWeight: 500 }}
      >
        About Me
      </Typography>

      <Typography variant="body1" sx={{ mb: 2 }}>
        Hi, I'm Aidan! I'm a Computer Science and Math student at Northeastern University. I will be graduating in Spring of 2026 with over 2 years of technical experience with roles at Conair, MIT Lincoln Laboratory, and most recently Riverside Research. I am originally from Connecticut, however, I have frequently moved spending time in Ohio (Go Browns!) and Germany (Forza SGE!) for parts of my childhood. Outside of classes, I enjoy being active including cycling and playing squash, as well as finding opportunities to meet interesting people.
      </Typography>

      <Typography variant="body1" sx={{ mb: 6 }}>
        Please reach out to me if you would like to connect, and feel free to explore my blog and links as well!
      </Typography>

      <Typography variant="h4" sx={{ mb: 3 }}>
        Technical Timeline
      </Typography>

      <Timeline
        position={isMobile ? "right" : "alternate"}
        sx={{
          ...(isMobile && {
            ml: -3, // shift timeline left on mobile to center properly
          }),
        }}
      >
        {timelineItems.map((item, index) => (
          <TimelineCard
            key={index}
            year={item.year}
            title={item.title}
            place={item.place}
            category={item.category}
            showConnector={index < timelineItems.length - 1}
          />
        ))}
      </Timeline>
    </Container>
  );
};

export default About;
