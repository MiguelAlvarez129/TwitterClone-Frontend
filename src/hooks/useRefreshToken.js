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
      }

      if (error){
        console.log(error?.response?.status,"ERROR FORBIDDEN")
        if (error?.response?.status === (401 || 400)) {
          toast.error('You are unauthorized to view this content')
        } else if (error?.response?.status === 403) {
          toast.warning('Your session has expired, please log back in')
        }
        setLogOut()
      }
    }
  },[response,error,loading])

  return {
    refresh,
    loading
  }
}

