import axios from "axios";
import {
  PARAMEDICAL_ABONNER_FAIL,
  PARAMEDICAL_ABONNER_REQUEST,
  PARAMEDICAL_ABONNER_SUCCESS,
  PARAMEDICAL_ADD_COMPTERENDU_FAIL,
  PARAMEDICAL_ADD_COMPTERENDU_REQUEST,
  PARAMEDICAL_ADD_COMPTERENDU_SUCCESS,
  PARAMEDICAL_ADD_ORDONNANCE_FAIL,
  PARAMEDICAL_ADD_ORDONNANCE_REQUEST,
  PARAMEDICAL_ADD_ORDONNANCE_SUCCESS,
  PARAMEDICAL_ADD_PATIENT_FAIL,
  PARAMEDICAL_ADD_PATIENT_REQUEST,
  PARAMEDICAL_ADD_PATIENT_SUCCESS,
  PARAMEDICAL_GET_ABONNEMENT_FAIL,
  PARAMEDICAL_GET_ABONNEMENT_REQUEST,
  PARAMEDICAL_GET_ABONNEMENT_SUCCESS,
  PARAMEDICAL_GET_PATIENTS_FAIL,
  PARAMEDICAL_GET_PATIENTS_REQUEST,
  PARAMEDICAL_GET_PATIENTS_SUCCESS,
  PARAMEDICAL_LOGIN_SUCCESS,
  PARAMEDICAL_UPDATE_PROFILE_FAIL,
  PARAMEDICAL_UPDATE_PROFILE_REQUEST,
  PARAMEDICAL_UPDATE_PROFILE_SUCCESS,
} from "./professionnel.types";

