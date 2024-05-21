import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import "./homePage.css";

const HomePage = () => {
  return (
    <>
      <br />
      <div className="home-container">
        <h2>Elige una opción</h2>
        <div className="options">
          <Link to="/inspections/new">
            <Button
              variant="contained"
              color="primary"
              style={{ width: "100%" }}
            >
              Generar Reporte
            </Button>
          </Link>
          <Link to="/inspections">
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: "10px", width: "100%" }}
            >
              Consultar Reportes
            </Button>
          </Link>
          <Link to="/operators/new">
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: "10px", width: "100%" }}
            >
              Registrar Operadores
            </Button>
          </Link>
          <Link to="/dogs/new">
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: "10px", width: "100%" }}
            >
              Registrar Perros
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default HomePage;
