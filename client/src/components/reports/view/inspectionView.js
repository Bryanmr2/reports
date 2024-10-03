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
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TablePagination,
} from "@mui/material";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import baseUrl from "../../../config";
import GeneratePDF from "../../pdf/GeneratePDF";

const InspectionView = ({ inspections }) => {
  const [reports, setReports] = useState([]);
  const [open, setOpen] = useState(false);
  const [openPDFDialog, setOpenPDFDialog] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [pdfData, setPdfData] = useState(null);

  const handleFetchReports = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/inspections`);
      setReports(response.data);
    } catch (error) {
      console.error("Error al obtener inspecciones:", error);
    }
  };

  const handleDeleteReport = async (id) => {
    try {
      await axios.delete(`${baseUrl}/api/inspections/${id}`);
      handleFetchReports();
      handleClose();
    } catch (error) {
      console.error("Error al eliminar la inspección:", error);
    }
  };

  const handleClickOpen = (report) => {
    setSelectedReport(report);
    setOpen(true);
  };

  const handleOpenPDFDialog = (report) => {
    setSelectedReport(report);
    setOpenPDFDialog(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedReport(null);
  };

  const handleClosePDFDialog = () => {
    setOpenPDFDialog(false);
  };

  const handleGeneratePDF = () => {
    if (selectedReport) {
      console.log("Datos para PDF:", selectedReport);
      setPdfData(<GeneratePDF data={selectedReport} />);
      handleClosePDFDialog();
    } else {
      console.error(
        "No se ha seleccionado ningún informe para generar el PDF."
      );
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    handleFetchReports();
  }, []);

  return (
    <div>
      {pdfData ? (
        <div
          style={{
            position: "relative",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            padding: "20px",
            backgroundColor: "white",
            zIndex: 1000,
          }}
        >
          {pdfData}
          <Button
            onClick={() => setPdfData(null)}
            style={{ position: "absolute", top: 10 }}
          >
            Volver
          </Button>
        </div>
      ) : (
        <>
          <Box sx={{ marginTop: "40px", padding: "1%" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px",
              }}
            >
              <h3>Inspecciones:</h3>
              <Button
                variant="contained"
                component={Link}
                to="/inspections/new"
                sx={{ height: "100%", marginTop: "12px" }}
              >
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
                    <TableCell>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {reports.length > 0 ? (
                    reports
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((report) => (
                        <TableRow key={report.id}>
                          <TableCell>{report.date}</TableCell>
                          <TableCell>{report.name}</TableCell>
                          <TableCell>{report.dog_name}</TableCell>
                          <TableCell>{report.shift}</TableCell>
                          <TableCell>{report.plant}</TableCell>
                          <TableCell>{report.inspection_description}</TableCell>
                          <TableCell>
                            <IconButton
                              aria-label="generate pdf"
                              onClick={() => handleOpenPDFDialog(report)}
                              sx={{ color: "blue" }}
                            >
                              <PictureAsPdfIcon />
                            </IconButton>
                            <IconButton
                              aria-label="delete"
                              onClick={() => handleClickOpen(report)}
                              sx={{ color: "red" }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} align="center">
                        No hay datos disponibles
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>

              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={reports.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="Inspecciones por página"
              />
            </TableContainer>
          </Box>

          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Confirmar eliminación"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                ¿Estás seguro de que deseas eliminar esta inspección?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancelar</Button>
              <Button
                onClick={() => handleDeleteReport(selectedReport.id)}
                color="primary"
                autoFocus
              >
                Confirmar
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog
            open={openPDFDialog}
            onClose={handleClosePDFDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Confirmar generación de PDF"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                ¿Quieres consultar el PDF?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClosePDFDialog}>Cancelar</Button>
              <Button onClick={handleGeneratePDF} color="primary" autoFocus>
                Generar PDF
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </div>
  );
};

export default InspectionView;
