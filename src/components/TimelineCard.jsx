import React from "react";
import {
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  TimelineConnector,
  TimelineDot,
  TimelineContent,
} from "@mui/lab";
import { Typography, useTheme, useMediaQuery } from "@mui/material";
import ComputerIcon from "@mui/icons-material/Computer";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";

const iconMap = {
  technical: <ComputerIcon />,
  studied: <SchoolIcon />,
  other: <WorkIcon />,
};

const TimelineCard = ({ year, title, place, category, showConnector }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  
    const formattedYear = isMobile
    ? year
        .replace(/–/g, "–\u200B")
        .replace(/(\w+) (\d{4})/g, "$1\u00A0$2")
    : year;
  
    return (
      <TimelineItem>
        <TimelineOppositeContent
          sx={{ m: "auto 0", textAlign: "right" }}
          variant="body2"
          color="text.secondary"
        >
          {formattedYear}
        </TimelineOppositeContent>
        <TimelineSeparator>
          {showConnector && <TimelineConnector />}
          <TimelineDot color="primary">
            {iconMap[category] || <WorkIcon />}
          </TimelineDot>
          {showConnector && <TimelineConnector />}
        </TimelineSeparator>
        <TimelineContent
          sx={{
            m: "auto 0",
            ...(isMobile && {
              p: "6px 0 6px 16px",
            }),
          }}
        >
          <Typography variant="h6">{title}</Typography>
          <Typography color="text.secondary">{place}</Typography>
        </TimelineContent>
      </TimelineItem>
    );
  };
  

export default TimelineCard;
