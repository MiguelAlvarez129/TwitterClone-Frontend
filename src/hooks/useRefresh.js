import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
import { getKeys, invalidateKey, setKey } from '../redux/slices/axiosSlice';

export const useRefresh = (key,sendReq) => {
  const keys = useSelector(state => getKeys(state));
  const dispatch = useDispatch();

  const setAxiosKey = (key) => {
    dispatch(setKey(key))
  } 

  const invalidateAxiosKey = (key) => {
    dispatch(invalidateKey(key))
  } 

  useEffect(()=>{
    if (key && keys[key] === true){
      console.log('hereee!')
      sendReq()
    }
  },[keys])

  return { 
    setAxiosKey,
    invalidateAxiosKey,
  }
}

