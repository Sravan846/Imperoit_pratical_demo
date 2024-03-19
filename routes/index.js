const express = require("express");
const userRouter = require("./apis/user");
const taskRouter = require("./apis/task");

const mainRouter = express();

mainRouter.use("/user", userRouter);
mainRouter.use("/task", taskRouter);

module.exports = mainRouter;