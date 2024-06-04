import React, { useState } from "react";
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
            {/* {formData && shipmentType && (
              <PDFDownloadLink
                document={
                  shipmentType === "InspeccionCanina" ? (
                    <ShipmentPdf data={formData} />
                  ) : (
                    <PlantPdf data={formData} />
                  )
                }
                fileName={`${reportType}_report.pdf`}
              >
                {({ blob, url, loading, error }) => (
                  <Button variant="contained" style={{ width: "235px" }}>
                    {loading ? "Generando PDF..." : "Descargar reporte"}
                  </Button>
                )}
              </PDFDownloadLink>
            )} */}
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

            <>
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
            </>

            <InputLabel htmlFor="plant" variant="standard">
              Planta
            </InputLabel>
            <Controller
              name="plant"
              control={control}
              defaultValue={""}
              render={({ field }) => (
                <NativeSelect
                  {...field}
                  inputProps={{
                    name: "plant",
                    id: "uncontrolled-native",
                  }}
                >
                  <option value="" disabled>
                    Seleccione una planta
                  </option>
                  <option value={"TE Connectivy"}>TE Connectivy</option>
                  <option value={"Leoni"}>Leoni</option>
                  <option value={"BD Medical"}>BD Medical</option>
                  <option value={"EDS mfg México"}>EDS mfg México</option>
                  <option value={"Latécoere México"}>Latécoere México</option>
                  <option value={"The ILS Company"}>The ILS Company</option>
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
              rules={{ required: "Selecciona un turno" }}
            />

            <InputLabel htmlFor="inspection_area">
              Áreas inspeccionadas
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

            <br />
            <InputLabel htmlFor="shipment_type" variant="standard">
              Asunto
            </InputLabel>
            <NativeSelect
              {...register("shipment_type", {
                required: "Selecciona un asunto",
                onChange: (e) => setShipmentType(e.target.value),
              })}
              inputProps={{
                name: "shipment_type",
                id: "uncontrolled-native",
              }}
            >
              <option value="">Seleccione un Embarque</option>
              <option value={"Importacion"}>Importacion</option>
              <option value={"Exportacion"}>Exportacion</option>
              <option value={"Consolidado"}>Consolidado</option>
              <option value={"InspeccionCanina"}>Inspección Canina</option>
            </NativeSelect>

            {shipmentType === "InspeccionCanina" ? (
              <>
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

                <InputLabel htmlFor="mark_time">Hora de marcaje</InputLabel>
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

                <InputLabel htmlFor="result">Resultado</InputLabel>
                <TextField
                  multiline
                  rows={4}
                  variant="outlined"
                  {...register("result")}
                />

                <InputLabel htmlFor="recomendations">
                  Recomendaciones
                </InputLabel>
                <TextField
                  multiline
                  rows={4}
                  variant="outlined"
                  {...register("recomentations")}
                />

                <InputLabel htmlFor="coments">Comentarios</InputLabel>
                <TextField
                  multiline
                  rows={4}
                  variant="outlined"
                  {...register("coments")}
                />

                <InputLabel htmlFor="Evidence">Evidencia</InputLabel>
                <TextField
                  multiline
                  rows={4}
                  variant="outlined"
                  {...register("Evidence")}
                />
              </>
            ) : (
              shipmentType && (
                <>
                  <br />
                  <InputLabel htmlFor="carrier_company">
                    Compañía transportista
                  </InputLabel>
                  <OutlinedInput
                    type="text"
                    {...register("carrier_company", {
                      required: {
                        value: true,
                        message: "La compañia es requerida",
                      },
                    })}
                  />
                  {errors.carrier_company && (
                    <span>{errors.carrier_company.message}</span>
                  )}

                  <InputLabel htmlFor="operator_name">
                    Nombre del operador
                  </InputLabel>
                  <OutlinedInput
                    type="text"
                    {...register("operator_name", {
                      required: {
                        value: true,
                        message: "El nombre es requerido",
                      },
                    })}
                  />
                  {errors.operator_name && (
                    <span>{errors.operator_name.message}</span>
                  )}

                  <InputLabel htmlFor="tractor_brand">Marca</InputLabel>
                  <OutlinedInput
                    type="text"
                    {...register("tractor_brand", {
                      required: {
                        value: true,
                        message: "La marca es requerida",
                      },
                    })}
                  />
                  {errors.tractor_brand && (
                    <span>{errors.tractor_brand.message}</span>
                  )}

                  <InputLabel htmlFor="tractor_color">Color</InputLabel>
                  <OutlinedInput
                    type="text"
                    {...register("tractor_color", {
                      required: {
                        value: true,
                        message: "El Color es requerido",
                      },
                    })}
                  />
                  {errors.tractor_color && (
                    <span>{errors.tractor_color.message}</span>
                  )}

                  <InputLabel htmlFor="tractor_model">Modelo</InputLabel>
                  <OutlinedInput
                    type="text"
                    {...register("tractor_model", {
                      required: {
                        value: true,
                        message: "El modelo es requerida",
                      },
                    })}
                  />
                  {errors.tractor_model && (
                    <span>{errors.tractor_model.message}</span>
                  )}

                  <InputLabel htmlFor="tractor_plate">Placas</InputLabel>
                  <OutlinedInput
                    type="text"
                    {...register("tractor_plate", {
                      required: {
                        value: true,
                        message: "Las placas son requeridas",
                      },
                    })}
                  />
                  {errors.tractor_plate && (
                    <span>{errors.tractor_plate.message}</span>
                  )}

                  <InputLabel htmlFor="tractor_number">
                    Número de tracto
                  </InputLabel>
                  <OutlinedInput
                    type="text"
                    {...register("tractor_number", {
                      required: {
                        value: true,
                        message: "El número es requerido",
                      },
                    })}
                  />
                  {errors.tractor_number && (
                    <span>{errors.tractor_number.message}</span>
                  )}

                  <InputLabel htmlFor="trailer_number">
                    Número de caja
                  </InputLabel>
                  <OutlinedInput
                    type="text"
                    {...register("trailer_number", {
                      required: {
                        value: true,
                        message: "El número es requerido",
                      },
                    })}
                  />
                  {errors.trailer_number && (
                    <span>{errors.trailer_number.message}</span>
                  )}

                  <InputLabel htmlFor="shipment_number">
                    Número de embarque
                  </InputLabel>
                  <OutlinedInput
                    type="text"
                    {...register("shipment_number", {
                      required: {
                        value: true,
                        message: "El número es requerido",
                      },
                    })}
                  />
                  {errors.shipment_number && (
                    <span>{errors.shipment_number.message}</span>
                  )}

                  <InputLabel htmlFor="total_skids">Total skids </InputLabel>
                  <OutlinedInput
                    type="text"
                    {...register("total_skids", {
                      required: {
                        value: true,
                        message: "El total es requerido",
                      },
                    })}
                  />
                  {errors.total_skids && (
                    <span>{errors.total_skids.message}</span>
                  )}

                  <InputLabel htmlFor="stamps_number">
                    Número de sellos
                  </InputLabel>
                  <OutlinedInput
                    type="text"
                    {...register("stamps_number", {
                      required: {
                        value: true,
                        message: "El número es requerido",
                      },
                    })}
                  />
                  {errors.stamps_number && (
                    <span>{errors.stamps_number.message}</span>
                  )}

                  <InputLabel htmlFor="security_company">
                    Compañia de Seguridad
                  </InputLabel>
                  <OutlinedInput
                    type="text"
                    {...register("security_company", {
                      required: {
                        value: true,
                        message: "La compañia es requerida",
                      },
                    })}
                  />
                  {errors.security_company && (
                    <span>{errors.security_company.message}</span>
                  )}

                  <InputLabel htmlFor="guard_names">
                    Nombre de guardias
                  </InputLabel>
                  <OutlinedInput
                    type="text"
                    {...register("guard_names", {
                      required: {
                        value: true,
                        message: "Los nombres son requeridos",
                      },
                    })}
                  />
                  {errors.guard_names && (
                    <span>{errors.guard_names.message}</span>
                  )}

                  <InputLabel htmlFor="custody_company">
                    Compañia de Custodia
                  </InputLabel>
                  <OutlinedInput
                    type="text"
                    {...register("custody_company", {
                      required: {
                        value: true,
                        message: "La compañia es requerida",
                      },
                    })}
                  />
                  {errors.custody_company && (
                    <span>{errors.custody_company.message}</span>
                  )}

                  <InputLabel htmlFor="custodian_names">
                    Nombre de custodios
                  </InputLabel>
                  <OutlinedInput
                    type="text"
                    {...register("custodian_names", {
                      required: {
                        value: true,
                        message: "El nombre es requerido",
                      },
                    })}
                  />
                  {errors.custodian_names && (
                    <span>{errors.custodian_names.message}</span>
                  )}

                  <InputLabel htmlFor="custody_unit_number">
                    Número de unidad de custodia
                  </InputLabel>
                  <OutlinedInput
                    type="text"
                    {...register("custody_unit_number", {
                      required: {
                        value: true,
                        message: "El número es requerido",
                      },
                    })}
                  />
                  {errors.custody_unit_number && (
                    <span>{errors.custody_unit_number.message}</span>
                  )}

                  <InputLabel htmlFor="departure_time">
                    Hora de salida
                  </InputLabel>
                  <OutlinedInput
                    type="text"
                    {...register("departure_time", {
                      required: {
                        value: true,
                        message: "La hora es requerida",
                      },
                    })}
                  />
                  {errors.departure_time && (
                    <span>{errors.departure_time.message}</span>
                  )}
                </>
              )
            )}
          </div>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              type="submit"
              style={{
                display: "flex",
                alignContent: "center",
                width: "235px",
                marginTop: "10px",
              }}
            >
              Generar Inspección
            </Button>
          </Box>
        </form>
      )}
    </>
  );
};

export default NewInspection;
