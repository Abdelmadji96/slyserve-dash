import React from "react";
import { connect, useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const AbonneFormule1Route = ({ component: Component, ...rest }) => {
  // const { login, medecin } = useSelector((state) => state.loginMedecinReducer);
  // console.log(medecin);
  // const { loginParamedical, paramedical } = useSelector(
  //   (state) => state.loginParamedicalReducer
  // );
  // console.log(paramedical);
  return (
    <Route
      {...rest}
      render={(props) =>
        //login
        (rest.user && //medecin.medecin.abonner_formule_1 == 1) ||
          rest.user.abonner_formule_1 == 1) || //loginParamedical && paramedical.paramedical.abonner_formule_1 == 1) ? (
        (rest.user && rest.user.abonner_formule_1 == 1) ? (
          <Component {...props}></Component>
        ) : (
          <Redirect to="/" />
        )
      }
    ></Route>
  );
};
const mapStateProps = (store) => ({
  user: store.userState.currentUser,
});
export default connect(mapStateProps, null)(AbonneFormule1Route);
