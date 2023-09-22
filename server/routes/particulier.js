import express from "express";
import {
  register,
  checkUnique,
  loginTelephone,
  loginEmail,
  particulierDetails,
  updateProfile,
  ajouterProche,
  getProches,
  updateRDV,
  cancelRDV,
  searchByWilaya,
  searchByWilayaCommune,
  registerDonneurSang,
  updateNotificationsToken,
  payByBalance,
  modifierProche,
  supprimerProche,
  getPasswordResetConfirmationCode,
  confirmPasswordReset
} from "../controllers/particulier.js";

import { isAuth, isParticulier } from "../middleware/auth.js";
const router = express.Router();

router.post("/register", register);
router.post("/register/donneursang", registerDonneurSang);
router.post("/check", checkUnique);
router.post("/login/telephone", loginTelephone);
router.post("/login/email", loginEmail);
router.get("/profile/details", isAuth, isParticulier, particulierDetails);
router.put("/profile/update/:id", /*isAuth, isParticulier,*/ updateProfile);
router.post("/proche", isAuth, isParticulier, ajouterProche);
router.get("/proche/get", isAuth, isParticulier, getProches);
router.put("/proche/update/:id", isAuth, isParticulier, modifierProche);
router.delete("/proche/delete/:id", isAuth, isParticulier, supprimerProche);
router.put("/rdv/update", isAuth, isParticulier, updateRDV);
router.put("/rdv/cancel", isAuth, isParticulier, cancelRDV);
router.post("/donneursang/search/wilaya", searchByWilaya);
router.post("/donneursang/search/wilayacommune", searchByWilayaCommune);
router.post(
  "/updateNotificationsToken",
  isAuth,
  isParticulier,
  updateNotificationsToken
);
router.post("/payByBalance", isAuth, isParticulier, payByBalance);
router.post(
  "/getPasswordResetConfirmationCode",
  getPasswordResetConfirmationCode
);
router.post("/confirmPasswordReset", confirmPasswordReset);
export default router;
