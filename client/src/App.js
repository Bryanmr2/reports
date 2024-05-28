import React, { useState } from "react";
import "./global.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import CustomAppBar from "./components/appbar/CustomAppBar";
import HomePage from "./components/home/HomePage";
import Login from "./components/login/Login";
import NewUser from "./components/createUser/newUser";
import NewInspection from "./components/reports/newInspection";
import OperatorView from "./components/operators/operatorView";
import NewOperator from "./components/operators/createOperator/newOperator";
import NewDog from "./components/createDogs/newDog";
import Consult from "./components/consult/Consult.js";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    window.localStorage.getItem("token")
  );

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
              isLoggedIn ? <Consult /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/inspections/new"
            element={
              isLoggedIn ? <NewInspection /> : <Navigate to="/login" replace />
            }
          />
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
            path="/dogs/new"
            element={isLoggedIn ? <NewDog /> : <Navigate to="/login" replace />}
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
