import React,{useEffect, useRef, useState} from "react";
import { useSelector } from "react-redux";
import { Route, Redirect, useHistory , useLocation} from "react-router-dom";
import { useAuth } from "../components/hooks/useAuth";
import Loading from "../shared/Loading";

const PublicRoute = ({ component: Component, children, ...rest }) => {
  
  const {isAuth} = useAuth()
  const history = useHistory()
  const location = useLocation();
  const {state} = location

  useEffect(()=>{
    if (isAuth){
      history.push('/home',state)
    } 
  },[isAuth])
  return (
    <Route
      {...rest}
      render={(props) => 
         (
          <>
          <Component {...props} />
          {/* <Loading fullWidth/> */}
          </>
        )
      }
    />
  );
};

export default PublicRoute;
