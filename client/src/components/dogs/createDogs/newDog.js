import React, { useState } from "react";
import { useForm } from "react-hook-form";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { Box } from "@mui/material";
import baseUrl from "../../../config";
import axios from "axios";

const NewDog = ({ setIsLoggedIn }) => {
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
    formData.append("breed", data.breed);
    formData.append("age", data.age);
    formData.append("gender", data.gender);
    formData.append("color", data.color);
    if (data.file && data.file[0]) {
      formData.append("file", data.file[0]);
      console.log("Archivo PDF:", data.file[0]);
    }

    try {
      const response = await axios.post(`${baseUrl}/api/dog`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Registro exitoso: ", response.data);
      reset();
      setSuccessMessageVisible(true);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const handleNewDog = () => {
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
              onClick={handleNewDog}
              variant="contained"
              style={{ marginTop: "15px" }}
            >
              Registrar un nuevo k9
            </Button>
          </Box>
        </>
      ) : (
        <div>
          <div className="create-container">
            <h2>Registro de k9</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <InputLabel htmlFor="name">Nombre</InputLabel>
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

                <InputLabel htmlFor="breed" style={{ marginTop: "10%" }}>
                  Raza
                </InputLabel>
                <OutlinedInput
                  type="text"
                  sx={{ width: "100%" }}
                  {...register("breed", {
                    required: {
                      value: true,
                      message: "La raza es requerida",
                    },
                  })}
                />
                {errors.breed && <span>{errors.breed.message}</span>}

                <InputLabel htmlFor="age" style={{ marginTop: "10%" }}>
                  Edad
                </InputLabel>
                <OutlinedInput
                  type="number"
                  sx={{ width: "100%" }}
                  {...register("age", {
                    required: {
                      value: true,
                      message: "La edad es requerida",
                    },
                    min: {
                      value: 0,
                      message: "La edad no puede ser menor que 0",
                    },
                  })}
                />
                {errors.age && <span>{errors.age.message}</span>}

                <InputLabel htmlFor="gender" style={{ marginTop: "10%" }}>
                  Género
                </InputLabel>
                <Select
                  sx={{ width: "100%" }}
                  {...register("gender", {
                    required: {
                      value: true,
                      message: "El género es requerido",
                    },
                  })}
                >
                  <MenuItem value="Macho">Macho</MenuItem>
                  <MenuItem value="Hembra">Hembra</MenuItem>
                </Select>

                <InputLabel htmlFor="color" style={{ marginTop: "10%" }}>
                  Color
                </InputLabel>
                <OutlinedInput
                  type="text"
                  sx={{ width: "100%" }}
                  {...register("color", {
                    required: {
                      value: true,
                      message: "El color es requerido",
                    },
                  })}
                />
                {errors.color && <span>{errors.color.message}</span>}

                <InputLabel htmlFor="file" style={{ marginTop: "10%" }}>
                  Tarjeta de Vacunación (opcional)
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

export default NewDog;
