import express from "express";
import {
  register,
  checkUnique,
  loginTelephone,
  loginEmail,
  updateHoraireTravail,
  getRDVHoraires,
  updateAdresse,
  updateLangues,
  updateFormations,
  updateTarifs,
  updateEmail,
  updatePassword,
  getPatients,
  ajouterPatient,
  updatePresentation,
  updateNotificationsToken,
  updateProfile,
  getPasswordResetConfirmationCode,
  confirmPasswordReset
} from "../controllers/paramedical.js";
import { isAuth, isParamedical } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/check", checkUnique);
router.post("/horaires", getRDVHoraires);
router.post("/login/telephone", loginTelephone);
router.post("/login/email", loginEmail);
router.post("/update/horaires", isAuth, isParamedical, updateHoraireTravail);
router.post("/update/adresse", isAuth, isParamedical, updateAdresse);
router.post("/update/langues", isAuth, isParamedical, updateLangues);
router.post("/update/formations", isAuth, isParamedical, updateFormations);
router.post("/update/tarifs", isAuth, isParamedical, updateTarifs);
router.post("/update/email", isAuth, isParamedical, updateEmail);
router.post("/update/password", isAuth, isParamedical, updatePassword);
router.post("/update/presentation", isAuth, isParamedical, updatePresentation);
router.get("/patients/get", isAuth, isParamedical, getPatients);
router.post("/patients/add", isAuth, isParamedical, ajouterPatient);
router.post(
  "/updateNotificationsToken",
  isAuth,
  isParamedical,
  updateNotificationsToken
);
router.put("/update/:id", updateProfile);
router.post(
  "/getPasswordResetConfirmationCode",
  getPasswordResetConfirmationCode
);
router.post("/confirmPasswordReset", confirmPasswordReset);
export default router;
