import {
    PARAMEDICAL_ABONNER_FAIL,
    PARAMEDICAL_ABONNER_REQUEST,
    PARAMEDICAL_ABONNER_RESET,
    PARAMEDICAL_ABONNER_SUCCESS,
    PARAMEDICAL_ADD_COMPTERENDU_FAIL,
    PARAMEDICAL_ADD_COMPTERENDU_REQUEST,
    PARAMEDICAL_ADD_COMPTERENDU_RESET,
    PARAMEDICAL_ADD_COMPTERENDU_SUCCESS,
    PARAMEDICAL_ADD_ORDONNANCE_FAIL,
    PARAMEDICAL_ADD_ORDONNANCE_REQUEST,
    PARAMEDICAL_ADD_ORDONNANCE_RESET,
    PARAMEDICAL_ADD_ORDONNANCE_SUCCESS,
    PARAMEDICAL_ADD_PATIENT_FAIL,
    PARAMEDICAL_ADD_PATIENT_REQUEST,
    PARAMEDICAL_ADD_PATIENT_RESET,
    PARAMEDICAL_ADD_PATIENT_SUCCESS,
    PARAMEDICAL_GET_ABONNEMENT_REQUEST,
    PARAMEDICAL_GET_ABONNEMENT_SUCCESS,
    PARAMEDICAL_GET_PATIENTS_FAIL,
    PARAMEDICAL_GET_PATIENTS_REQUEST,
    PARAMEDICAL_GET_PATIENTS_SUCCESS,
    PARAMEDICAL_UPDATE_PROFILE_FAIL,
    PARAMEDICAL_UPDATE_PROFILE_REQUEST,
    PARAMEDICAL_UPDATE_PROFILE_RESET,
    PARAMEDICAL_UPDATE_PROFILE_SUCCESS,
  } from "../actions/professionnel.types";
  
  export const paramedicalUpdateProfileReducer = (state = {}, action) => {
    switch (action.type) {
      case PARAMEDICAL_UPDATE_PROFILE_REQUEST:
        return {
          loading: true,
        };
  
      case PARAMEDICAL_UPDATE_PROFILE_SUCCESS:
        return {
          loading: false,
          success: true,
          rdvs: action.payload,
        };
      case PARAMEDICAL_UPDATE_PROFILE_FAIL:
        return {
          loading: false,
          success: false,
          message: action.payload,
        };
      case PARAMEDICAL_UPDATE_PROFILE_RESET:
        return {};
      default:
        return state;
    }
  };
  
  export const paramedicalAjouterOrdonnanceReducer = (state = {}, action) => {
    switch (action.type) {
      case PARAMEDICAL_ADD_ORDONNANCE_REQUEST:
        return {
          loading: true,
        };
  
      case PARAMEDICAL_ADD_ORDONNANCE_SUCCESS:
        return {
          loading: false,
          success: true,
        };
      case PARAMEDICAL_ADD_ORDONNANCE_FAIL:
        return {
          loading: false,
          success: false,
          message: action.payload,
        };
      case PARAMEDICAL_ADD_ORDONNANCE_RESET:
        return {};
      default:
        return state;
    }
  };
  
  export const paramedicalAjouterCompteRenduReducer = (state = {}, action) => {
    switch (action.type) {
      case PARAMEDICAL_ADD_COMPTERENDU_REQUEST:
        return {
          loading: true,
        };
  
      case PARAMEDICAL_ADD_COMPTERENDU_SUCCESS:
        return {
          loading: false,
          success: true,
        };
      case PARAMEDICAL_ADD_COMPTERENDU_FAIL:
        return {
          loading: false,
          success: false,
          message: action.payload,
        };
      case PARAMEDICAL_ADD_COMPTERENDU_RESET:
        return {};
      default:
        return state;
    }
  };
  
  export const paramedicalGetPatientsReducer = (state = {}, action) => {
    switch (action.type) {
      case PARAMEDICAL_GET_PATIENTS_REQUEST:
        return {
          loading: true,
        };
  
      case PARAMEDICAL_GET_PATIENTS_SUCCESS:
        return {
          loading: false,
          success: true,
          patients: action.payload,
        };
      case PARAMEDICAL_GET_PATIENTS_FAIL:
        return {
          loading: false,
          success: false,
          message: action.payload,
        };
      default:
        return state;
    }
  };
  
  export const paramedicalAbonnerReducer = (state = {}, action) => {
    switch (action.type) {
      case PARAMEDICAL_ABONNER_REQUEST:
        return {
          loading: true,
        };
  
      case PARAMEDICAL_ABONNER_SUCCESS:
        return {
          loading: false,
          success: true,
        };
      case PARAMEDICAL_ABONNER_FAIL:
        return {
          loading: false,
          success: false,
          message: "Error",
        };
      case PARAMEDICAL_ABONNER_RESET:
        return {};
      default:
        return state;
    }
  };
  
  export const paramedicalAjouterPatientReducer = (state = {}, action) => {
    switch (action.type) {
      case PARAMEDICAL_ADD_PATIENT_REQUEST:
        return {
          loading: true,
        };
  
      case PARAMEDICAL_ADD_PATIENT_SUCCESS:
        return {
          loading: false,
          success: true,
        };
      case PARAMEDICAL_ADD_PATIENT_FAIL:
        return {
          loading: false,
          success: false,
          message: action.payload,
        };
      case PARAMEDICAL_ADD_PATIENT_RESET:
        return {};
      default:
        return state;
    }
  };
  
  export const paramedicalGetAbonnementReducer = (state = {}, action) => {
    switch (action.type) {
      case PARAMEDICAL_GET_ABONNEMENT_REQUEST:
        return {
          loading: true,
        };
  
      case PARAMEDICAL_GET_ABONNEMENT_SUCCESS:
        return {
          loading: false,
          success: true,
          abonnement: action.payload,
        };
      case PARAMEDICAL_GET_PATIENTS_FAIL:
        return {
          loading: false,
          success: false,
          message: action.payload,
        };
      default:
        return state;
    }
  };
  