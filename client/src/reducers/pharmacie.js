import {
  PHARMACIE_CHECK_EXIST_FAIL,
  PHARMACIE_CHECK_EXIST_REQUEST,
  PHARMACIE_CHECK_EXIST_SUCCESS,
  PHARMACIE_CHECK_EXIST_RESET,
  PHARMACIE_LOGIN_REQUEST,
  PHARMACIE_LOGIN_SUCCESS,
  PHARMACIE_LOGIN_FAIL,
  PHARMACIE_LOGIN_RESET,
  PHARMACIE_LOGOUT,
  PHARMACIE_SEARCH_RESET,
  PHARMACIE_SEARCH_SUCCESS,
  PHARMACIE_SEARCH_FAIL,
  PHARMACIE_SEARCH_REQUEST,
} from "../actions/pharmacie.types";

export const pharmacieCheckExistReducer = (state = {}, action) => {
  switch (action.type) {
    case PHARMACIE_CHECK_EXIST_REQUEST:
      return {
        loading: true,
      };
    case PHARMACIE_CHECK_EXIST_SUCCESS:
      return {
        loading: false,
        message: action.payload.message,
      };
    case PHARMACIE_CHECK_EXIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case PHARMACIE_CHECK_EXIST_RESET:
      return {};
    default:
      return state;
  }
};

const intialState = {
  loading: false,
  pharmacie: localStorage.getItem("pharmacie")
    ? JSON.parse(localStorage.getItem("pharmacie"))
    : {},

  login: localStorage.getItem("pharmacie") ? true : false,
  error: "",
  success: false,
};
export const pharmacieLoginReducer = (state = intialState, action) => {
  switch (action.type) {
    case PHARMACIE_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PHARMACIE_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        login: true,
        pharmacie: action.payload,
      };
    case PHARMACIE_LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
        login: false,
      };
    case PHARMACIE_LOGOUT:
      return {
        login: false,
        medecin: {},
      };
    case PHARMACIE_LOGIN_RESET:
      return {
        ...state,
        success: false,
      };
    default:
      return state;
  }
};

export const pharmacieSearchReducer = (state = {}, action) => {
  switch (action.type) {
    case PHARMACIE_SEARCH_REQUEST:
      return {
        loading: true,
      };
    case PHARMACIE_SEARCH_SUCCESS:
      return {
        loading: false,
        success: true,
        pharmacies: action.payload,
      };

    case PHARMACIE_SEARCH_FAIL:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
