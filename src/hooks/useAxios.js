import React, {useState,useRef} from 'react'
import axios from 'axios'
import { useEffect } from 'react';
import { useAuth } from './useAuth';
import {useRefresh} from './useRefresh';
import { useRefreshToken } from './useRefreshToken';

const axiosClient = axios.create();

axiosClient.defaults.baseURL = process.env.REACT_APP_BASE_URL;

axiosClient.defaults.headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json'
};

export {axiosClient}

export const useAxios = ({url,method,auto = false,withCredentials = false, multipart = false, key = null, invalidateKey = null}) =>{
  const { isAuth, user:{accessToken}, setToken,setLogOut} = useAuth();
  const [response,setResponse] = useState(null)
  const [error,setError] = useState(null)
  const [loading,setLoading] = useState(false)
  const mounted = useRef(true)
  const controller = new AbortController()

  const sendReq = async (data = null) =>{
    try {
      setLoading(true)
      const response = await axiosClient({
        url,
        method,
        data,
        signal: controller.signal,
        withCredentials: isAuth || withCredentials,
      })
      if (mounted.current){
        setResponse(response)
        setError(null)
      } 
    } catch (error) {
      if (mounted.current) {
        setError(error)
        setResponse(null)
      }
    } finally {
      if (mounted.current) setLoading(false)
    }
  }

  const { setAxiosKey,invalidateAxiosKey} = useRefresh(key,sendReq)

  useEffect(()=>{
    const responseIntercept = axiosClient.interceptors.response.use(
      response => {
        return response
      },
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newToken = await axiosClient.get('/app/refresh',{withCredentials: true});
          setToken(newToken.data.accessToken)
          prevRequest.headers['Authorization'] = 'Bearer ' + newToken.data.accessToken;
          return axiosClient({...prevRequest})
        } else if (error?.response?.status === 403 && !prevRequest?.sent){
          setLogOut()
        }
        return Promise.reject(error);
    })

    const requestIntercept = axiosClient.interceptors.request.use(
      config => {
        if (!config.headers['Authorization']){
          config.headers['Authorization'] = 'Bearer ' + accessToken
        }
        if (multipart){
          config.headers['Content-Type'] = 'multipart/form-data'
        }
        return config
      },
      error => Promise.reject(error))
      
      return () => {
        axiosClient.interceptors.request.eject(requestIntercept);
        axiosClient.interceptors.response.eject(responseIntercept);
    }
  },[isAuth,sendReq])

  useEffect(()=>{
    if (auto){
        sendReq()
    }
    return () => {
      controller.abort()
      mounted.current = false
    }
  },[])

  useEffect(()=>{
    if (!loading && response){
      if (key){
        setAxiosKey(key)
      } 
      if (invalidateKey){
        invalidateAxiosKey(invalidateKey)
      }
    } 

  },[response,loading])
  return {
    response,
    error,
    loading,
    sendReq,
  }
}