import React, { useState } from "react";
import { useForm } from "react-hook-form";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import axios from "axios";
import baseUrl from "../../../config";

const NewOperator = ({ setIsLoggedIn }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [successMessageVisible, setSuccessMessageVisible] = useState(false);

  const onSubmit = async (data) => {
    console.log("Submit button clicked");
    console.log("Form data:", data);
    const { name, last_name, birth, number, curp, social_number } = data;

    try {
      const response = await axios.post(`${baseUrl}/api/operator`, {
        name,
        last_name,
        curp,
        birth,
        number,
        social_number,
      });
      console.log("Registro exitoso: ", response.data);
      reset();
      setSuccessMessageVisible(true);
    } catch (error) {
      if (error.response) {
        console.error("failed:", error.response.data.message);
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  const handleNewOperator = () => {
    setSuccessMessageVisible(false);
    reset();
  };

  return (
    <>
      {successMessageVisible ? (
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "10%",
            }}
          >
            <h2>Registro generado con éxito</h2>
            <Button
              onClick={handleNewOperator}
              variant="contained"
              style={{ marginTop: "15px" }}
            >
              Registrar un nuevo manejador
            </Button>
          </Box>
        </>
      ) : (
        <div>
          <div className="create-container">
            <h2 style={{ marginBottom: "40px" }}>Registrar Manejador</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <InputLabel htmlFor="name">Nombre(s)</InputLabel>
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

                <InputLabel htmlFor="last_name" sx={{ marginTop: "10%" }}>
                  Apellidos
                </InputLabel>
                <OutlinedInput
                  type="text"
                  {...register("last_name", {
                    required: {
                      value: true,
                      message: "El apellido es requerido",
                    },
                    minLength: {
                      value: 2,
                      message: "El apellido debe tener al menos 2 caracteres",
                    },
                    maxLength: {
                      value: 20,
                      message: "El apellido debe tener máximo 20 caracteres",
                    },
                  })}
                />
                {errors.last_name && <span>{errors.last_name.message}</span>}

                <InputLabel htmlFor="curp" sx={{ marginTop: "10%" }}>
                  CURP
                </InputLabel>
                <OutlinedInput
                  id="curp"
                  type="text"
                  {...register("curp", {
                    required: "El CURP es requerido",
                    pattern: {
                      value: /^[A-Z0-9]{18}$/,
                      message:
                        "El CURP debe tener exactamente 18 caracteres alfanuméricos",
                    },
                  })}
                />
                {errors.curp && <span>{errors.curp.message}</span>}

                <InputLabel htmlFor="birth" sx={{ marginTop: "10%" }}>
                  Fecha de nacimiento
                </InputLabel>
                <OutlinedInput
                  id="birth"
                  type="date"
                  sx={{ width: "100%" }}
                  {...register("birth", {
                    required: "La fecha de nacimiento es requerida",
                  })}
                />
                {errors.birth && <span>{errors.birth.message}</span>}

                <InputLabel htmlFor="number" sx={{ marginTop: "10%" }}>
                  Número de teléfono
                </InputLabel>
                <OutlinedInput
                  id="number"
                  type="text"
                  {...register("number", {
                    pattern: {
                      value: /^\d{10}$/,
                      message:
                        "El número de teléfono debe tener exactamente 10 dígitos",
                    },
                  })}
                />
                {errors.number && <span>{errors.number.message}</span>}

                <InputLabel htmlFor="social_number" sx={{ marginTop: "10%" }}>
                  Número de seguro social
                </InputLabel>
                <OutlinedInput
                  id="social_number"
                  type="text"
                  {...register("social_number", {
                    required: {
                      value: true,
                      message: "El número de seguro social es obligatorio",
                    },
                    pattern: {
                      value: /^\d{11}$/,
                      message:
                        "El número de seguro social debe tener exactamente 11 dígitos",
                    },
                  })}
                />
                {errors.social_number && (
                  <span>{errors.social_number.message}</span>
                )}
              </div>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ marginTop: "20px" }}
                >
                  Enviar
                </Button>
              </Box>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default NewOperator;
