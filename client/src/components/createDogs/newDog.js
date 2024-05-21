import React from "react";
import { useForm } from "react-hook-form";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const NewDog = ({ setIsLoggedIn }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate();
  const onSubmit = async (data) => {
    console.log("Submit button clicked");
    console.log("Form data:", data);
    const { name, breed, age, gender, color } = data;

    try {
      const response = await axios.post("http://localhost:8000/api/dogs", {
        name,
        breed,
        age,
        gender,
        color,
      });
      console.log("Registro exitoso: ", response.data);
      reset();
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <>
      <div>
        <div className="create-container">
          <h2>Registro de Perro</h2>
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
                })}
              />
              {errors.name && <span>{errors.name.message}</span>}

              <InputLabel htmlFor="breed" style={{ marginTop: "10%" }}>
                Raza
              </InputLabel>
              <OutlinedInput
                type="text"
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
                {...register("gender", {
                  required: {
                    value: true,
                    message: "El género es requerido",
                  },
                })}
              >
                <MenuItem value="male">Macho</MenuItem>
                <MenuItem value="female">Hembra</MenuItem>
              </Select>

              <InputLabel htmlFor="color" style={{ marginTop: "10%" }}>
                Color
              </InputLabel>
              <OutlinedInput
                type="text"
                {...register("color", {
                  required: {
                    value: true,
                    message: "El color es requerido",
                  },
                })}
              />
              {errors.color && <span>{errors.color.message}</span>}
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
    </>
  );
};

export default NewDog;
