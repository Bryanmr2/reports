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
import NewUser from "./components/createUser/NewUser";
import NewReport from "./components/reports/NewReport";
import View from "./components/viewReports/View";

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
            path="/newreport"
            element={
              isLoggedIn ? <NewReport /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/view"
            element={isLoggedIn ? <View /> : <Navigate to="/login" replace />}
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
