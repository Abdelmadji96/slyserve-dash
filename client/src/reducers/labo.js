import {
    LABORATOIRE_CHECK_EXIST_FAIL,
    LABORATOIRE_CHECK_EXIST_REQUEST,
    LABORATOIRE_CHECK_EXIST_SUCCESS,
    LABORATOIRE_CHECK_EXIST_RESET,
    LABORATOIRE_LOGIN_REQUEST,
    LABORATOIRE_LOGIN_SUCCESS,
    LABORATOIRE_LOGIN_FAIL,
    LABORATOIRE_LOGIN_RESET,
    LABORATOIRE_LOGOUT,
    LABORATOIRE_SEARCH_REQUEST,
    LABORATOIRE_SEARCH_SUCCESS,
    LABORATOIRE_SEARCH_FAIL,
  } from "../actions/laboratoire.types";
  
  export const laboratoireCheckExistReducer = (state = {}, action) => {
    switch (action.type) {
      case LABORATOIRE_CHECK_EXIST_REQUEST:
        return {
          loading: true,
        };
      case LABORATOIRE_CHECK_EXIST_SUCCESS:
        return {
          loading: false,
          message: action.payload.message,
        };
      case LABORATOIRE_CHECK_EXIST_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      case LABORATOIRE_CHECK_EXIST_RESET:
        return {};
      default:
        return state;
    }
  };
  
  const intialState = {
    loading: false,
    laboratoire: localStorage.getItem("laboratoire")
      ? JSON.parse(localStorage.getItem("laboratoire"))
      : {},
  
    login: localStorage.getItem("laboratoire") ? true : false,
    error: "",
    success: false,
  };
  export const laboratoireLoginReducer = (state = intialState, action) => {
    switch (action.type) {
      case LABORATOIRE_LOGIN_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case LABORATOIRE_LOGIN_SUCCESS:
        return {
          ...state,
          loading: false,
          success: true,
          login: true,
          laboratoire: action.payload,
        };
      case LABORATOIRE_LOGIN_FAIL:
        return {
          ...state,
          loading: false,
          success: false,
          error: action.payload,
          login: false,
        };
      case LABORATOIRE_LOGOUT:
        return {
          login: false,
          medecin: {},
        };
      case LABORATOIRE_LOGIN_RESET:
        return {
          ...state,
          success: false,
        };
      default:
        return state;
    }
  };
  
  export const laboratoireSearchReducer = (state = {}, action) => {
    switch (action.type) {
      case LABORATOIRE_SEARCH_REQUEST:
        return {
          loading: true,
        };
      case LABORATOIRE_SEARCH_SUCCESS:
        return {
          loading: false,
          success: true,
          laboratoires: action.payload,
        };
  
      case LABORATOIRE_SEARCH_FAIL:
        return {
          loading: false,
          success: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  