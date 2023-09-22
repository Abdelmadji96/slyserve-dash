import express from "express";
import { getParticuliers, getRDVs, login } from "../controllers/admin.js";
import { isAuth } from "../middleware/auth.js";

const router = express.Router();

router.post("/login", login);
router.get("/particuliers", getParticuliers);
router.get("/rdvs", getRDVs);

export default router;
