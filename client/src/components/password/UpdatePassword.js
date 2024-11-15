import React, { useState, useEffect } from "react";
import { Box, Container, Typography, TextField, Button } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import supabase from "../../config/supabase";

const UpdatePassword = () => {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [searchParams] = useSearchParams();
  const accessToken = searchParams.get("access_token");

  useEffect(() => {
    if (accessToken) {
      supabase.auth.setSession(accessToken);
    }
  }, [accessToken]);

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) {
        setMessage("Error al actualizar la contraseña: " + error.message);
      } else {
        setMessage("Contraseña actualizada exitosamente.");
      }
    } catch (error) {
      setMessage("Error al actualizar la contraseña.");
    }
  };

  return (
    <Box
      width="100vw"
      height="100vh"
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "#1b427c",
        justifyContent: "center",
      }}
    >
      <Container
        height="100%"
        sx={{
          maxWidth: "400px !important",
          backgroundColor: "white",
          padding: "20px",
          margin: "20px",
          borderRadius: "1.5rem",
          position: "relative",
        }}
      >
        <Typography
          variant="h5"
          sx={{ textAlign: "center", marginTop: "30px" }}
        >
          Actualizar contraseña
        </Typography>
        <form onSubmit={handleUpdatePassword}>
          <TextField
            label="Nueva contraseña"
            type="password"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ marginTop: "20px" }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: "20px" }}
          >
            Actualizar contraseña
          </Button>
        </form>
        {message && (
          <Typography
            variant="body2"
            sx={{
              textAlign: "center",
              marginTop: "20px",
              color: message.includes("Error") ? "red" : "green",
            }}
          >
            {message}
          </Typography>
        )}
      </Container>
    </Box>
  );
};

export default UpdatePassword;
