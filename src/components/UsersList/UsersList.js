import React,{useEffect} from 'react'
import User from '../../shared/User'
import { Loader } from 'rsuite'
import { Sideoption, Stack, WhiteBackground } from '../../shared/styles'
import {useAxios} from '../../hooks/useAxios'
import { toast } from 'react-toastify'
import { Title } from '../Tweet/tweet.styles'
import { Link } from 'react-router-dom'


const UserList = () =>{
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
     {response?.data?.map(({fullname,username},index) => 
     <Link
     to={`/${username}`}
     key={index}
     style={{ textDecoration: "none", color: "black" }}
      >
     <Sideoption key={index}>
       <Stack>
          <User small/>
          <Stack direction={"column"}>
          <Title>
            {fullname}
          </Title>
          <p>
          @{username}
          </p>
          </Stack>
        </Stack>
     </Sideoption>
   </Link>
     )}
    {loading && <WhiteBackground width="400">
        <Loader size="md" center backdrop/>
      </WhiteBackground>}
  </>
  )
}

export default UserList