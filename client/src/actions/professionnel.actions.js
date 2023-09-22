import axios from "axios";
import {
  GET_SPECIALITES_FAIL,
  GET_SPECIALITES_REQUEST,
  GET_SPECIALITES_SUCCESS,
  PROFESSIONNEL_SIGNUP_REQUEST,
  PROFESSIONNEL_SIGNUP_SUCCESS,
  PROFESSIONNEL_SIGNUP_FAIL,
  CHECK_PROFESSIONNEL_EXIST_REQUEST,
  CHECK_PROFESSIONNEL_EXIST_SUCCESS,
  CHECK_PROFESSIONNEL_EXIST_FAIL,
  SEARCH_MEDECIN_REQUEST,
  SEARCH_MEDECIN_FAIL,
  SEARCH_MEDECIN_SUCCESS,
  GET_MEDECIN_INFO_REQUEST,
  GET_MEDECIN_INFO_SUCCESS,
  GET_MEDECIN_INFO_FAIL,
  MEDECIN_LOGIN_REQUEST,
  MEDECIN_LOGIN_SUCCESS,
  MEDECIN_LOGIN_FAIL,
  MEDECIN_LOGOUT,
  MEDECIN_GET_RDV_REQUEST,
  MEDECIN_GET_RDV_SUCCESS,
  MEDECIN_GET_RDV_FAIL,
  MEDECIN_UPDATE_RDV_REQUEST,
  MEDECIN_UPDATE_RDV_SUCCESS,
  MEDECIN_UPDATE_RDV_FAIL,
  MEDECIN_GET_RDV_BYID_REQUEST,
  MEDECIN_GET_RDV_BYID_SUCCESS,
  MEDECIN_GET_RDV_BYID_FAIL,
  MEDECIN_GET_HORAIRES_REQUEST,
  MEDECIN_GET_HORAIRES_SUCCESS,
  MEDECIN_GET_HORAIRES_FAIL,
  SEARCH_PARAMEDICAL_SUCCESS,
  SEARCH_PARAMEDICAL_FAIL,
  GET_PARAMEDICAL_INFO_SUCCESS,
  GET_PARAMEDICAL_INFO_FAIL,
  PARAMEDICAL_LOGIN_SUCCESS,
  PARAMEDICAL_LOGIN_FAIL,
  PARAMEDICAL_LOGIN_REQUEST,
  PARAMEDICAL_GET_RDV_REQUEST,
  PARAMEDICAL_GET_RDV_SUCCESS,
  PARAMEDICAL_GET_RDV_FAIL,
  PARAMEDICAL_UPDATE_RDV_REQUEST,
  PARAMEDICAL_UPDATE_RDV_SUCCESS,
  PARAMEDICAL_UPDATE_RDV_FAIL,
  PARAMEDICAL_GET_RDV_BYID_REQUEST,
  PARAMEDICAL_GET_RDV_BYID_SUCCESS,
  PARAMEDICAL_GET_RDV_BYID_FAIL,
  PARAMEDICAL_GET_HORAIRES_REQUEST,
  PARAMEDICAL_GET_HORAIRES_SUCCESS,
  PARAMEDICAL_GET_HORAIRES_FAIL,
  PARAMEDICAL_LOGOUT,
} from "./professionnel.types";

export const getSpecialites = () => async (dispatch) => {
  dispatch({ type: GET_SPECIALITES_REQUEST });
  try {
    const { data } = await axios.get("/professionnels/specialites");
    dispatch({ type: GET_SPECIALITES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_SPECIALITES_FAIL, payload: error });
  }
};

