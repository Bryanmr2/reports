import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import { useLocation } from "react-router-dom";

const CustomAppBar = ({ isLoggedIn }) => {
  console.log("isLoggedIn", isLoggedIn);
  const location = useLocation();
  const excludedRoutes = ["/", "/login"];
  const showBackButton = !excludedRoutes.includes(location.pathname);

  const handleGoBack = () => {
    window.history.back();
  };

  const onLogout = () => {
    window.localStorage.clear();
    window.location.reload();
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ textAlign: "center" }}>
        {showBackButton && (
          <Button
            startIcon={<ArrowCircleLeftIcon sx={{ color: "white" }} />}
            onClick={handleGoBack}
            sx={{ position: "absolute", color: "white" }}
          >
            Volver
          </Button>
        )}
        <Typography variant="h6" sx={{ flexGrow: 1, marginLeft: "30%" }}>
          SIIPCCSP
        </Typography>

        {isLoggedIn && (
          <Button variant="contained" onClick={() => onLogout()}>
            Cerrar Sesión
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default CustomAppBar;
