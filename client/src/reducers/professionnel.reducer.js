import {
  CHECK_PROFESSIONNEL_EXIST_FAIL,
  CHECK_PROFESSIONNEL_EXIST_REQUEST,
  CHECK_PROFESSIONNEL_EXIST_SUCCESS,
  GET_MEDECIN_INFO_FAIL,
  GET_MEDECIN_INFO_REQUEST,
  GET_MEDECIN_INFO_SUCCESS,
  GET_MEDECIN_INFO_RESET,
  GET_SPECIALITES_FAIL,
  GET_SPECIALITES_REQUEST,
  GET_SPECIALITES_SUCCESS,
  MEDECIN_ADD_ORDONNANCE_FAIL,
  MEDECIN_ADD_ORDONNANCE_REQUEST,
  MEDECIN_ADD_ORDONNANCE_RESET,
  MEDECIN_ADD_ORDONNANCE_SUCCESS,
  MEDECIN_GET_HORAIRES_FAIL,
  MEDECIN_GET_HORAIRES_REQUEST,
  MEDECIN_GET_HORAIRES_SUCCESS,
  MEDECIN_GET_RDV_BYID_FAIL,
  MEDECIN_GET_RDV_BYID_REQUEST,
  MEDECIN_GET_RDV_BYID_SUCCESS,
  MEDECIN_GET_RDV_BYID_RESET,
  MEDECIN_GET_RDV_FAIL,
  MEDECIN_GET_RDV_REQUEST,
  MEDECIN_GET_RDV_SUCCESS,
  MEDECIN_LOGIN_FAIL,
  MEDECIN_LOGIN_REQUEST,
  MEDECIN_LOGIN_RESET,
  MEDECIN_LOGIN_SUCCESS,
  MEDECIN_LOGOUT,
  MEDECIN_UPDATE_PROFILE_FAIL,
  MEDECIN_UPDATE_PROFILE_REQUEST,
  MEDECIN_UPDATE_PROFILE_RESET,
  MEDECIN_UPDATE_PROFILE_SUCCESS,
  MEDECIN_UPDATE_RDV_FAIL,
  MEDECIN_UPDATE_RDV_REQUEST,
  MEDECIN_UPDATE_RDV_RESET,
  MEDECIN_UPDATE_RDV_SUCCESS,
  PROFESSIONNEL_REGISTER_RESET,
  PROFESSIONNEL_SIGNUP_FAIL,
  PROFESSIONNEL_SIGNUP_REQUEST,
  PROFESSIONNEL_SIGNUP_SUCCESS,
  RESET_USER_CHECK,
  SAVE_PROFESSIONNEL,
  SAVE_PRO_RESET,
  SEARCH_MEDECIN_FAIL,
  SEARCH_MEDECIN_REQUEST,
  SEARCH_MEDECIN_SUCCESS,
  GET_PARAMEDICAL_INFO_FAIL,
  GET_PARAMEDICAL_INFO_REQUEST,
  GET_PARAMEDICAL_INFO_SUCCESS,
  GET_PARAMEDICAL_INFO_RESET,
  PARAMEDICAL_ADD_ORDONNANCE_FAIL,
  PARAMEDICAL_ADD_ORDONNANCE_REQUEST,
  PARAMEDICAL_ADD_ORDONNANCE_RESET,
  PARAMEDICAL_ADD_ORDONNANCE_SUCCESS,
  PARAMEDICAL_GET_HORAIRES_FAIL,
  PARAMEDICAL_GET_HORAIRES_REQUEST,
  PARAMEDICAL_GET_HORAIRES_SUCCESS,
  PARAMEDICAL_GET_RDV_BYID_FAIL,
  PARAMEDICAL_GET_RDV_BYID_REQUEST,
  PARAMEDICAL_GET_RDV_BYID_SUCCESS,
  PARAMEDICAL_GET_RDV_BYID_RESET,
  PARAMEDICAL_GET_RDV_FAIL,
  PARAMEDICAL_GET_RDV_REQUEST,
  PARAMEDICAL_GET_RDV_SUCCESS,
  PARAMEDICAL_LOGIN_FAIL,
  PARAMEDICAL_LOGIN_REQUEST,
  PARAMEDICAL_LOGIN_RESET,
  PARAMEDICAL_LOGIN_SUCCESS,
  PARAMEDICAL_LOGOUT,
  PARAMEDICAL_UPDATE_PROFILE_FAIL,
  PARAMEDICAL_UPDATE_PROFILE_REQUEST,
  PARAMEDICAL_UPDATE_PROFILE_RESET,
  PARAMEDICAL_UPDATE_PROFILE_SUCCESS,
  PARAMEDICAL_UPDATE_RDV_FAIL,
  PARAMEDICAL_UPDATE_RDV_REQUEST,
  PARAMEDICAL_UPDATE_RDV_RESET,
  PARAMEDICAL_UPDATE_RDV_SUCCESS,
  SEARCH_PARAMEDICAL_FAIL,
  SEARCH_PARAMEDICAL_REQUEST,
  SEARCH_PARAMEDICAL_SUCCESS,
} from "../actions/professionnel.types";
export const getSpecialitesReducer = (
  state = { loading: true, specialites: [], error: "" },
  action
) => {
  switch (action.type) {
    case GET_SPECIALITES_REQUEST:
      return { loading: true };

    case GET_SPECIALITES_SUCCESS:
      return {
        loading: false,
        success: true,
        specialites: action.payload,
      };

    case GET_SPECIALITES_FAIL:
      return {
        loading: true,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const professionnelRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case PROFESSIONNEL_SIGNUP_REQUEST:
      return {
        loading: true,
      };
    case PROFESSIONNEL_SIGNUP_SUCCESS:
      return {
        loading: false,
        success: true,
      };

    case PROFESSIONNEL_SIGNUP_FAIL:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    case PROFESSIONNEL_REGISTER_RESET:
      return {};
    default:
      return state;
  }
};

export const saveProfessionnelReducer = (
  state = { professionnel: {} },
  action
) => {
  switch (action.type) {
    case SAVE_PROFESSIONNEL:
      return {
        professionnel: action.payload.professionnel,
      };
    case SAVE_PRO_RESET:
      return {};
    default:
      return state;
  }
};

export const checkProfessionnelExistReducer = (state = {}, action) => {
  switch (action.type) {
    case CHECK_PROFESSIONNEL_EXIST_REQUEST:
      return {
        loading: true,
      };
    case CHECK_PROFESSIONNEL_EXIST_SUCCESS:
      return {
        loading: false,
        success: action.payload.message,
      };
    case CHECK_PROFESSIONNEL_EXIST_FAIL:
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

export const searchMedecinReducer = (state = { medecins: [] }, action) => {
  switch (action.type) {
    case SEARCH_MEDECIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SEARCH_MEDECIN_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        medecins: action.payload,
      };
    case SEARCH_MEDECIN_FAIL:
      return {
        state,
        loading: false,
        success: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const getMedecinInfosReducer = (state = { medecin: {} }, action) => {
  switch (action.type) {
    case GET_MEDECIN_INFO_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_MEDECIN_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        medecin: action.payload,
      };
    case GET_MEDECIN_INFO_FAIL:
      return {
        state,
        loading: false,
        success: false,
        error: action.payload,
      };
    case GET_MEDECIN_INFO_RESET:
      return {
        medecin: {},
      };
    default:
      return state;
  }
};

const intialState = {
  loading: false,
  medecin: localStorage.getItem("medecin")
    ? JSON.parse(localStorage.getItem("medecin"))
    : {},
  paramedical: localStorage.getItem("paramemical")
    ? JSON.parse(localStorage.getItem("paramedical"))
    : {},
  clinique: localStorage.getItem("clinique")
    ? JSON.parse(localStorage.getItem("clinique"))
    : {},
  ambulance: localStorage.getItem("ambulance")
    ? JSON.parse(localStorage.getItem("ambulance"))
    : {},
  pharmacie: localStorage.getItem("pharmacie")
    ? JSON.parse(localStorage.getItem("pharmacie"))
    : {},
  donneursang: localStorage.getItem("donneursang")
    ? JSON.parse(localStorage.getItem("donneursang"))
    : {},
  login:
    localStorage.getItem("medecin") ||
    localStorage.getItem("paramedical") ||
    localStorage.getItem("clinique") ||
    localStorage.getItem("ambulance") ||
    localStorage.getItem("pharmacie") ||
    localStorage.getItem("donneursang")
      ? true
      : false,
  error: "",
  success: false,
};

export const loginMedecinReducer = (state = intialState, action) => {
  switch (action.type) {
    case MEDECIN_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case MEDECIN_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        login: true,
        medecin: action.payload,
      };
    case MEDECIN_LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
        login: false,
      };
    case MEDECIN_LOGOUT:
      return {
        login: false,
        medecin: {},
      };
    case MEDECIN_LOGIN_RESET:
      return {
        ...state,
        success: false,
      };
    default:
      return state;
  }
};

export const medecinGetRDVReducer = (state = {}, action) => {
  switch (action.type) {
    case MEDECIN_GET_RDV_REQUEST:
      return {
        loading: true,
      };

    case MEDECIN_GET_RDV_SUCCESS:
      return {
        loading: false,
        success: true,
        rdvs: action.payload.results,
        today: action.payload.today,
      };
    case MEDECIN_GET_RDV_FAIL:
      return {
        loading: false,
        success: false,
        message: action.payload,
      };
    default:
      return state;
  }
};

export const medecinGetRDVByIDReducer = (state = {}, action) => {
  switch (action.type) {
    case MEDECIN_GET_RDV_BYID_REQUEST:
      return {
        loading: true,
      };

    case MEDECIN_GET_RDV_BYID_SUCCESS:
      return {
        loading: false,
        success: true,
        rdv: action.payload,
      };
    case MEDECIN_GET_RDV_BYID_FAIL:
      return {
        loading: false,
        success: false,
        message: action.payload,
      };
    case MEDECIN_GET_RDV_BYID_RESET:
      return {};
    default:
      return state;
  }
};

export const medecinUpdateRDVReducer = (state = {}, action) => {
  switch (action.type) {
    case MEDECIN_UPDATE_RDV_REQUEST:
      return {
        loading: true,
      };

    case MEDECIN_UPDATE_RDV_SUCCESS:
      return {
        loading: false,
        success: true,
        rdvs: action.payload,
      };
    case MEDECIN_UPDATE_RDV_FAIL:
      return {
        loading: false,
        success: false,
        message: action.payload,
      };
    case MEDECIN_UPDATE_RDV_RESET:
      return {};
    default:
      return state;
  }
};

export const medecinAddOrdonnanceReducer = (state = {}, action) => {
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

export const medecinGetHorairesReducer = (state = {}, action) => {
  switch (action.type) {
    case MEDECIN_GET_HORAIRES_REQUEST:
      return {
        loading: true,
      };

    case MEDECIN_GET_HORAIRES_SUCCESS:
      return {
        loading: false,
        success: true,
        rdvs: action.payload.rdvs,
        horaires: action.payload.horaires[0],
        dureeSeance: action.payload.dureeSeance,
      };
    case MEDECIN_GET_HORAIRES_FAIL:
      return {
        loading: false,
        success: false,
        message: action.payload,
      };
    default:
      return state;
  }
};

//

export const searchParamedicalReducer = (
  state = { paramedicals: [] },
  action
) => {
  switch (action.type) {
    case SEARCH_PARAMEDICAL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SEARCH_PARAMEDICAL_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        paramedicals: action.payload,
      };
    case SEARCH_PARAMEDICAL_FAIL:
      return {
        state,
        loading: false,
        success: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const getParamedicalInfosReducer = (
  state = { paramedical: {} },
  action
) => {
  switch (action.type) {
    case GET_PARAMEDICAL_INFO_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_PARAMEDICAL_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        paramedical: action.payload,
      };
    case GET_PARAMEDICAL_INFO_FAIL:
      return {
        state,
        loading: false,
        success: false,
        error: action.payload,
      };
    case GET_PARAMEDICAL_INFO_RESET:
      return {
        paramedical: {},
      };
    default:
      return state;
  }
};

const paramedicalIntialState = {
  loading: false,
  paramedical: localStorage.getItem("paramedical")
    ? JSON.parse(localStorage.getItem("paramedical"))
    : {},

  login: localStorage.getItem("paramedical") ? true : false,
  error: "",
  success: false,
};
export const loginParamedicalReducer = (
  state = paramedicalIntialState,
  action
) => {
  switch (action.type) {
    case PARAMEDICAL_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PARAMEDICAL_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        login: true,
        paramedical: action.payload,
      };
    case PARAMEDICAL_LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
        login: false,
      };
    case PARAMEDICAL_LOGOUT:
      return {
        login: false,
        paramedical: {},
      };
    case PARAMEDICAL_LOGIN_RESET:
      return {
        ...state,
        success: false,
      };
    default:
      return state;
  }
};

export const paramedicalGetRDVReducer = (state = {}, action) => {
  switch (action.type) {
    case PARAMEDICAL_GET_RDV_REQUEST:
      return {
        loading: true,
      };

    case PARAMEDICAL_GET_RDV_SUCCESS:
      return {
        loading: false,
        success: true,
        rdvs: action.payload.results,
        today: action.payload.today,
      };
    case PARAMEDICAL_GET_RDV_FAIL:
      return {
        loading: false,
        success: false,
        message: action.payload,
      };
    default:
      return state;
  }
};

export const paramedicalGetRDVByIDReducer = (state = {}, action) => {
  switch (action.type) {
    case PARAMEDICAL_GET_RDV_BYID_REQUEST:
      return {
        loading: true,
      };

    case PARAMEDICAL_GET_RDV_BYID_SUCCESS:
      return {
        loading: false,
        success: true,
        rdv: action.payload,
      };
    case PARAMEDICAL_GET_RDV_BYID_FAIL:
      return {
        loading: false,
        success: false,
        message: action.payload,
      };
    case PARAMEDICAL_GET_RDV_BYID_RESET:
      return {};
    default:
      return state;
  }
};

export const paramedicalUpdateRDVReducer = (state = {}, action) => {
  switch (action.type) {
    case PARAMEDICAL_UPDATE_RDV_REQUEST:
      return {
        loading: true,
      };

    case PARAMEDICAL_UPDATE_RDV_SUCCESS:
      return {
        loading: false,
        success: true,
        rdvs: action.payload,
      };
    case PARAMEDICAL_UPDATE_RDV_FAIL:
      return {
        loading: false,
        success: false,
        message: action.payload,
      };
    case PARAMEDICAL_UPDATE_RDV_RESET:
      return {};
    default:
      return state;
  }
};

export const paramedicalAddOrdonnanceReducer = (state = {}, action) => {
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

export const paramedicalGetHorairesReducer = (state = {}, action) => {
  switch (action.type) {
    case PARAMEDICAL_GET_HORAIRES_REQUEST:
      return {
        loading: true,
      };

    case PARAMEDICAL_GET_HORAIRES_SUCCESS:
      return {
        loading: false,
        success: true,
        rdvs: action.payload.rdvs,
        horaires: action.payload.horaires[0],
        dureeSeance: action.payload.dureeSeance,
      };
    case PARAMEDICAL_GET_HORAIRES_FAIL:
      return {
        loading: false,
        success: false,
        message: action.payload,
      };
    default:
      return state;
  }
};
