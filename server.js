const express = require("express");
const app = express();
require("dotenv").config();
require("./config/db");
const mainRoute = require("./routes/index");
const cors = require("cors");
const frontendRoute = require("./routes/frontendRoutes");


app.set("view engine", "ejs");
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use('/uploads', express.static('uploads'));
app.use("/api", mainRoute);
// // frontend Router
app.use(frontendRoute);

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});
app.listen(process.env.PORT, () => {
  console.log("Server is started");
});
