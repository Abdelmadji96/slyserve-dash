import axios from "axios";
import {
  ADMIN_GET_PARTICULIERS_FAIL,
  ADMIN_GET_PARTICULIERS_REQUEST,
  ADMIN_GET_PARTICULIERS_SUCCESS,
  ADMIN_GET_RDVS_FAIL,
  ADMIN_GET_RDVS_REQUEST,
  ADMIN_GET_RDVS_SUCCESS,
  ADMIN_LOGIN_FAIL,
  ADMIN_LOGIN_REQUEST,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGOUT,
} from "./admin.types";

export const adminGetParticuliers = () => async (dispatch, getState) => {
  dispatch({ type: ADMIN_GET_PARTICULIERS_REQUEST });
  try {
    const token = getState().adminLoginReducer.admin.token;
    const { data } = await axios.get("/api/admin/particuliers", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: ADMIN_GET_PARTICULIERS_SUCCESS, payload: data.results });
  } catch (error) {
    dispatch({ type: ADMIN_GET_PARTICULIERS_FAIL, payload: error });
  }
};

export const adminGetRDVs = () => async (dispatch, getState) => {
  dispatch({ type: ADMIN_GET_RDVS_REQUEST });
  try {
    const token = getState().adminLoginReducer.admin.token;
    const { data } = await axios.get("/api/admin/rdvs", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: ADMIN_GET_RDVS_SUCCESS, payload: data.results });
  } catch (error) {
    dispatch({ type: ADMIN_GET_RDVS_FAIL });
  }
};

export const adminLogin = (username, mdp) => async (dispatch) => {
  dispatch({ type: ADMIN_LOGIN_REQUEST });
  try {
    const { data } = await axios.post("/api/admin/login", {
      username,
      mdp,
    });
    localStorage.setItem("admin", JSON.stringify(data));
    dispatch({ type: ADMIN_LOGIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADMIN_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const adminLogout = () => (dispatch) => {
  localStorage.removeItem("admin");
  dispatch({ type: ADMIN_LOGOUT });
};
