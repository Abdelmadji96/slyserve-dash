import express from "express";
const router = express.Router();
import { getCommunes } from "../controllers/commune.js";

router.post("/", getCommunes);

export default router;
