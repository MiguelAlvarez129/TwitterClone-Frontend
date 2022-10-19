import React, {useState,useMemo} from 'react'
import axios from 'axios'
import { useEffect } from 'react';

const axiosClient = axios.create();

axiosClient.defaults.baseURL = 'http://localhost:5000';

axiosClient.defaults.headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json'
};


export const useAxios = (url,method) =>{
  const [response,setResponse] = useState(null)
  const [error,setError] = useState(null)
  const [loading,setLoading] = useState(false)

  
  const sendReq = async (data = null) =>{
    try {
      setLoading(true)
      const response = await axiosClient({
        url,
        method,
        data
      })
      setResponse(response)
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  const setToken = (token) =>{
    if (token){
      axiosClient.defaults.headers['Authorization'] = 'Bearer ' + token 
    } else {
      axiosClient.defaults.headers['Authorization'] = ''
    }
    
  }

  useEffect(()=>{
    if (response){
      setError(null)
    } 
  },[response])
  
  return {
    response,
    error,
    loading,
    sendReq,
    setToken
  }
}