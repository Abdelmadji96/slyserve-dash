import express from "express";
const router = express.Router();
import { addBiology, getBiology } from "../controllers/biology.js";
import { isAuth, isMedecin, isParticulier } from "../middleware/auth.js";

router.post("/add", isAuth, /* isMedecin,*/ addBiology);
router.get("/get/:id", /*isAuth, isParticulier,*/ getBiology);

export default router;
