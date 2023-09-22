import { DOCTORS_STATE } from "../types/doctors";

const initialState = {
  doctors: [],
};

export const doctors = (state = initialState, action) => {
  switch (action.type) {
    case DOCTORS_STATE.SET_DOCTORS:
      return { ...state, doctors: action.doctors };
      break;
    case DOCTORS_STATE.GET_DOCTORS:
      return { ...state, doctors: action.doctors };
      break;
    default:
      return {
        ...state,
      };
      break;
  }
};
