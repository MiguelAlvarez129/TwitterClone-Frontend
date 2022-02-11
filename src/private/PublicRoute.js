import React,{useEffect, useRef, useState} from "react";
import { useSelector } from "react-redux";
import { Route, Redirect, useHistory , useLocation} from "react-router-dom";
import Loading from "../shared/Loading";
const PublicRoute = ({ children,component: Component, ...rest }) => {
  
  const auth = useSelector((state) => state.user.isAuth);
  const location = useLocation();
  const {state} = location

  return (
    <Route
      {...rest}
      render={(props) => {
        console.log("PUBLIC",state)

          return auth ? (
            <Redirect to={
            {
              pathname:"/home",
              state
            }
          } />
        ) : (
          <>

          <Component {...props} />
          <Loading fullWidth/>
          </>
        );
      }}
    />
  );
};

export default PublicRoute;