export const paramedicalUpdateAdresse = (adresse) => async (dispatch, getState) => {
  dispatch({ type: PARAMEDICAL_UPDATE_PROFILE_REQUEST });
  try {
    const token = getState().loginParamedicalReducer.paramedical.token;
    const { data } = await axios.post(
      "/api/paramedical/update/adresse",
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
    dispatch({ type: PARAMEDICAL_UPDATE_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PARAMEDICAL_UPDATE_PROFILE_FAIL, payload: error });
  }
};

export const paramedicalUpdateHoraires = (horaires, dureeSeance) => async (
  dispatch,
  getState
) => {
  dispatch({ type: PARAMEDICAL_UPDATE_PROFILE_REQUEST });
  try {
    const token = getState().loginParamedicalReducer.paramedical.token;
    if (dureeSeance) {
      const { data } = await axios.post(
        "/api/paramedical/update/horaires",
        { horaires, dureeSeance },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({ type: PARAMEDICAL_UPDATE_PROFILE_SUCCESS, payload: data });
    } else {
      const { data } = await axios.post(
        "/api/paramedical/update/horaires",
        { horaires },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({ type: PARAMEDICAL_UPDATE_PROFILE_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({ type: PARAMEDICAL_UPDATE_PROFILE_FAIL, payload: error });
  }
};

export const paramedicalUpdateLangues = (langues) => async (dispatch, getState) => {
  dispatch({ type: PARAMEDICAL_UPDATE_PROFILE_REQUEST });
  try {
    const token = getState().loginParamedicalReducer.paramedical.token;
    const { data } = await axios.post(
      "/api/paramedical/update/langues",
      { langues },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: PARAMEDICAL_UPDATE_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PARAMEDICAL_UPDATE_PROFILE_FAIL, payload: error });
  }
};

export const paramedicalUpdateFormations = (formations) => async (
  dispatch,
  getState
) => {
  dispatch({ type: PARAMEDICAL_UPDATE_PROFILE_REQUEST });
  try {
    const token = getState().loginParamedicalReducer.paramedical.token;
    const { data } = await axios.post(
      "/api/paramedical/update/formations",
      { formations },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: PARAMEDICAL_UPDATE_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PARAMEDICAL_UPDATE_PROFILE_FAIL, payload: error });
  }
};

export const paramedicalUpdatePresentation = (presentation) => async (
  dispatch,
  getState
) => {
  dispatch({ type: PARAMEDICAL_UPDATE_PROFILE_REQUEST });
  try {
    const token = getState().loginParamedicalReducer.paramedical.token;
    const { data } = await axios.post(
      "/api/paramedical/update/presentation",
      { presentation },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: PARAMEDICAL_UPDATE_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PARAMEDICAL_UPDATE_PROFILE_FAIL, payload: error });
  }
};

export const paramedicalUpdateTarifs = (tarifs) => async (dispatch, getState) => {
  dispatch({ type: PARAMEDICAL_UPDATE_PROFILE_REQUEST });
  try {
    const token = getState().loginParamedicalReducer.paramedical.token;
    const { data } = await axios.post(
      "/api/paramedical/update/tarifs",
      { tarif_video: tarifs.tarifVideo, tarif_cabinet: tarifs.tarifCabinet },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: PARAMEDICAL_UPDATE_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PARAMEDICAL_UPDATE_PROFILE_FAIL, payload: error });
  }
};

export const paramedicalAjouterOrdonnance = (ordonnance) => async (
  dispatch,
  getState
) => {
  dispatch({ type: PARAMEDICAL_ADD_ORDONNANCE_REQUEST });

  try {
    const token = getState().loginParamedicalReducer.paramedical.token;
    const { data } = await axios.post(
      "/api/ordonnance/add",
      {
        paramedical_id: ordonnance.paramedicalId,
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
    dispatch({ type: PARAMEDICAL_ADD_ORDONNANCE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PARAMEDICAL_ADD_ORDONNANCE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const paramedicalGetPatients = () => async (dispatch, getState) => {
  dispatch({ type: PARAMEDICAL_GET_PATIENTS_REQUEST });
  try {
    const token = getState().loginParamedicalReducer.paramedical.token;
    const { data } = await axios.get("/api/paramedical/patients/get", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: PARAMEDICAL_GET_PATIENTS_SUCCESS, payload: data.results });
  } catch (error) {
    dispatch({ type: PARAMEDICAL_GET_PATIENTS_FAIL, payload: error });
  }
};

export const paramedicalAjouterCompteRendu = (compteRendu) => async (
  dispatch,
  getState
) => {
  dispatch({ type: PARAMEDICAL_ADD_COMPTERENDU_REQUEST });

  try {
    const token = getState().loginParamedicalReducer.paramedical.token;
    const { data } = await axios.post(
      "/api/compterendu/add",
      {
        paramedical_id: compteRendu.paramedicalId,
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
    dispatch({ type: PARAMEDICAL_ADD_COMPTERENDU_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PARAMEDICAL_ADD_COMPTERENDU_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const paramedicalAbonner = (abonnement) => async (dispatch, getState) => {
  dispatch({ type: PARAMEDICAL_ABONNER_REQUEST });
  try {
    const token = getState().loginParamedicalReducer.paramedical.token;
    const { data } = await axios.post(
      "/api/abonnement/paramedical/add",
      abonnement,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: PARAMEDICAL_ABONNER_SUCCESS, payload: data.results });
    const paramedical = JSON.parse(localStorage.getItem("paramedical"));
    const newParamedical = {
      ...paramedical,
      paramedical: {
        ...paramedical.paramedical,
        abonner_formule_1: data.results[0].abonner_formule_1,
        abonner_formule_2: data.results[0].abonner_formule_2,
      },
    };
    dispatch({ type: PARAMEDICAL_LOGIN_SUCCESS, payload: newParamedical });
    localStorage.setItem("paramedical", JSON.stringify(newParamedical));
  } catch (error) {
    dispatch({ type: PARAMEDICAL_ABONNER_FAIL, payload: error });
  }
};

export const paramedicalAjouterPatient = (patient) => async (
  dispatch,
  getState
) => {
  dispatch({ type: PARAMEDICAL_ADD_PATIENT_REQUEST });

  try {
    const token = getState().loginParamedicalReducer.paramedical.token;
    const { data } = await axios.post("/api/paramedical/patients/add", patient, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: PARAMEDICAL_ADD_PATIENT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PARAMEDICAL_ADD_PATIENT_FAIL,
    });
  }
};

export const paramedicalGetAbonnement = () => async (dispatch, getState) => {
  dispatch({ type: PARAMEDICAL_GET_ABONNEMENT_REQUEST });
  try {
    const token = getState().loginParamedicalReducer.paramedical.token;
    const { data } = await axios.get("/api/abonnement/paramedical/get", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: PARAMEDICAL_GET_ABONNEMENT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PARAMEDICAL_GET_ABONNEMENT_FAIL, payload: error });
  }
};
