import React from "react";
import { useForm } from "react-hook-form";
import OutlinedInput from "@mui/material/OutlinedInput";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";

const NewUser = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    reset();
    //fetch
  });

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  return (
    <>
      <h2>Crear Usuario</h2>
      <form onSubmit={onSubmit}>
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

        <InputLabel htmlFor="correo">Correo</InputLabel>
        <OutlinedInput
          type="email"
          {...register("correo", {
            required: {
              value: true,
              message: "El correo es requerido",
            },
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Correo no válido",
            },
          })}
        />
        {errors.correo && <span>{errors.correo.message}</span>}

        <InputLabel htmlFor="password">Contraseña</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          {...register("password", {
            required: {
              value: true,
              message: "Contraseña requerida",
            },
            minLength: {
              value: 5,
              message: "La contrseña debe tener al menos 5 caracteres",
            },
          })}
        />
        {errors.password && <span>{errors.password.message}</span>}

        <InputLabel htmlFor="confirmarPassword">
          Confirmar Contraseña
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          {...register("confirmarPassword", {
            required: {
              value: true,
              message: "Necesitas confirmar tu contraseña",
            },
            validate: (value) =>
              value === watch("password") || "Las contraseñas no coinciden",
          })}
        />
        {errors.confirmarPassword && (
          <span>{errors.confirmarPassword.message}</span>
        )}

        <InputLabel htmlFor="terminos">
          Acepto términos y condiciones
        </InputLabel>
        <Checkbox
          {...label}
          {...register("terminos", {
            required: {
              value: true,
              message: "Debe aceptar términos y condiciones para continuar",
            },
          })}
        />

        {errors.terminos && <span>{errors.terminos.message}</span>}

        <Button type="submit" variant="contained">
          Enviar
        </Button>
      </form>
    </>
  );
};

export default NewUser;
