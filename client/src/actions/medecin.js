import axios from "axios";
import {
  MEDECIN_ABONNER_FAIL,
  MEDECIN_ABONNER_REQUEST,
  MEDECIN_ABONNER_SUCCESS,
  MEDECIN_ADD_COMPTERENDU_FAIL,
  MEDECIN_ADD_COMPTERENDU_REQUEST,
  MEDECIN_ADD_COMPTERENDU_SUCCESS,
  MEDECIN_ADD_ORDONNANCE_FAIL,
  MEDECIN_ADD_ORDONNANCE_REQUEST,
  MEDECIN_ADD_ORDONNANCE_SUCCESS,
  MEDECIN_ADD_PATIENT_FAIL,
  MEDECIN_ADD_PATIENT_REQUEST,
  MEDECIN_ADD_PATIENT_SUCCESS,
  MEDECIN_GET_ABONNEMENT_FAIL,
  MEDECIN_GET_ABONNEMENT_REQUEST,
  MEDECIN_GET_ABONNEMENT_SUCCESS,
  MEDECIN_GET_PATIENTS_FAIL,
  MEDECIN_GET_PATIENTS_REQUEST,
  MEDECIN_GET_PATIENTS_SUCCESS,
  MEDECIN_LOGIN_SUCCESS,
  MEDECIN_UPDATE_PROFILE_FAIL,
  MEDECIN_UPDATE_PROFILE_REQUEST,
  MEDECIN_UPDATE_PROFILE_SUCCESS,
} from "./professionnel.types";

export const medecinUpdateAdresse = (adresse) => async (dispatch, getState) => {
  dispatch({ type: MEDECIN_UPDATE_PROFILE_REQUEST });
  try {
    const token = getState().loginMedecinReducer.medecin.token;
    const { data } = await axios.post(
      "/api/medecin/update/adresse",
      {
        nom_de_rue: adresse.nom_de_rue,
        wilaya_id: adresse.wilayaId,
        commune_id: adresse.communeId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: MEDECIN_UPDATE_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: MEDECIN_UPDATE_PROFILE_FAIL, payload: error });
  }
};

