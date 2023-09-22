import express from "express";
import { getWilayas } from "../controllers/wilaya.js";

const router = express.Router();

router.get("/", getWilayas);

export default router;
