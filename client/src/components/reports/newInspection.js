import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  MenuItem,
  Select,
  Typography,
  Modal,
  IconButton,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import PageLayout from "../common/PageLayout";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import InspectionRow from "./InspectionRow";
import GeneratePDF from "../pdf/GeneratePDF";

const NewInspection = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    getValues,
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      date: "",
      name: "",
      dog_name: "",
      plant: "",
      shift: "",
      inspection_type: "",
      inspection_description: "",
      shipment_inspections: [
        {
          shipment_type: "",
          hour: "",
          tractor_number: "",
          plates: "",
          company: "",
          driver: "",
          box_number: "",
          seal_number: "",
          incidence: "",
        },
      ],
      inspection_areas: [{ name: "", incidence: "" }],
    },
  });

  const [successMessageVisible, setSuccessMessageVisible] = useState(false);
  const [operatorNames, setOperatorNames] = useState([]);
  const [dogNames, setDogNames] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [shipmentInspectionData, setShipmentInspectionData] = useState({
    shipment_type: "",
    hour: "",
    tractor_number: "",
    plates: "",
    company: "",
    driver: "",
    box_number: "",
    seal_number: "",
    incidence: "",
  });
  const [shipmentInspections, setShipmentInspections] = useState([]);

  useEffect(() => {
    const fetchOperatorNames = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/operator");
        setOperatorNames(response.data.map((operator) => operator.name));
      } catch (error) {
        console.error("Error al obtener manejadores:", error);
      }
    };

    const fetchDogNames = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/dog");
        setDogNames(response.data.map((dog) => dog.name));
      } catch (error) {
        console.error("Error al obtener perros:", error);
      }
    };

    fetchOperatorNames();
    fetchDogNames();
  }, []);

  const onSubmit = async (data) => {
    try {
      console.log("Submit button clicked");
      console.log("Form data:", data);
      setSuccessMessageVisible(true);

      const response = await axios.post(
        `http://localhost:8000/api/createInspection`,
        data
      );

      console.log(response);

      if (response.status === 200) {
        console.log("Informe creado exitosamente");
      } else {
        console.error("Error al crear el reporte:", response.data.message);
      }
      console.log("Success");
    } catch (error) {
      console.error("Error de red:", error.message);
    }
  };

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleNewReport = () => {
    setSuccessMessageVisible(false);
    reset();
  };

  const handleAddNewShipment = () => {
    setShipmentInspections([...shipmentInspections, shipmentInspectionData]);
    setShipmentInspectionData({
      shipment_type: "",
      hour: "",
      tractor_number: "",
      plates: "",
      company: "",
      driver: "",
      box_number: "",
      seal_number: "",
      incidence: "",
    });
    handleCloseModal();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShipmentInspectionData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const inspection_areas = watch("inspection_areas");
  const inspection_type = watch("inspection_type");

  return (
    <PageLayout title="Inspección">
      {successMessageVisible ? (
        <div>
          <h2
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "6%",
            }}
          >
            Reporte generado con éxito
          </h2>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "6%",
            }}
          >
            <Button
              onClick={handleNewReport}
              variant="contained"
              style={{ marginTop: "15px" }}
            >
              Generar nueva inspección
            </Button>
            <GeneratePDF data={getValues()} />
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box>
            <InputLabel htmlFor="date">Fecha</InputLabel>
            <TextField
              {...register("date", {
                required: { value: true, message: "La fecha es requerida" },
              })}
              id="date"
              type="date"
              fullWidth
            />
            {errors.date && <span>{errors.date.message}</span>}
          </Box>
          <Box>
            <InputLabel htmlFor="name">Nombre</InputLabel>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={{ required: "Selecciona un nombre" }}
              render={({ field }) => (
                <Select {...field} fullWidth>
                  <MenuItem value="" disabled>
                    Seleccione un nombre
                  </MenuItem>
                  {operatorNames.map((name, index) => (
                    <MenuItem key={index} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            {errors.name && <span>{errors.name.message}</span>}
          </Box>
          <Box>
            <InputLabel htmlFor="dog_name">Nombre del can</InputLabel>
            <Controller
              name="dog_name"
              control={control}
              defaultValue=""
              rules={{ required: "Selecciona un nombre del can" }}
              render={({ field }) => (
                <Select {...field} fullWidth>
                  <MenuItem value="" disabled>
                    Seleccione un can
                  </MenuItem>
                  {dogNames.map((name, index) => (
                    <MenuItem key={index} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            {errors.dog_name && <span>{errors.dog_name.message}</span>}
          </Box>
          <Box>
            <InputLabel htmlFor="plant" variant="standard">
              Planta
            </InputLabel>
            <Controller
              name="plant"
              control={control}
              defaultValue=""
              rules={{ required: "Selecciona una planta" }}
              render={({ field }) => (
                <Select {...field} fullWidth>
                  <MenuItem value="" disabled>
                    Seleccione una planta
                  </MenuItem>
                  <MenuItem value="TE Connectivy">TE Connectivy</MenuItem>
                  <MenuItem value="Leoni">Leoni</MenuItem>
                  <MenuItem value="BD Medical">BD Medical</MenuItem>
                  <MenuItem value="EDS mfg México">EDS mfg México</MenuItem>
                  <MenuItem value="Latécoere México">Latécoere México</MenuItem>
                  <MenuItem value="The ILS Company">The ILS Company</MenuItem>
                </Select>
              )}
            />
          </Box>
          <Box>
            <InputLabel htmlFor="shift" variant="standard">
              Turno
            </InputLabel>
            <Controller
              name="shift"
              control={control}
              defaultValue=""
              rules={{ required: "Selecciona un turno" }}
              render={({ field }) => (
                <Select {...field} fullWidth>
                  <MenuItem value="" disabled>
                    Seleccione un turno
                  </MenuItem>
                  <MenuItem value="Diurno">Diurno</MenuItem>
                  <MenuItem value="Nocturno">Nocturno</MenuItem>
                </Select>
              )}
            />
          </Box>
          <Box>
            <InputLabel htmlFor="inspection_type" variant="standard">
              Tipo de Inspección
            </InputLabel>
            <Select
              id="inspection_type"
              defaultValue=""
              {...register("inspection_type", {
                required: "Seleccione un tipo de embarque",
              })}
              fullWidth
            >
              <MenuItem value="" disabled>
                Seleccione un tipo
              </MenuItem>
              <MenuItem value="site">Inspección de Sitio</MenuItem>
              <MenuItem value="shipment">Inspección de Embarque</MenuItem>
            </Select>
          </Box>
          {["shipment"].includes(inspection_type) && (
            <>
              <Button variant="outlined" onClick={handleOpenModal}>
                Agregar Áreas de Inspección
              </Button>
              <Box my={2}>
                {shipmentInspections.map((inspection, index) => (
                  <div key={index}>
                    <Typography>Tipo: {inspection.shipment_type}</Typography>
                    <Typography>Hora: {inspection.hour}</Typography>
                    <Typography>Tracto: {inspection.tractor_number}</Typography>
                    <Typography>Placas: {inspection.plates}</Typography>
                    <Typography>Compañía: {inspection.company}</Typography>
                    <Typography>Chofer: {inspection.driver}</Typography>
                    <Typography>Caja: {inspection.box_number}</Typography>
                    <Typography>Sello: {inspection.seal_number}</Typography>
                    <Typography>Incidencia: {inspection.incidence}</Typography>
                  </div>
                ))}
              </Box>
              <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
              >
                <Box
                  sx={{
                    p: 4,
                    backgroundColor: "white",
                    margin: "auto",
                    mt: 5,
                    maxWidth: 500,
                    height: "80vh",
                    overflowY: "auto",
                  }}
                >
                  <Typography variant="h6" id="modal-title">
                    Áreas de Inspección
                  </Typography>
                  <Box my={2}>
                    <InputLabel htmlFor="shipment_type">Tipo</InputLabel>
                    <Select
                      id="shipment_type"
                      name="shipment_type"
                      value={shipmentInspectionData.shipment_type}
                      onChange={handleChange}
                      fullWidth
                    >
                      <MenuItem value="" disabled>
                        Seleccione un tipo
                      </MenuItem>
                      <MenuItem value="Importación">Importación</MenuItem>
                      <MenuItem value="Exportación">Exportación</MenuItem>
                    </Select>
                  </Box>
                  <Box my={2}>
                    <InputLabel htmlFor="hour">Hora</InputLabel>
                    <TextField
                      id="hour"
                      name="hour"
                      value={shipmentInspectionData.hour}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Box>
                  <Box my={2}>
                    <InputLabel htmlFor="tractor_number">Tracto</InputLabel>
                    <TextField
                      id="tractor_number"
                      name="tractor_number"
                      value={shipmentInspectionData.tractor_number}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Box>
                  <Box my={2}>
                    <InputLabel htmlFor="plates">Placas</InputLabel>
                    <TextField
                      id="plates"
                      name="plates"
                      value={shipmentInspectionData.plates}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Box>
                  <Box my={2}>
                    <InputLabel htmlFor="company">Compañía</InputLabel>
                    <TextField
                      id="company"
                      name="company"
                      value={shipmentInspectionData.company}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Box>
                  <Box my={2}>
                    <InputLabel htmlFor="driver">Chofer</InputLabel>
                    <TextField
                      id="driver"
                      name="driver"
                      value={shipmentInspectionData.driver}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Box>
                  <Box my={2}>
                    <InputLabel htmlFor="box_number">Caja</InputLabel>
                    <TextField
                      id="box_number"
                      name="box_number"
                      value={shipmentInspectionData.box_number}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Box>
                  <Box my={2}>
                    <InputLabel htmlFor="seal_number">Sello</InputLabel>
                    <TextField
                      id="seal_number"
                      name="seal_number"
                      value={shipmentInspectionData.seal_number}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Box>
                  <Box my={2}>
                    <InputLabel htmlFor="incidence">Incidencia</InputLabel>
                    <Select
                      id="incidence"
                      name="incidence"
                      value={shipmentInspectionData.incidence}
                      onChange={handleChange}
                      fullWidth
                    >
                      <MenuItem value="" disabled>
                        Seleccione un tipo
                      </MenuItem>
                      <MenuItem value="Ninguna">Ninguna</MenuItem>
                      <MenuItem value="Marcaje">Marcaje</MenuItem>
                    </Select>
                  </Box>
                  <Box mt={2} textAlign="center">
                    <Button variant="contained" onClick={handleAddNewShipment}>
                      Guardar
                    </Button>
                  </Box>
                </Box>
              </Modal>
            </>
          )}

          {inspection_type === "site" && (
            <Box my={2}>
              <Typography variant="h6">Areas inspeccionadas</Typography>
              {inspection_areas.map((area, index) => (
                <InspectionRow
                  key={index}
                  register={register}
                  position={index}
                  removeInspectionArea={() => removeInspectionArea(index)}
                />
              ))}
              <Box my={1}>
                <Button variant="contained" onClick={() => handleAddNewArea()}>
                  Agregar area de inspeccion
                </Button>
              </Box>
            </Box>
          )}
          <Box>
            <InputLabel htmlFor="inspection_description">
              Descripción de incidencias
            </InputLabel>
            <TextField
              multiline
              rows={4}
              variant="outlined"
              {...register("inspection_description")}
              fullWidth
            />
            {errors.inspection_description && (
              <span>{errors.inspection_description.message}</span>
            )}
          </Box>
          <Box sx={{ margin: 2, textAlign: "center" }}>
            <Button variant="contained" type="submit">
              Generar Reporte
            </Button>
          </Box>
        </form>
      )}
    </PageLayout>
  );
};

export default NewInspection;
