import axios from "axios";
import {
  PHARMACIE_CHECK_EXIST_FAIL,
  PHARMACIE_CHECK_EXIST_REQUEST,
  PHARMACIE_CHECK_EXIST_SUCCESS,
  PHARMACIE_LOGIN_FAIL,
  PHARMACIE_LOGIN_REQUEST,
  PHARMACIE_LOGIN_SUCCESS,
  PHARMACIE_SEARCH_FAIL,
  PHARMACIE_SEARCH_REQUEST,
  PHARMACIE_SEARCH_SUCCESS,
} from "./pharmacie.types";

export const pharmacieCheckExist = (telephone, email) => async (dispatch) => {
  dispatch({ type: PHARMACIE_CHECK_EXIST_REQUEST });
  try {
    const { data } = await axios.post("/api/pharmacie/check", {
      telephone,
      email,
    });
    dispatch({ type: PHARMACIE_CHECK_EXIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PHARMACIE_CHECK_EXIST_FAIL, payload: error });
  }
};

export const pharmacieLoginTelephone = (telephone, mdp) => async (dispatch) => {
  dispatch({ type: PHARMACIE_LOGIN_REQUEST });
  try {
    const { data } = await axios.post("/api/pharmacie/login/telephone", {
      telephone,
      mdp,
    });
    localStorage.setItem("pharmacie", JSON.stringify(data));
    dispatch({ type: PHARMACIE_LOGIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PHARMACIE_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const pharmacieLoginEmail = (email, mdp) => async (dispatch) => {
  dispatch({ type: PHARMACIE_LOGIN_REQUEST });
  try {
    const { data } = await axios.post("/api/pharmacie/login/email", {
      email,
      mdp,
    });
    localStorage.setItem("ambulance", JSON.stringify(data));
    dispatch({ type: PHARMACIE_LOGIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PHARMACIE_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const pharmacieSearch = (pharmacie) => async (dispatch) => {
  dispatch({ type: PHARMACIE_SEARCH_REQUEST });
  try {
    if (pharmacie.communeId) {
      const { data } = await axios.post("/api/pharmacie/search/wilayacommune", {
        wilaya_id: pharmacie.wilayaId,
        commune_id: pharmacie.communeId,
      });
      dispatch({ type: PHARMACIE_SEARCH_SUCCESS, payload: data.results });
    } else {
      const { data } = await axios.post("/api/pharmacie/search/wilaya", {
        wilaya_id: pharmacie.wilayaId,
        commune_id: pharmacie.communeId,
      });
      dispatch({ type: PHARMACIE_SEARCH_SUCCESS, payload: data.results });
    }
  } catch (error) {
    dispatch({ type: PHARMACIE_SEARCH_FAIL, payload: error });
  }
};
