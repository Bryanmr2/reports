import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Logo from "../../images/logo.jpg";
import { Box } from "@mui/material";
import "./homePage.css";

const HomePage = () => {
  return (
    <>
      <br />
      <Box
        component="img"
        src={Logo}
        alt="Logo"
        sx={{
          height: 120,
          position: "absolute",
          top: "25%",
          left: "50%",
          translate: "-50% -50%",
          borderRadius: "9999px",
          border: "5px solid white",
        }}
      />
      <div className="home-container">
        <h2>Elige una opción</h2>
        <div className="options">
          {/* <Link to="/inspections/new">
            <Button
              variant="contained"
              color="primary"
              style={{ width: "100%" }}
            >
              Generar Inspección
            </Button>
          </Link> */}
          <Link to="/inspections">
            <Button
              variant="contained"
              color="primary"
              className="option-buttons"
            >
              Inspecciones
            </Button>
          </Link>
          <Link to="/handlers">
            <Button
              variant="contained"
              color="primary"
              className="option-buttons"
            >
              Manejadores
            </Button>
          </Link>
          <Link to="/dogs">
            <Button
              variant="contained"
              color="primary"
              className="option-buttons"
            >
              Perros
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default HomePage;
