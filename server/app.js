const express = require("express");
const cors = require("cors");
const userRouter = require("./src/routes/users.routes");
const operatorRoutes = require("./src/routes/operator.routes");
const dogRoutes = require("./src/routes/dog.routes");
const authRoutes = require("./src/routes/auth.routes");
const inspectionRoutes = require("./src/routes/inspection.routes");

// Inicializaciones
const app = express();

// Configuración de CORS
app.use(
  cors({
    origin: "reports-production.up.railway.app",
    credentials: true,
  })
);
app.use(express.json());

// Configuraciones
app.set("port", process.env.PORT);

// Middlewares
app.get("/", (req, res) => res.status(200).send("App is working"));
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use("/api", userRouter);
app.use("/api", operatorRoutes);
app.use("/api", dogRoutes);
app.use("/api", authRoutes);
app.use("/api", inspectionRoutes);

// Arranque del servidor
app.listen(app.get("port"), () => {
  console.log("Server is in port", app.get("port"));
});
