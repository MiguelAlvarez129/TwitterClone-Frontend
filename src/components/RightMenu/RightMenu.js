import React from "react"
import {Sidemenu} from "../../shared/styles"
import UsersList from "../UsersList/UsersList"
const RightMenu = () =>{

  return (
    <Sidemenu right>
      <UsersList/>
    </Sidemenu>
  )
}


export default RightMenu