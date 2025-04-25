import React from "react";
import { Modal, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const WelcomeModal = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "relative",
          bgcolor: "background.paper",
          color: "text.primary",
          p: 3,
          width: "90%",
          maxWidth: 400,
          mx: "auto",
          mt: "30vh",
          borderRadius: 2,
          textAlign: "center",
          outline: "none", 
        }}
      >
        {/* close button in the top right */}
        <IconButton
          onClick={onClose}
          size="small"
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: "text.primary",
          }}
        >
          <CloseIcon />
        </IconButton>

        <Typography variant="body1">
          Hi! My name is Aidan and I am a Computer Science and Math student 
          at Northeastern University. Interact with the globe behind to 
          learn more about my journey. Thank you!
        </Typography>
      </Box>
    </Modal>
  );
};

export default WelcomeModal;
