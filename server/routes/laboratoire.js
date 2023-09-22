import express from "express";
import {
  register,
  checkUnique,
  searchByWilaya,
  searchByWilayaCommune,
  loginEmail,
  loginTelephone,
  updateNotificationsToken,
  updateProfile,
  getPasswordResetConfirmationCode,
  confirmPasswordReset
} from "../controllers/laboratoire.js";
import { isAuth, isLaboratory } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/check", checkUnique);
router.post("/search/wilaya", searchByWilaya);
router.post("/search/wilayacommune", searchByWilayaCommune);
router.post("/login/email", loginEmail);
router.post("/login/telephone", loginTelephone);
router.post("/updateNotificationsToken", updateNotificationsToken);
router.put("/updateProfile/:id", /*isAuth, isLaboratory,*/ updateProfile);
router.post(
  "/getPasswordResetConfirmationCode",
  getPasswordResetConfirmationCode
);
router.post("/confirmPasswordReset", confirmPasswordReset);

export default router;
