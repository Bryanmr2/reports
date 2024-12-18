import React, { useState } from "react";
import { useForm } from "react-hook-form";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import { Box } from "@mui/material";
import baseUrl from "../../../config";
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
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("last_name", data.last_name);
    formData.append("curp", data.curp);
    formData.append("birth", data.birth);
    formData.append("number", data.number);
    formData.append("social_number", data.social_number);

    if (data.file && data.file[0]) {
      formData.append("file", data.file[0]);
    }

    for (let pair of formData.entries()) {
      console.log(pair[0] + ": ", pair[1]);
    }

    try {
      const response = await axios.post(`${baseUrl}/api/operator`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Registro exitoso: ", response.data);
      reset();
      setSuccessMessageVisible(true);
    } catch (error) {
      console.error("Error:", error.message);
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
            <h2>Registro de manejador</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <InputLabel htmlFor="name">Nombre(s)</InputLabel>
                <OutlinedInput
                  type="text"
                  sx={{ width: "100%" }}
                  {...register("name", {
                    required: {
                      value: true,
                      message: "El nombre es requerido",
                    },
                  })}
                />
                {errors.name && <span>{errors.name.message}</span>}

                <InputLabel htmlFor="last_name" style={{ marginTop: "10%" }}>
                  Apellidos
                </InputLabel>
                <OutlinedInput
                  type="text"
                  sx={{ width: "100%" }}
                  {...register("last_name", {
                    required: {
                      value: true,
                      message: "Los apellidos son requeridos",
                    },
                  })}
                />
                {errors.last_name && <span>{errors.last_name.message}</span>}

                <InputLabel htmlFor="curp" style={{ marginTop: "10%" }}>
                  CURP
                </InputLabel>
                <OutlinedInput
                  type="text"
                  sx={{ width: "100%" }}
                  {...register("curp", {
                    required: "El CURP es requerido",
                    pattern: {
                      value: /^[A-Z0-9]{18}$/,
                      message: "El CURP debe tener 18 caracteres alfanuméricos",
                    },
                  })}
                />
                {errors.curp && <span>{errors.curp.message}</span>}

                <InputLabel htmlFor="birth" style={{ marginTop: "10%" }}>
                  Fecha de nacimiento
                </InputLabel>
                <OutlinedInput
                  type="date"
                  sx={{ width: "100%" }}
                  {...register("birth", {
                    required: "La fecha de nacimiento es requerida",
                  })}
                />
                {errors.birth && <span>{errors.birth.message}</span>}

                <InputLabel htmlFor="number" style={{ marginTop: "10%" }}>
                  Número de teléfono
                </InputLabel>
                <OutlinedInput
                  type="text"
                  sx={{ width: "100%" }}
                  {...register("number", {
                    pattern: {
                      value: /^\d{10}$/,
                      message: "El número debe tener 10 dígitos",
                    },
                  })}
                />
                {errors.number && <span>{errors.number.message}</span>}

                <InputLabel
                  htmlFor="social_number"
                  style={{ marginTop: "10%" }}
                >
                  Número de seguro social
                </InputLabel>
                <OutlinedInput
                  type="text"
                  sx={{ width: "100%" }}
                  {...register("social_number", {
                    required: {
                      value: true,
                      message: "El número de seguro social es requerido",
                    },
                    pattern: {
                      value: /^\d{11}$/,
                      message: "Debe tener 11 dígitos",
                    },
                  })}
                />
                {errors.social_number && (
                  <span>{errors.social_number.message}</span>
                )}

                <InputLabel htmlFor="file" style={{ marginTop: "10%" }}>
                  Documento (opcional)
                </InputLabel>
                <OutlinedInput type="file" {...register("file")} />
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
