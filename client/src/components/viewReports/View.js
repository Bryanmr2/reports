import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import "./view.css";

const View = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [reports, setReports] = useState([]);

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
  }, []);

  const handleFetchReports = () => {
    // Llamada a la API para obtener los reportes del usuario y fecha seleccionados
    axios
      .get(`/api/reports/${selectedUser}/${selectedDate}`)
      .then((response) => {
        setReports(response.data);
      })
      .catch((error) => {
        console.error("Error fetching reports:", error);
      });
  };

  return (
    <div>
      <h2>Consultar Reportes</h2>

      <div className="view-container">
        <InputLabel htmlFor="userSelect">Seleccionar Usuario:</InputLabel>
        <Select
          id="userSelect"
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
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
        <br />
        <InputLabel htmlFor="dateSelect">Seleccionar Fecha:</InputLabel>
        <TextField
          type="date"
          id="dateSelect"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />

        <br />
        <Button
          variant="contained"
          color="primary"
          onClick={handleFetchReports}
        >
          Consultar
        </Button>
        <br />

        {/* Mostrar los reportes */}
        <div>
          <h3>Reportes:</h3>
          <ul>
            {reports.map((report) => (
              <li key={report.id}>{report.title}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default View;