export const signupProfessionnel = (professionnel) => async (dispatch) => {
  dispatch({ type: PROFESSIONNEL_SIGNUP_REQUEST });
  console.log(professionnel);

  try {
    let data = {};
    switch (professionnel.table) {
      case "medecin":
        data = await axios.post("/api/medecin/register", {
          nom: professionnel.nom,
          prenom: professionnel.prenom,
          dateN: professionnel.dateDeNaissance,
          genre: professionnel.genre,
          numeroTelephone: professionnel.numeroTelephone,
          email: professionnel.email,
          mdp: professionnel.motDePasse,
          nomRue: professionnel.nomDeRue,
          commune: professionnel.commune,
          wilaya: professionnel.wilaya,
          specialite: professionnel.specialite,
          latitude: professionnel.latitude,
          longitude: professionnel.longitude,
        });
        dispatch({ type: PROFESSIONNEL_SIGNUP_SUCCESS, payload: data });
        break;

      case "ambulance":
        data = await axios.post("/api/ambulance/register", {
          numeroTelephone: professionnel.numeroTelephone,
          email: professionnel.email,
          mdp: professionnel.motDePasse,
          nomRue: professionnel.nomDeRue,
          commune: professionnel.commune,
          wilaya: professionnel.wilaya,
          latitude: professionnel.latitude,
          longitude: professionnel.longitude,
        });
        dispatch({ type: PROFESSIONNEL_SIGNUP_SUCCESS, payload: data });
        break;

      case "pharmacie":
        data = await axios.post("/api/pharmacie/register", {
          numeroTelephone: professionnel.numeroTelephone,
          email: professionnel.email,
          mdp: professionnel.motDePasse,
          nomRue: professionnel.nomDeRue,
          commune: professionnel.commune,
          wilaya: professionnel.wilaya,
          latitude: professionnel.latitude,
          longitude: professionnel.longitude,
        });
        dispatch({ type: PROFESSIONNEL_SIGNUP_SUCCESS, payload: data });
        break;

      case "clinique":
        data = await axios.post("/api/clinique/register", {
          numeroTelephone: professionnel.numeroTelephone,
          email: professionnel.email,
          mdp: professionnel.motDePasse,
          nomRue: professionnel.nomDeRue,
          commune: professionnel.commune,
          wilaya: professionnel.wilaya,
          latitude: professionnel.latitude,
          longitude: professionnel.longitude,
        });
        dispatch({ type: PROFESSIONNEL_SIGNUP_SUCCESS, payload: data });
        break;

      case "paramedical":
        data = await axios.post("/api/paramedical/register", {
          nom: professionnel.nom,
          prenom: professionnel.prenom,
          dateN: professionnel.dateDeNaissance,
          genre: professionnel.genre,
          numeroTelephone: professionnel.numeroTelephone,
          email: professionnel.email,
          mdp: professionnel.motDePasse,
          nomRue: professionnel.nomDeRue,
          commune: professionnel.commune,
          wilaya: professionnel.wilaya,
          specialite: professionnel.specialite,
          latitude: professionnel.latitude,
          longitude: professionnel.longitude,
        });
        dispatch({ type: PROFESSIONNEL_SIGNUP_SUCCESS, payload: data });
        break;

      default:
        break;
    }
    /*if (professionnel.table === "medecin") {
      const { data } = await axios.post("/api/medecin/register", {
        nom: professionnel.nom,
        prenom: professionnel.prenom,
        dateN: professionnel.dateDeNaissance,
        genre: professionnel.genre,
        numeroTelephone: professionnel.numeroTelephone,
        email: professionnel.email,
        mdp: professionnel.motDePasse,
        nomRue: professionnel.nomDeRue,
        commune: professionnel.commune,
        wilaya: professionnel.wilaya,
        specialite: professionnel.specialite,
        latitude: professionnel.latitude,
        longitude: professionnel.longitude,
      });
      dispatch({ type: PROFESSIONNEL_SIGNUP_SUCCESS, payload: data });
    }
    if (professionnel.table === "ambulance") {
      const { data } = await axios.post("/api/ambulance/register", {
        numeroTelephone: professionnel.numeroTelephone,
        email: professionnel.email,
        mdp: professionnel.motDePasse,
        nomRue: professionnel.nomDeRue,
        commune: professionnel.commune,
        wilaya: professionnel.wilaya,
        latitude: professionnel.latitude,
        longitude: professionnel.longitude,
      });
      dispatch({ type: PROFESSIONNEL_SIGNUP_SUCCESS, payload: data });
    }
    if (professionnel.table === "pharmacie") {
      const { data } = await axios.post("/api/pharmacie/register", {
        numeroTelephone: professionnel.numeroTelephone,
        email: professionnel.email,
        mdp: professionnel.motDePasse,
        nomRue: professionnel.nomDeRue,
        commune: professionnel.commune,
        wilaya: professionnel.wilaya,
        latitude: professionnel.latitude,
        longitude: professionnel.longitude,
      });
      dispatch({ type: PROFESSIONNEL_SIGNUP_SUCCESS, payload: data });
    }
    if (professionnel.table === "clinique") {
      const { data } = await axios.post("/api/clinique/register", {
        numeroTelephone: professionnel.numeroTelephone,
        email: professionnel.email,
        mdp: professionnel.motDePasse,
        nomRue: professionnel.nomDeRue,
        commune: professionnel.commune,
        wilaya: professionnel.wilaya,
        latitude: professionnel.latitude,
        longitude: professionnel.longitude,
      });
      dispatch({ type: PROFESSIONNEL_SIGNUP_SUCCESS, payload: data });
    }*/
  } catch (error) {
    dispatch({ type: PROFESSIONNEL_SIGNUP_FAIL, payload: error });
  }
};

