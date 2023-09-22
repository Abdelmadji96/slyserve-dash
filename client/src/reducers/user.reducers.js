import { RESET_USER_CHECK } from "../actions/professionnel.types";
import {
  GET_WILAYA_FAIL,
  GET_WILAYA_REQUEST,
  GET_WILAYA_SUCCESS,
  GET_COMMUNES_FAIL,
  GET_COMMUNES_REQUEST,
  GET_COMMUNES_SUCCESS,
  SAVE_USER,
  VERIFY_CODE_REQUEST,
  VERIFY_CODE_SUCCESS,
  VERIFY_CODE_FAIL,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_FAIL,
  USER_SIGNUP_SUCCESS,
  GET_VIDEO_TOKEN_REQUEST,
  GET_VIDEO_TOKEN_SUCCESS,
  GET_VIDEO_TOKEN_FAIL,
  SAVE_VIDEO_PARAMS,
  CHECK_PARTICULIER_EXIST_REQUEST,
  CHECK_PARTICULIER_EXIST_SUCCESS,
  CHECK_PARTICULIER_EXIST_FAIL,
  USER_SIGNUP_RESET,
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
  PARTICULIER_UPDATE_PROFILE_SUCCESS,
  PARTICULIER_UPDATE_PROFILE_RESET,
  PARTICULIER_UPDATE_PROFILE_REQUEST,
  PARTICULIER_UPDATE_PROFILE_FAIL,
  PARTICULIER_ADD_PROCHE_REQUEST,
  PARTICULIER_ADD_PROCHE_SUCCESS,
  PARTICULIER_ADD_PROCHE_FAIL,
  PARTICULIER_ADD_PROCHE_RESET,
  PARTICULIER_GET_PROCHES_REQUEST,
  PARTICULIER_GET_PROCHES_SUCCESS,
  PARTICULIER_GET_PROCHES_FAIL,
  ADD_RDV_RESET,
  PARTICULIER_UPDATE_RDV_REQUEST,
  PARTICULIER_UPDATE_RDV_SUCCESS,
  PARTICULIER_UPDATE_RDV_FAIL,
  PARTICULIER_UPDATE_RDV_RESET,
  PARTICULIER_ANNULER_RDV_REQUEST,
  PARTICULIER_ANNULER_RDV_SUCCESS,
  PARTICULIER_ANNULER_RDV_FAIL,
  PARTICULIER_ANNULER_RDV_RESET,
  PARTICULIER_GET_COMPTES_RENDUS_REQUEST,
  PARTICULIER_GET_COMPTES_RENDUS_SUCCESS,
  PARTICULIER_GET_COMPTES_RENDUS_FAIL,
  PARTICULIER_DELETE_ORDONNANCE_REQUEST,
  PARTICULIER_DELETE_ORDONNANCE_SUCCESS,
  PARTICULIER_DELETE_ORDONNANCE_FAIL,
  PARTICULIER_DELETE_ORDONNANCE_RESET,
  GET_VIDEO_TOKEN_RESET,
  PARTICULIER_SAVE_RDV,
  PARTICULIER_SAVE_RDV_RESET,
  DONNEUR_SANG_SEARCH_REQUEST,
  DONNEUR_SANG_SEARCH_SUCCESS,
  DONNEUR_SANG_SEARCH_FAIL,
} from "../actions/user.types";

