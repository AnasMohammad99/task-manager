import express from "express";
import { addUser, deleteUser, getUserTasks, getUsers, loginUser, logoutUser, updateUser } from "../controllers/user-controller.js";
import { createValidator, loginValidator } from "../validators/user-validator.js";
import passport from "passport";


const router = express.Router();

  router.get('/', passport.authenticate('jwt', { session: false }), getUsers);
  router.post("/add-user",createValidator,addUser)
  router.post("/login",loginValidator,passport.authenticate("local", { session: false }),loginUser)
  router.post('/logout',passport.authenticate('jwt', { session: false }),logoutUser)
  router.get('/user-tasks', passport.authenticate('jwt', { session: false }), getUserTasks)
  router.patch('/update-user',passport.authenticate('jwt', { session: false }),updateUser)
  router.delete('/delete-user',passport.authenticate('jwt', { session: false }),deleteUser)

export default router