export const checkMedecinExist = (telephone, email) => async (dispatch) => {
  dispatch({ type: CHECK_PROFESSIONNEL_EXIST_REQUEST });
  try {
    const { data } = await axios.post("/api/medecin/check", {
      telephone,
      email,
    });
    dispatch({ type: CHECK_PROFESSIONNEL_EXIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CHECK_PROFESSIONNEL_EXIST_FAIL, payload: error });
  }
};

export const checkAmbulanceExist = (telephone, email) => async (dispatch) => {
  dispatch({ type: CHECK_PROFESSIONNEL_EXIST_REQUEST });
  try {
    const { data } = await axios.post("/api/ambulance/check", {
      telephone,
      email,
    });
    dispatch({ type: CHECK_PROFESSIONNEL_EXIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CHECK_PROFESSIONNEL_EXIST_FAIL, payload: error });
  }
};

export const checkParamedicalExist = (telephone, email) => async (dispatch) => {
  dispatch({ type: CHECK_PROFESSIONNEL_EXIST_REQUEST });
  try {
    const { data } = await axios.post("/api/paramedical/check", {
      telephone,
      email,
    });
    dispatch({ type: CHECK_PROFESSIONNEL_EXIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CHECK_PROFESSIONNEL_EXIST_FAIL, payload: error });
  }
};

export const searchMedecin =
  (wilaya, commune, specialite) => async (dispatch) => {
    dispatch({ type: SEARCH_MEDECIN_REQUEST });
    try {
      const { data } = await axios.post("/professionnels/search/medecins", {
        wilaya,
        commune,
        specialite,
      });
      dispatch({ type: SEARCH_MEDECIN_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: SEARCH_MEDECIN_FAIL, payload: error });
    }
  };

