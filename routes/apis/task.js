const express = require('express')
const taskRouter = express.Router()
const valid = require("../../middleware/validator");
const taskCTRL = require('../../controllers/task.controller');
const  verifyToken = require('../../middleware/auth');
const  upload = require('../../config/multer');

taskRouter.post("/add",verifyToken, [upload.single("image"), valid.taskValidation], taskCTRL.addTask)
taskRouter.get("/", [verifyToken,], taskCTRL.getAllTask)
taskRouter.get("/:id", [verifyToken,], taskCTRL.getTaskById)
taskRouter.delete("/:id", [verifyToken,], taskCTRL.deleteTaskById)
taskRouter.patch("/:id", [verifyToken,], taskCTRL.updateTaskById)

module.exports = taskRouter