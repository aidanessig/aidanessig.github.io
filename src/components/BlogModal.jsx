import React from "react";
import { Modal, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const BlogModal = ({ blog, onClose }) => {
  if (!blog) return null;

  return (
    <Modal open onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "#1e1e1e",
          color: "white",
          boxShadow: 24,
          borderRadius: 2,
          width: "90%",
          maxWidth: 700,
          maxHeight: "80vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* close button */}
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: "white",
            zIndex: 1,
          }}
          aria-label="Close blog"
        >
          <CloseIcon />
        </IconButton>

        {/* scrollable content container */}
        <Box
          sx={{
            p: 4,
            pt: 4,
            overflowY: "auto",
          }}
        >
          {blog.imageSrc && (
            <img
              src={blog.imageSrc}
              alt={blog.title}
              style={{
                width: "100%",
                borderRadius: "8px",
                marginBottom: "1rem",
                marginTop: "1rem",
              }}
            />
          )}

          <Typography variant="h5" gutterBottom>
            {blog.title}
          </Typography>
          <Typography variant="subtitle1" gutterBottom color="gray">
            {blog.subtitle}
          </Typography>
          <Typography variant="body2" color="gray" sx={{ mb: 2 }}>
            {blog.date}
          </Typography>
          <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
            {blog.content}
          </Typography>
        </Box>
      </Box>
    </Modal>
  );
};

export default BlogModal;
