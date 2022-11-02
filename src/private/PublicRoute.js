import React,{useEffect, useRef, useState} from "react";
import { useSelector } from "react-redux";
import { Route, Redirect, useHistory , useLocation} from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Loading from "../shared/Loading";

const PublicRoute = ({ component: Component, children, ...rest }) => {
  
  const {isAuth} = useAuth()
  const history = useHistory()
  const location = useLocation();
  
  return (
    <Route
      {...rest}
      render={() => 
        isAuth ?  
        <Redirect
          to={location?.state?.from || '/home'}
        />
        : 
         (
          <>
          <Component {...rest}/>
          {/* <Loading fullWidth/> */}
          </>
        )
      }
    />
  );
};

export default PublicRoute;
