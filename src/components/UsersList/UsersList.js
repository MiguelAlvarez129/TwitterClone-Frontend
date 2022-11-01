import React,{useEffect,useState} from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import User from '../../shared/User'
import { Loader } from 'rsuite'
import { FlexColumn, Sideoption, WhiteBackground } from '../../shared/styles'
import {useAxios} from '../../hooks/useAxios'
import { toast } from 'react-toastify'


const UserList = () =>{
  
  // const auth = useSelector(state => state.user.isAuth )
  const [list,setList]= useState([])
  // const [loading,setLoading]= useState(true)
  const {response,error,loading} = useAxios({url:'/app/users-list',method:'GET',auto:true})

  useEffect(() => {
   if (!loading){
    if (error){
      toast.error('An error ocurred while getting the users list')
    }
   }
  }, [response,error,loading])

  return (
  <>
   <h5> Some users you may want to know:</h5>
     {response?.data?.map((e,index) => 
     <Sideoption  key={index} flex width="true">
      <User  image={e.pic} username={e.username} fullname={e.fullname} small />
     </Sideoption>
     )}
    {loading && <WhiteBackground width="400">
        <Loader size="md" center backdrop/>
      </WhiteBackground>}
  </>
  )
}

export default UserList