import { usePickerState } from "@material-ui/pickers";
import React from "react";
import { connect, useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

//import { connect } from "react-redux";

const ProfessionnelRoute = ({ component: Component, ...rest }) => {
  // const { login: loginMedecin } = useSelector(
  //   (state) => state.loginMedecinReducer
  // );
  // const { login: loginAmbulance } = useSelector(
  //   (state) => state.ambulanceLoginReducer
  // );
  // const { login: loginParamedical } = useSelector(
  //   (state) => state.loginParamedicalReducer
  // );
  return (
    <Route
      {...rest}
      render={(props) =>
        // loginMedecin || loginAmbulance || loginParamedical ? (
        //   <Component {...props}></Component>
        // ) : (
        //   <Redirect to="/" />
        // )

        rest.user ? <Component {...props}></Component> : <Redirect to="/" />
      }
    />
  );
};

const mapStateProps = (store) => ({
  user: store.userState.user,
  role: store.userState.role,
});

export default connect(mapStateProps, null)(ProfessionnelRoute);
