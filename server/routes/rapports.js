import express from "express";
const router = express.Router();
import { addRapport, getRapports } from "../controllers/rapports.js";
import { isAuth, isMedecin, isParticulier } from "../middleware/auth.js";

router.post("/add", isAuth, /* isMedecin,*/ addRapport);
router.get("/get/:id", /*isAuth, isParticulier,*/ getRapports);

export default router;
