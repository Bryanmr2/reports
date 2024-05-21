import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Select,
  MenuItem,
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
import "./view.css";

const View = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reports, setReports] = useState([]);
  const [filterID, setFilterID] = useState("");

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get("/api/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    getUsers();
    fetchReportsForToday();
  }, []);

  const fetchReportsForToday = async () => {
    const today = new Date().toISOString().split("T")[0];
    try {
      const response = await axios.get(`/api/reports/today`);
      setReports(response.data);
    } catch (error) {
      console.error("Error fetching today's reports:", error);
    }
  };

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
      <h2 style={{ display: "flex", marginLeft: "2%" }}>
        Consultar Inspecciones
      </h2>

      <div className="view-container">
        <Box>
          <InputLabel htmlFor="userSelect">Seleccionar Usuario:</InputLabel>
          <Select
            id="userSelect"
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            fullWidth
          >
            <MenuItem value="">
              <em>-- Seleccione un usuario --</em>
            </MenuItem>
            {users.map((user) => (
              <MenuItem key={user.id} value={user.id}>
                {user.name}
              </MenuItem>
            ))}
          </Select>
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

        <Box sx={{ marginTop: "20px" }}>
          <TextField
            label="Filtrar por ID"
            onChange={(e) => setFilterID(e.target.value)}
            style={{ margin: "15px 0" }}
            fullWidth
          />
        </Box>

        <Box>
          <Button
            variant="contained"
            color="primary"
            onClick={handleFetchReports}
            fullWidth
            style={{ marginTop: "16px" }}
          >
            Consultar
          </Button>
        </Box>

        <Box sx={{ marginTop: "40px" }}>
          <h3>Reportes:</h3>
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

export default View;
