import axios from "axios";
import {
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_FAIL,
  USER_SIGNUP_SUCCESS,
  GET_WILAYA_REQUEST,
  GET_WILAYA_SUCCESS,
  GET_WILAYA_FAIL,
  GET_COMMUNES_REQUEST,
  GET_COMMUNES_SUCCESS,
  GET_COMMUNES_FAIL,
  SEND_CODE_REQUEST,
  SEND_CODE_SUCCESS,
  SEND_CODE_FAIL,
  VERIFY_CODE_REQUEST,
  VERIFY_CODE_SUCCESS,
  VERIFY_CODE_FAIL,
  GET_VIDEO_TOKEN_REQUEST,
  GET_VIDEO_TOKEN_SUCCESS,
  GET_VIDEO_TOKEN_FAIL,
  CHECK_PARTICULIER_EXIST_REQUEST,
  CHECK_PARTICULIER_EXIST_SUCCESS,
  CHECK_PARTICULIER_EXIST_FAIL,
  PARTICULIER_LOGIN_REQUEST,
  PARTICULIER_LOGIN_SUCCESS,
  PARTICULIER_LOGIN_FAIL,
  PARTICULIER_LOGOUT,
  ADD_RDV_REQUEST,
  ADD_RDV_SUCCESS,
  ADD_RDV_FAIL,
  PARTICULIER_GET_RDV_REQUEST,
  PARTICULIER_GET_RDV_SUCCESS,
  PARTICULIER_GET_RDV_FAIL,
  PARTICULIER_GET_ORDONNANCES_REQUEST,
  PARTICULIER_GET_ORDONNANCES_SUCCESS,
  PARTICULIER_GET_ORDONNANCES_FAIL,
  PARTICULIER_GET_ORDONNAnCE_BYID_REQUEST,
  PARTICULIER_GET_ORDONNAnCE_BYID_SUCCESS,
  PARTICULIER_GET_ORDONNAnCE_BYID_FAIL,
  PARTICULIER_GET_PROFILE_REQUEST,
  PARTICULIER_GET_PROFILE_SUCCESS,
  PARTICULIER_GET_PROFILE_FAIL,
  PARTICULIER_UPDATE_PROFILE_REQUEST,
  PARTICULIER_UPDATE_PROFILE_SUCCESS,
  PARTICULIER_UPDATE_PROFILE_FAIL,
  PARTICULIER_ADD_PROCHE_REQUEST,
  PARTICULIER_ADD_PROCHE_SUCCESS,
  PARTICULIER_ADD_PROCHE_FAIL,
  PARTICULIER_GET_PROCHES_REQUEST,
  PARTICULIER_GET_PROCHES_SUCCESS,
  PARTICULIER_GET_PROCHES_FAIL,
  PARTICULIER_UPDATE_RDV_REQUEST,
  PARTICULIER_UPDATE_RDV_SUCCESS,
  PARTICULIER_UPDATE_RDV_FAIL,
  PARTICULIER_ANNULER_RDV_REQUEST,
  PARTICULIER_ANNULER_RDV_SUCCESS,
  PARTICULIER_ANNULER_RDV_FAIL,
  PARTICULIER_GET_COMPTES_RENDUS_REQUEST,
  PARTICULIER_GET_COMPTES_RENDUS_SUCCESS,
  PARTICULIER_GET_COMPTES_RENDUS_FAIL,
  PARTICULIER_DELETE_ORDONNANCE_REQUEST,
  PARTICULIER_DELETE_ORDONNANCE_FAIL,
  PARTICULIER_DELETE_ORDONNANCE_SUCCESS,
  DONNEUR_SANG_SEARCH_REQUEST,
  DONNEUR_SANG_SEARCH_SUCCESS,
  DONNEUR_SANG_SEARCH_FAIL,
} from "./user.types";

export const getWilaya = () => async (dispatch) => {
  dispatch({ type: GET_WILAYA_REQUEST });
  try {
    const { data } = await axios.get("/api/wilayas");
    dispatch({ type: GET_WILAYA_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_WILAYA_FAIL, payload: error });
  }
};

