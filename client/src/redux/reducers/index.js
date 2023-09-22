import { combineReducers } from "redux";
import { user } from "./user";
import { doctors } from "./doctors";

const Reducers = combineReducers({
  userState: user,
  doctorsState: doctors
});

export default Reducers;