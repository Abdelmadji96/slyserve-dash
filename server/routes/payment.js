import express from "express";
import {
  checkRecaptchaToken,
  confirmOrder,
  refundOrder,
  registerOrder,
} from "../controllers/payment.js";

const router = express.Router();
router.post("/registerorder"/*, checkRecaptchaToken*/, registerOrder);
router.post("/confirmrorder", confirmOrder);
router.post("/refundorder", refundOrder);

export default router;
