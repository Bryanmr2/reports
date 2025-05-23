require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const userRouter = require("./src/routes/users.routes");
const operatorRoutes = require("./src/routes/operator.routes");
const dogRoutes = require("./src/routes/dog.routes");
const authRoutes = require("./src/routes/auth.routes");
const inspectionRoutes = require("./src/routes/inspection.routes");

// Inicializaciones
const app = express();

// Configuración de Multer
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Configuración de CORS
app.use(
  cors({
    origin: ["https://www.siipccsp.com", "http://localhost:4000"],
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
app.use(
  "/api",
  upload.fields([
    { name: "file", maxCount: 1 },
    { name: "certificacion", maxCount: 1 },
    { name: "constancia", maxCount: 1 },
    { name: "ine", maxCount: 1 },
    { name: "antecedentes2", maxCount: 1 },
    { name: "acta", maxCount: 1 },
    { name: "curp_doc", maxCount: 1 },
    { name: "domicilio", maxCount: 1 },
    { name: "estudios", maxCount: 1 },
  ])
);

app.use("/api", userRouter);
app.use("/api", operatorRoutes);
app.use("/api", dogRoutes);
app.use("/api", authRoutes);
app.use("/api", inspectionRoutes);

// Arranque del servidor
app.listen(app.get("port"), () => {
  console.log("Server is in port", app.get("port"));
});
