const express = require("express");
const cors = require("cors");
const userRouter = require("./src/routes/users.routes");
const operatorRoutes = require("./src/routes/operator.routes");
const dogRoutes = require("./src/routes/dog.routes");
const authRoutes = require("./src/routes/auth.routes");
const reportRoutes = require("./src/routes/report.routes");

// Intializations
const app = express();
app.use(cors());
app.use(express.json());

// Settings
app.set("port", process.env.PORT || 8000);

// Middlewares
app.get("/", (req, res) => res.send("App is working"));
app.use(express.urlencoded({ extended: true }));
console.log(1);

app.use("/api", userRouter);

app.use("/api", operatorRoutes);
app.use("/api", dogRoutes);

app.use("/api", authRoutes);
app.use("/api", reportRoutes);

// Starting
app.listen(app.get("port"), () => {
  console.log("Server is in port", app.get("port"));
});
