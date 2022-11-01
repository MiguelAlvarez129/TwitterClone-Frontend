import { useDispatch, useSelector } from "react-redux"
import { getUser, setCurrentUser, setAccessToken, logOut} from "../redux/slices/authSlice"


export const useAuth = () =>{
  const dispatch = useDispatch()
  const {user,isAuth} = useSelector(state => getUser(state))
  
  const setUser = (user) =>{
    dispatch(setCurrentUser(user))
  }

  const setToken = (token) =>{
    dispatch(setAccessToken(token))
  }

  const setLogOut = () =>{
    dispatch(logOut())
  }
  

  return {
    user,
    isAuth,
    setUser,
    setToken,
    setLogOut
  }
  
}