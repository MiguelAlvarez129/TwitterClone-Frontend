import { io } from "socket.io-client";
const socket = io(process.env.REACT_APP_API_URL)

 
export const notification = (setNoti) =>{
  
  socket.on("notification",(value)=>{
    setNoti(value)
  })
}



export const notificationsRead = (username) =>{
  socket.emit("notificationsRead",{username,id:socket.id})
}


export const userOnline = (username) =>{
  socket.emit("online",{username,id:socket.id})  
}

export const userOffline = (username) =>{
  socket.emit("offline",{username,id:socket.id}) 
}
export default socket