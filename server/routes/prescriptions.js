import express from "express";
const router = express.Router();
import {
  addPrescription,
  getPrescriptions,
} from "../controllers/prescriptions.js";
import { isAuth, isMedecin, isParticulier } from "../middleware/auth.js";

router.post("/add", isAuth, /* isMedecin,*/ addPrescription);
router.get("/get/:id", /* isAuth, isParticulier,*/ getPrescriptions);

export default router;
