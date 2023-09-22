import express from "express";
const router = express.Router();
import {
  addCompteRendu,
  getComptesRendus,
} from "../controllers/compte_rendu.js";
import { isAuth, isMedecin, isParticulier } from "../middleware/auth.js";

router.post("/add", isAuth,/* isMedecin,*/ addCompteRendu);
router.get("/get", isAuth, isParticulier, getComptesRendus);

export default router;
