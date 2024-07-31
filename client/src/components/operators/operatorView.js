import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import "./operatorView.css";

const OperatorView = () => {
  const [operators, setOperators] = useState([]);
  const [filterID, setFilterID] = useState("");
  const [filteredOperators, setFilteredOperators] = useState([]);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [operatorToDelete, setOperatorToDelete] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editedOperator, setEditedOperator] = useState(null);

  const handleFetchOperators = async () => {
    try {
      const response = await axios.get(
        "reports-production.up.railway.app/api/operator"
      );
      setOperators(response.data);
    } catch (error) {
      console.error("Error al obtener manejadores:", error);
    }
  };

  useEffect(() => {
    handleFetchOperators();
  }, []);

  useEffect(() => {
    if (filterID) {
      setFilteredOperators(
        operators.filter((operator) =>
          operator.id.toString().includes(filterID)
        )
      );
    } else {
      setFilteredOperators(operators);
    }
  }, [filterID, operators]);

  const handleDeleteOperator = async (id) => {
    try {
      await axios.delete(
        `reports-production.up.railway.app/api/operator/${id}`
      );
      handleFetchOperators();
    } catch (error) {
      console.error("Error al eliminar manejador:", error);
    }
  };

  const openConfirmDialog = (operator) => {
    setOperatorToDelete(operator);
    setConfirmDialogOpen(true);
  };

  const closeConfirmDialog = () => {
    setOperatorToDelete(null);
    setConfirmDialogOpen(false);
  };

  const confirmDeleteOperator = () => {
    if (operatorToDelete) {
      handleDeleteOperator(operatorToDelete.id);
      closeConfirmDialog();
    }
  };

  const openEditDialog = (operator) => {
    setEditedOperator(operator);
    setEditDialogOpen(true);
  };

  const closeEditDialog = () => {
    setEditedOperator(null);
    setEditDialogOpen(false);
  };

  const handleEditOperator = async () => {
    try {
      await axios.put(
        `reports-production.up.railway.app/api/operator/${editedOperator.id}`,
        editedOperator
      );
      handleFetchOperators();
      closeEditDialog();
    } catch (error) {
      console.error("Error al editar manejador:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedOperator({ ...editedOperator, [name]: value });
  };

  return (
    <div>
      <h2 style={{ marginLeft: "10px" }}>Consultar Manejadores</h2>
      <div>
        <div className="operator-filters">
          <TextField
            label="Filtrar por ID"
            value={filterID}
            onChange={(e) => setFilterID(e.target.value)}
            className="operator-filter-id"
          />

          <Button
            variant="contained"
            color="primary"
            onClick={handleFetchOperators}
            className="operator-consult"
          >
            Consultar
          </Button>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "10px",
            marginTop: "50px",
          }}
        >
          <h3>Manejadores:</h3>
          <Button variant="outlined" component={Link} to="/operators/new">
            Crear Nuevo Manejador
          </Button>
        </div>
        <Box className="operator-table">
          <TableContainer component={Paper}>
            <Table aria-label="table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Nombre(s)</TableCell>
                  <TableCell>Apellidos</TableCell>
                  <TableCell>CURP</TableCell>
                  <TableCell>Fecha de nacimiento</TableCell>
                  <TableCell>Telefono</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredOperators.map((operator) => (
                  <TableRow key={operator.id}>
                    <TableCell>{operator.id}</TableCell>
                    <TableCell>{operator.name}</TableCell>
                    <TableCell>{operator.last_name}</TableCell>
                    <TableCell>{operator.curp}</TableCell>
                    <TableCell>{operator.birth}</TableCell>
                    <TableCell>{operator.number}</TableCell>
                    <TableCell>
                      <IconButton
                        color="primary"
                        onClick={() => openEditDialog(operator)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => openConfirmDialog(operator)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </div>

      <Dialog open={editDialogOpen} onClose={closeEditDialog}>
        <DialogTitle>Editar Manejador</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nombre(s)"
            type="text"
            name="name"
            value={editedOperator ? editedOperator.name : ""}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Apellidos"
            type="text"
            name="last_name"
            value={editedOperator ? editedOperator.last_name : ""}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="CURP"
            type="text"
            name="curp"
            value={editedOperator ? editedOperator.curp : ""}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Fecha de Nacimiento"
            type="date"
            name="birth"
            value={editedOperator ? editedOperator.birth : ""}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Teléfono"
            type="text"
            name="number"
            value={editedOperator ? editedOperator.number : ""}
            onChange={handleInputChange}
            fullWidth
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={closeEditDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleEditOperator} color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={confirmDialogOpen} onClose={closeConfirmDialog}>
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Estás seguro de que deseas eliminar este manejador?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeConfirmDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={confirmDeleteOperator} color="error">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default OperatorView;