export const getCommunes = (wilaya_id) => async (dispatch) => {
  dispatch({ type: GET_COMMUNES_REQUEST });
  const body = { wilaya_id };

  try {
    const { data } = await axios.post("/api/communes", body);
    dispatch({ type: GET_COMMUNES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_COMMUNES_FAIL, payload: error });
  }
};

export const saveUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const sendCode = (telephone) => async (dispatch) => {
  dispatch({ type: SEND_CODE_REQUEST });
  try {
    await axios.post("/particuliers/sendcode", { telephone });
    dispatch({ type: SEND_CODE_SUCCESS });
  } catch (error) {
    dispatch({ type: SEND_CODE_FAIL, payload: error });
  }
};

export const verifyCode = (telephone, code) => async (dispatch) => {
  dispatch({ type: VERIFY_CODE_REQUEST });
  try {
    const { data } = await axios.post("/particuliers/verifycode", {
      telephone,
      code,
    });
    dispatch({
      type: VERIFY_CODE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: VERIFY_CODE_FAIL,
      payload: error,
    });
  }
};

export const getVideoToken = (identity, room) => async (dispatch) => {
  dispatch({ type: GET_VIDEO_TOKEN_REQUEST });
  try {
    const { data } = await axios.post("/api/video/token", {
      identity,
      room,
    });
    dispatch({ type: GET_VIDEO_TOKEN_SUCCESS, payload: data.token });
  } catch (error) {
    dispatch({ type: GET_VIDEO_TOKEN_FAIL, payload: error });
  }
};

export const checkParticulierExist = (telephone, email) => async (dispatch) => {
  dispatch({ type: CHECK_PARTICULIER_EXIST_REQUEST });
  try {
    const { data } = await axios.post("/api/particulier/check", {
      telephone,
      email,
    });
    dispatch({ type: CHECK_PARTICULIER_EXIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CHECK_PARTICULIER_EXIST_FAIL, payload: error });
  }
};

export const checkDonneurSangExist = (telephone, email) => async (dispatch) => {
  dispatch({ type: CHECK_PARTICULIER_EXIST_REQUEST });
  try {
    const { data } = await axios.post("/api/donneursang/check", {
      telephone,
      email,
    });
    dispatch({ type: CHECK_PARTICULIER_EXIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CHECK_PARTICULIER_EXIST_FAIL, payload: error });
  }
};

