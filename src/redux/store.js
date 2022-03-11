import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './slices/authSlice'
import postReducer from './slices/postSlice'
import dataReducer from './slices/dataSlice'
import {loggerMiddleware,addPathsMiddleware, checkPath} from './middleware/checkRoute';
import {createBrowserHistory} from 'history'
import {connectRouter, routerMiddleware} from 'connected-react-router'

export const history = createBrowserHistory()


export const rootReducer = (history) => combineReducers({
  user:userReducer,
  post:postReducer,
  data:dataReducer,
  router: connectRouter(history), 
})

export default configureStore({
  reducer:rootReducer(history),
  middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat( routerMiddleware(history),addPathsMiddleware,loggerMiddleware,checkPath),
})

