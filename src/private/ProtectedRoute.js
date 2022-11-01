import React,{useEffect} from "react";
import { Route, Redirect, useLocation} from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = ({ component: Component, render,...rest }) => {
  const {isAuth} = useAuth()

  return (
    <Route
      {...rest}
      render={(props) => isAuth ? render() : <Redirect to={{
        pathname:"/login",
        state: {from : props.location}
      }} />}
    />
  );
};

export default ProtectedRoute;
