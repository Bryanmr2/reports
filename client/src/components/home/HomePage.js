import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import "./homePage.css";

const HomePage = () => {
  return (
    <>
      <br />
      <div className="home-container">
        <h2>Elige una opcion</h2>
        <div className="options">
          <Link to="/newreport">
            <Button
              variant="contained"
              color="primary"
              style={{ width: "100%" }}
            >
              Generar Reporte
            </Button>
          </Link>
          <Link to="/view">
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: "10px" }}
            >
              Consultar Reportes
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default HomePage;
