import React from "react";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";

const BlogCard = ({ blog, onClick }) => {
  return (
    <Card
      sx={{
        width: "100%",
        backgroundColor: "#2a2a2a",
        color: "white",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardActionArea
        onClick={onClick}
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          width: "100%",
        }}
      >
        <CardMedia
          component="img"
          image={blog.imageSrc}
          alt={blog.title}
          sx={{
            width: "100%",
            height: 160,     // same fixed height for every card's image
            objectFit: "cover",
            display: "block",
          }}
        />
        <CardContent sx={{ flexGrow: 1, width: "100%" }}>
          <Typography variant="body2" sx={{ color: "#aaa", mb: 0.5 }}>
            {blog.date}
          </Typography>
          <Typography variant="h6">{blog.title}</Typography>
          <Typography variant="body2" color="gray">
            {blog.subtitle}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default BlogCard;
