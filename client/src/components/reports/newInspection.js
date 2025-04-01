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
import baseUrl from "../../config";

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
      inspection_type: "shipment",
      inspection_description: "",
      shipment_inspections: [],
      inspection_areas: [{ name: "", incidence: "" }],
    },
  });

  useEffect(() => {
    setValue("inspection_type", "shipment");
  }, [setValue]);

  const [successMessageVisible, setSuccessMessageVisible] = useState(false);
  const [operatorNames, setOperatorNames] = useState([]);
  const [dogNames, setDogNames] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
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
        const response = await axios.get(`${baseUrl}/api/operator`);
        setOperatorNames(response.data.map((operator) => operator.name));
      } catch (error) {
        console.error("Error al obtener manejadores:", error);
      }
    };

    const fetchDogNames = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/dog`);
        setDogNames(response.data.map((dog) => dog.name));
      } catch (error) {
        console.error("Error al obtener k9:", error);
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
        `${baseUrl}/api/createInspection`,
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

  const handleEditShipment = (index) => {
    setShipmentInspectionData(shipmentInspections[index]);
    setEditIndex(index);
    handleOpenModal();
  };

  const handleDeleteShipment = (index) => {
    const updatedInspections = [...shipmentInspections];
    updatedInspections.splice(index, 1);
    setShipmentInspections(updatedInspections);
    setValue("shipment_inspections", updatedInspections);
  };

  const handleSaveShipment = () => {
    const currentShipments = getValues("shipment_inspections") || [];
    let updatedShipments = [...currentShipments];

    if (editIndex !== null) {
      updatedShipments[editIndex] = shipmentInspectionData;
    } else {
      updatedShipments.push(shipmentInspectionData);
    }

    setValue("shipment_inspections", updatedShipments);
    setShipmentInspections(updatedShipments);
    setEditIndex(null);
    handleCloseModal();
  };

  const handleAddNewShipment = () => {
    const currentShipments = getValues("shipment_inspections") || [];
    const updatedShipments = [...currentShipments, shipmentInspectionData];
    setValue("shipment_inspections", updatedShipments);
    setShipmentInspections(updatedShipments);
    setShipmentInspectionData({
      shipment_type: "",
      tractor_number: "",
      plates: "",
      company: "",
      driver: "",
      box_number: "",
      seal_number: "",
      start_time: "", // New field for start time
      end_time: "", // New field for end time
      guide_number: "", // New field for guide number
      pallet_count: "", // New field for pallet count
      box_count: "",
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

  const handleAddNewArea = () => {
    const currentAreas = getValues("inspection_areas") || [];
    const updatedAreas = [...currentAreas, { name: "", incidence: "" }];
    setValue("inspection_areas", updatedAreas);
  };

  const removeInspectionArea = (index) => {
    const currentAreas = getValues("inspection_areas") || [];
    const updatedAreas = currentAreas.filter((_, i) => i !== index);
    setValue("inspection_areas", updatedAreas);
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
              width: "100%",
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
                <Select
                  {...field}
                  fullWidth
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 250,
                        overflow: "auto",
                      },
                    },
                  }}
                >
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
            <InputLabel htmlFor="dog_name">Nombre del K9</InputLabel>
            <Controller
              name="dog_name"
              control={control}
              defaultValue=""
              rules={{ required: "Selecciona un nombre del K9" }}
              render={({ field }) => (
                <Select
                  {...field}
                  fullWidth
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 250,
                        overflow: "auto",
                      },
                    },
                  }}
                >
                  <MenuItem value="" disabled>
                    Seleccione un K9
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
                <Select
                  {...field}
                  fullWidth
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 250,
                        overflow: "auto",
                      },
                    },
                  }}
                >
                  <MenuItem value="" disabled>
                    Seleccione una planta
                  </MenuItem>
                  <MenuItem value="TE Connectivy">TE Connectivy</MenuItem>
                  <MenuItem value="TE Connectivy 2">TE Connectivy 2</MenuItem>
                  <MenuItem value="TE Connectivy 3">TE Connectivy 3</MenuItem>
                  <MenuItem value="TE Connectivy 4">TE Connectivy 4</MenuItem>
                  <MenuItem value="TE Connectivy 5">TE Connectivy 5</MenuItem>
                  <MenuItem value="TE Connectivy ICT">
                    TE Connectivy ICT
                  </MenuItem>
                  <MenuItem value="TE Connectivy Medical">
                    TE Connectivy Medical
                  </MenuItem>
                  <MenuItem value="TE Connectivy Automotriz">
                    TE Connectivy Automotriz
                  </MenuItem>
                  <MenuItem value="TE Connectivy Industrial">
                    TE Connectivy Industrial
                  </MenuItem>
                  <MenuItem value="TE Connectivy Aeroespacial">
                    TE Connectivy Aeroespacial
                  </MenuItem>
                  <MenuItem value="Leoni">Leoni</MenuItem>
                  <MenuItem value="Leoni Quiroga">Leoni Quiroga</MenuItem>
                  <MenuItem value="Leoni Labor">Leoni Labor</MenuItem>
                  <MenuItem value="BD Medical">BD Medical</MenuItem>
                  <MenuItem value="EDS mfg México">EDS mfg México</MenuItem>
                  <MenuItem value="EDS Magdalena">EDS Magdalena</MenuItem>
                  <MenuItem value="EDS Hermosillo">EDS Hermosillo</MenuItem>
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
              defaultValue="shipment"
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
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button
                  sx={{ marginTop: "4%" }}
                  variant="outlined"
                  onClick={handleOpenModal}
                >
                  Agregar Áreas de Inspección
                </Button>
              </Box>
              <Box my={2}>
                {shipmentInspections.map((inspection, index) => (
                  <div style={{ display: "flex" }}>
                    <div key={index}>
                      <Typography>Tipo: {inspection.shipment_type}</Typography>
                      <Typography>Hora: {inspection.hour}</Typography>
                      <Typography>
                        Tracto: {inspection.tractor_number}
                      </Typography>
                      <Typography>Placas: {inspection.plates}</Typography>
                      <Typography>Compañía: {inspection.company}</Typography>
                      <Typography>Chofer: {inspection.driver}</Typography>
                      <Typography>Caja: {inspection.box_number}</Typography>
                      <Typography>Sello: {inspection.seal_number}</Typography>
                      <Typography>
                        Incidencia: {inspection.incidence}
                      </Typography>
                      <Box>
                        <IconButton onClick={() => handleEditShipment(index)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDeleteShipment(index)}>
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </div>
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
                  {/* <Box my={2}>
                    <InputLabel htmlFor="hour">Hora</InputLabel>
                    <TextField
                      id="hour"
                      name="hour"
                      value={shipmentInspectionData.hour}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Box> */}
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

                  {/* Add guide number field */}
                  <Box my={2}>
                    <InputLabel htmlFor="guide_number">
                      Número de Guía
                    </InputLabel>
                    <TextField
                      id="guide_number"
                      name="guide_number"
                      value={shipmentInspectionData.guide_number}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Box>

                  {/* Add start time field */}
                  <Box my={2}>
                    <InputLabel htmlFor="start_time">Hora de Inicio</InputLabel>
                    <TextField
                      id="start_time"
                      name="start_time"
                      type="time"
                      value={shipmentInspectionData.start_time}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Box>

                  {/* Add end time field */}
                  <Box my={2}>
                    <InputLabel htmlFor="end_time">
                      Hora de Finalización
                    </InputLabel>
                    <TextField
                      id="end_time"
                      name="end_time"
                      type="time"
                      value={shipmentInspectionData.end_time}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Box>

                  {/* Add pallet count field */}
                  <Box my={2}>
                    <InputLabel htmlFor="pallet_count">
                      Cantidad de Tarimas/Pallets (opcional)
                    </InputLabel>
                    <TextField
                      id="pallet_count"
                      name="pallet_count"
                      type="number"
                      value={shipmentInspectionData.pallet_count}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Box>

                  {/* Add box count field */}
                  <Box my={2}>
                    <InputLabel htmlFor="box_count">
                      Cantidad de Bultos/Cajas (opcional)
                    </InputLabel>
                    <TextField
                      id="box_count"
                      name="box_count"
                      type="number"
                      value={shipmentInspectionData.box_count}
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
                    <Button
                      variant="contained"
                      onClick={
                        editIndex !== null
                          ? handleSaveShipment
                          : handleAddNewShipment
                      }
                    >
                      {editIndex !== null ? "Actualizar" : "Guardar"}
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
