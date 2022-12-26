import { io } from "socket.io-client";

const socket = io("http://localhost:5000")

 
export const notification = (setNoti) =>{
  
  socket.on("notification",(value)=>{
    setNoti(value)
  })
}



export const notificationsRead = (username) =>{
  socket.emit("notificationsRead",{username,id:socket.id})
}


export const userOnline = (userId) =>{
  socket.emit("online",{userId,id:socket.id})  
}

export const userOffline = (userId) =>{
  socket.emit("offline",{userId,id:socket.id}) 
}
export default socket