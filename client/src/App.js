import React, { useState, useEffect } from "react";
import "./global.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import CustomAppBar from "./components/appbar/CustomAppBar";
import HomePage from "./components/home/HomePage";
import Login from "./components/login/Login";
import NewUser from "./components/createUser/newUser";
import NewInspection from "./components/reports/newInspection";
import InspectionView from "./components/reports/view/inspectionView";
import OperatorView from "./components/operators/operatorView";
import NewOperator from "./components/operators/createOperator/newOperator";
import NewDog from "./components/dogs/createDogs/newDog";
import DogView from "./components/dogs/dogView";
import supabase from "./config/supabase.js";

const App = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(
    window.localStorage.getItem("token")
  );

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/login");
      } else {
        navigate("/");
      }
    });
  }, []);

  return (
    <div>
      <Router>
        <CustomAppBar isLoggedIn={isLoggedIn} />
        <Routes>
          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/newuser" element={<NewUser />} />
          <Route
            path="/"
            element={
              isLoggedIn ? <HomePage /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/inspections"
            element={
              isLoggedIn ? <InspectionView /> : <Navigate to="/login" replace />
            }
          />
          <Route path="/inspections/new" element={<NewInspection />} />
          <Route
            path="/operators"
            element={
              isLoggedIn ? <OperatorView /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/operators/new"
            element={
              isLoggedIn ? <NewOperator /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/dogs"
            element={
              isLoggedIn ? <DogView /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/dogs/new"
            element={isLoggedIn ? <NewDog /> : <Navigate to="/login" replace />}
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
