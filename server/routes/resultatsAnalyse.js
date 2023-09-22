import express from "express";
const router = express.Router();
import {
  addResultatAnalyse,
  getResultatsAnalyse,
} from "../controllers/resultatsAnalyse.js";
import { isAuth, isMedecin, isParticulier } from "../middleware/auth.js";

router.post(
  "/add",
  isAuth,
  /* isMedecin || isParticulier,*/ addResultatAnalyse
);
router.get("/get/:id", /* isAuth,isParticulier,*/ getResultatsAnalyse);

export default router;
