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

const OperatorInfo = () => {
  const { id } = useParams();
  const [operator, setOperator] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [editedOperator, setEditedOperator] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOperatorInfo = async () => {
      try {
        console.log(`Fetching details for operator ID: ${id}`);
        const response = await axios.get(`${baseUrl}/api/operator/${id}`);
        console.log("Operator details fetched successfully:", response.data);
        setOperator(response.data);
      } catch (error) {
        console.error("Error al obtener detalles del operador:", error);
        setError(
          "No se pudo obtener los detalles del operador. Por favor, inténtelo de nuevo más tarde."
        );
      }
    };

    fetchOperatorInfo();
  }, [id]);

  const openEditDialog = () => {
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
        `${baseUrl}/api/operator/${editedOperator.id}`,
        editedOperator
      );
      setOperator(editedOperator);
      closeEditDialog();
    } catch (error) {
      console.error("Error al editar operador:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedOperator({ ...editedOperator, [name]: value });
  };

  const handleFileChange = (e) => {
    setEditedOperator({ ...editedOperator, file: e.target.files[0] });
  };

  const openConfirmDialog = () => {
    setConfirmDialogOpen(true);
  };

  const closeConfirmDialog = () => {
    setConfirmDialogOpen(false);
  };

  const confirmDeleteOperator = async () => {
    try {
      await axios.delete(`${baseUrl}/api/operator/${id}`);
      navigate("/operators");
    } catch (error) {
      console.error("Error al eliminar operador:", error);
    }
  };

  if (error) {
    return <Typography>{error}</Typography>;
  }

  if (!operator) {
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
          <Button variant="contained" onClick={() => navigate("/handlers")}>
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
        Detalles del Manejador
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Box sx={{ borderBottom: 1, borderColor: "divider", pb: 1 }}>
            <Typography variant="body1">
              <strong>Nombre:</strong> {operator.name}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box sx={{ borderBottom: 1, borderColor: "divider", pb: 1 }}>
            <Typography variant="body1">
              <strong>Apellido:</strong> {operator.last_name}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box sx={{ borderBottom: 1, borderColor: "divider", pb: 1 }}>
            <Typography variant="body1">
              <strong>CURP:</strong> {operator.curp}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box sx={{ borderBottom: 1, borderColor: "divider", pb: 1 }}>
            <Typography variant="body1">
              <strong>Fecha de nacimiento:</strong> {operator.birth}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box sx={{ borderBottom: 1, borderColor: "divider", pb: 1 }}>
            <Typography variant="body1">
              <strong>Telefono:</strong> {operator.number}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box sx={{ borderBottom: 1, borderColor: "divider", pb: 1 }}>
            <Typography variant="body1">
              <strong>Número de SS:</strong> {operator.social_number}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box
            display="flex"
            alignItems="center"
            sx={{ borderBottom: 1, borderColor: "divider", pb: 1 }}
          >
            <Typography variant="body1">
              <strong>Antidoping:</strong>
            </Typography>
            {operator.pdf_url ? (
              <Box display="flex" alignItems="center" ml={1}>
                <IconButton
                  color="primary"
                  component="a"
                  href={operator.pdf_url}
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

        <Grid item xs={12} sm={6}>
          <Box
            display="flex"
            alignItems="center"
            sx={{ borderBottom: 1, borderColor: "divider", pb: 1 }}
          >
            <Typography variant="body1">
              <strong>Certificación:</strong>
            </Typography>
            {operator.certificacion_url ? (
              <Box display="flex" alignItems="center" ml={1}>
                <IconButton
                  color="primary"
                  component="a"
                  href={operator.certificacion_url}
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

        <Grid item xs={12} sm={6}>
          <Box
            display="flex"
            alignItems="center"
            sx={{ borderBottom: 1, borderColor: "divider", pb: 1 }}
          >
            <Typography variant="body1">
              <strong>Constancia:</strong>
            </Typography>
            {operator.constancia_url ? (
              <Box display="flex" alignItems="center" ml={1}>
                <IconButton
                  color="primary"
                  component="a"
                  href={operator.constancia_url}
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

        <Grid item xs={12} sm={6}>
          <Box
            display="flex"
            alignItems="center"
            sx={{ borderBottom: 1, borderColor: "divider", pb: 1 }}
          >
            <Typography variant="body1">
              <strong>INE:</strong>
            </Typography>
            {operator.ine_url ? (
              <Box display="flex" alignItems="center" ml={1}>
                <IconButton
                  color="primary"
                  component="a"
                  href={operator.ine_url}
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
        <DialogTitle>Editar Operador</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nombre"
            type="text"
            name="name"
            value={editedOperator ? editedOperator.name : ""}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Apellido"
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
            label="Fecha de nacimiento"
            type="text"
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
          <TextField
            margin="dense"
            label="Número de SS"
            type="text"
            name="social_number"
            value={editedOperator ? editedOperator.social_number : ""}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Documento (opcional)"
            type="file"
            name="file"
            onChange={handleFileChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Certificación (opcional)"
            type="file"
            name="certificacion"
            onChange={(e) =>
              setEditedOperator({
                ...editedOperator,
                certificacion: e.target.files[0],
              })
            }
            fullWidth
          />
          <TextField
            margin="dense"
            label="Constancia (opcional)"
            type="file"
            name="constancia"
            onChange={(e) =>
              setEditedOperator({
                ...editedOperator,
                constancia: e.target.files[0],
              })
            }
            fullWidth
          />
          <TextField
            margin="dense"
            label="INE (opcional)"
            type="file"
            name="ine"
            onChange={(e) =>
              setEditedOperator({ ...editedOperator, ine: e.target.files[0] })
            }
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
            ¿Estás seguro de que deseas eliminar este operador?
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
    </Box>
  );
};

export default OperatorInfo;
