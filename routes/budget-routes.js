import express from "express";
import { addRecord, deleteRecordById, getBudgets, getRecordById, updateRecordById } from "../controllers/budget-controller.js";

const router = express.Router();

  router.get('/', getBudgets);
  router.post('/add-record',addRecord);
  router.get('/get-record/:id',getRecordById);
  router.patch('/update-record/:id',updateRecordById);
  router.delete('/delete-record/:id',deleteRecordById);

export default router