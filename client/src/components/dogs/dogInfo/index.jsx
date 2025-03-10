import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Button,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Grid,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import baseUrl from "../../../config";

const DogInfo = () => {
  const { id } = useParams();
  const [dog, setDog] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [editedDog, setEditedDog] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDogInfo = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/dog/${id}`);
        console.log("Dog details fetched successfully:", response.data); // Log adicional
        setDog(response.data);
      } catch (error) {
        console.error("Error al obtener detalles del perro:", error);
        setError(
          "No se pudo obtener los detalles del perro. Por favor, inténtelo de nuevo más tarde."
        );
      }
    };

    fetchDogInfo();
  }, [id]);

  const openEditDialog = () => {
    setEditedDog(dog);
    setEditDialogOpen(true);
  };

  const closeEditDialog = () => {
    setEditedDog(null);
    setEditDialogOpen(false);
  };

  const handleEditDog = async () => {
    try {
      await axios.put(`${baseUrl}/api/dog/${editedDog.id}`, editedDog);
      setDog(editedDog);
      closeEditDialog();
    } catch (error) {
      console.error("Error al editar perro:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedDog({ ...editedDog, [name]: value });
  };

  const openConfirmDialog = () => {
    setConfirmDialogOpen(true);
  };

  const closeConfirmDialog = () => {
    setConfirmDialogOpen(false);
  };

  const confirmDeleteDog = async () => {
    try {
      await axios.delete(`${baseUrl}/api/dog/${id}`);
      navigate("/dogs");
    } catch (error) {
      console.error("Error al eliminar perro:", error);
    }
  };

  if (error) {
    return <Typography>{error}</Typography>;
  }

  if (!dog) {
    return <Typography>Cargando...</Typography>;
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 2 }}
      >
        <Grid item>
          <Button
            variant="contained"
            sx={{ width: "80%", height: "90%" }}
            onClick={() => navigate("/dogs")}
          >
            Volver
          </Button>
        </Grid>
        <Grid item>
          <Box display="flex" alignItems="center">
            <IconButton color="primary" onClick={openEditDialog}>
              <EditIcon />
            </IconButton>
            <IconButton color="error" onClick={openConfirmDialog}>
              <DeleteIcon />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Detalles del K9
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Box sx={{ borderBottom: 1, borderColor: "divider", pb: 1 }}>
            <Typography variant="body1">Nombre: {dog.name}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box sx={{ borderBottom: 1, borderColor: "divider", pb: 1 }}>
            <Typography variant="body1">Raza: {dog.breed}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box sx={{ borderBottom: 1, borderColor: "divider", pb: 1 }}>
            <Typography variant="body1">Edad: {dog.age}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box sx={{ borderBottom: 1, borderColor: "divider", pb: 1 }}>
            <Typography variant="body1">Género: {dog.gender}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box sx={{ borderBottom: 1, borderColor: "divider", pb: 1 }}>
            <Typography variant="body1">Color: {dog.color}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box
            display="flex"
            alignItems="center"
            sx={{ borderBottom: 1, borderColor: "divider", pb: 1 }}
          >
            <Typography variant="body1">Vacunación: </Typography>
            {dog.pdf_url ? (
              <Box display="flex" alignItems="center" ml={1}>
                <IconButton
                  color="primary"
                  component="a"
                  href={dog.pdf_url}
                  target="_blank"
                  style={{ padding: 4 }}
                >
                  <PictureAsPdfIcon style={{ color: "red" }} />
                </IconButton>
              </Box>
            ) : (
              <Typography variant="body2" color="textSecondary" ml={1}>
                Sin documento
              </Typography>
            )}
          </Box>
        </Grid>
      </Grid>

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
    </Box>
  );
};

export default DogInfo;
