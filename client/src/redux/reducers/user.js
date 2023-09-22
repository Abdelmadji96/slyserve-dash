import { USER_STATE } from "../types/user";

const initialState = {
  currentUser: null,
  role: null,
  token: null,
  appointments: null,
  hours: null,
};

export const user = (state = initialState, action) => {
  switch (action.type) {
    case USER_STATE.SET_USER:
      return { ...state, currentUser: action.currentUser };
      break;
    case USER_STATE.SET_ROLE:
      return { ...state, role: action.role };
      break;
    case USER_STATE.GET_ROLE:
      return { ...state, role: action.role };
      break;
    case USER_STATE.GET_USER:
      return { ...state, currentUser: action.currentUser };
      break;
    case USER_STATE.SET_TOKEN:
      return { ...state, token: action.token };
      break;
    case USER_STATE.GET_TOKEN:
      return { ...state, token: action.token };
      break;
    case USER_STATE.SET_APPOINTMENTS:
      return { ...state, appointments: action.appointments };
      break;
    case USER_STATE.GET_APPOINTMENTS:
      return { ...state, appointments: action.appointments };
      break;
    case USER_STATE.SET_HOURS:
      return { ...state, hours: action.hours };
      break;
    case USER_STATE.GET_HOURS:
      return { ...state, hours: action.hours };
      break;
    case USER_STATE.REMOVE_USER:
      return { currentUser: null, role: null, token: null };
      break;
    default:
      return {
        ...state,
      };
      break;
  }
};
