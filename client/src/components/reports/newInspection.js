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
  const [modalAreas, setModalAreas] = useState([
    { title: "", description: "" },
  ]);
  const [showNextButton, setShowNextButton] = useState(false);
  const [markingType, setMarkingType] = useState("");
  const [savedAreas, setSavedAreas] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const shipment_type = watch("shipment_type");

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
  const handleCloseModal = () => {
    setOpenModal(false);
    setShowNextButton(false);
    setModalAreas([{ title: "", description: "" }]);
    setEditIndex(null);
  };

  const handleNewReport = () => {
    setSuccessMessageVisible(false);
    reset();
  };

  const handleAddNewArea = () => {
    const currentAreas = getValues("inspection_areas");
    const newArea = { area: "", incidence: "" };
    setValue("inspection_areas", [...currentAreas, newArea]);
  };

  const removeInspectionArea = (index) => {
    const currentAreas = getValues("inspection_areas");
    const updatedAreas = currentAreas.filter((_, i) => i !== index);
    setValue("inspection_areas", updatedAreas);
  };

  const handleAddArea = () => {
    setModalAreas([...modalAreas, { title: "", description: "" }]);
  };

  const handleRemoveArea = (index) => {
    const newAreas = modalAreas.filter((_, i) => i !== index);
    setModalAreas(newAreas);
  };

  const handleSaveAreas = () => {
    const newSavedAreas = [...savedAreas];
    const areaData = { areas: modalAreas, markingType };
    if (editIndex !== null) {
      newSavedAreas[editIndex] = areaData;
    } else {
      newSavedAreas.push(areaData);
    }
    setSavedAreas(newSavedAreas);
    handleCloseModal();
  };

  const handleNext = () => {
    setShowNextButton(true);
  };

  const handleEditArea = (index) => {
    setModalAreas(savedAreas[index].areas);
    setMarkingType(savedAreas[index].markingType);
    setEditIndex(index);
    handleOpenModal();
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
            <InputLabel htmlFor="shipment_type" variant="standard">
              Tipo de embarque
            </InputLabel>
            <Select
              id="shipment_type"
              defaultValue=""
              {...register("shipment_type", {
                required: "Seleccione un tipo de embarque",
              })}
              fullWidth
            >
              <MenuItem value="" disabled>
                Seleccione un embarque
              </MenuItem>
              <MenuItem value="importacion">Inspeccion de importacion</MenuItem>
              <MenuItem value="exportacion">Inspeccion de exportacion</MenuItem>
              <MenuItem value="inspeccion_canina">Inspección canina</MenuItem>
            </Select>
          </Box>
          {["importacion", "exportacion"].includes(shipment_type) && (
            <>
              <Box my={2}>
                <Button variant="outlined" onClick={handleOpenModal}>
                  Agregar áreas de inspección
                </Button>
                {savedAreas.length > 0 && (
                  <Box mt={2} p={2} border={1} borderColor="grey.400">
                    <Typography variant="h6">Áreas de inspección</Typography>
                    {savedAreas.map((areaData, index) => (
                      <Box
                        key={index}
                        mb={2}
                        p={2}
                        border={1}
                        borderColor="grey.300"
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Box>
                          <Typography>
                            <strong>Tipo de marcaje:</strong>{" "}
                            {areaData.markingType}
                          </Typography>
                          {areaData.areas.map((area, areaIndex) => (
                            <Box key={areaIndex} mb={1}>
                              <Typography>
                                <strong>Título:</strong> {area.title}
                              </Typography>
                              <Typography>
                                <strong>Descripción:</strong> {area.description}
                              </Typography>
                            </Box>
                          ))}
                        </Box>
                        <Box>
                          <IconButton onClick={() => handleEditArea(index)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            onClick={() =>
                              setSavedAreas(
                                savedAreas.filter((_, i) => i !== index)
                              )
                            }
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                )}
              </Box>
              <Modal open={openModal} onClose={handleCloseModal}>
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 400,
                    bgcolor: "background.paper",
                    border: "2px solid #000",
                    boxShadow: 24,
                    p: 4,
                    overflow: "scroll",
                    maxHeight: "80vh",
                  }}
                >
                  {showNextButton ? (
                    <>
                      <InputLabel htmlFor="marking_type">
                        Tipo de marcaje
                      </InputLabel>
                      <Select
                        id="marking_type"
                        value={markingType}
                        onChange={(e) => setMarkingType(e.target.value)}
                        fullWidth
                      >
                        <MenuItem value="">
                          Seleccione un tipo de marcaje
                        </MenuItem>
                        <MenuItem value="Ninguna">Ninguna</MenuItem>
                        <MenuItem value="Marcaje">Marcaje</MenuItem>
                      </Select>
                      <Button
                        variant="contained"
                        onClick={handleSaveAreas}
                        sx={{
                          display: "flex",
                          marginLeft: "60%",
                          marginTop: "5%",
                        }}
                      >
                        Guardar áreas
                      </Button>
                    </>
                  ) : (
                    <>
                      <Box>
                        {modalAreas.map((area, index) => (
                          <Box
                            key={index}
                            mb={2}
                            id={`area-${index}`}
                            display="flex"
                            alignItems="center"
                          >
                            <TextField
                              label="Título del área"
                              fullWidth
                              value={area.title}
                              onChange={(e) => {
                                const newAreas = [...modalAreas];
                                newAreas[index].title = e.target.value;
                                setModalAreas(newAreas);
                              }}
                            />
                            <Box ml={1} flexGrow={1} />
                            <TextField
                              label="Descripción del área"
                              fullWidth
                              value={area.description}
                              onChange={(e) => {
                                const newAreas = [...modalAreas];
                                newAreas[index].description = e.target.value;
                                setModalAreas(newAreas);
                              }}
                            />
                            <IconButton
                              onClick={() =>
                                setSavedAreas(
                                  savedAreas.filter((_, i) => i !== index)
                                )
                              }
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Box>
                        ))}
                      </Box>

                      <Box
                        height="30%"
                        display="flex"
                        justifyContent="space-between"
                      >
                        <Button variant="contained" onClick={handleAddArea}>
                          Agregar más áreas
                        </Button>
                        <Button variant="contained" onClick={handleNext}>
                          Siguiente
                        </Button>
                      </Box>
                    </>
                  )}
                </Box>
              </Modal>
            </>
          )}

          {shipment_type === "inspeccion_canina" && (
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
