import React from "react";
import { Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";

const ParticulierRoute = ({ component: Component, ...rest }) => {
  const currentUser = localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"));
  return (
    <Route
      {...rest}
      render={(props) => currentUser ? <Component {...props}></Component> : <Redirect to="/" />}
    />
  );
};

const mapStateProps = (store) => ({
  user: store.userState.currentUser,
  role: store.userState.role,
});

export default connect(mapStateProps, null)(ParticulierRoute);
