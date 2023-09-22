import express from "express";
import {
  register,
  checkUnique,
  loginEmail,
  loginTelephone,
  searchByWilaya,
  searchByWilayaCommune,
  updateNotificationsToken,
  updateAdresse,
  updateEmail,
  updatePassword,
  updateProfile,
  getPasswordResetConfirmationCode,
  confirmPasswordReset,
  GetnightPosition,
  ModifyNightPosition,
} from "../controllers/pharmacie.js";
import { isAuth } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/check", checkUnique);
router.post("/login/telephone", loginTelephone);
router.post("/login/email", loginEmail);
router.post("/search/wilaya", searchByWilaya);
router.post("/search/wilayacommune", searchByWilayaCommune);
router.post("/updateNotificationsToken", isAuth, updateNotificationsToken);
router.post("/update/adresse", isAuth, updateAdresse);
router.post("/update/email", isAuth, updateEmail);
router.post("/update/password", isAuth, updatePassword);
router.put("/update/:id", updateProfile);
router.get("/getnightposition/:pharmacy_id", GetnightPosition);
// put route for night position modification from pharmacy profile
router.put("/modifynightposition/:id/:value", ModifyNightPosition);
router.post(
  "/getPasswordResetConfirmationCode",
  getPasswordResetConfirmationCode
);
router.post("/confirmPasswordReset", confirmPasswordReset);
export default router;
