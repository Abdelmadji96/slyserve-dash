import axios from "axios";
import {
  CLINIQUE_CHECK_EXIST_FAIL,
  CLINIQUE_CHECK_EXIST_REQUEST,
  CLINIQUE_CHECK_EXIST_SUCCESS,
  CLINIQUE_LOGIN_FAIL,
  CLINIQUE_LOGIN_REQUEST,
  CLINIQUE_LOGIN_SUCCESS,
  CLINIQUE_SEARCH_FAIL,
  CLINIQUE_SEARCH_REQUEST,
  CLINIQUE_SEARCH_SUCCESS,
} from "./clinique.types";

export const cliniqueCheckExist = (telephone, email) => async (dispatch) => {
  dispatch({ type: CLINIQUE_CHECK_EXIST_REQUEST });
  try {
    const { data } = await axios.post("/api/clinique/check", {
      telephone,
      email,
    });
    dispatch({ type: CLINIQUE_CHECK_EXIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CLINIQUE_CHECK_EXIST_FAIL, payload: error });
  }
};

export const cliniqueLoginTelephone = (telephone, mdp) => async (dispatch) => {
  dispatch({ type: CLINIQUE_LOGIN_REQUEST });
  try {
    const { data } = await axios.post("/api/clinique/login/telephone", {
      telephone,
      mdp,
    });
    localStorage.setItem("clinique", JSON.stringify(data));
    dispatch({ type: CLINIQUE_LOGIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CLINIQUE_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const cliniqueLoginEmail = (email, mdp) => async (dispatch) => {
  dispatch({ type: CLINIQUE_LOGIN_REQUEST });
  try {
    const { data } = await axios.post("/api/medecin/login/email", {
      email,
      mdp,
    });
    localStorage.setItem("clinique", JSON.stringify(data));
    dispatch({ type: CLINIQUE_LOGIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CLINIQUE_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const cliniqueSearch = (clinique) => async (dispatch) => {
  dispatch({ type: CLINIQUE_SEARCH_REQUEST });
  try {
    if (clinique.communeId) {
      const { data } = await axios.post("/api/clinique/search/wilayacommune", {
        wilaya_id: clinique.wilayaId,
        commune_id: clinique.communeId,
      });
      dispatch({ type: CLINIQUE_SEARCH_SUCCESS, payload: data.results });
    } else {
      const { data } = await axios.post("/api/clinique/search/wilaya", {
        wilaya_id: clinique.wilayaId,
        commune_id: clinique.communeId,
      });
      dispatch({ type: CLINIQUE_SEARCH_SUCCESS, payload: data.results });
    }
  } catch (error) {
    dispatch({ type: CLINIQUE_SEARCH_FAIL, payload: error });
  }
};
