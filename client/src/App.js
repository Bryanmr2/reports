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
import supabase from "./config/supabase";
import { Box, Container } from "@mui/material";
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
      <Box width="100vw" height="100vh">
        <Container height="100%">
          <Auth
            supabaseClient={supabase}
            providers={[]}
            appearance={{ theme: ThemeSupa }}
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
            <Route path="/operators" element={<OperatorView />} />
            <Route path="/operators/new" element={<NewOperator />} />
            <Route path="/dogs" element={<DogView />} />
            <Route path="/dogs/new" element={<NewDog />} />
          </Routes>
        </Router>
      </div>
    );
};

export default App;
