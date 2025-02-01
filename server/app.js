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
app.use("/api", upload.single("file"));

app.use("/api", userRouter);
app.use("/api", operatorRoutes);
app.use("/api", dogRoutes);
app.use("/api", authRoutes);
app.use("/api", inspectionRoutes);

// Arranque del servidor
app.listen(app.get("port"), () => {
  console.log("Server is in port", app.get("port"));
});
