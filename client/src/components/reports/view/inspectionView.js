import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Select,
  InputLabel,
  TextField,
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
  const [selectedUser, setSelectedUser] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reports, setReports] = useState([]);
  const [filterID, setFilterID] = useState("");

  const handleFetchReports = () => {
    axios
      .get(`/api/reports/${selectedUser}/${startDate}/${endDate}`)
      .then((response) => {
        setReports(response.data);
      })
      .catch((error) => {
        console.error("Error fetching reports:", error);
      });
  };

  const filteredReports = reports.filter((report) =>
    report.id.toString().includes(filterID)
  );

  return (
    <div>
      <h2>Consultar Inspecciones</h2>
      <div>
        <div className="view-container">
          <Box>
            <InputLabel htmlFor="userSelect">Seleccionar Usuario:</InputLabel>
            <Select
              id="userSelect"
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              fullWidth
            ></Select>
          </Box>

          <Box sx={{ marginTop: "20px" }}>
            <InputLabel htmlFor="startDate">Fecha de inicio:</InputLabel>
            <TextField
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              fullWidth
            />
          </Box>

          <Box sx={{ marginTop: "20px" }}>
            <InputLabel htmlFor="endDate">Fecha de finalización:</InputLabel>
            <TextField
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              fullWidth
            />
          </Box>

          <Box className="inspect-filter">
            <TextField
              label="Filtrar por ID"
              onChange={(e) => setFilterID(e.target.value)}
              fullWidth
            />
          </Box>

          <Box>
            <Button
              variant="contained"
              color="primary"
              onClick={handleFetchReports}
              fullWidth
              style={{ marginTop: "70px" }}
            >
              Consultar
            </Button>
          </Box>
        </div>

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
                {filteredReports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell>{report.id}</TableCell>
                    <TableCell>{report.title}</TableCell>
                    <TableCell>{report.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </div>
    </div>
  );
};

export default InspectionView;
