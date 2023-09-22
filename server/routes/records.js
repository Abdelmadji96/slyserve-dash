import express from "express";
const router = express.Router();
import { addRecord, getRecords } from "../controllers/records.js";
import { isAuth, isMedecin, isParticulier } from "../middleware/auth.js";

router.post("/add", isAuth, /* isMedecin,*/ addRecord);
router.get("/get/:id", /*isAuth, isParticulier,*/ getRecords);

export default router;
