import { Container, Typography, Box } from "@mui/material";
import React from "react";

const PageLayout = ({ children, title }) => {
  return (
    <Container id="layout" maxWidth="sm">
      <>
        <Typography
          id="page-title"
          variant="h4"
          sx={{ margin: 2, textAlign: "center" }}
        >
          {title}
        </Typography>
        <Box id="page-content" fullWidth>
          {children}
        </Box>
      </>
    </Container>
  );
};

export default PageLayout;
