import React, { useState } from "react";
import { useForm } from "react-hook-form";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import axios from "axios";

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
    const { name, last_name, birth, number, adress, curp } = data;

    try {
      const response = await axios.post(
        "https://reports-production.up.railway.app/api/operator",
        {
          name,
          last_name,
          curp,
          birth,
          number,
          adress,
        }
      );
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
              marginTop: "50%",
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
                  type="text"
                  {...register("curp", {
                    required: {
                      value: true,
                      message: "El CURP es requerido",
                    },
                    minLength: {
                      value: 18,
                      message: "El CURP debe tener 18 caracteres",
                    },
                    maxLength: {
                      value: 18,
                      message: "El CURP debe tener 18 caracteres",
                    },
                  })}
                />
                {errors.curp && <span>{errors.curp.message}</span>}

                <InputLabel htmlFor="birth" sx={{ marginTop: "10%" }}>
                  Fecha de nacimiento
                </InputLabel>
                <OutlinedInput
                  type="date"
                  sx={{ width: "100%" }}
                  {...register("birth", {
                    required: {
                      value: true,
                      message: "La fecha de nacimiento es requerida",
                    },
                  })}
                />
                {errors.birth && <span>{errors.birth.message}</span>}

                <InputLabel htmlFor="number" sx={{ marginTop: "10%" }}>
                  Número de teléfono
                </InputLabel>
                <OutlinedInput
                  type="tel"
                  {...register("number", {
                    required: {
                      value: true,
                      message: "El número de teléfono es requerido",
                    },
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "El número de teléfono debe tener 10 dígitos",
                    },
                  })}
                />
                {errors.number && <span>{errors.number.message}</span>}

                <InputLabel htmlFor="adress" sx={{ marginTop: "10%" }}>
                  Dirección
                </InputLabel>
                <OutlinedInput
                  type="text"
                  {...register("adress", {
                    required: {
                      value: true,
                      message: "La dirección es requerida",
                    },
                  })}
                />
                {errors.adress && <span>{errors.adress.message}</span>}
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
