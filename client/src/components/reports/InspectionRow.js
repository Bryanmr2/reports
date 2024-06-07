import React from "react";
import { Box, MenuItem, Select, TextField, IconButton } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";

const InspectionRow = ({ register, position, removeInspectionArea }) => {
  return (
    <Box display="flex" gap={1} my={2}>
      <TextField
        label="Nombre de area"
        fullWidth
        {...register(`inspection_areas[${position}].name`)}
      />
      <Select
        fullWidth
        {...register(`inspection_areas[${position}].incidence`)}
      >
        <MenuItem value="" disabled>
          Tipo de incidencia
        </MenuItem>
        <MenuItem value="Ninguna">Ninguna</MenuItem>
        <MenuItem value="Marcaje">Marcaje</MenuItem>
      </Select>
      <IconButton onClick={removeInspectionArea}>
        <RemoveIcon />
      </IconButton>
    </Box>
  );
};

export default InspectionRow;
