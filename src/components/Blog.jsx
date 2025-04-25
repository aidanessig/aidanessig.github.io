import React, { useState, useEffect } from "react";
import { Grid, Container, Typography, Box } from "@mui/material";
import BlogCard from "./BlogCard";
import BlogModal from "./BlogModal";

const blogFiles = import.meta.glob("../blogs/*.txt", {
  eager: true,
  query: "?raw",
  import: "default",
});

const images = import.meta.glob("../assets/*", {
  eager: true,
  import: "default",
});

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    const loadBlogs = () => {
      const parsed = Object.entries(blogFiles).map(([path, raw]) => {
        const [meta, ...body] = raw.split("---");
        const metaLines = meta.trim().split("\n");
        const metadata = Object.fromEntries(
          metaLines.map((line) => line.split(": ").map((s) => s.trim()))
        );

        const imagePath = `../assets/${metadata.image}`;
        const imageSrc = images[imagePath];

        return {
          ...metadata,
          content: body.join("---").trim(),
          imageSrc,
        };
      });

      setBlogs(parsed);
    };

    loadBlogs();
  }, []);

  return (
    <Container sx={{ py: 6 }}>
      <Box textAlign="center" sx={{ mb: 6 }}>
        <Typography variant="h4" sx={{ fontWeight: 500, mb: 1 }}>
          Blogs
        </Typography>
        <Typography variant="body1" color="text.secondary">
          My thoughts, experiences, and ideas. Thank you for reading!
        </Typography>
      </Box>

      <Grid
        container
        spacing={4}
        justifyContent="center"
        wrap="wrap" 
      >
        {blogs.map((blog, index) => (
          <Grid
            item
            key={index}
            sx={{
              width: 360,
            }}
          >
            <BlogCard blog={blog} onClick={() => setSelectedBlog(blog)} />
          </Grid>
        ))}
      </Grid>

      <BlogModal blog={selectedBlog} onClose={() => setSelectedBlog(null)} />
    </Container>
  );
};

export default Blog;
