import express from "express";
const router = express.Router();
import {
  addOrdonnance,
  particulierGetOrdonnanceDetails,
  getOdonnances,
  deleteOrdonnance,
} from "../controllers/ordonnance.js";
import { isAuth, isMedecin, isParticulier } from "../middleware/auth.js";

router.delete("/delete/:id", isAuth,/* isParticulier,*/ deleteOrdonnance);
router.post("/add", isAuth,/* isMedecin,*/ addOrdonnance);
router.get("/get/particulier", isAuth,/* isParticulier,*/ getOdonnances);

router.get(
  "/get/particulier/:id",
  isAuth,
  isParticulier,
  particulierGetOrdonnanceDetails
);

export default router;
