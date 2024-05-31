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
import "./dogsView.css";

const DogView = () => {
  const [dogs, setDogs] = useState([]);
  const [filterID, setFilterID] = useState("");
  const [filteredDogs, setFilteredDogs] = useState([]);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [dogToDelete, setDogToDelete] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editedDog, setEditedDog] = useState(null);

  const handleFetchDogs = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/dog");
      setDogs(response.data);
    } catch (error) {
      console.error("Error al obtener perros:", error);
    }
  };

  useEffect(() => {
    handleFetchDogs();
  }, []);

  useEffect(() => {
    if (filterID) {
      setFilteredDogs(
        dogs.filter((dog) => dog.id.toString().includes(filterID))
      );
    } else {
      setFilteredDogs(dogs);
    }
  }, [filterID, dogs]);

  const handleDeleteDog = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/dog/${id}`);
      handleFetchDogs();
    } catch (error) {
      console.error("Error al eliminar perro:", error);
    }
  };

  const openConfirmDialog = (dog) => {
    setDogToDelete(dog);
    setConfirmDialogOpen(true);
  };

  const closeConfirmDialog = () => {
    setDogToDelete(null);
    setConfirmDialogOpen(false);
  };

  const confirmDeleteDog = () => {
    if (dogToDelete) {
      handleDeleteDog(dogToDelete.id);
      closeConfirmDialog();
    }
  };

  const openEditDialog = (dog) => {
    setEditedDog(dog);
    setEditDialogOpen(true);
  };

  const closeEditDialog = () => {
    setEditedDog(null);
    setEditDialogOpen(false);
  };

  const handleEditDog = async () => {
    try {
      await axios.put(
        `http://localhost:8000/api/dog/${editedDog.id}`,
        editedDog
      );
      handleFetchDogs();
      closeEditDialog();
    } catch (error) {
      console.error("Error al editar perro:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedDog({ ...editedDog, [name]: value });
  };

  return (
    <div>
      <h2>Consultar Perros</h2>
      <div>
        <div className="dog-filters">
          <TextField
            label="Filtrar por ID"
            value={filterID}
            onChange={(e) => setFilterID(e.target.value)}
            className="dog-filter-id"
          />

          <Button
            variant="contained"
            color="primary"
            onClick={handleFetchDogs}
            className="dog-consult"
          >
            Consultar
          </Button>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "10px",
          }}
        >
          <h3>Perros:</h3>
          <Button variant="outlined" component={Link} to="/dogs/new">
            Crear Nuevo Perro
          </Button>
        </div>

        <Box className="dog-table">
          <TableContainer component={Paper}>
            <Table aria-label="table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Raza</TableCell>
                  <TableCell>Edad</TableCell>
                  <TableCell>Género</TableCell>
                  <TableCell>Color</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredDogs.map((dog) => (
                  <TableRow key={dog.id}>
                    <TableCell>{dog.id}</TableCell>
                    <TableCell>{dog.name}</TableCell>
                    <TableCell>{dog.breed}</TableCell>
                    <TableCell>{dog.age}</TableCell>
                    <TableCell>{dog.gender}</TableCell>
                    <TableCell>{dog.color}</TableCell>
                    <TableCell>
                      <IconButton
                        color="primary"
                        onClick={() => openEditDialog(dog)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => openConfirmDialog(dog)}
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
        <DialogTitle>Editar Perro</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nombre"
            type="text"
            name="name"
            value={editedDog ? editedDog.name : ""}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Raza"
            type="text"
            name="breed"
            value={editedDog ? editedDog.breed : ""}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Edad"
            type="text"
            name="age"
            value={editedDog ? editedDog.age : ""}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Género"
            type="text"
            name="gender"
            value={editedDog ? editedDog.gender : ""}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Color"
            type="text"
            name="color"
            value={editedDog ? editedDog.color : ""}
            onChange={handleInputChange}
            fullWidth
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={closeEditDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleEditDog} color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={confirmDialogOpen} onClose={closeConfirmDialog}>
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Estás seguro de que deseas eliminar este perro?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeConfirmDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={confirmDeleteDog} color="error">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DogView;
