import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

export default function AbonneFormule2Route({ component: Component, ...rest }) {
  const { login: loginMedecin, medecin } = useSelector(
    (state) => state.loginMedecinReducer
  );
  const { login: loginParticulier } = useSelector(
    (state) => state.loginParticulierReducer
  );
  const { login: loginParamedical, paramedical } = useSelector(
    (state) => state.loginParamedicalReducer
  );
  return (
    <Route
      {...rest}
      render={(props) =>
        (loginMedecin &&
          medecin.medecin.abonner_formule_1 == 1 &&
          medecin.medecin.abonner_formule_2 == 1) ||
        (loginParamedical &&
          paramedical.paramedical.abonner_formule_1 == 1 &&
          paramedical.paramedical.abonner_formule_2 == 1) ||
        loginParticulier ? (
          <Component {...props}></Component>
        ) : (
          <Redirect to="/" />
        )
      }
    ></Route>
  );
}
