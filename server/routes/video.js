import express from "express";
import getToken from "../controllers/video.js";

const router = express.Router();

router.post("/token", getToken);

export default router;
