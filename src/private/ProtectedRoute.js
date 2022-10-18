import React,{useEffect} from "react";
import { useSelector } from "react-redux";
import { Route, Redirect, useLocation, useHistory} from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../components/hooks/useAuth";


const ProtectedRoute = ({ component: Component, ...rest }) => {
  const {isAuth} = useAuth()
  const location = useLocation();
  const history = useHistory()
  const from = location.state?.from

  useEffect(()=>{
    if (!isAuth){
      history.push('/login')
    }
  },[isAuth])

  const getState = () =>{
    if (from == "/compose/tweet"){
      return {background:{pathname:"/compose/tweet"}}
    }
  }


  return (
    <Route
      {...rest}
      render={(props) => <Component {...props} />}
    />
  );
};

export default ProtectedRoute;
