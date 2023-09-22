import express from "express";
const router = express.Router();
import { addSoign, getSoigns } from "../controllers/soigns.js";
import { isAuth, isMedecin, isParticulier } from "../middleware/auth.js";

router.post("/add", isAuth, /* isMedecin,*/ addSoign);
router.get("/get/:id", /*isAuth, isParticulier,*/ getSoigns);

export default router;