export const getWilayasReducer = (
  state = { loading: true, wilaya: [], error: "" },
  action
) => {
  switch (action.type) {
    case GET_WILAYA_REQUEST:
      return { loading: true };

    case GET_WILAYA_SUCCESS:
      return {
        loading: false,
        success: true,
        wilayas: action.payload,
      };

    case GET_WILAYA_FAIL:
      return {
        loading: true,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const getCommunesReducer = (
  state = { loading: true, communes: [], error: "" },
  action
) => {
  switch (action.type) {
    case GET_COMMUNES_REQUEST:
      return { loading: true };

    case GET_COMMUNES_SUCCESS:
      return {
        loading: false,
        success: true,
        communes: action.payload,
      };

    case GET_COMMUNES_FAIL:
      return {
        loading: true,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const saveUserReducer = (state = {}, action) => {
  switch (action.type) {
    case SAVE_USER:
      return {
        user: action.payload,
      };
    default:
      return state;
  }
};

export const saveVideoParams = (
  state = { username: "", roomName: "" },
  action
) => {
  switch (action.type) {
    case SAVE_VIDEO_PARAMS:
      return {
        ...state,
        username: action.payload.username,
        roomName: action.payload.roomName,
      };
    default:
      return state;
  }
};
export const verifyCodeReducer = (state = {}, action) => {
  switch (action.type) {
    case VERIFY_CODE_REQUEST:
      return {
        loading: true,
      };
    case VERIFY_CODE_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };

    case VERIFY_CODE_FAIL:
      return {
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
};

export const registerUserReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SIGNUP_REQUEST:
      return {
        loading: true,
      };

    case USER_SIGNUP_SUCCESS:
      return {
        loading: false,
        user: action.payload,
        success: true,
      };
    case USER_SIGNUP_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case USER_SIGNUP_RESET:
      return {};
    default: {
      return state;
    }
  }
};

export const videoTokenReducer = (state = { loading: false }, action) => {
  switch (action.type) {
    case GET_VIDEO_TOKEN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_VIDEO_TOKEN_SUCCESS:
      return {
        loading: false,
        success: true,
        videoToken: action.payload,
      };
    case GET_VIDEO_TOKEN_FAIL:
      return {
        loading: false,
        success: false,
        videoToken: action.payload,
      };
    case GET_VIDEO_TOKEN_RESET:
      return {};
    default:
      return state;
  }
};

export const checkParticulierExistReducer = (state = {}, action) => {
  switch (action.type) {
    case CHECK_PARTICULIER_EXIST_REQUEST:
      return {
        loading: true,
      };
    case CHECK_PARTICULIER_EXIST_SUCCESS:
      return {
        loading: false,
        success: action.payload.message,
      };
    case CHECK_PARTICULIER_EXIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case RESET_USER_CHECK:
      return {};
    default:
      return state;
  }
};

const intialState = {
  loading: false,
  particulier: localStorage.getItem("particulier")
    ? JSON.parse(localStorage.getItem("particulier"))
    : {},
  login: localStorage.getItem("particulier") ? true : false,
  error: "",
  success: false,
};
export const loginParticulierReducer = (state = intialState, action) => {
  switch (action.type) {
    case PARTICULIER_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PARTICULIER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        login: true,
        particulier: action.payload,
      };
    case PARTICULIER_LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
        login: false,
      };
    case PARTICULIER_LOGOUT:
      return {
        login: false,
        medecin: {},
      };
    default:
      return state;
  }
};

export const addRDVReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_RDV_REQUEST:
      return {
        loading: true,
      };

    case ADD_RDV_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ADD_RDV_FAIL:
      return {
        loading: false,
        success: false,
        message: action.payload,
      };
    case ADD_RDV_RESET:
      return {};
    default:
      return state;
  }
};

export const particulierGetRDVReducer = (
  state = { success: false },
  action
) => {
  switch (action.type) {
    case PARTICULIER_GET_RDV_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case PARTICULIER_GET_RDV_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        rdvs: action.payload,
      };
    case PARTICULIER_GET_RDV_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        message: action.payload,
      };
    default:
      return state;
  }
};

export const particulierGetOrdonnancesReducer = (state = {}, action) => {
  switch (action.type) {
    case PARTICULIER_GET_ORDONNANCES_REQUEST:
      return {
        loading: true,
      };

    case PARTICULIER_GET_ORDONNANCES_SUCCESS:
      return {
        loading: false,
        success: true,
        ordonnances: action.payload,
      };
    case PARTICULIER_GET_ORDONNANCES_FAIL:
      return {
        loading: false,
        success: false,
        message: "error",
      };
    default:
      return state;
  }
};

export const particulierGetComptesRendusReducer = (state = {}, action) => {
  switch (action.type) {
    case PARTICULIER_GET_COMPTES_RENDUS_REQUEST:
      return {
        loading: true,
      };

    case PARTICULIER_GET_COMPTES_RENDUS_SUCCESS:
      return {
        loading: false,
        success: true,
        comptesRendus: action.payload,
      };
    case PARTICULIER_GET_COMPTES_RENDUS_FAIL:
      return {
        loading: false,
        success: false,
      };
    default:
      return state;
  }
};