export const getMedecinInfos = (id) => async (dispatch) => {
  dispatch({ type: GET_MEDECIN_INFO_REQUEST });
  try {
    const { data } = await axios.get(`/professionnels/medecin/info/${id}`);
    dispatch({ type: GET_MEDECIN_INFO_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_MEDECIN_INFO_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const loginMedecinTelephone = (telephone, mdp) => async (dispatch) => {
  dispatch({ type: MEDECIN_LOGIN_REQUEST });
  try {
    const { data } = await axios.post("/api/medecin/login/telephone", {
      telephone,
      mdp,
    });
    localStorage.setItem("medecin", JSON.stringify(data));
    dispatch({ type: MEDECIN_LOGIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: MEDECIN_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const loginMedecinEmail = (email, mdp) => async (dispatch) => {
  dispatch({ type: MEDECIN_LOGIN_REQUEST });
  try {
    const { data } = await axios.post("/api/medecin/login/email", {
      email,
      mdp,
    });
    localStorage.setItem("medecin", JSON.stringify(data));
    dispatch({ type: MEDECIN_LOGIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: MEDECIN_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const MedecinGetRDV = () => async (dispatch, getState) => {
  dispatch({ type: MEDECIN_GET_RDV_REQUEST });
  try {
    const token = getState().loginMedecinReducer.medecin.token;
    const { data } = await axios.get("/api/rdv/get/bymedecin", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: MEDECIN_GET_RDV_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: MEDECIN_GET_RDV_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const medecinUpdateRDV = (rdv) => async (dispatch, getState) => {
  dispatch({ type: MEDECIN_UPDATE_RDV_REQUEST });
  try {
    const token = getState().loginMedecinReducer.medecin.token;
    const { data } = await axios.put("/api/rdv/update", rdv, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: MEDECIN_UPDATE_RDV_SUCCESS, payload: data.results });
  } catch (error) {
    dispatch({
      type: MEDECIN_UPDATE_RDV_FAIL,
    });
  }
};

export const MedecinGetRDVByID = (rdv_id) => async (dispatch, getState) => {
  dispatch({ type: MEDECIN_GET_RDV_BYID_REQUEST });
  try {
    const tokenMedecin = getState().loginMedecinReducer.medecin.token;
    const { data } = await axios.get("/api/rdv/id/" + rdv_id, {
      headers: {
        Authorization: `Bearer ${tokenMedecin}`,
      },
    });
    dispatch({ type: MEDECIN_GET_RDV_BYID_SUCCESS, payload: data.results });
  } catch (error) {
    dispatch({
      type: MEDECIN_GET_RDV_BYID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const MedecinGetRDVByLink = (rdv_lien) => async (dispatch, getState) => {
  dispatch({ type: MEDECIN_GET_RDV_BYID_REQUEST });
  try {
    const tokenMedecin = getState().loginMedecinReducer.medecin.token;
    const tokenParticulier =
      getState().loginParticulierReducer.particulier.token;
    const { data } = await axios.get("/api/rdv/link/" + rdv_lien, {
      headers: {
        Authorization: `Bearer ${tokenMedecin || tokenParticulier}`,
      },
    });
    dispatch({ type: MEDECIN_GET_RDV_BYID_SUCCESS, payload: data.results });
  } catch (error) {
    dispatch({
      type: MEDECIN_GET_RDV_BYID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const medecinGetHoraires = (medecin, day) => async (dispatch) => {
  dispatch({ type: MEDECIN_GET_HORAIRES_REQUEST });
  try {
    const { data } = await axios.post("/api/medecin/horaires", {
      medecin,
      day,
    });
    dispatch({ type: MEDECIN_GET_HORAIRES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: MEDECIN_GET_HORAIRES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logoutMedecin = () => (dispatch) => {
  localStorage.removeItem("medecin");
  dispatch({ type: MEDECIN_LOGOUT });
};

//

export const searchParamedical =
  (wilaya, commune, specialite) => async (dispatch) => {
    dispatch({ type: SEARCH_MEDECIN_REQUEST });
    try {
      const { data } = await axios.post("/professionnels/search/paramedical", {
        wilaya,
        commune,
        specialite,
      });
      dispatch({ type: SEARCH_PARAMEDICAL_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: SEARCH_PARAMEDICAL_FAIL, payload: error });
    }
  };

export const getParamedicalInfos = (id) => async (dispatch) => {
  dispatch({ type: GET_MEDECIN_INFO_REQUEST });
  try {
    const { data } = await axios.get(`/professionnels/paramedical/info/${id}`);
    dispatch({ type: GET_PARAMEDICAL_INFO_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_PARAMEDICAL_INFO_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const loginParamedicalTelephone = (telephone, mdp) => async (dispatch) => {
  dispatch({ type: PARAMEDICAL_LOGIN_REQUEST });
  try {
    const { data } = await axios.post("/api/paramedical/login/telephone", {
      telephone,
      mdp,
    });
    localStorage.setItem("paramedical", JSON.stringify(data));
    dispatch({ type: PARAMEDICAL_LOGIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PARAMEDICAL_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const loginParamedicalEmail = (email, mdp) => async (dispatch) => {
  dispatch({ type: PARAMEDICAL_LOGIN_REQUEST });
  try {
    const { data } = await axios.post("/api/paramedical/login/email", {
      email,
      mdp,
    });
    localStorage.setItem("paramedical", JSON.stringify(data));
    dispatch({ type: PARAMEDICAL_LOGIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PARAMEDICAL_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const ParamedicalGetRDV = () => async (dispatch, getState) => {
  dispatch({ type: PARAMEDICAL_GET_RDV_REQUEST });
  try {
    const token = getState().loginParamedicalReducer.paramedical.token;
    const { data } = await axios.get("/api/rdv/get/byparamedical", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: PARAMEDICAL_GET_RDV_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PARAMEDICAL_GET_RDV_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const paramedicalUpdateRDV = (rdv) => async (dispatch, getState) => {
  dispatch({ type: PARAMEDICAL_UPDATE_RDV_REQUEST });
  try {
    const token = getState().loginParamedicalReducer.paramedical.token;
    const { data } = await axios.put("/api/rdv/update", rdv, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: PARAMEDICAL_UPDATE_RDV_SUCCESS, payload: data.results });
  } catch (error) {
    dispatch({
      type: PARAMEDICAL_UPDATE_RDV_FAIL,
    });
  }
};

export const ParamedicalGetRDVByID = (rdv_id) => async (dispatch, getState) => {
  dispatch({ type: PARAMEDICAL_GET_RDV_BYID_REQUEST });
  try {
    const tokenParamedical = getState().loginParamedicalReducer.paramedical.token;
    const { data } = await axios.get("/api/rdv/id/" + rdv_id, {
      headers: {
        Authorization: `Bearer ${tokenParamedical}`,
      },
    });
    dispatch({ type: PARAMEDICAL_GET_RDV_BYID_SUCCESS, payload: data.results });
  } catch (error) {
    dispatch({
      type: PARAMEDICAL_GET_RDV_BYID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const ParamedicalGetRDVByLink = (rdv_lien) => async (dispatch, getState) => {
  dispatch({ type: PARAMEDICAL_GET_RDV_BYID_REQUEST });
  try {
    const tokenParamedical = getState().loginParamedicalReducer.paramedical.token;
    const tokenParticulier =
      getState().loginParticulierReducer.particulier.token;
    const { data } = await axios.get("/api/rdv/link/" + rdv_lien, {
      headers: {
        Authorization: `Bearer ${tokenParamedical || tokenParticulier}`,
      },
    });
    dispatch({ type: PARAMEDICAL_GET_RDV_BYID_SUCCESS, payload: data.results });
  } catch (error) {
    dispatch({
      type: PARAMEDICAL_GET_RDV_BYID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const paramedicalGetHoraires = (paramedical, day) => async (dispatch) => {
  dispatch({ type: PARAMEDICAL_GET_HORAIRES_REQUEST });
  try {
    const { data } = await axios.post("/api/paramedical/horaires", {
      paramedical,
      day,
    });
    dispatch({ type: PARAMEDICAL_GET_HORAIRES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PARAMEDICAL_GET_HORAIRES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logoutParamedical = () => (dispatch) => {
  localStorage.removeItem("paramedical");
  dispatch({ type: PARAMEDICAL_LOGOUT });
};