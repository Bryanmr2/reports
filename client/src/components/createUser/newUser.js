import React, { useState } from "react";
import { useForm } from "react-hook-form";
import OutlinedInput from "@mui/material/OutlinedInput";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./newUser.css";

const NewUser = ({ setIsLoggedIn }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const navigate = useNavigate();
  const onSubmit = async (data) => {
    console.log("Submit button clicked");
    console.log("Form data:", data); // Agrega este log para ver toda la data del formulario
    const { name, email, password } = data;

    try {
      const response = await axios.post("http://localhost:8000/api/register", {
        name,
        email,
        password,
      });
      console.log("Registro exitoso: ", response.data);
      reset();
      navigate("/", { replace: true });
    } catch (error) {
      if (error.response) {
        console.error("failed:", error.response.data.message);
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // const label = { inputProps: { "aria-label": "Checkbox demo" } };

  return (
    <>
      <div>
        <div className="create-container">
          <h3>Crear Usuario</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
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

              <InputLabel htmlFor="email">Correo</InputLabel>
              <OutlinedInput
                type="email"
                {...register("email", {
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
              {errors.email && <span>{errors.email.message}</span>}

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
                    value === watch("password") ||
                    "Las contraseñas no coinciden",
                })}
              />
              {errors.confirmarPassword && (
                <span>{errors.confirmarPassword.message}</span>
              )}

              {/* <InputLabel htmlFor="terminos">
                Acepto términos y condiciones
              </InputLabel>
              <Checkbox
                {...label}
                {...register("terminos", {
                  required: {
                    value: true,
                    message:
                      "Debe aceptar términos y condiciones para continuar",
                  },
                })}
              />

              {errors.terminos && <span>{errors.terminos.message}</span>} */}
            </div>
            <Button type="submit" variant="contained">
              Enviar
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewUser;
