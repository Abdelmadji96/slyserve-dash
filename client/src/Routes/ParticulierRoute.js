import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

import { connect } from "react-redux";

const ParticulierRoute = ({ component: Component, ...rest }) => {
  //const { login } = useSelector((state) => state.loginParticulierReducer);
  return (
    <Route
      {...rest}
      render={
        (props) =>
          //login
          rest.user ? <Component {...props}></Component> : <Redirect to="/" />
        //rest.user ? <Component {...props}></Component> : <Redirect to="/" />
      }
    />
  );
};

const mapStateProps = (store) => ({
  user: store.userState.currentUser,
  role: store.userState.role,
});

export default connect(mapStateProps, null)(ParticulierRoute);
