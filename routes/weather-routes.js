import express from "express";
import { getWeather } from "../controllers/waether-controller.js";

const router = express.Router();

router.get('/', getWeather)


export default router