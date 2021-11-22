import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/authSlice'
import postReducer from './slices/postSlice'
import jwt_decode from "jwt-decode";
//Middleware
const checkToken = storeAPI => next => action => {
  console.log(action.type)
  //console.log(localStorage.getItem("token"))
  if (localStorage.getItem("token")) {
    const token = localStorage.getItem("token").replace("Bearer ","")
    const decoded = jwt_decode(token);
    console.log(decoded.exp < Date.now()/1000)
    console.log(Date.now()/1000)
    console.log(decoded)
    next(action)
  }
  //next(action);
  // Ignore the original result, return something else
  return next(action)
}

//Store
export default configureStore({
  reducer:{
    user:userReducer,
    post:postReducer
  }
})

