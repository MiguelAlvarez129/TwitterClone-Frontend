import { get } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { getUser, setCurrentUser } from "../../redux/slices/authSlice"


export const useAuth = () =>{
  const dispatch = useDispatch()
  const {user,isAuth} = useSelector(state => getUser(state))
  
  const setUser = (user) =>{
    dispatch(setCurrentUser(user))
  }


  return {
    user,
    isAuth,
    setUser
  }
  
}