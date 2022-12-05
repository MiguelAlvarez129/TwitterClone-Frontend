import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
import { deleteKey, getKeys, invalidateKey, setKey } from '../redux/slices/axiosSlice';

export const useRefresh = (key,sendReq) => {
  const keys = useSelector(state => getKeys(state));
  const dispatch = useDispatch();

  const setAxiosKey = (key) => {
    dispatch(setKey(key))
  } 

  const invalidateAxiosKey = (key) => {
    if (key && keys[key] === false){
      dispatch(invalidateKey(key))
    }
  } 

  const deleteAxiosKey = (key) =>{
    dispatch(deleteKey(key))
  }

  useEffect(()=>{
    if (key && keys[key] === true){

      sendReq()
      // dispatch(deleteKey(key))
    }
  },[keys])

  return { 
    setAxiosKey,
    invalidateAxiosKey,
    deleteAxiosKey,
  }
}

