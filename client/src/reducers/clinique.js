import {
  CLINIQUE_CHECK_EXIST_FAIL,
  CLINIQUE_CHECK_EXIST_REQUEST,
  CLINIQUE_CHECK_EXIST_SUCCESS,
  CLINIQUE_CHECK_EXIST_RESET,
  CLINIQUE_LOGIN_REQUEST,
  CLINIQUE_LOGIN_SUCCESS,
  CLINIQUE_LOGIN_FAIL,
  CLINIQUE_LOGIN_RESET,
  CLINIQUE_LOGOUT,
  CLINIQUE_SEARCH_REQUEST,
  CLINIQUE_SEARCH_SUCCESS,
  CLINIQUE_SEARCH_FAIL,
} from "../actions/clinique.types";

export const cliniqueCheckExistReducer = (state = {}, action) => {
  switch (action.type) {
    case CLINIQUE_CHECK_EXIST_REQUEST:
      return {
        loading: true,
      };
    case CLINIQUE_CHECK_EXIST_SUCCESS:
      return {
        loading: false,
        message: action.payload.message,
      };
    case CLINIQUE_CHECK_EXIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLINIQUE_CHECK_EXIST_RESET:
      return {};
    default:
      return state;
  }
};

const intialState = {
  loading: false,
  clinique: localStorage.getItem("clinique")
    ? JSON.parse(localStorage.getItem("clinique"))
    : {},

  login: localStorage.getItem("clinique") ? true : false,
  error: "",
  success: false,
};
export const cliniqueLoginReducer = (state = intialState, action) => {
  switch (action.type) {
    case CLINIQUE_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CLINIQUE_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        login: true,
        clinique: action.payload,
      };
    case CLINIQUE_LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
        login: false,
      };
    case CLINIQUE_LOGOUT:
      return {
        login: false,
        medecin: {},
      };
    case CLINIQUE_LOGIN_RESET:
      return {
        ...state,
        success: false,
      };
    default:
      return state;
  }
};

export const cliniqueSearchReducer = (state = {}, action) => {
  switch (action.type) {
    case CLINIQUE_SEARCH_REQUEST:
      return {
        loading: true,
      };
    case CLINIQUE_SEARCH_SUCCESS:
      return {
        loading: false,
        success: true,
        cliniques: action.payload,
      };

    case CLINIQUE_SEARCH_FAIL:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
