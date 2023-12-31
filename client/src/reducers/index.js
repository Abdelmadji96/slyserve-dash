import { combineReducers } from "redux";
import {
  checkProfessionnelExistReducer,
  getMedecinInfosReducer,
  getSpecialitesReducer,
  loginMedecinReducer,
  professionnelRegisterReducer,
  saveProfessionnelReducer,
  searchMedecinReducer,
  medecinGetRDVReducer,
  medecinUpdateRDVReducer,
  medecinGetRDVByIDReducer,
  medecinGetHorairesReducer,
  getParamedicalInfosReducer,
  loginParamedicalReducer,
  searchParamedicalReducer,
  paramedicalGetRDVReducer,
  paramedicalUpdateRDVReducer,
  paramedicalGetRDVByIDReducer,
  paramedicalGetHorairesReducer,
} from "./professionnel.reducer";
import {
  getCommunesReducer,
  getWilayasReducer,
  saveUserReducer,
  verifyCodeReducer,
  registerUserReducer,
  videoTokenReducer,
  saveVideoParams,
  checkParticulierExistReducer,
  loginParticulierReducer,
  addRDVReducer,
  particulierGetRDVReducer,
  particulierGetOrdonnancesReducer,
  particulierGetOrdonnanceByIDReducer,
  particulierGetProfileReducer,
  particulierUpdateProfileReducer,
  particulierAjouterProcheReducer,
  particulierGetProchesReducer,
  particulierUpdateRDVReducer,
  particulierAnnulerRDVReducer,
  particulierGetComptesRendusReducer,
  particulierDeleteOrdonnanceReducer,
  particulierSaveRDVreducer,
  donneurSangSearchReducer,
} from "./user.reducers";

import {
  medecinUpdateProfileReducer,
  medecinAjouterOrdonnanceReducer,
  medecinGetPatientsReducer,
  medecinAjouterCompteRenduReducer,
  medecinAbonnerReducer,
  medecinAjouterPatientReducer,
  medecinGetAbonnementReducer,
} from "./medecin";

import {
  paramedicalUpdateProfileReducer,
  paramedicalAjouterOrdonnanceReducer,
  paramedicalGetPatientsReducer,
  paramedicalAjouterCompteRenduReducer,
  paramedicalAbonnerReducer,
  paramedicalAjouterPatientReducer,
  paramedicalGetAbonnementReducer,
} from "./paramedical";

import {
  ambulanceCheckExistReducer,
  ambulanceLoginReducer,
  ambulanceSearchReducer,
} from "./ambulance";

import {
  cliniqueCheckExistReducer,
  cliniqueLoginReducer,
  cliniqueSearchReducer,
} from "./clinique";

import {
  laboratoireCheckExistReducer,
  laboratoireLoginReducer,
  laboratoireSearchReducer,
} from "./labo";

import {
  pharmacieCheckExistReducer,
  pharmacieLoginReducer,
  pharmacieSearchReducer,
} from "./pharmacie";

import {
  adminGetParticuliersReducer,
  adminLoginReducer,
  adminGetRdvsReducer,
} from "./Admin/admin.reducer";

export default combineReducers({
  wilayasReducer: getWilayasReducer,
  communesReducer: getCommunesReducer,
  specialitesReducer: getSpecialitesReducer,
  saveUser: saveUserReducer,
  verifyCodeUser: verifyCodeReducer,
  registerUser: registerUserReducer,
  registerProfessionnel: professionnelRegisterReducer,
  saveProfessionnel: saveProfessionnelReducer,
  checkProfessionnelExist: checkProfessionnelExistReducer,
  searchMedecin: searchMedecinReducer,
  getMedecinInfos: getMedecinInfosReducer,
  videoToken: videoTokenReducer,
  saveVideoParams,
  loginMedecinReducer,
  checkParticulierExistReducer,
  loginParticulierReducer,
  addRDVReducer,
  particulierGetRDVReducer,
  medecinGetRDVReducer,
  medecinUpdateRDVReducer,
  medecinGetRDVByIDReducer,
  medecinGetHorairesReducer,
  medecinUpdateProfileReducer,
  medecinAjouterOrdonnanceReducer,
  medecinGetPatientsReducer,
  medecinAjouterCompteRenduReducer,
  medecinAbonnerReducer,
  particulierGetOrdonnancesReducer,
  particulierGetComptesRendusReducer,
  particulierGetOrdonnanceByIDReducer,
  particulierGetProfileReducer,
  particulierUpdateProfileReducer,
  particulierAjouterProcheReducer,
  particulierGetProchesReducer,
  particulierUpdateRDVReducer,
  particulierAnnulerRDVReducer,
  particulierDeleteOrdonnanceReducer,
  medecinAjouterPatientReducer,
  medecinGetAbonnementReducer,
  ambulanceCheckExistReducer,
  ambulanceLoginReducer,
  ambulanceSearchReducer,
  pharmacieCheckExistReducer,
  pharmacieLoginReducer,
  pharmacieSearchReducer,
  cliniqueCheckExistReducer,
  cliniqueLoginReducer,
  cliniqueSearchReducer,

  laboratoireCheckExistReducer,
  laboratoireLoginReducer,
  laboratoireSearchReducer,
  particulierSaveRDVreducer,
  donneurSangSearchReducer,
  adminGetParticuliersReducer,
  adminLoginReducer,
  adminGetRdvsReducer,

  getParamedicalInfosReducer,
  loginParamedicalReducer,
  searchParamedicalReducer,
  paramedicalGetRDVReducer,
  paramedicalUpdateRDVReducer,
  paramedicalGetRDVByIDReducer,
  paramedicalGetHorairesReducer,
  paramedicalUpdateProfileReducer,
  paramedicalAjouterOrdonnanceReducer,
  paramedicalGetPatientsReducer,
  paramedicalAjouterCompteRenduReducer,
  paramedicalAbonnerReducer,
  paramedicalAjouterPatientReducer,
  paramedicalGetAbonnementReducer,
});
