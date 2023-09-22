import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

export default function AdminRoute({ component: Component, ...rest }) {
  const { login } = useSelector((state) => state.adminLoginReducer);
  return (
    <Route
      {...rest}
      render={(props) =>
        login ? <Component {...props}></Component> : <Redirect to="/" />
      }
    ></Route>
  );
}
