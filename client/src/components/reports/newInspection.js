import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import NativeSelect from "@mui/material/NativeSelect";
import axios from "axios";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PlantPdf from "../pdf/PlantPDF";
import ShipmentPdf from "../pdf/ShimpmentPDF";
import "./newInspection.css";

const NewInspection = ({ reportType }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm();
  const [successMessageVisible, setSuccessMessageVisible] = useState(false);
  const [formData, setFormData] = useState(null);
  const [shipmentType, setShipmentType] = useState("");
  const [operatorNames, setOperatorNames] = useState([]);
  const [dogNames, setDogNames] = useState([]);
  const [inspectionAreas, setInspectionAreas] = useState([]);
  const [newArea, setNewArea] = useState("");
  const [incidenceOptions, setIncidenceOptions] = useState([
    "Ninguna",
    "Marcaje",
  ]);

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
      setFormData(data);

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

  const handleAddArea = () => {
    setInspectionAreas([...inspectionAreas, { area: newArea, incidence: "" }]);
    setNewArea("");
  };

  const handleIncidenceChange = (index, incidence) => {
    const updatedAreas = [...inspectionAreas];
    updatedAreas[index].incidence = incidence;
    setInspectionAreas(updatedAreas);
  };
  return (
    <>
      <br />
      <h2>Generar Inspección</h2>
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
        <form onSubmit={handleSubmit(onSubmit)} className="reportForm">
          <div>
            <InputLabel htmlFor="date">Fecha</InputLabel>
            <TextField
              id="date"
              type="date"
              InputLabelProps={{ shrink: true }}
              {...register("date", {
                required: { value: true, message: "La fecha es requerida" },
              })}
            />
            {errors.date && <span>{errors.date.message}</span>}

            <br />
            <br />
            <InputLabel htmlFor="name">Nombre</InputLabel>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <NativeSelect
                  {...field}
                  inputProps={{ name: "name", id: "uncontrolled-native" }}
                >
                  <option value="" disabled>
                    Seleccione un nombre
                  </option>
                  {operatorNames.map((name, index) => (
                    <option key={index} value={name}>
                      {name}
                    </option>
                  ))}
                </NativeSelect>
              )}
              rules={{ required: "Selecciona un nombre" }}
            />
            {errors.name && <span>{errors.name.message}</span>}

            <InputLabel htmlFor="dog_name">Nombre del Can</InputLabel>
            <Controller
              name="dog_name"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <NativeSelect
                  {...field}
                  inputProps={{ name: "dog_name", id: "uncontrolled-native" }}
                >
                  <option value="" disabled>
                    Seleccione un nombre del can
                  </option>
                  {dogNames.map((name, index) => (
                    <option key={index} value={name}>
                      {name}
                    </option>
                  ))}
                </NativeSelect>
              )}
              rules={{ required: "Selecciona un nombre del can" }}
            />
            {errors.dog_name && <span>{errors.dog_name.message}</span>}

            <InputLabel htmlFor="plant" variant="standard">
              Planta
            </InputLabel>
            <Controller
              name="plant"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <NativeSelect
                  {...field}
                  inputProps={{ name: "plant", id: "uncontrolled-native" }}
                >
                  <option value="" disabled>
                    Seleccione una planta
                  </option>
                  <option value="TE Connectivy">TE Connectivy</option>
                  <option value="Leoni">Leoni</option>
                  <option value="BD Medical">BD Medical</option>
                  <option value="EDS mfg México">EDS mfg México</option>
                  <option value="Latécoere México">Latécoere México</option>
                  <option value="The ILS Company">The ILS Company</option>
                </NativeSelect>
              )}
              rules={{ required: "Selecciona una planta" }}
            />

            <InputLabel htmlFor="shift" variant="standard">
              Turno
            </InputLabel>
            <Controller
              name="shift"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <NativeSelect
                  {...field}
                  inputProps={{ name: "shift", id: "uncontrolled-native" }}
                >
                  <option value="" disabled>
                    Seleccione un turno
                  </option>
                  <option value="Diurno">Diurno</option>
                  <option value="Nocturno">Nocturno</option>
                </NativeSelect>
              )}
              rules={{ required: "Selecciona un turno" }}
            />

            <br />
            <InputLabel htmlFor="shipment_type" variant="standard">
              Asunto
            </InputLabel>
            <NativeSelect
              {...register("shipment_type", {
                required: "Selecciona un asunto",
                onChange: (e) => setShipmentType(e.target.value),
              })}
              inputProps={{ name: "shipment_type", id: "uncontrolled-native" }}
            >
              <option value="">Seleccione un Embarque</option>
              <option value="Importacion">Importacion</option>
              <option value="Exportacion">Exportacion</option>
              <option value="Consolidado">Consolidado</option>
              <option value="InspeccionCanina">Inspección Canina</option>
            </NativeSelect>

            {["Importacion", "Exportacion", "Consolidado"].includes(
              shipmentType
            ) && (
              <>
                <h3 style={{ marginTop: "30px" }}> Areas Inpsecionadas:</h3>
                <Box>
                  <InputLabel htmlFor="time" style={{ marginTop: "20px" }}>
                    Hora
                  </InputLabel>
                  <TextField
                    id="time"
                    type="time"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    {...register("time", {
                      required: "La hora es requerida",
                    })}
                  />

                  <InputLabel htmlFor="tractor">Tractor</InputLabel>
                  <TextField {...register("tractor")} />

                  <InputLabel htmlFor="plates">Placas</InputLabel>
                  <TextField {...register("plates")} />

                  <InputLabel htmlFor="company">Compañía</InputLabel>
                  <TextField {...register("company")} />

                  <InputLabel htmlFor="driver">Chofer</InputLabel>
                  <TextField {...register("driver")} />

                  <InputLabel htmlFor="box">Caja</InputLabel>
                  <TextField {...register("box")} />

                  <InputLabel htmlFor="seal">Sello</InputLabel>
                  <TextField {...register("seal")} />
                </Box>

                <InputLabel htmlFor="shipment_description">
                  Descripción del Embarque
                </InputLabel>
                <TextField
                  multiline
                  rows={4}
                  variant="outlined"
                  {...register("shipment_description")}
                />
                {errors.shipment_description && (
                  <span>{errors.shipment_description.message}</span>
                )}
              </>
            )}

            {shipmentType === "InspeccionCanina" && (
              <>
                <InputLabel htmlFor="inspection_area">
                  Áreas inspeccionadas
                </InputLabel>
                <Box className="areas-buttons">
                  <OutlinedInput
                    type="text"
                    className="areas-input"
                    onChange={(e) => setNewArea(e.target.value)}
                    value={newArea}
                  />
                  <Button
                    variant="outlined"
                    className="add-areas"
                    onClick={handleAddArea}
                  >
                    Agregar
                  </Button>
                </Box>
                <InputLabel htmlFor="inspection_area">Incidencias:</InputLabel>
                {inspectionAreas.map((area, index) => (
                  <div key={index}>
                    <p>{area.area}</p>
                    <NativeSelect
                      value={area.incidence}
                      onChange={(e) =>
                        handleIncidenceChange(index, e.target.value)
                      }
                    >
                      {incidenceOptions.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </NativeSelect>
                    <Button
                      variant="outlined"
                      className="erase-areas"
                      color="error"
                      onClick={() => {
                        const updatedAreas = [...inspectionAreas];
                        updatedAreas.splice(index, 1);
                        setInspectionAreas(updatedAreas);
                      }}
                    >
                      Eliminar
                    </Button>
                  </div>
                ))}
                <InputLabel htmlFor="inspection_description">
                  Descripción de Incidencias
                </InputLabel>
                <TextField
                  multiline
                  rows={4}
                  variant="outlined"
                  {...register("inspection_description")}
                />
                {errors.inspection_description && (
                  <span>{errors.inspection_description.message}</span>
                )}
              </>
            )}

            <Button variant="contained" type="submit">
              Generar Reporte
            </Button>
          </div>
        </form>
      )}
    </>
  );
};

export default NewInspection;