export const signupParticulier = (particulier) => async (dispatch) => {
  dispatch({ type: USER_SIGNUP_REQUEST });
  const {
    genre,
    nom,
    prenom,
    dateDeNaissance: dateN,
    email,
    motDePasse: mdp,
    nomDeRue: nomRue,
    wilaya,
    commune,
    numeroTelephone,
    donneurSang,
    gs,
    latitude,
    longitude,
  } = particulier;
  try {
    if (!particulier.donneurSang) {
      const { data } = await axios.post("/api/particulier/register", {
        genre,
        nom,
        prenom,
        dateN,
        numeroTelephone,
        email,
        mdp,
        nomRue,
        wilaya,
        commune,
      });
      dispatch({ type: USER_SIGNUP_SUCCESS, payload: data });
    } else {
      const { data } = await axios.post(
        "/api/particulier/register/donneursang",
        {
          genre,
          nom,
          prenom,
          dateN,
          numeroTelephone,
          email,
          mdp,
          nomRue,
          wilaya,
          commune,
          latitude,
          longitude,
          donneurSang,
          gs,
        }
      );
      dispatch({ type: USER_SIGNUP_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({
      type: USER_SIGNUP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const loginParticulierTelephone =
  (telephone, mdp) => async (dispatch) => {
    dispatch({ type: PARTICULIER_LOGIN_REQUEST });
    try {
      const { data } = await axios.post("/api/particulier/login/telephone", {
        telephone,
        mdp,
      });
      localStorage.setItem("particulier", JSON.stringify(data));
      dispatch({ type: PARTICULIER_LOGIN_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: PARTICULIER_LOGIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const loginParticulierEmail = (email, mdp) => async (dispatch) => {
  dispatch({ type: PARTICULIER_LOGIN_REQUEST });
  try {
    const { data } = await axios.post("/api/particulier/login/email", {
      email,
      mdp,
    });
    localStorage.setItem("particulier", JSON.stringify(data));
    dispatch({ type: PARTICULIER_LOGIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PARTICULIER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const ajouterRdv = (rdv) => async (dispatch, getState) => {
  dispatch({ type: ADD_RDV_REQUEST });
  try {
    const token = getState().loginParticulierReducer.particulier.token;
    const { data } = await axios.post(
      "/api/rdv/add",
      {
        type: rdv.typeRdv,
        date: rdv.date_rdv,
        heure: rdv.heure_rdv,
        lien: rdv.lien,
        patient: rdv.patient,
        medecin: rdv.medecin,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: ADD_RDV_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADD_RDV_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const particulierGetRDV = () => async (dispatch, getState) => {
  dispatch({ type: PARTICULIER_GET_RDV_REQUEST });
  try {
    const token = getState().loginParticulierReducer.particulier.token;
    const { data } = await axios.get("/api/rdv/get", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: PARTICULIER_GET_RDV_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PARTICULIER_GET_RDV_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const particulierGetOrdonnances = () => async (dispatch, getState) => {
  dispatch({ type: PARTICULIER_GET_ORDONNANCES_REQUEST });
  try {
    const token = getState().loginParticulierReducer.particulier.token;
    const { data } = await axios.get("/api/ordonnance/get/particulier", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(data);
    dispatch({
      type: PARTICULIER_GET_ORDONNANCES_SUCCESS,
      payload: data.results,
    });
  } catch (error) {
    dispatch({
      type: PARTICULIER_GET_ORDONNANCES_FAIL,
    });
  }
};

export const particulierGetComptesRendus = () => async (dispatch, getState) => {
  dispatch({ type: PARTICULIER_GET_COMPTES_RENDUS_REQUEST });
  try {
    const token = getState().loginParticulierReducer.particulier.token;
    const { data } = await axios.get("/api/compterendu/get", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({
      type: PARTICULIER_GET_COMPTES_RENDUS_SUCCESS,
      payload: data.results,
    });
  } catch (error) {
    dispatch({
      type: PARTICULIER_GET_COMPTES_RENDUS_FAIL,
    });
  }
};

export const logoutParticulier = () => (dispatch) => {
  localStorage.removeItem("particulier");
  dispatch({ type: PARTICULIER_LOGOUT });
};

export const particulierGetOrdonnanceByID =
  (ordonnanceID) => async (dispatch, getState) => {
    dispatch({ type: PARTICULIER_GET_ORDONNAnCE_BYID_REQUEST });
    try {
      const token = getState().loginParticulierReducer.particulier.token;
      const { data } = await axios.get(
        "/api/ordonnance/get/particulier/" + ordonnanceID,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({
        type: PARTICULIER_GET_ORDONNAnCE_BYID_SUCCESS,
        payload: data.results,
      });
    } catch (error) {
      dispatch({
        type: PARTICULIER_GET_ORDONNAnCE_BYID_FAIL,
      });
    }
  };

export const particulierGetProfile = () => async (dispatch, getState) => {
  dispatch({ type: PARTICULIER_GET_PROFILE_REQUEST });
  try {
    const token = getState().loginParticulierReducer.particulier.token;
    const { data } = await axios.get("/api/particulier/profile/details", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({
      type: PARTICULIER_GET_PROFILE_SUCCESS,
      payload: data.results[0],
    });
  } catch (error) {
    dispatch({
      type: PARTICULIER_GET_PROFILE_FAIL,
    });
  }
};

export const particulierUpdateProfile =
  (particulier) => async (dispatch, getState) => {
    dispatch({ type: PARTICULIER_UPDATE_PROFILE_REQUEST });
    try {
      const token = getState().loginParticulierReducer.particulier.token;
      const { data } = await axios.put(
        "/api/particulier/profile/update",
        {
          nom_de_rue: particulier.nomRue,
          wilaya_id: particulier.wilayaId,
          commune_id: particulier.communeId,
          email: particulier.email,
          mot_de_passe: particulier.password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({
        type: PARTICULIER_UPDATE_PROFILE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PARTICULIER_UPDATE_PROFILE_FAIL,
      });
    }
  };

export const particulierDeleteOrdonnance =
  (ordonnanceId) => async (dispatch, getState) => {
    dispatch({ type: PARTICULIER_DELETE_ORDONNANCE_REQUEST });
    try {
      const token = getState().loginParticulierReducer.particulier.token;
      const { data } = await axios.delete(
        "/api/ordonnance/delete/" + ordonnanceId,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({
        type: PARTICULIER_DELETE_ORDONNANCE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PARTICULIER_DELETE_ORDONNANCE_FAIL,
      });
    }
  };

export const particulierAjouterProche =
  (proche) => async (dispatch, getState) => {
    dispatch({ type: PARTICULIER_ADD_PROCHE_REQUEST });
    try {
      const token = getState().loginParticulierReducer.particulier.token;
      const { data } = await axios.post(
        "/api/particulier/proche",

        proche,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({
        type: PARTICULIER_ADD_PROCHE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PARTICULIER_ADD_PROCHE_FAIL,
      });
    }
  };

export const particulierGetProches = () => async (dispatch, getState) => {
  dispatch({ type: PARTICULIER_GET_PROCHES_REQUEST });
  try {
    const token = getState().loginParticulierReducer.particulier.token;
    const { data } = await axios.get("/api/particulier/proche/get", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({
      type: PARTICULIER_GET_PROCHES_SUCCESS,
      payload: data.results,
    });
  } catch (error) {
    dispatch({
      type: PARTICULIER_GET_PROCHES_FAIL,
    });
  }
};

export const particulierUpdateRDV = (rdv) => async (dispatch, getState) => {
  dispatch({ type: PARTICULIER_UPDATE_RDV_REQUEST });
  try {
    const token = getState().loginParticulierReducer.particulier.token;
    const { data } = await axios.put("/api/particulier/rdv/update", rdv, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({
      type: PARTICULIER_UPDATE_RDV_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PARTICULIER_UPDATE_RDV_FAIL,
    });
  }
};

export const particulierAnnulerRDV = (rdvId) => async (dispatch, getState) => {
  dispatch({ type: PARTICULIER_ANNULER_RDV_REQUEST });
  try {
    const token = getState().loginParticulierReducer.particulier.token;
    const { data } = await axios.put(
      "/api/particulier/rdv/cancel",
      { rdvId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({
      type: PARTICULIER_ANNULER_RDV_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PARTICULIER_ANNULER_RDV_FAIL,
    });
  }
};

export const donneurDeSangSearch = (donneurSang) => async (dispatch) => {
  dispatch({ type: DONNEUR_SANG_SEARCH_REQUEST });
  try {
    if (donneurSang.communeId) {
      const { data } = await axios.post(
        "/api/particulier/donneursang/search/wilayacommune",
        {
          wilaya_id: donneurSang.wilayaId,
          commune_id: donneurSang.communeId,
        }
      );
      dispatch({ type: DONNEUR_SANG_SEARCH_SUCCESS, payload: data.results });
    } else {
      const { data } = await axios.post(
        "/api/particulier/donneursang/search/wilaya",
        {
          wilaya_id: donneurSang.wilayaId,
          commune_id: donneurSang.communeId,
        }
      );
      dispatch({ type: DONNEUR_SANG_SEARCH_SUCCESS, payload: data.results });
    }
  } catch (error) {
    dispatch({ type: DONNEUR_SANG_SEARCH_FAIL, payload: error });
  }
};
