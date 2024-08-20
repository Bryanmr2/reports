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
  const [filteredReports, setFilteredReports] = useState([]);

  const handleFetchReports = async () => {
    try {
      const response = await axios.get(
        "https://reports-production.up.railway.app/api/inspections"
      );
      setReports(response.data);
      setFilteredReports(response.data);
    } catch (error) {
      console.error("Error al obtener inspecciones:", error);
    }
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
                <TableCell>Fecha</TableCell>
                <TableCell>Manejador</TableCell>
                <TableCell>K9</TableCell>
                <TableCell>Turno</TableCell>
                <TableCell>Planta</TableCell>
                <TableCell>Descripción</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredReports.length > 0 ? (
                filteredReports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell>{report.date}</TableCell>
                    <TableCell>{report.name}</TableCell>
                    <TableCell>{report.dog_name}</TableCell>
                    <TableCell>{report.shift}</TableCell>
                    <TableCell>{report.plant}</TableCell>
                    <TableCell>{report.inspection_description}</TableCell>
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
