import {
  AMBULANCE_CHECK_EXIST_FAIL,
  AMBULANCE_CHECK_EXIST_REQUEST,
  AMBULANCE_CHECK_EXIST_SUCCESS,
  AMBULANCE_SIGNUP_FAIL,
  AMBULANCE_SIGNUP_REQUEST,
  AMBULANCE_SIGNUP_RESET,
  AMBULANCE_SIGNUP_SUCCESS,
  AMBULANCE_CHECK_EXIST_RESET,
  AMBULANCE_LOGIN_REQUEST,
  AMBULANCE_LOGIN_SUCCESS,
  AMBULANCE_LOGIN_FAIL,
  AMBULANCE_LOGIN_RESET,
  AMBULANCE_LOGOUT,
  AMBULANCE_SEARCH_REQUEST,
  AMBULANCE_SEARCH_SUCCESS,
  AMBULANCE_SEARCH_FAIL,
} from "../actions/ambulance.types";

export const ambulanceCheckExistReducer = (state = {}, action) => {
  switch (action.type) {
    case AMBULANCE_CHECK_EXIST_REQUEST:
      return {
        loading: true,
      };
    case AMBULANCE_CHECK_EXIST_SUCCESS:
      return {
        loading: false,
        message: action.payload.message,
      };
    case AMBULANCE_CHECK_EXIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case AMBULANCE_CHECK_EXIST_RESET:
      return {};
    default:
      return state;
  }
};

export const ambulanceRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case AMBULANCE_SIGNUP_REQUEST:
      return {
        loading: true,
      };
    case AMBULANCE_SIGNUP_SUCCESS:
      return {
        loading: false,
        success: true,
      };

    case AMBULANCE_SIGNUP_FAIL:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    case AMBULANCE_SIGNUP_RESET:
      return {};
    default:
      return state;
  }
};

const intialState = {
  loading: false,
  ambulance: localStorage.getItem("ambulance")
    ? JSON.parse(localStorage.getItem("ambulance"))
    : {},

  login: localStorage.getItem("ambulance") ? true : false,
  error: "",
  success: false,
};
export const ambulanceLoginReducer = (state = intialState, action) => {
  switch (action.type) {
    case AMBULANCE_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case AMBULANCE_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        login: true,
        ambulance: action.payload,
      };
    case AMBULANCE_LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
        login: false,
      };
    case AMBULANCE_LOGOUT:
      return {
        login: false,
        medecin: {},
      };
    case AMBULANCE_LOGIN_RESET:
      return {
        ...state,
        success: false,
      };
    default:
      return state;
  }
};

export const ambulanceSearchReducer = (state = {}, action) => {
  switch (action.type) {
    case AMBULANCE_SEARCH_REQUEST:
      return {
        loading: true,
      };
    case AMBULANCE_SEARCH_SUCCESS:
      return {
        loading: false,
        success: true,
        ambulances: action.payload,
      };

    case AMBULANCE_SEARCH_FAIL:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
