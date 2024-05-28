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
              Generar Inspección
            </Button>
          </Link>
          <Link to="/inspections">
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: "10px", width: "100%" }}
            >
              Consultar Inspecciones
            </Button>
          </Link>
          <Link to="/operators">
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: "10px", width: "100%" }}
            >
              Operadores
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
