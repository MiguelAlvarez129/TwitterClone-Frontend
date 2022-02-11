import React,{useEffect,useState} from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import User from '../../shared/User'
import { Loader } from 'rsuite'
import { FlexColumn, Sideoption, WhiteBackground } from '../../shared/styles'


const UserList = () =>{
  
  const auth = useSelector(state => state.user.isAuth )
  const [list,setList]= useState([])
  const [loading,setLoading]= useState(true)

  useEffect(() => {
    console.log("AUTH",auth)
    if (auth){
      axios.get("/app/users")
    .then((e)=>{
      setList([...e.data])
      setLoading(false)
    }) 
    }else {
      setLoading(false)
    }
  }, [auth])

  return (
  <>
   <h5> Some users you may want to know:</h5>
     {list.map((e,index) => 
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