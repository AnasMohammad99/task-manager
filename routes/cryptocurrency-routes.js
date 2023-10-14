import express from "express";
import { getCurrencies } from "../controllers/currency-controller.js";

const router = express.Router();

  router.get('/', getCurrencies);



export default router