export const particulierGetOrdonnanceByIDReducer = (state = {}, action) => {
  switch (action.type) {
    case PARTICULIER_GET_ORDONNAnCE_BYID_REQUEST:
      return {
        loading: true,
      };

    case PARTICULIER_GET_ORDONNAnCE_BYID_SUCCESS:
      return {
        loading: false,
        success: true,
        medicaments: action.payload,
      };
    case PARTICULIER_GET_ORDONNAnCE_BYID_FAIL:
      return {
        loading: false,
        success: false,
      };
    default:
      return state;
  }
};

export const particulierGetProfileReducer = (
  state = { success: false },
  action
) => {
  switch (action.type) {
    case PARTICULIER_GET_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case PARTICULIER_GET_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        particulier: action.payload,
      };
    case PARTICULIER_GET_PROFILE_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
      };
    default:
      return state;
  }
};

export const particulierUpdateProfileReducer = (
  state = { success: false },
  action
) => {
  switch (action.type) {
    case PARTICULIER_UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case PARTICULIER_UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        particulier: action.payload,
      };
    case PARTICULIER_UPDATE_PROFILE_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
      };
    case PARTICULIER_UPDATE_PROFILE_RESET:
      return {
        success: false,
      };
    default:
      return state;
  }
};

export const particulierDeleteOrdonnanceReducer = (state = {}, action) => {
  switch (action.type) {
    case PARTICULIER_DELETE_ORDONNANCE_REQUEST:
      return {
        loading: true,
      };

    case PARTICULIER_DELETE_ORDONNANCE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case PARTICULIER_DELETE_ORDONNANCE_FAIL:
      return {
        loading: false,
        success: false,
      };
    case PARTICULIER_DELETE_ORDONNANCE_RESET:
      return {};
    default:
      return state;
  }
};

export const particulierAjouterProcheReducer = (
  state = { success: false },
  action
) => {
  switch (action.type) {
    case PARTICULIER_ADD_PROCHE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case PARTICULIER_ADD_PROCHE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        particulier: action.payload,
      };
    case PARTICULIER_ADD_PROCHE_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
      };
    case PARTICULIER_ADD_PROCHE_RESET:
      return {
        success: false,
      };
    default:
      return state;
  }
};

export const particulierGetProchesReducer = (
  state = { success: false },
  action
) => {
  switch (action.type) {
    case PARTICULIER_GET_PROCHES_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case PARTICULIER_GET_PROCHES_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        proches: action.payload,
      };
    case PARTICULIER_GET_PROCHES_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
      };
    default:
      return state;
  }
};

export const particulierUpdateRDVReducer = (state = {}, action) => {
  switch (action.type) {
    case PARTICULIER_UPDATE_RDV_REQUEST:
      return {
        loading: true,
      };

    case PARTICULIER_UPDATE_RDV_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case PARTICULIER_UPDATE_RDV_FAIL:
      return {
        loading: false,
        success: false,
        message: action.payload,
      };
    case PARTICULIER_UPDATE_RDV_RESET:
      return {};
    default:
      return state;
  }
};

export const particulierAnnulerRDVReducer = (state = {}, action) => {
  switch (action.type) {
    case PARTICULIER_ANNULER_RDV_REQUEST:
      return {
        loading: true,
      };

    case PARTICULIER_ANNULER_RDV_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case PARTICULIER_ANNULER_RDV_FAIL:
      return {
        loading: false,
        success: false,
        message: action.payload,
      };
    case PARTICULIER_ANNULER_RDV_RESET:
      return {};
    default:
      return state;
  }
};

export const particulierSaveRDVreducer = (state = {}, action) => {
  switch (action.type) {
    case PARTICULIER_SAVE_RDV:
      return {
        rdv: action.payload,
      };
    case PARTICULIER_SAVE_RDV_RESET:
      return {};
    default:
      return state;
  }
};

export const donneurSangSearchReducer = (state = {}, action) => {
  switch (action.type) {
    case DONNEUR_SANG_SEARCH_REQUEST:
      return {
        loading: true,
      };
    case DONNEUR_SANG_SEARCH_SUCCESS:
      return {
        loading: false,
        success: true,
        donneursSang: action.payload,
      };

    case DONNEUR_SANG_SEARCH_FAIL:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
