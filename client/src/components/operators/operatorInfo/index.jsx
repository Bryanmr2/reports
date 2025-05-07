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
import VisibilityIcon from "@mui/icons-material/Visibility";
import baseUrl from "../../../config";

const OperatorInfo = () => {
  const { id } = useParams();
  const [operator, setOperator] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [editedOperator, setEditedOperator] = useState(null);
  const [error, setError] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    action: "",
    docType: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOperatorInfo = async () => {
      try {
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
    const formData = new FormData();
    formData.append("name", editedOperator.name);
    formData.append("last_name", editedOperator.last_name);
    formData.append("curp", editedOperator.curp);
    formData.append("birth", editedOperator.birth);
    formData.append("number", editedOperator.number);
    formData.append("social_number", editedOperator.social_number);

    // Documento (Antidoping)
    if (editedOperator.file) {
      console.log(
        "Nuevo archivo de antidoping seleccionado:",
        editedOperator.file
      );
      formData.append("file", editedOperator.file);
    } else if (editedOperator.pdf_url === null) {
      console.log("Flag delete_file enviado");
      formData.append("delete_file", "true");
    }

    // Certificación
    if (editedOperator.certificacion) {
      console.log(
        "Nuevo archivo de certificación seleccionado:",
        editedOperator.certificacion
      );
      formData.append("certificacion", editedOperator.certificacion);
    } else if (editedOperator.certificacion_url === null) {
      console.log("Flag delete_certificacion enviado");
      formData.append("delete_certificacion", "true");
    }

    // Constancia
    if (editedOperator.constancia) {
      console.log(
        "Nuevo archivo de constancia seleccionado:",
        editedOperator.constancia
      );
      formData.append("constancia", editedOperator.constancia);
    } else if (editedOperator.constancia_url === null) {
      console.log("Flag delete_constancia enviado");
      formData.append("delete_constancia", "true");
    }

    // INE
    if (editedOperator.ine) {
      console.log("Nuevo archivo de INE seleccionado:", editedOperator.ine);
      formData.append("ine", editedOperator.ine);
    } else if (editedOperator.ine_url === null) {
      console.log("Flag delete_ine enviado");
      formData.append("delete_ine", "true");
    }

    // Antecedentes
    if (editedOperator.antecedentes) {
      formData.append("antecedentes", editedOperator.antecedentes);
    } else if (editedOperator.antecedentes_url === null) {
      formData.append("delete_antecedentes", "true");
    }

    // Añadido para Antecedentes2
    if (editedOperator.antecedentes2) {
      formData.append("antecedentes2", editedOperator.antecedentes2);
    } else if (editedOperator.antecedentes2_url === null) {
      formData.append("delete_antecedentes2", "true");
    }

    // Añadido para Acta
    if (editedOperator.acta) {
      formData.append("acta", editedOperator.acta);
    } else if (editedOperator.acta_url === null) {
      formData.append("delete_acta", "true");
    }

    // Añadido para CURP (PDF)
    if (editedOperator.curp_doc) {
      formData.append("curp_doc", editedOperator.curp_doc);
    } else if (editedOperator.curp_doc_url === null) {
      formData.append("delete_curp_doc", "true");
    }

    // Log de las entradas del FormData para verificar
    console.log("Contenido del FormData:");
    for (let [key, value] of formData.entries()) {
      console.log(key + ": ", value);
    }

    try {
      await axios.put(
        `${baseUrl}/api/operator/${editedOperator.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // Actualizamos el estado del operador con la información editada, que ahora incluye el URL temporal del PDF
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
              <strong>Teléfono:</strong> {operator.number}
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
        {/* Antidoping */}
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
        {/* Certificación */}
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
        {/* Constancia */}
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
        {/* INE */}
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
        <Grid item xs={12} sm={6}>
          <Box
            display="flex"
            alignItems="center"
            sx={{ borderBottom: 1, borderColor: "divider", pb: 1 }}
          >
            <Typography variant="body1">
              <strong>Antecedentes:</strong>
            </Typography>
            {operator.antecedentes2_url ? (
              <Box display="flex" alignItems="center" ml={1}>
                <IconButton
                  color="primary"
                  component="a"
                  href={operator.antecedentes2_url}
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
              <strong>Acta:</strong>
            </Typography>
            {operator.acta_url ? (
              <Box display="flex" alignItems="center" ml={1}>
                <IconButton
                  color="primary"
                  component="a"
                  href={operator.acta_url}
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
              <strong>CURP:</strong>
            </Typography>
            {operator.curp_doc_url ? (
              <Box display="flex" alignItems="center" ml={1}>
                <IconButton
                  color="primary"
                  component="a"
                  href={operator.curp_doc_url}
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

          {/* Documento (Antidoping) */}
          <Box
            mt={2}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Button variant="contained" component="label">
              {editedOperator?.pdf_url
                ? "Reemplazar antidoping"
                : "Subir documento (opcional)"}
              <input
                type="file"
                name="file"
                hidden
                onChange={(e) => {
                  const file = e.target.files[0];
                  setEditedOperator({
                    ...editedOperator,
                    file: file,
                    pdf_url: URL.createObjectURL(file),
                  });
                }}
              />
            </Button>
            {editedOperator?.pdf_url && (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <IconButton
                  color="primary"
                  onClick={() =>
                    setConfirmDialog({
                      open: true,
                      action: "view",
                      docType: "antidoping",
                    })
                  }
                  sx={{ ml: 2 }}
                >
                  <VisibilityIcon />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() =>
                    setConfirmDialog({
                      open: true,
                      action: "delete",
                      docType: "antidoping",
                    })
                  }
                  sx={{ ml: 1 }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            )}
          </Box>

          {/* Certificación */}
          <Box
            mt={2}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Button variant="contained" component="label">
              {editedOperator?.certificacion_url
                ? "Reemplazar certificación"
                : "Subir certificación (opcional)"}
              <input
                type="file"
                name="certificacion"
                hidden
                onChange={(e) => {
                  const file = e.target.files[0];
                  setEditedOperator({
                    ...editedOperator,
                    certificacion: file,
                    certificacion_url: URL.createObjectURL(file),
                  });
                }}
              />
            </Button>
            {editedOperator?.certificacion_url && (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <IconButton
                  color="primary"
                  onClick={() =>
                    setConfirmDialog({
                      open: true,
                      action: "view",
                      docType: "certificacion",
                    })
                  }
                  sx={{ ml: 2 }}
                >
                  <VisibilityIcon />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() =>
                    setConfirmDialog({
                      open: true,
                      action: "delete",
                      docType: "certificacion",
                    })
                  }
                  sx={{ ml: 1 }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            )}
          </Box>

          {/* Constancia */}
          <Box
            mt={2}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Button variant="contained" component="label">
              {editedOperator?.constancia_url
                ? "Reemplazar constancia"
                : "Subir constancia (opcional)"}
              <input
                type="file"
                name="constancia"
                hidden
                onChange={(e) => {
                  const file = e.target.files[0];
                  setEditedOperator({
                    ...editedOperator,
                    constancia: file,
                    constancia_url: URL.createObjectURL(file),
                  });
                }}
              />
            </Button>
            {editedOperator?.constancia_url && (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <IconButton
                  color="primary"
                  onClick={() =>
                    setConfirmDialog({
                      open: true,
                      action: "view",
                      docType: "constancia",
                    })
                  }
                  sx={{ ml: 2 }}
                >
                  <VisibilityIcon />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() =>
                    setConfirmDialog({
                      open: true,
                      action: "delete",
                      docType: "constancia",
                    })
                  }
                  sx={{ ml: 1 }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            )}
          </Box>

          {/* INE */}
          <Box
            mt={2}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Button variant="contained" component="label">
              {editedOperator?.ine_url
                ? "Reemplazar INE"
                : "Subir INE (opcional)"}
              <input
                type="file"
                name="ine"
                hidden
                onChange={(e) => {
                  const file = e.target.files[0];
                  setEditedOperator({
                    ...editedOperator,
                    ine: file,
                    ine_url: URL.createObjectURL(file),
                  });
                }}
              />
            </Button>
            {editedOperator?.ine_url && (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <IconButton
                  color="primary"
                  onClick={() =>
                    setConfirmDialog({
                      open: true,
                      action: "view",
                      docType: "ine",
                    })
                  }
                  sx={{ ml: 2 }}
                >
                  <VisibilityIcon />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() =>
                    setConfirmDialog({
                      open: true,
                      action: "delete",
                      docType: "ine",
                    })
                  }
                  sx={{ ml: 1 }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            )}
          </Box>

          {/* Antecedentes2 */}
          <Box
            mt={2}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Button variant="contained" component="label">
              {editedOperator?.antecedentes2_url
                ? "Reemplazar antecedentes 2"
                : "Subir antecedentes 2 (opcional)"}
              <input
                type="file"
                name="antecedentes2"
                hidden
                onChange={(e) => {
                  const file = e.target.files[0];
                  setEditedOperator({
                    ...editedOperator,
                    antecedentes2: file,
                    antecedentes2_url: URL.createObjectURL(file),
                  });
                }}
              />
            </Button>
            {editedOperator?.antecedentes2_url && (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <IconButton
                  color="primary"
                  onClick={() =>
                    setConfirmDialog({
                      open: true,
                      action: "view",
                      docType: "antecedentes2",
                    })
                  }
                  sx={{ ml: 2 }}
                >
                  <VisibilityIcon />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() =>
                    setConfirmDialog({
                      open: true,
                      action: "delete",
                      docType: "antecedentes2",
                    })
                  }
                  sx={{ ml: 1 }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            )}
          </Box>

          {/* Acta */}
          <Box
            mt={2}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Button variant="contained" component="label">
              {editedOperator?.acta_url
                ? "Reemplazar acta"
                : "Subir acta (opcional)"}
              <input
                type="file"
                name="acta"
                hidden
                onChange={(e) => {
                  const file = e.target.files[0];
                  setEditedOperator({
                    ...editedOperator,
                    acta: file,
                    acta_url: URL.createObjectURL(file),
                  });
                }}
              />
            </Button>
            {editedOperator?.acta_url && (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <IconButton
                  color="primary"
                  onClick={() =>
                    setConfirmDialog({
                      open: true,
                      action: "view",
                      docType: "acta",
                    })
                  }
                  sx={{ ml: 2 }}
                >
                  <VisibilityIcon />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() =>
                    setConfirmDialog({
                      open: true,
                      action: "delete",
                      docType: "acta",
                    })
                  }
                  sx={{ ml: 1 }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            )}
          </Box>

          {/* CURP (PDF) */}
          <Box
            mt={2}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Button variant="contained" component="label">
              {editedOperator?.curp_doc_url
                ? "Reemplazar CURP (PDF)"
                : "Subir CURP (PDF) (opcional)"}
              <input
                type="file"
                name="curp_doc"
                hidden
                onChange={(e) => {
                  const file = e.target.files[0];
                  setEditedOperator({
                    ...editedOperator,
                    curp_doc: file,
                    curp_doc_url: URL.createObjectURL(file),
                  });
                }}
              />
            </Button>
            {editedOperator?.curp_doc_url && (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <IconButton
                  color="primary"
                  onClick={() =>
                    setConfirmDialog({
                      open: true,
                      action: "view",
                      docType: "curp_doc",
                    })
                  }
                  sx={{ ml: 2 }}
                >
                  <VisibilityIcon />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() =>
                    setConfirmDialog({
                      open: true,
                      action: "delete",
                      docType: "curp_doc",
                    })
                  }
                  sx={{ ml: 1 }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            )}
          </Box>
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

      <Dialog
        open={confirmDialog.open}
        onClose={() => setConfirmDialog({ ...confirmDialog, open: false })}
      >
        <DialogTitle>
          {confirmDialog.action === "view"
            ? "Confirmar visualización"
            : "Confirmar eliminación"}
        </DialogTitle>
        <DialogContent>
          <Typography>
            {confirmDialog.action === "view"
              ? `¿Deseas ver el documento de ${confirmDialog.docType} actual?`
              : `¿Estás seguro de que deseas eliminar el documento de ${confirmDialog.docType}?`}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setConfirmDialog({ ...confirmDialog, open: false })}
            color="primary"
          >
            Cancelar
          </Button>
          <Button
            onClick={() => {
              if (confirmDialog.action === "view") {
                switch (confirmDialog.docType) {
                  case "antidoping":
                    window.open(editedOperator.pdf_url, "_blank");
                    break;
                  case "certificacion":
                    window.open(editedOperator.certificacion_url, "_blank");
                    break;
                  case "constancia":
                    window.open(editedOperator.constancia_url, "_blank");
                    break;
                  case "ine":
                    window.open(editedOperator.ine_url, "_blank");
                    break;
                  case "antecedentes2":
                    window.open(editedOperator.antecedentes2_url, "_blank");
                    break;
                  case "acta":
                    window.open(editedOperator.acta_url, "_blank");
                    break;
                  case "curp_doc":
                    window.open(editedOperator.curp_doc_url, "_blank");
                    break;
                }
              } else if (confirmDialog.action === "delete") {
                switch (confirmDialog.docType) {
                  case "antidoping":
                    setEditedOperator({
                      ...editedOperator,
                      pdf_url: null,
                      file: null,
                    });
                    break;
                  case "certificacion":
                    setEditedOperator({
                      ...editedOperator,
                      certificacion_url: null,
                      certificacion: null,
                    });
                    break;
                  case "constancia":
                    setEditedOperator({
                      ...editedOperator,
                      constancia_url: null,
                      constancia: null,
                    });
                    break;
                  case "ine":
                    setEditedOperator({
                      ...editedOperator,
                      ine_url: null,
                      ine: null,
                    });
                    break;
                  case "antecedentes2":
                    setEditedOperator({
                      ...editedOperator,
                      antecedentes2: null,
                      antecedentes2_url: null,
                    });
                    break;
                  case "acta":
                    setEditedOperator({
                      ...editedOperator,
                      acta: null,
                      acta_url: null,
                    });
                    break;
                  case "curp_doc":
                    setEditedOperator({
                      ...editedOperator,
                      curp_doc: null,
                      curp_doc_url: null,
                    });
                    break;
                  default:
                    break;
                }
              }
              setConfirmDialog({ ...confirmDialog, open: false });
            }}
            color={confirmDialog.action === "view" ? "primary" : "error"}
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default OperatorInfo;
