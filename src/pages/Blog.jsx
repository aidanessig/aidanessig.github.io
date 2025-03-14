import React from "react";
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, List, ListItem, ListItemText } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Header from "../components/Header";

const Blog = () => {
  return (
    <>
      <Header />
      <Box sx={{ backgroundColor: "#1E1E1E", minHeight: "100vh", display: "flex", justifyContent: "center" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: "100px",
            width: "100%",
            maxWidth: "600px", // content width
            color: "white",
            textAlign: "center",
          }}
        >
          <Typography variant="h4">Blog</Typography>

          {/*spacing below the title */}
          <Box sx={{ height: "20px" }} /> 

          {/* Blog Post */}
          <Accordion sx={{ width: "100%", backgroundColor: "#2A2A2A", color: "white" }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}>
              <Typography variant="h6">Why Everyone Should do a Co-op and my Experience!</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="subtitle1" sx={{ fontStyle: "italic", color: "gray", mb: 1 }}>
                They can be hard to come by, however, the work to secure one is well worth it.
              </Typography>
              <Typography variant="body1">
                I have been very fortunate to have been on two co-ops where each has allowed me to learn
                and grow my skills professionally. They were both very different, however, without the first
                I would not have been able to find the second, so it all works out in the end. This is to say
                that sometimes it can be very difficult to secure one. However, there are options. I found my 
                co-op outside of NUWorks, and it worked out. I found that there was actually less competition, 
                which might have helped as well. Plus now that I guess there is a limit to how many applications
                you can send, this is a good resource. In the end, I had over 150 applications my first time, with only 
                two interviews! Shocking 😱
              </Typography>
              <Box
                component="img"
                src="/images/neu.jpg"
                alt="Northeastern University"
                sx={{
                  width: "100%",
                  maxWidth: "500px", 
                  borderRadius: "8px", 
                  display: "block",
                  margin: "20px auto",
                }}
               />
               <Typography variant="body1">
                In a few months, I will be returning to my second co-op for a third co-op, gaining new skills 
                and building on a project that I worked on for 8 months while there last year. I truly look forward
                to returning, as the people I worked with were very friendly and fostered an amazing environment. 
                It was not just the people on my team, but those in the office that really made it memorable. Below
                is a list of all the benefits of a co-op:
              </Typography>
              <List sx={{ textAlign: "left", paddingLeft: "20px" }}>
                <ListItem>
                  <ListItemText
                    primary="- Become a part of a long term project"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="- Take real responsbibility"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="- Amazing for your resume"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="- Build valuable connections"
                  />
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Box>
    </>
  );
};

export default Blog;
