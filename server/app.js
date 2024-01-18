const express = require("express");
const path = require("path");
const userRouter = require("../server/src/routes/users");

// Intializations
const app = express();
app.use(express.json());

// Settings
app.set("port", process.env.PORT || 8000);

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res) => res.send("App is working"));
console.log(1);
// Routes
// app.use(require("./src/routes/authentication"));
// app.use(require("./src/routes/index"));
// app.use("/links", require("./src/routes/links"));
app.use("/api", userRouter);

// Starting
app.listen(app.get("port"), () => {
  console.log("Server is in port", app.get("port"));
});
