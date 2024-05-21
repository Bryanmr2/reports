import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import NativeSelect from "@mui/material/NativeSelect";
import axios from "axios";
import { PDFDownloadLink } from "@react-pdf/renderer";
import InspectPdf from "../pdf/InspectPDF";
import "./newReport.css";

const NewInspectReport = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm();

  const [successMessageVisible, setSuccessMessageVisible] = useState(false);
  const [formData, setFormData] = useState(null);

  const onSubmit = async (data) => {
    try {
      console.log("Submit button clicked");
      console.log("Form data:", data);
      setSuccessMessageVisible(true);
      setFormData(data);

      const response = await axios.post(
        "http://localhost:8000/api/createInspectReport",
        data
      );

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

  return (
    <>
      <br />
      <h2>Generar Reporte de Inspección </h2>
      {successMessageVisible ? (
        <div>
          <h2>Reporte generado con éxito</h2>
          {/* Que se vea el reporte aqui */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "10%",
            }}
          >
            {formData && (
              <PDFDownloadLink
                document={<InspectPdf data={formData} />}
                fileName="inspect_report.pdf"
              >
                {({ blob, url, loading, error }) => (
                  <Button variant="contained" style={{ width: "235px" }}>
                    {loading ? "Generando PDF..." : "Descargar reporte"}
                  </Button>
                )}
              </PDFDownloadLink>
            )}
            <Button
              onClick={handleNewReport}
              variant="contained"
              style={{ marginTop: "15px" }}
            >
              Generar nuevo reporte
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="reportForm">
          <div>
            <InputLabel htmlFor="location">Lugar</InputLabel>
            <OutlinedInput
              type="text"
              {...register("location", {
                required: {
                  value: true,
                  message: "El lugar es requerido",
                },
              })}
            />
            {errors.location && <span>{errors.location.message}</span>}

            <InputLabel htmlFor="date">Fecha</InputLabel>
            <TextField
              id="date"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              {...register("date", {
                required: {
                  value: true,
                  message: "La fecha es requerida",
                },
              })}
            />
            {errors.date && <span>{errors.date.message}</span>}

            <br />
            <br />
            <InputLabel htmlFor="name">Nombre</InputLabel>
            <OutlinedInput
              type="text"
              {...register("name", {
                required: {
                  value: true,
                  message: "El nombre es requerido",
                },
                minLength: {
                  value: 2,
                  message: "El nombre debe tener al menos 2 caracteres",
                },
                maxLength: {
                  value: 20,
                  message: "El nombre debe tener máximo 20 caracteres",
                },
              })}
            />
            {errors.name && <span>{errors.name.message}</span>}

            <InputLabel htmlFor="dog_name">Nombre del Can</InputLabel>
            <OutlinedInput
              type="text"
              {...register("dog_name", {
                required: {
                  value: true,
                  message: "El nombre del perro es requerido",
                },
                minLength: {
                  value: 2,
                  message: "El nombre debe tener al menos 2 caracteres",
                },
                maxLength: {
                  value: 20,
                  message: "El nombre debe tener máximo 20 caracteres",
                },
              })}
            />
            {errors.dog_name && <span>{errors.dog_name.message}</span>}

            <InputLabel htmlFor="corporate" variant="standard">
              Corporativo
            </InputLabel>
            <Controller
              name="corporate"
              control={control}
              defaultValue={""}
              render={({ field }) => (
                <NativeSelect
                  {...field}
                  inputProps={{
                    name: "corporate",
                    id: "uncontrolled-native",
                  }}
                >
                  <option value="" disabled>
                    Seleccione un corporativo
                  </option>
                  <option value={"TE Connectivy"}>TE Connectivy</option>
                  <option value={"Leoni"}>Leoni</option>
                  <option value={"BD Medical"}>BD Medical</option>
                  <option value={"EDS mfg México"}>EDS mfg México</option>
                  <option value={"Latécoere México"}>Latécoere México</option>
                  <option value={"The ILS Company"}>The ILS Company</option>
                  {/* <option value={"Otro"}>Otro</option> */}
                </NativeSelect>
              )}
              rules={{
                required: "Selecciona un corporativo",
              }}
            />

            <InputLabel htmlFor="plant">Planta</InputLabel>
            <OutlinedInput
              type="text"
              {...register("plant", {
                required: {
                  value: true,
                  message: "La planta es requerida",
                },
              })}
            />
            {errors.plant && <span>{errors.plant.message}</span>}

            <InputLabel htmlFor="shift" variant="standard">
              Turno
            </InputLabel>
            <Controller
              name="shift"
              control={control}
              defaultValue={""}
              render={({ field }) => (
                <NativeSelect
                  {...field}
                  inputProps={{
                    name: "shift",
                    id: "uncontrolled-native",
                  }}
                >
                  <option value="" disabled>
                    Seleccione un turno
                  </option>
                  <option value={"Diurno"}>Diurno</option>
                  <option value={"Nocturno"}>Nocturno</option>
                </NativeSelect>
              )}
              rules={{
                required: "Selecciona un turno",
              }}
            />

            <InputLabel htmlFor="inspection_area">
              Area de inspección
            </InputLabel>
            <OutlinedInput
              type="text"
              {...register("inspection_area", {
                required: {
                  value: true,
                  message: "El area es requerida",
                },
              })}
            />
            {errors.inspection_area && (
              <span>{errors.inspection_area.message}</span>
            )}

            <InputLabel htmlFor="inspection_description">
              Descripción de inspección
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

            <br />
            <InputLabel htmlFor="shipment_type" variant="standard">
              Embarque
            </InputLabel>
            <NativeSelect
              {...register("shipment_type", {
                required: "Selecciona un Embarque",
              })}
              inputProps={{
                name: "shipment_type",
                id: "uncontrolled-native",
              }}
            >
              <option value="" disabled>
                Seleccione un Embarque
              </option>
              <option value={"InspeccionCan"}>Inspección Canina</option>
            </NativeSelect>
            {errors.shipment_type && (
              <span>{errors.shipment_type.message}</span>
            )}

            <InputLabel htmlFor="start_time">Hora de inicio</InputLabel>
            <OutlinedInput
              type="time"
              {...register("start_time", {
                required: {
                  value: true,
                  message: "La hora de inicio es requerida",
                },
              })}
            />
            {errors.start_time && <span>{errors.start_time.message}</span>}

            <InputLabel htmlFor="inspected_areas">
              Áreas inspeccionadas
            </InputLabel>
            <OutlinedInput
              type="text"
              {...register("inspected_areas", {
                required: {
                  value: true,
                  message: "Las áreas inspeccionadas son requeridas",
                },
              })}
            />
            {errors.inspected_areas && (
              <span>{errors.inspected_areas.message}</span>
            )}

            <InputLabel htmlFor="end_time">Hora de finalización</InputLabel>
            <OutlinedInput
              type="time"
              {...register("end_time", {
                required: {
                  value: true,
                  message: "La hora de finalización es requerida",
                },
              })}
            />
            {errors.end_time && <span>{errors.end_time.message}</span>}

            <InputLabel htmlFor="security_items">
              Elementos de seguridad
            </InputLabel>
            <TextField
              multiline
              rows={4}
              variant="outlined"
              {...register("security_items")}
            />
            {errors.security_items && (
              <span>{errors.security_items.message}</span>
            )}

            <Button
              type="submit"
              variant="contained"
              style={{ marginTop: "15px" }}
            >
              Generar reporte
            </Button>
          </div>
        </form>
      )}
    </>
  );
};

export default NewInspectReport;
