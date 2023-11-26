import express from "express";
import { addTask, deleteTask, getTasks, updateTask } from "../controllers/task-controller.js";
import { createTaskValidator, updateTaskValidator } from "../validators/task-validator.js";
import passport from "passport";

const router = express.Router();

  router.get('/',passport.authenticate('jwt', { session: false }),getTasks);
  router.post("/add-task",createTaskValidator,passport.authenticate('jwt', { session: false }),addTask)
  router.patch('/update-task/:taskId',updateTaskValidator,passport.authenticate('jwt', { session: false }), updateTask)
  router.delete('/delete-task/:taskId',passport.authenticate('jwt', { session: false }), deleteTask)

export default router