import axios from "axios";
import {
  LABORATOIRE_CHECK_EXIST_FAIL,
  LABORATOIRE_CHECK_EXIST_REQUEST,
  LABORATOIRE_CHECK_EXIST_SUCCESS,
  LABORATOIRE_LOGIN_FAIL,
  LABORATOIRE_LOGIN_REQUEST,
  LABORATOIRE_LOGIN_SUCCESS,
  LABORATOIRE_SEARCH_FAIL,
  LABORATOIRE_SEARCH_REQUEST,
  LABORATOIRE_SEARCH_SUCCESS,
} from "./laboratoire.types";

export const laboratoireCheckExist = (telephone, email) => async (dispatch) => {
  dispatch({ type: LABORATOIRE_CHECK_EXIST_REQUEST });
  try {
    const { data } = await axios.post("/api/labo/check", {
      telephone,
      email,
    });
    dispatch({ type: LABORATOIRE_CHECK_EXIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: LABORATOIRE_CHECK_EXIST_FAIL, payload: error });
  }
};

export const laboratoireLoginTelephone = (telephone, mdp) => async (dispatch) => {
  dispatch({ type: LABORATOIRE_LOGIN_REQUEST });
  try {
    const { data } = await axios.post("/api/labo/login/telephone", {
      telephone,
      mdp,
    });
    localStorage.setItem("laboratoire", JSON.stringify(data));
    dispatch({ type: LABORATOIRE_LOGIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: LABORATOIRE_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const laboratoireLoginEmail = (email, mdp) => async (dispatch) => {
  dispatch({ type: LABORATOIRE_LOGIN_REQUEST });
  try {
    const { data } = await axios.post("/api/labo/login/email", {
      email,
      mdp,
    });
    localStorage.setItem("laboratoire", JSON.stringify(data));
    dispatch({ type: LABORATOIRE_LOGIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: LABORATOIRE_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const laboratoireSearch = (laboratoire) => async (dispatch) => {
  dispatch({ type: LABORATOIRE_SEARCH_REQUEST });
  try {
    if (laboratoire.communeId) {
      const { data } = await axios.post("/api/laboratoire/search/wilayacommune", {
        wilaya_id: laboratoire.wilayaId,
        commune_id: laboratoire.communeId,
      });
      dispatch({ type: LABORATOIRE_SEARCH_SUCCESS, payload: data.results });
    } else {
      const { data } = await axios.post("/api/laboratoire/search/wilaya", {
        wilaya_id: laboratoire.wilayaId,
        commune_id: laboratoire.communeId,
      });
      dispatch({ type: LABORATOIRE_SEARCH_SUCCESS, payload: data.results });
    }
  } catch (error) {
    dispatch({ type: LABORATOIRE_SEARCH_FAIL, payload: error });
  }
};
