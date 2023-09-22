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
  updateDureeSeance,
  modifierPatient,
  supprimerPatient,
  updateMinutes,
  getAbonnement1,
  getAbonnement2,
  updateProfile,
  getPasswordResetConfirmationCode,
  confirmPasswordReset
} from "../controllers/medecin.js";
import { isAuth, isMedecin } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/check", checkUnique);
router.post("/horaires", getRDVHoraires);
router.post("/login/telephone", loginTelephone);
router.post("/login/email", loginEmail);
router.post("/update/horaires", isAuth, isMedecin, updateHoraireTravail);
router.post("/update/adresse", isAuth, isMedecin, updateAdresse);
router.post("/update/langues", isAuth, isMedecin, updateLangues);
router.post("/update/formations", isAuth, isMedecin, updateFormations);
router.post("/update/tarifs", isAuth, isMedecin, updateTarifs);
router.post("/update/email", isAuth, isMedecin, updateEmail);
router.post("/update/password", isAuth, isMedecin, updatePassword);
router.post("/update/presentation", isAuth, isMedecin, updatePresentation);
router.post("/update/duree", isAuth, isMedecin, updateDureeSeance);
router.get("/patients/get", isAuth, isMedecin, getPatients);
router.post("/patients/add", isAuth, isMedecin, ajouterPatient);
router.put("/patients/update/:id", isAuth, isMedecin, modifierPatient);
router.delete("/patients/delete/:id", isAuth, isMedecin, supprimerPatient);
router.post(
  "/updateNotificationsToken",
  isAuth,
  isMedecin,
  updateNotificationsToken
);
router.put("/update/minutes/:id", isAuth, isMedecin, updateMinutes);
router.get("/abonnement/get1", isAuth, isMedecin, getAbonnement1);
router.get("/abonnement/get2", isAuth, isMedecin, getAbonnement2);
router.put("/update/:id", updateProfile);
router.post(
  "/getPasswordResetConfirmationCode",
  getPasswordResetConfirmationCode
);
router.post("/confirmPasswordReset", confirmPasswordReset);

export default router;
