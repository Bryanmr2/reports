import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import NewUser from "./components/createUser/newUser";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <NewUser /> */}
    <App />
  </React.StrictMode>
);
