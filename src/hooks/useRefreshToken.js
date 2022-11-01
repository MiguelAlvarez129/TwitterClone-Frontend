import { useEffect } from "react";
import { toast } from "react-toastify";
import { useAuth } from "./useAuth";
import { useAxios } from "./useAxios"


export const useRefreshToken = () =>{
  const {response,error,loading,sendReq:refresh} = useAxios({url:'/app/refresh',method:'GET',withCredentials: true});
  const {setUser, setLogOut} = useAuth();
  useEffect(() => { 
    if (!loading){
      if (response){
        const {data} = response;
        setUser({...data})
        //toast.success('You have logged in successfully')
      }

      if (error){
        if (error?.response?.status === (401 || 403)) {
          toast.error('You are unauthorized to view this content')
        }
        else toast.error('An error ocurred while refreshing token')
        setLogOut()
        // else if (error?.response?.status === 403) toast.warning('Your session has expired')
      }
    }
  },[response,error,loading])

  return {
    refresh,
    loading
  }
}

