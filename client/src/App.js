import React, { useState, useEffect } from "react";
import "./global.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import CustomAppBar from "./components/appbar/CustomAppBar";
import HomePage from "./components/home/HomePage";
import NewUser from "./components/createUser/newUser";
import NewInspection from "./components/reports/newInspection";
import InspectionView from "./components/reports/view/inspectionView";
import OperatorView from "./components/operators/operatorView";
import NewOperator from "./components/operators/createOperator/newOperator";
import NewDog from "./components/dogs/createDogs/newDog";
import DogView from "./components/dogs/dogView";
import Typography from "@mui/material/Typography";
import Logo from "./images/logo.jpg";
import { Box, Container } from "@mui/material";
import supabase from "./config/supabase";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import UpdatePassword from "./components/password/UpdatePassword";

const App = () => {
  const [session, setSession] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
    };

    fetchSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session && location.pathname !== "/update-password") {
        navigate("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [location, navigate]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.hash.replace("#", "?"));
    const accessToken = searchParams.get("access_token");

    if (accessToken) {
      supabase.auth.setSession({ access_token: accessToken });
      navigate("/update-password");
    }
  }, [location, navigate]);

  if (!session) {
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
          <Box
            component="img"
            src={Logo}
            alt="Logo"
            sx={{
              height: 70,
              position: "absolute",
              top: "0",
              left: "50%",
              translate: "-50% -50%",
              borderRadius: "9999px",
              border: "5px solid white",
            }}
          />
          <Typography
            variant="h5"
            sx={{ textAlign: "center", marginTop: "30px" }}
          >
            Iniciar sesión
          </Typography>
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: "blue",
                    brandAccent: "darkred",
                  },
                },
              },
            }}
            providers={[]}
            localization={{
              variables: {
                sign_in: {
                  email_label: "Correo electrónico",
                  password_label: "Contraseña",
                  email_input_placeholder: "Tu correo electrónico",
                  password_input_placeholder: "Tu contraseña",
                  button_label: "Iniciar sesión",
                  forgot_password_link: "¿Olvidaste tu contraseña?",
                  link_text: "¿Ya tienes una cuenta? Inicia Sesión",
                },
                sign_up: {
                  email_label: "Correo electrónico",
                  password_label: "Contraseña",
                  email_input_placeholder: "Tu correo electrónico",
                  password_input_placeholder: "Tu contraseña",
                  button_label: "Regístrate",
                  link_text: "¿No tienes una cuenta? Crea una",
                },
                forgotten_password: {
                  email_label: "Correo electrónico",
                  button_label:
                    "Enviar instrucciones para restablecer la contraseña",
                  back_to_sign_in_link: "Volver a iniciar sesión",
                  link_text: "¿Olvidaste tu contraseña?",
                },
                update_password: {
                  password_label: "Nueva contraseña",
                  password_input_placeholder: "Tu nueva contraseña",
                  button_label: "Actualizar contraseña",
                },
              },
            }}
          />
        </Container>
      </Box>
    );
  } else
    return (
      <div>
        <CustomAppBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/update-password" element={<UpdatePassword />} />
          <Route path="/newuser" element={<NewUser />} />
          <Route path="/inspections" element={<InspectionView />} />
          <Route path="/inspections/new" element={<NewInspection />} />
          <Route path="/handlers" element={<OperatorView />} />
          <Route path="/handlers/new" element={<NewOperator />} />
          <Route path="/dogs" element={<DogView />} />
          <Route path="/dogs/new" element={<NewDog />} />
        </Routes>
      </div>
    );
};

export default App;
