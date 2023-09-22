import express from "express";
const router = express.Router();
import { addVaccin, getVaccins } from "../controllers/vaccins.js";
import { isAuth, isMedecin, isParticulier } from "../middleware/auth.js";

router.post("/add", isAuth, /* isMedecin,*/ addVaccin);
router.get("/get/:id", /*isAuth, isParticulier,*/ getVaccins);

export default router;
