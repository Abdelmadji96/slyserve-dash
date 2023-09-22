import { USER_STATE } from "../types/user";

export const setUser = (user) => {
  return (dispatch) => {
    localStorage.setItem("user", JSON.stringify(user));
    dispatch({
      type: USER_STATE.SET_USER,
      currentUser: user,
    });
  };
};

export const setToken = (token) => {
  return (dispatch) => {
    localStorage.setItem("token", JSON.stringify(token));
    dispatch({
      type: USER_STATE.SET_TOKEN,
      token,
    });
  };
};

export const setRole = (role) => {
  return (dispatch) => {
    localStorage.setItem("role", JSON.stringify(role));
    dispatch({
      type: USER_STATE.SET_ROLE,
      role,
    });
  };
};

export const setAppointments = (appointments) => {
  return (dispatch) => {
    localStorage.setItem("appointments", JSON.stringify(appointments));
    dispatch({
      type: USER_STATE.SET_APPOINTMENTS,
      appointments,
    });
  };
};

export const setHours = (hours) => {
  return (dispatch) => {
    localStorage.setItem("hours", JSON.stringify(hours));
    dispatch({
      type: USER_STATE.SET_HOURS,
      hours,
    });
  };
};

export const getHours = () => {
  return (dispatch) => {
    let hours = localStorage.getItem("hours");
    hours = JSON.parse(hours);
    if (hours) {
      dispatch({
        type: USER_STATE.GET_HOURS,
        hours,
      });
    }
  };
};

export const getAppointments = () => {
  return (dispatch) => {
    let appointments = localStorage.getItem("appointments");
    appointments = JSON.parse(appointments);
    if (appointments) {
      dispatch({
        type: USER_STATE.GET_APPOINTMENTS,
        appointments,
      });
    }
  };
};

export const getUser = () => {
  return (dispatch) => {
    let user = localStorage.getItem("user");
    user = JSON.parse(user);
    if (user) {
      dispatch({
        type: USER_STATE.GET_USER,
        currentUser: user,
      });
    }
  };
};

export const getToken = () => {
  return (dispatch) => {
    let token = localStorage.getItem("token");
    token = JSON.parse(token);
    if (token) {
      dispatch({
        type: USER_STATE.GET_TOKEN,
        token,
      });
    }
  };
};

export const getRole = () => {
  return (dispatch) => {
    let role = localStorage.getItem("role");
    role = JSON.parse(role);
    if (role) {
      dispatch({
        type: USER_STATE.GET_ROLE,
        role,
      });
    }
  };
};

export const removeUser = () => {
  return (dispatch) => {
    localStorage.removeItem("user");
    dispatch({
      type: USER_STATE.REMOVE_USER,
    });
  };
};
