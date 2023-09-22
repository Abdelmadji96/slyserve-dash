import express from "express";
import {
  searchByWilaya,
  searchByWilayaCommune,
  searchByWilayaType,
  searchByWilayaCommuneType,
  checkUnique,
  register,
  loginEmail,
  loginTelephone,
  updateNotificationsToken,
  updateProfile,
  getPasswordResetConfirmationCode,
  confirmPasswordReset
} from "../controllers/donneursang.js";

import { isAuth, isParticulier } from "../middleware/auth.js";
const router = express.Router();

router.post("/search/wilaya", searchByWilaya);
router.post("/search/wilayacommune", searchByWilayaCommune);
router.post("/search/wilayatype", searchByWilayaType);
router.post("/search/wilayacommunetype", searchByWilayaCommuneType);
router.post("/register", register);
router.post("/check", checkUnique);
router.post("/login/telephone", loginTelephone);
router.post("/login/email", loginEmail);
router.post("/updateNotificationsToken", updateNotificationsToken);
router.put("/update/:id", updateProfile);
router.post(
  "/getPasswordResetConfirmationCode",
  getPasswordResetConfirmationCode
);
router.post("/confirmPasswordReset", confirmPasswordReset);

export default router;
