import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import "./inspectionView.css";

const InspectionView = () => {
  const [reports, setReports] = useState([]);

  const handleFetchReports = () => {
    axios
      .get("/api/inspections")
      .then((response) => {
        console.log(response.data);
        setReports(response.data);
      })
      .catch((error) => {
        console.error("Error fetching inspections:", error);
        setReports([]);
      });
  };

  useEffect(() => {
    handleFetchReports();
  }, []);

  return (
    <div>
      <Box sx={{ marginTop: "40px", padding: "1%" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "10px",
          }}
        >
          <h3>Inspecciones:</h3>
          <Button variant="outlined" component={Link} to="/inspections/new">
            Crear Nueva Inspección
          </Button>
        </div>
        <TableContainer component={Paper}>
          <Table aria-label="table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Título</TableCell>
                <TableCell>Fecha</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(reports) && reports.length > 0 ? (
                reports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell>{report.id}</TableCell>
                    <TableCell>{report.name}</TableCell>{" "}
                    {/* Ajusta "name" si el campo es diferente */}
                    <TableCell>{report.date}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    No hay datos disponibles
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};

export default InspectionView;
