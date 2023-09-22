import express from "express";
import {
  register,
  checkUnique,
  loginTelephone,
  loginEmail,
  searchByWilaya,
  searchByWilayaCommune,
  updateNotificationsToken,
  updateEmail,
  updatePassword,
  updateAdresse,
  updateProfile,
  getPasswordResetConfirmationCode,
  confirmPasswordReset
} from "../controllers/hopital.js";
import { isAuth } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/check", checkUnique);
router.post("/login/telephone", loginTelephone);
router.post("/login/email", loginEmail);
router.post("/search/wilaya", searchByWilaya);
router.post("/search/wilayacommune", searchByWilayaCommune);
router.post("/updateNotificationsToken", isAuth, updateNotificationsToken);
router.post("/update/email", isAuth, updateEmail);
router.post("/update/password", isAuth, updatePassword);
router.post("/update/adresse", isAuth, updateAdresse);
router.put("/update/:id", updateProfile);
router.post(
  "/getPasswordResetConfirmationCode",
  getPasswordResetConfirmationCode
);
router.post("/confirmPasswordReset", confirmPasswordReset);

export default router;
