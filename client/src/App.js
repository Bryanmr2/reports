import React from "react";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import NativeSelect from "@mui/material/NativeSelect";
import Select from "@mui/material/Select";

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

  return (
    <>
      <h2>Generar Reporte</h2>
      <form onSubmit={onSubmit}>
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
          defaultValue={"Corporativo 1"}
          render={({ field }) => (
            <NativeSelect
              {...field}
              inputProps={{
                name: "Corporativo",
                id: "uncontrolled-native",
              }}
            >
              <option value={"Corporativo 1"}>Corporativo 1</option>
              <option value={"Corporativo 2"}>Corporativo 2</option>
              <option value={"Corporativo 3"}>Corporativo 3</option>
            </NativeSelect>
          )}
          rules={{
            required: "Selecciona un corporativo",
          }}
        />

        <Button type="submit" variant="contained">
          Enviar
        </Button>
      </form>
    </>
  );
};

export default App;
