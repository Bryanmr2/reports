import React, { useState } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../../config/supabase.js";
import "./login.css";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const { user, error } = await supabase.auth.signIn({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      console.log("Inicio de sesión exitoso", user);
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Error durante el inicio de sesión:", error.message);
      alert("Error durante el inicio de sesión: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleForgotPassword = () => {
    console.log("Olvido su contraseña");
    setShowForgotPassword(true);
  };

  const handleEnviarCorreoClick = async () => {
    try {
      await supabase.auth.resetPasswordForEmail(email);
      alert("Correo de reinicio de contraseña enviado");
    } catch (error) {
      console.error("Error al enviar correo:", error.message);
      alert("Error al enviar correo: " + error.message);
    }
  };

  const handleRegresarClick = () => {
    setShowForgotPassword(false);
  };

  return (
    <>
      <section className="main-section">
        {showForgotPassword ? (
          <div className="card">
            <h3>¿Olvidaste La Contraseña?</h3>
            <p>
              Por favor, escribe tu dirección de correo electrónico para
              reiniciar tu contraseña
            </p>
            <InputLabel htmlFor="correo">Correo electrónico</InputLabel>
            <OutlinedInput
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="login-btn-wrapper">
              <Button
                variant="contained"
                color="primary"
                onClick={handleEnviarCorreoClick}
              >
                Enviar correo
              </Button>
              <Button onClick={handleRegresarClick}>Regresar</Button>
            </div>
          </div>
        ) : (
          <div className="card">
            <h3>Iniciar Sesión</h3>

            <div className="login-inputs">
              <InputLabel htmlFor="correo">Correo</InputLabel>
              <OutlinedInput
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ width: "208px" }}
              />

              <InputLabel htmlFor="password">Contraseña</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              />
            </div>
            <div>
              <br />
              <div className="login-btn-wrapper">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleLogin}
                >
                  Iniciar sesión
                </Button>

                <div className="forgot-password">
                  <br />
                  <button
                    onClick={handleForgotPassword}
                    style={{
                      color: "blue",
                      textDecoration: "none",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    ¿Olvidó su contraseña?
                  </button>
                </div>
              </div>
              <br />
              <Link to="/newuser" style={{ textDecoration: "none" }}>
                <InputLabel>Crear cuenta</InputLabel>
              </Link>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Login;
