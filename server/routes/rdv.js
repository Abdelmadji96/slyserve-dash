import express from "express";
import {
  addRdv,
  getRdv,
  getRdvsByMedecin,
  getRdvByMedecinByID,
  updateRDV,
  getRdvByMedecinByLink,
} from "../controllers/rdv.js";
import { isAuth, isMedecin, isParticulier } from "../middleware/auth.js";
const router = express.Router();

router.post("/add", isAuth, isParticulier, addRdv);
router.get("/get", isAuth, isParticulier, getRdv);
router.get("/get/bymedecin", isAuth, isMedecin, getRdvsByMedecin);
router.put("/update", /*isAuth, isMedecin,*/ updateRDV);
router.get("/id/:id", isAuth, getRdvByMedecinByID);
router.get("/link/:id", isAuth, getRdvByMedecinByLink);

export default router;
