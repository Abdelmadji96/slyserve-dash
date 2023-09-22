import express from "express";
const router = express.Router();
import { addImagerie, getImageries } from "../controllers/imagerie.js";
import { isAuth, isMedecin, isParticulier } from "../middleware/auth.js";

router.post("/add", isAuth, /* isMedecin,*/ addImagerie);
router.get("/get/:id", /*isAuth, isParticulier,*/ getImageries);

export default router;
