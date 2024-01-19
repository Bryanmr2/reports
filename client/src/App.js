import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import NativeSelect from "@mui/material/NativeSelect";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";

const App = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    reset();
    //fetch
  });

  const [embarque, setEmbarque] = useState("");
  const [showAdditionalInputs, setShowAdditionalInputs] = useState(false);

  const handleEmbarqueChange = (event) => {
    const selectedEmbarque = event.target.value;
    setEmbarque(selectedEmbarque);

    // Determina si mostrar los inputs adicionales
    setShowAdditionalInputs(selectedEmbarque === "InspeccionCan");
  };

  return (
    <>
      <AppBar position="static" className="bar">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            SIIPCCSP
          </Typography>
          <Button color="inherit">Ingresar</Button>
        </Toolbar>
      </AppBar>

      <h2>Generar Reporte</h2>
      <form onSubmit={onSubmit} className="reportForm">
        <InputLabel htmlFor="lugar">Lugar</InputLabel>
        <OutlinedInput
          type="text"
          {...register("lugar", {
            required: {
              value: true,
              message: "El lugar es requerido",
            },
          })}
        />
        {errors.lugar && <span>{errors.lugar.message}</span>}

        <InputLabel htmlFor="fecha">Fecha</InputLabel>
        <TextField
          id="date"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          {...register("fecha", {
            required: {
              value: true,
              message: "La fecha es requerida",
            },
          })}
        />
        {errors.fecha && <span>{errors.fecha.message}</span>}

        <InputLabel htmlFor="nombre">Nombre</InputLabel>
        <OutlinedInput
          type="text"
          {...register("nombre", {
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
        {errors.nombre && <span>{errors.nombre.message}</span>}

        <InputLabel htmlFor="nombreCan">Nombre del Can</InputLabel>
        <OutlinedInput
          type="text"
          {...register("nombreCan", {
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
        {errors.nombreCan && <span>{errors.nombreCan.message}</span>}

        <InputLabel htmlFor="corporativo" variant="standard">
          Corporativo
        </InputLabel>
        <Controller
          name="corporativo"
          control={control}
          defaultValue={""}
          render={({ field }) => (
            <NativeSelect
              {...field}
              inputProps={{
                name: "corporativo",
                id: "uncontrolled-native",
              }}
            >
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

        <InputLabel htmlFor="planta">Planta</InputLabel>
        <OutlinedInput
          type="text"
          {...register("planta", {
            required: {
              value: true,
              message: "La planta es requerida",
            },
          })}
        />
        {errors.planta && <span>{errors.planta.message}</span>}

        <InputLabel htmlFor="turno" variant="standard">
          Turno
        </InputLabel>
        <Controller
          name="corporativo"
          control={control}
          defaultValue={""}
          render={({ field }) => (
            <NativeSelect
              {...field}
              inputProps={{
                name: "turno",
                id: "uncontrolled-native",
              }}
            >
              <option value={"Diurno"}>Diurno</option>
              <option value={"Nocturno"}>Nocturno</option>
            </NativeSelect>
          )}
          rules={{
            required: "Selecciona un turno",
          }}
        />

        <InputLabel htmlFor="areaInsp">Area de inspección</InputLabel>
        <OutlinedInput
          type="text"
          {...register("areaInsp", {
            required: {
              value: true,
              message: "El area es requerida",
            },
          })}
        />

        <InputLabel htmlFor="descripcion">Descripción de inspección</InputLabel>
        <TextField
          label="Texto Largo"
          multiline
          rows={4}
          variant="outlined"
          {...register("descripcion")}
        />

        <InputLabel htmlFor="embarque" variant="standard">
          Embarque
        </InputLabel>
        <Controller
          name="embarque"
          control={control}
          defaultValue={""}
          render={({ field }) => (
            <NativeSelect
              {...field}
              inputProps={{
                name: "embarque",
                id: "uncontrolled-native",
              }}
              onChange={handleEmbarqueChange}
            >
              <option value={"Importacion"}>Importacion</option>
              <option value={"Exportacion"}>Exportacion</option>
              <option value={"Consolidado"}>Consolidado</option>
              <option value={"InspeccionCan"}>Inspección canina</option>
            </NativeSelect>
          )}
          rules={{
            required: "Selecciona un Embarque",
          }}
        />
        {["Importacion", "Exportacion", "Consolidado"].includes(embarque) && (
          <>
            <br />
            <InputLabel htmlFor="compania">Compañía transportista</InputLabel>
            <OutlinedInput
              type="text"
              {...register("compania", {
                required: {
                  value: true,
                  message: "La compañia es requerida",
                },
              })}
            />
            {errors.compania && <span>{errors.compania.message}</span>}

            <InputLabel htmlFor="nombreOpe">Nombre del operador</InputLabel>
            <OutlinedInput
              type="text"
              {...register("nombreOpe", {
                required: {
                  value: true,
                  message: "El nombre es requerido",
                },
              })}
            />
            {errors.nombreOpe && <span>{errors.nombreOpe.message}</span>}

            <InputLabel htmlFor="marca">Marca</InputLabel>
            <OutlinedInput
              type="text"
              {...register("marca", {
                required: {
                  value: true,
                  message: "La marca es requerida",
                },
              })}
            />
            {errors.marca && <span>{errors.marca.message}</span>}

            <InputLabel htmlFor="color">Color</InputLabel>
            <OutlinedInput
              type="text"
              {...register("color", {
                required: {
                  value: true,
                  message: "El Color es requerido",
                },
              })}
            />
            {errors.color && <span>{errors.color.message}</span>}

            <InputLabel htmlFor="modelo">Modelo</InputLabel>
            <OutlinedInput
              type="text"
              {...register("modelo", {
                required: {
                  value: true,
                  message: "El modelo es requerida",
                },
              })}
            />
            {errors.modelo && <span>{errors.modelo.message}</span>}

            <InputLabel htmlFor="placas">Placas</InputLabel>
            <OutlinedInput
              type="text"
              {...register("placas", {
                required: {
                  value: true,
                  message: "Las placas son requeridas",
                },
              })}
            />
            {errors.placas && <span>{errors.placas.message}</span>}

            <InputLabel htmlFor="numTracto">Número de tracto</InputLabel>
            <OutlinedInput
              type="text"
              {...register("numTracto", {
                required: {
                  value: true,
                  message: "El número es requerido",
                },
              })}
            />
            {errors.numTracto && <span>{errors.numTracto.message}</span>}

            <InputLabel htmlFor="numCaja">Número de caja</InputLabel>
            <OutlinedInput
              type="text"
              {...register("numCaja", {
                required: {
                  value: true,
                  message: "El número es requerido",
                },
              })}
            />
            {errors.numCaja && <span>{errors.numCaja.message}</span>}

            <InputLabel htmlFor="numEmbarque">Número de embarque</InputLabel>
            <OutlinedInput
              type="text"
              {...register("numEmbarque", {
                required: {
                  value: true,
                  message: "El número es requerido",
                },
              })}
            />
            {errors.numEmbarque && <span>{errors.numEmbarque.message}</span>}

            <InputLabel htmlFor="totalSkids">Total skids </InputLabel>
            <OutlinedInput
              type="text"
              {...register("totalSkids", {
                required: {
                  value: true,
                  message: "El total es requerido",
                },
              })}
            />
            {errors.totalSkids && <span>{errors.totalSkids.message}</span>}

            <InputLabel htmlFor="numSellos">Número de sellos</InputLabel>
            <OutlinedInput
              type="text"
              {...register("numSellos", {
                required: {
                  value: true,
                  message: "El número es requerido",
                },
              })}
            />
            {errors.numSellos && <span>{errors.numSellos.message}</span>}

            <InputLabel htmlFor="companiaSeg">Compañia de Seguridad</InputLabel>
            <OutlinedInput
              type="text"
              {...register("companiaSeg", {
                required: {
                  value: true,
                  message: "La compañia es requerida",
                },
              })}
            />
            {errors.companiaSeg && <span>{errors.companiaSeg.message}</span>}

            <InputLabel htmlFor="nombreGuardias">Nombre de guardias</InputLabel>
            <OutlinedInput
              type="text"
              {...register("nombreGuardias", {
                required: {
                  value: true,
                  message: "Los nombres son requeridos",
                },
              })}
            />
            {errors.nombreGuardias && (
              <span>{errors.nombreGuardias.message}</span>
            )}

            <InputLabel htmlFor="companiaCus">Compañia de Custodia</InputLabel>
            <OutlinedInput
              type="text"
              {...register("companiaCus", {
                required: {
                  value: true,
                  message: "La compañia es requerida",
                },
              })}
            />
            {errors.companiaCus && <span>{errors.companiaCus.message}</span>}

            <InputLabel htmlFor="nombreCustodios">
              Nombre de custodios
            </InputLabel>
            <OutlinedInput
              type="text"
              {...register("nombreCustodios", {
                required: {
                  value: true,
                  message: "El nombre es requerido",
                },
              })}
            />
            {errors.nombreCustodios && (
              <span>{errors.nombreCustodios.message}</span>
            )}

            <InputLabel htmlFor="numUnidad">
              Número de unidad de custodia
            </InputLabel>
            <OutlinedInput
              type="text"
              {...register("numUnidad", {
                required: {
                  value: true,
                  message: "El número es requerido",
                },
              })}
            />
            {errors.numUnidad && <span>{errors.numUnidad.message}</span>}

            <InputLabel htmlFor="salida">Hora de salida</InputLabel>
            <OutlinedInput
              type="text"
              {...register("salida", {
                required: {
                  value: true,
                  message: "La hora es requerida",
                },
              })}
            />
            {errors.salida && <span>{errors.salida.message}</span>}
          </>
        )}

        {/* Inputs específicos para InspeccionCan */}
        {showAdditionalInputs && embarque === "InspeccionCan" && (
          <>
            <br />
            <InputLabel htmlFor="inicio">Hora de inicio</InputLabel>
            <OutlinedInput
              type="text"
              {...register("inicio", {
                required: {
                  value: true,
                  message: "La hora es requerida",
                },
              })}
            />
            {errors.inicio && <span>{errors.inicio.message}</span>}

            <InputLabel htmlFor="areasInspec">Áreas inspeccionadas</InputLabel>
            <OutlinedInput
              type="text"
              {...register("areasInspec", {
                required: {
                  value: true,
                  message: "Las áreas son requeridas",
                },
              })}
            />
            {errors.areasInspec && <span>{errors.areasInspec.message}</span>}

            <InputLabel htmlFor="finalizacion">Hora de finalización</InputLabel>
            <OutlinedInput
              type="text"
              {...register("finalizacion", {
                required: {
                  value: true,
                  message: "La hora es requerida",
                },
              })}
            />
            {errors.finalizacion && <span>{errors.finalizacion.message}</span>}

            <InputLabel htmlFor="elementos">Elementos de seguridad</InputLabel>
            <OutlinedInput
              type="text"
              {...register("elementos", {
                required: {
                  value: true,
                  message: "Los elementos son requeridos",
                },
              })}
            />
            {errors.elementos && <span>{errors.elementos.message}</span>}
          </>
        )}

        <Button type="submit" variant="contained">
          Enviar
        </Button>
      </form>
    </>
  );
};

export default App;
