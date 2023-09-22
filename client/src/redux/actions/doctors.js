import { DOCTORS_STATE } from "../types/doctors";

export const setDoctors = (doctors) => {
  return (dispatch) => {
    localStorage.setItem("doctors", JSON.stringify(doctors));
    dispatch({
      type: DOCTORS_STATE.SET_DOCTORS,
      doctors,
    });
  };
};

export const getDoctors = () => {
  return (dispatch) => {
    let doctors = localStorage.getItem("doctors");
    doctors = JSON.parse(doctors);
    if (doctors) {
      dispatch({
        type: DOCTORS_STATE.GET_DOCTORS,
        doctors,
      });
    }
  };
};
