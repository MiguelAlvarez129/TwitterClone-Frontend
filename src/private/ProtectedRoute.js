import React,{useEffect} from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component,auth, ...rest }) => {
  

  return (
    <Route
      {...rest}
      render={(props) => { 
          return auth ? (
          <Component {...rest} {...props}  />
        ) : (
          <Redirect to={
            {
              pathname:"/",
             
            }
          } />
        );
      }}
    />
  );
};

export default ProtectedRoute;
