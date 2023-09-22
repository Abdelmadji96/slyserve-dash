import axios from "axios";
import {
  AMBULANCE_CHECK_EXIST_FAIL,
  AMBULANCE_CHECK_EXIST_REQUEST,
  AMBULANCE_CHECK_EXIST_SUCCESS,
  AMBULANCE_LOGIN_FAIL,
  AMBULANCE_LOGIN_REQUEST,
  AMBULANCE_LOGIN_SUCCESS,
  AMBULANCE_SEARCH_FAIL,
  AMBULANCE_SEARCH_REQUEST,
  AMBULANCE_SEARCH_SUCCESS,
} from "./ambulance.types";

export const ambulanceCheckExist = (telephone, email) => async (dispatch) => {
  dispatch({ type: AMBULANCE_CHECK_EXIST_REQUEST });
  try {
    const { data } = await axios.post("/api/ambulance/check", {
      telephone,
      email,
    });
    dispatch({ type: AMBULANCE_CHECK_EXIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: AMBULANCE_CHECK_EXIST_FAIL, payload: error });
  }
};

export const ambulanceLoginTelephone = (telephone, mdp) => async (dispatch) => {
  dispatch({ type: AMBULANCE_LOGIN_REQUEST });
  try {
    const { data } = await axios.post("/api/ambulance/login/telephone", {
      telephone,
      mdp,
    });
    localStorage.setItem("ambulance", JSON.stringify(data));
    dispatch({ type: AMBULANCE_LOGIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: AMBULANCE_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const ambulanceLoginEmail = (email, mdp) => async (dispatch) => {
  dispatch({ type: AMBULANCE_LOGIN_REQUEST });
  try {
    const { data } = await axios.post("/api/medecin/login/email", {
      email,
      mdp,
    });
    localStorage.setItem("ambulance", JSON.stringify(data));
    dispatch({ type: AMBULANCE_LOGIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: AMBULANCE_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const ambulanceSearch = (ambulance) => async (dispatch) => {
  dispatch({ type: AMBULANCE_SEARCH_REQUEST });
  try {
    if (ambulance.communeId) {
      const { data } = await axios.post("/api/ambulance/search/wilayacommune", {
        wilaya_id: ambulance.wilayaId,
        commune_id: ambulance.communeId,
      });
      dispatch({ type: AMBULANCE_SEARCH_SUCCESS, payload: data.results });
    } else {
      const { data } = await axios.post("/api/ambulance/search/wilaya", {
        wilaya_id: ambulance.wilayaId,
        commune_id: ambulance.communeId,
      });
      dispatch({ type: AMBULANCE_SEARCH_SUCCESS, payload: data.results });
    }
  } catch (error) {
    dispatch({ type: AMBULANCE_SEARCH_FAIL, payload: error });
  }
};
