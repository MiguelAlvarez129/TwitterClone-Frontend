import React,{useState,useEffect} from "react"
import { useSelector } from "react-redux"
import Topbar from "../../shared/Topbar"
import { PostPanel, PostContent } from "../../shared/styles"
import User from "../../shared/User"
import axios from "axios"
import {Loader} from "rsuite"
import { Link } from "react-router-dom"
import { notificationsRead } from "../../controllers/ioControllers"
import socket from "../../controllers/ioControllers"
import { trackPromise } from "react-promise-tracker";
import { useHistory } from "react-router"
const Notifications = (props) =>{
  const [notifications,setNotifications] = useState([])
  const [loading,setLoading] = useState(true)
  const {username}  = useSelector(state => state.user.user)
  const history = useHistory()
  useEffect(() => {
    trackPromise(axios.post("/app/notifications",{username})
    .then((res)=>{
      setNotifications(res.data)
      notificationsRead(username)
    })
    .catch(error => console.log(error))
    )
  }, [username])
  const redirect = (url) =>{
    history.push(url)
  }
  // return loading ? <Loader center size="md" /> :
  return (<>
    <Topbar title="Notifications" />
    {notifications.map((e,index)=>
    <div  key={index}
      onClick={()=>redirect(e.url)}
      style={{
        color: "gray",
        textDecoration: "none",
        pointerEvents: "auto",
        cursor:"pointer"
      }}>

      <PostPanel  hover>  
      <User username={e.username} fullname={e.fullname} image={e.image} small/>
      <PostContent> {e.text} </PostContent>
      </PostPanel>
    </div>
    )}
    {!!!notifications.length && <h5 style={{textAlign:"center"}}> No notifications as of yet</h5>}
 
    </> )
}

export default Notifications