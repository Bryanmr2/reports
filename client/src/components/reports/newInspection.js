import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Box, MenuItem, Select, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import PageLayout from "../common/PageLayout";
import axios from "axios";
import InspectionRow from "./InspectionRow";
import ShipmentRow from "./ShipmentRow";

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

  useEffect(() => {
    const fetchOperatorNames = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/operator");
        setOperatorNames(response.data.map((operator) => operator.name));
      } catch (error) {
        console.error("Error al obtener operadores:", error);
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

  const inspection_areas = watch("inspection_areas");
  const inspection_type = watch("inspection_type");

  return (
    <PageLayout title="Generar Inspección">
      {successMessageVisible ? (
        <div>
          <h2>Reporte generado con éxito</h2>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "10%",
            }}
          >
            <Button
              onClick={handleNewReport}
              variant="contained"
              style={{ marginTop: "15px" }}
            >
              Generar nueva inspección
            </Button>
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
              Tipo de inspeccion
            </InputLabel>
            <Select
              {...register("inspection_type", {
                required: "Selecciona un tipo de inspeccion",
              })}
              fullWidth
            >
              <MenuItem value="" disabled>
                Seleccione un embarque
              </MenuItem>
              <MenuItem value="importacion">Inspeccion de importacion</MenuItem>
              <MenuItem value="exportacion">Inspeccion de exportacion</MenuItem>
              <MenuItem value="consolidado">Inspeccion de consolidado</MenuItem>
              <MenuItem value="inspeccion_canina">Inspección canina</MenuItem>
            </Select>
          </Box>
          {["importacion", "exportacion", "consolidado"].includes(
            inspection_type
          ) && <ShipmentRow />}

          {inspection_type === "inspeccion_canina" && (
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
                  Agrear area de inspeccion
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
          <Box my={2}>
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
