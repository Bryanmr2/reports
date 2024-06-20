import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import supabase from "../../config/supabase";
import { useNavigate } from "react-router-dom";

import "./CustomAppBar.css";

const CustomAppBar = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/main");
  };

  const onLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error al cerrar sesión:", error.message);
    }
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ textAlign: "center" }}>
        <Button
          startIcon={<ArrowCircleLeftIcon sx={{ color: "white" }} />}
          onClick={handleGoBack}
          className="back-button"
        ></Button>
        <Typography variant="h6" className="siipccsp">
          SIIPCCSP
        </Typography>

        <Button
          variant="contained"
          className="logout-button"
          onClick={() => onLogout()}
        >
          Cerrar Sesión
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default CustomAppBar;
