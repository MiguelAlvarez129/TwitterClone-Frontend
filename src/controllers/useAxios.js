import React, {useState} from 'react'
import axios from 'axios'

const axiosClient = axios.create();

axiosClient.defaults.baseURL = 'http://localhost:5000';

axiosClient.defaults.headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json'
};

export const useAxios = (url,method) =>{
  const [data,setData] = useState(null)
  const [error,setError] = useState(null)
  const [loading,setLoading] = useState(false)


  const sendReq = async (body = null) =>{
    try {
      setLoading(true)
      const response = await axiosClient({
        url,
        method,
        body
      })
      setData(response.data)
    } catch (error) {
      console.log('error')
      setError(error)
    } finally {
      console.log('loading')
      setLoading(false)
    }
  }


  return {
    data,
    error,
    loading,
    sendReq
  }
}