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
  console.log("HERE NOT PROTECTED")

  useEffect(()=>{
    if (isAuth){
      history.push('/home',state)
    } 
  },[isAuth])
  return (
    <Route>
      {children}
    </Route>
    // <Route
    //   {...rest}
    //   render={(props) => {

    //       return auth ? (
    //         <Redirect to={
    //         {
    //           pathname:"/home",
    //           state
    //         }
    //       } />
    //     ) : (
    //       <>

    //       <Component {...props} />
    //       <Loading fullWidth/>
    //       </>
    //     );
    //   }}
    // />
  );
};

export default PublicRoute;
