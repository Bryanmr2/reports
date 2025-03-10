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
  TablePagination,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import baseUrl from "../../config";
import "./dogsView.css";

const DogView = () => {
  const [dogs, setDogs] = useState([]);
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

  const handleFetchDogs = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/dog`);
      console.log("Dogs fetched successfully:", response.data); // Log adicional
      setDogs(response.data);
    } catch (error) {
      console.error("Error al obtener k9:", error);
    }
  };

  useEffect(() => {
    handleFetchDogs();
  }, []);

  const handleViewDetails = (dog) => {
    navigate(`/dogs/${dog.id}`);
  };

  return (
    <div>
      <h2 style={{ marginLeft: "10px" }}>Consultar K9</h2>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "10px",
          }}
        >
          <h3>Lista de K9:</h3>
          <Button
            variant="contained"
            sx={{ height: "40px" }}
            component={Link}
            to="/dogs/new"
          >
            Crear Nuevo k9
          </Button>
        </div>

        <Box className="dog-table">
          <TableContainer component={Paper}>
            <Table aria-label="table">
              <TableHead>
                <TableRow>
                  <TableCell>Nombre</TableCell>
                  <TableCell align="right">Información</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dogs
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((dog) => (
                    <TableRow key={dog.id}>
                      <TableCell>{dog.name}</TableCell>
                      <TableCell align="right">
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => handleViewDetails(dog)}
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
              count={dogs.length}
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

export default DogView;
