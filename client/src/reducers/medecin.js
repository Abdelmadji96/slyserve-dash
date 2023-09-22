import {
  MEDECIN_ABONNER_FAIL,
  MEDECIN_ABONNER_REQUEST,
  MEDECIN_ABONNER_RESET,
  MEDECIN_ABONNER_SUCCESS,
  MEDECIN_ADD_COMPTERENDU_FAIL,
  MEDECIN_ADD_COMPTERENDU_REQUEST,
  MEDECIN_ADD_COMPTERENDU_RESET,
  MEDECIN_ADD_COMPTERENDU_SUCCESS,
  MEDECIN_ADD_ORDONNANCE_FAIL,
  MEDECIN_ADD_ORDONNANCE_REQUEST,
  MEDECIN_ADD_ORDONNANCE_RESET,
  MEDECIN_ADD_ORDONNANCE_SUCCESS,
  MEDECIN_ADD_PATIENT_FAIL,
  MEDECIN_ADD_PATIENT_REQUEST,
  MEDECIN_ADD_PATIENT_RESET,
  MEDECIN_ADD_PATIENT_SUCCESS,
  MEDECIN_GET_ABONNEMENT_REQUEST,
  MEDECIN_GET_ABONNEMENT_SUCCESS,
  MEDECIN_GET_PATIENTS_FAIL,
  MEDECIN_GET_PATIENTS_REQUEST,
  MEDECIN_GET_PATIENTS_SUCCESS,
  MEDECIN_UPDATE_PROFILE_FAIL,
  MEDECIN_UPDATE_PROFILE_REQUEST,
  MEDECIN_UPDATE_PROFILE_RESET,
  MEDECIN_UPDATE_PROFILE_SUCCESS,
} from "../actions/professionnel.types";

export const medecinUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case MEDECIN_UPDATE_PROFILE_REQUEST:
      return {
        loading: true,
      };

    case MEDECIN_UPDATE_PROFILE_SUCCESS:
      return {
        loading: false,
        success: true,
        rdvs: action.payload,
      };
    case MEDECIN_UPDATE_PROFILE_FAIL:
      return {
        loading: false,
        success: false,
        message: action.payload,
      };
    case MEDECIN_UPDATE_PROFILE_RESET:
      return {};
    default:
      return state;
  }
};

export const medecinAjouterOrdonnanceReducer = (state = {}, action) => {
  switch (action.type) {
    case MEDECIN_ADD_ORDONNANCE_REQUEST:
      return {
        loading: true,
      };

    case MEDECIN_ADD_ORDONNANCE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case MEDECIN_ADD_ORDONNANCE_FAIL:
      return {
        loading: false,
        success: false,
        message: action.payload,
      };
    case MEDECIN_ADD_ORDONNANCE_RESET:
      return {};
    default:
      return state;
  }
};

export const medecinAjouterCompteRenduReducer = (state = {}, action) => {
  switch (action.type) {
    case MEDECIN_ADD_COMPTERENDU_REQUEST:
      return {
        loading: true,
      };

    case MEDECIN_ADD_COMPTERENDU_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case MEDECIN_ADD_COMPTERENDU_FAIL:
      return {
        loading: false,
        success: false,
        message: action.payload,
      };
    case MEDECIN_ADD_COMPTERENDU_RESET:
      return {};
    default:
      return state;
  }
};

export const medecinGetPatientsReducer = (state = {}, action) => {
  switch (action.type) {
    case MEDECIN_GET_PATIENTS_REQUEST:
      return {
        loading: true,
      };

    case MEDECIN_GET_PATIENTS_SUCCESS:
      return {
        loading: false,
        success: true,
        patients: action.payload,
      };
    case MEDECIN_GET_PATIENTS_FAIL:
      return {
        loading: false,
        success: false,
        message: action.payload,
      };
    default:
      return state;
  }
};

export const medecinAbonnerReducer = (state = {}, action) => {
  switch (action.type) {
    case MEDECIN_ABONNER_REQUEST:
      return {
        loading: true,
      };

    case MEDECIN_ABONNER_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case MEDECIN_ABONNER_FAIL:
      return {
        loading: false,
        success: false,
        message: "Error",
      };
    case MEDECIN_ABONNER_RESET:
      return {};
    default:
      return state;
  }
};

export const medecinAjouterPatientReducer = (state = {}, action) => {
  switch (action.type) {
    case MEDECIN_ADD_PATIENT_REQUEST:
      return {
        loading: true,
      };

    case MEDECIN_ADD_PATIENT_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case MEDECIN_ADD_PATIENT_FAIL:
      return {
        loading: false,
        success: false,
        message: action.payload,
      };
    case MEDECIN_ADD_PATIENT_RESET:
      return {};
    default:
      return state;
  }
};

export const medecinGetAbonnementReducer = (state = {}, action) => {
  switch (action.type) {
    case MEDECIN_GET_ABONNEMENT_REQUEST:
      return {
        loading: true,
      };

    case MEDECIN_GET_ABONNEMENT_SUCCESS:
      return {
        loading: false,
        success: true,
        abonnement: action.payload,
      };
    case MEDECIN_GET_PATIENTS_FAIL:
      return {
        loading: false,
        success: false,
        message: action.payload,
      };
    default:
      return state;
  }
};