export const medecinUpdateHoraires = (horaires, dureeSeance) => async (
  dispatch,
  getState
) => {
  dispatch({ type: MEDECIN_UPDATE_PROFILE_REQUEST });
  try {
    const token = getState().loginMedecinReducer.medecin.token;
    if (dureeSeance) {
      const { data } = await axios.post(
        "/api/medecin/update/horaires",
        { horaires, dureeSeance },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({ type: MEDECIN_UPDATE_PROFILE_SUCCESS, payload: data });
    } else {
      const { data } = await axios.post(
        "/api/medecin/update/horaires",
        { horaires },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({ type: MEDECIN_UPDATE_PROFILE_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({ type: MEDECIN_UPDATE_PROFILE_FAIL, payload: error });
  }
};

export const medecinUpdateLangues = (langues) => async (dispatch, getState) => {
  dispatch({ type: MEDECIN_UPDATE_PROFILE_REQUEST });
  try {
    const token = getState().loginMedecinReducer.medecin.token;
    const { data } = await axios.post(
      "/api/medecin/update/langues",
      { langues },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: MEDECIN_UPDATE_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: MEDECIN_UPDATE_PROFILE_FAIL, payload: error });
  }
};

export const medecinUpdateFormations = (formations) => async (
  dispatch,
  getState
) => {
  dispatch({ type: MEDECIN_UPDATE_PROFILE_REQUEST });
  try {
    const token = getState().loginMedecinReducer.medecin.token;
    const { data } = await axios.post(
      "/api/medecin/update/formations",
      { formations },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: MEDECIN_UPDATE_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: MEDECIN_UPDATE_PROFILE_FAIL, payload: error });
  }
};

export const medecinUpdatePresentation = (presentation) => async (
  dispatch,
  getState
) => {
  dispatch({ type: MEDECIN_UPDATE_PROFILE_REQUEST });
  try {
    const token = getState().loginMedecinReducer.medecin.token;
    const { data } = await axios.post(
      "/api/medecin/update/presentation",
      { presentation },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: MEDECIN_UPDATE_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: MEDECIN_UPDATE_PROFILE_FAIL, payload: error });
  }
};

export const medecinUpdateTarifs = (tarifs) => async (dispatch, getState) => {
  dispatch({ type: MEDECIN_UPDATE_PROFILE_REQUEST });
  try {
    const token = getState().loginMedecinReducer.medecin.token;
    const { data } = await axios.post(
      "/api/medecin/update/tarifs",
      { tarif_video: tarifs.tarifVideo, tarif_cabinet: tarifs.tarifCabinet },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: MEDECIN_UPDATE_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: MEDECIN_UPDATE_PROFILE_FAIL, payload: error });
  }
};

export const medecinAjouterOrdonnance = (ordonnance) => async (
  dispatch,
  getState
) => {
  dispatch({ type: MEDECIN_ADD_ORDONNANCE_REQUEST });

  try {
    const token = getState().loginMedecinReducer.medecin.token;
    const { data } = await axios.post(
      "/api/ordonnance/add",
      {
        medecin_id: ordonnance.medecinId,
        patient_id: ordonnance.patientId,
        code_barre: ordonnance.codebarre,
        medicaments: ordonnance.medicaments,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: MEDECIN_ADD_ORDONNANCE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: MEDECIN_ADD_ORDONNANCE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const medecinGetPatients = () => async (dispatch, getState) => {
  dispatch({ type: MEDECIN_GET_PATIENTS_REQUEST });
  try {
    const token = getState().loginMedecinReducer.medecin.token;
    const { data } = await axios.get("/api/medecin/patients/get", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: MEDECIN_GET_PATIENTS_SUCCESS, payload: data.results });
  } catch (error) {
    dispatch({ type: MEDECIN_GET_PATIENTS_FAIL, payload: error });
  }
};

export const medecinAjouterCompteRendu = (compteRendu) => async (
  dispatch,
  getState
) => {
  dispatch({ type: MEDECIN_ADD_COMPTERENDU_REQUEST });

  try {
    const token = getState().loginMedecinReducer.medecin.token;
    const { data } = await axios.post(
      "/api/compterendu/add",
      {
        medecin_id: compteRendu.medecinId,
        patient_id: compteRendu.patientId,
        code_barre: compteRendu.codebarre,
        description: compteRendu.description,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: MEDECIN_ADD_COMPTERENDU_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: MEDECIN_ADD_COMPTERENDU_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const medecinAbonner = (abonnement) => async (dispatch, getState) => {
  dispatch({ type: MEDECIN_ABONNER_REQUEST });
  try {
    const token = getState().loginMedecinReducer.medecin.token;
    const { data } = await axios.post(
      "/api/abonnement/medecin/add",
      abonnement,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: MEDECIN_ABONNER_SUCCESS, payload: data.results });
    const medecin = JSON.parse(localStorage.getItem("medecin"));
    const newMedecin = {
      ...medecin,
      medecin: {
        ...medecin.medecin,
        abonner_formule_1: data.results[0].abonner_formule_1,
        abonner_formule_2: data.results[0].abonner_formule_2,
      },
    };
    dispatch({ type: MEDECIN_LOGIN_SUCCESS, payload: newMedecin });
    localStorage.setItem("medecin", JSON.stringify(newMedecin));
  } catch (error) {
    dispatch({ type: MEDECIN_ABONNER_FAIL, payload: error });
  }
};

export const medecinAjouterPatient = (patient) => async (
  dispatch,
  getState
) => {
  dispatch({ type: MEDECIN_ADD_PATIENT_REQUEST });

  try {
    const token = getState().loginMedecinReducer.medecin.token;
    const { data } = await axios.post("/api/medecin/patients/add", patient, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: MEDECIN_ADD_PATIENT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: MEDECIN_ADD_PATIENT_FAIL,
    });
  }
};

export const medecinGetAbonnement = () => async (dispatch, getState) => {
  dispatch({ type: MEDECIN_GET_ABONNEMENT_REQUEST });
  try {
    const token = getState().loginMedecinReducer.medecin.token;
    const { data } = await axios.get("/api/abonnement/medecin/get", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: MEDECIN_GET_ABONNEMENT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: MEDECIN_GET_ABONNEMENT_FAIL, payload: error });
  }
};
