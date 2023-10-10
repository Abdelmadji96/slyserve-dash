import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

export default function AdminRoute({ component: Component, isLogin, ...rest }) {
  // const { login } = useSelector((state) => state.adminLoginReducer);
  console.log('iciiiiii', isLogin);
  const currentUser = (localStorage.getItem("user") && localStorage.getItem("user") !== "undefined") ? JSON.parse(localStorage.getItem("user")) : undefined;
  return (
    <Route
      {...rest}
      // render={(props) =>
      //   <Component {...props}></Component>
      // }
      render={(props) =>
        currentUser || isLogin ? <Component {...props}></Component> : <Redirect to="/" />
      }
    ></Route>
  );
}
