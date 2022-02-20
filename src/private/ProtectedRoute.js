import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect, useLocation} from "react-router-dom";


const ProtectedRoute = ({ component: Component, ...rest }) => {
  const auth = useSelector((state) => state.user.isAuth);
  const location = useLocation();
  const from = location.state?.from
  const getState = () =>{
    if (from == "/compose/tweet"){
      return {background:{pathname:"/compose/tweet"}}
    }
  }

  return (
    <Route

      {...rest}
      render={(props) => {

          return !auth ?
          (
          
          <Redirect to={
            {
              pathname:"/",
              state:{
                from: props.history.location.pathname,
              }
            }
          } />

        ) : 
          from ? 
          (<Redirect to={
            {pathname:from,
            state:getState(),
            }
          }/>)
          :
          (
            <Component {...props} />
          )
      }}
    />
  );
};

export default ProtectedRoute;
