import express from "express";
import {
  medecinAjouterAbonnement,
  medecinGetAbonnement,
} from "../controllers/abonnement.js";
import { isAuth, isMedecin } from "../middleware/auth.js";
const router = express.Router();

router.post("/medecin/add", isAuth, isMedecin, medecinAjouterAbonnement);
router.get("/medecin/get", isAuth, isMedecin, medecinGetAbonnement);

export default router;
