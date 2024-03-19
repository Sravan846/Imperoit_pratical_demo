const express = require("express");
const frontendRoute = express.Router();

frontendRoute.get("/", async (req, res) => {
  res.render("loginPage");
});

frontendRoute.get("/tasks", (req, res) => {
  res.render("task/taskList");
});
frontendRoute.get("/register", async (req, res) => {
  res.render("registerPage");
});
frontendRoute.get("/home", async (req, res) => {
  res.render("home");
});
frontendRoute.get("/changepassword", (req, res) => {
  res.render("changePassword");
});


module.exports = frontendRoute;
