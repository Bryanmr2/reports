import React, { useState, useEffect } from "react";
import "./global.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

const App = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

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
            providers={[]}
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
          />
        </Container>
      </Box>
    );
  } else
    return (
      <div>
        <Router>
          <CustomAppBar />
          <Routes>
            <Route path="/main" element={<HomePage />} />
            <Route path="/newuser" element={<NewUser />} />
            <Route path="/inspections" element={<InspectionView />} />
            <Route path="/inspections/new" element={<NewInspection />} />
            <Route path="/handlers" element={<OperatorView />} />
            <Route path="/handlers/new" element={<NewOperator />} />
            <Route path="/dogs" element={<DogView />} />
            <Route path="/dogs/new" element={<NewDog />} />
          </Routes>
        </Router>
      </div>
    );
};

export default App;
