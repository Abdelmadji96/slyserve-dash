import {
  ADMIN_GET_PARTICULIERS_FAIL,
  ADMIN_GET_PARTICULIERS_REQUEST,
  ADMIN_GET_PARTICULIERS_SUCCESS,
  ADMIN_GET_RDVS_FAIL,
  ADMIN_GET_RDVS_REQUEST,
  ADMIN_GET_RDVS_SUCCESS,
  ADMIN_LOGIN_FAIL,
  ADMIN_LOGIN_REQUEST,
  ADMIN_LOGIN_RESET,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGOUT,
} from "../../actions/Admin/admin.types";

export const adminGetParticuliersReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_GET_PARTICULIERS_REQUEST:
      return {
        loading: true,
      };
    case ADMIN_GET_PARTICULIERS_SUCCESS:
      return {
        loading: false,
        success: true,
        particuliers: action.payload,
      };
    case ADMIN_GET_PARTICULIERS_FAIL:
      return {
        loading: false,
        success: false,
      };
    default:
      return state;
  }
};

export const adminGetRdvsReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_GET_RDVS_REQUEST:
      return {
        loading: true,
      };
    case ADMIN_GET_RDVS_SUCCESS:
      return {
        loading: false,
        success: true,
        rdvs: action.payload,
      };
    case ADMIN_GET_RDVS_FAIL:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const intialState = {
  loading: false,
  admin: localStorage.getItem("admin")
    ? JSON.parse(localStorage.getItem("admin"))
    : {},

  login: localStorage.getItem("admin") ? true : false,
  error: "",
  success: false,
};
export const adminLoginReducer = (state = intialState, action) => {
  switch (action.type) {
    case ADMIN_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADMIN_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        login: true,
        admin: action.payload,
      };
    case ADMIN_LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
        login: false,
      };
    case ADMIN_LOGOUT:
      return {
        login: false,
        admin: {},
      };
    case ADMIN_LOGIN_RESET:
      return {
        ...state,
        success: false,
      };
    default:
      return state;
  }
};
