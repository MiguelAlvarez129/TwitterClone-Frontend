import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/authSlice'
import postReducer from './slices/postSlice'



//Store
export default configureStore({
  reducer:{
    user:userReducer,
    post:postReducer
  }
})

