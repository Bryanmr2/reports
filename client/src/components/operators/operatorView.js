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
  TablePagination,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "./operatorView.css";
import baseUrl from "../../config";

const OperatorView = () => {
  const [operators, setOperators] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFetchOperators = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/operator`);
      console.log("Operators fetched successfully:", response.data); // Log adicional
      setOperators(response.data);
    } catch (error) {
      console.error("Error fetching operators:", error);
    }
  };

  useEffect(() => {
    handleFetchOperators();
  }, []);

  const handleViewDetails = (operator) => {
    console.log(`Navigating to details for operator ID: ${operator.id}`);
    navigate(`/handlers/${operator.id}`);
  };

  return (
    <div>
      <h2 style={{ marginLeft: "10px" }}>Consultar Manejadores</h2>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "10px",
          }}
        >
          <h3>Lista de Manejadores:</h3>
          <Button
            variant="contained"
            size="small"
            sx={{ height: "40px" }}
            component={Link}
            to="/operators/new"
          >
            Crear Nuevo Manejador
          </Button>
        </div>

        <Box className="operator-table">
          <TableContainer component={Paper}>
            <Table aria-label="table">
              <TableHead>
                <TableRow>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Apellido</TableCell>
                  <TableCell align="right">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {operators
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((operator) => (
                    <TableRow key={operator.id}>
                      <TableCell>{operator.name}</TableCell>
                      <TableCell>{operator.last_name}</TableCell>
                      <TableCell align="right">
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => handleViewDetails(operator)}
                        >
                          Ver más detalles
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={operators.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        </Box>
      </div>
    </div>
  );
};

export default OperatorView;
