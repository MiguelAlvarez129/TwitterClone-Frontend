import React from "react"
import {useHistory} from "react-router-dom"
import {
  Title,
  TopBar,
  TopWrapper,
} from "../shared/styles";
import { IconButton, Icon } from "rsuite";


const Topbar = (props) =>{
  const history = useHistory();
  return (
    <TopWrapper>
    <TopBar>
     {
       props.button &&  
       <IconButton
        icon={<Icon icon="chevron-left" style={{ color: "dodgerblue" }} />}
        size="md"
        appearance="subtle"
        style={{ marginBotton: 10 }}
        circle
        block={false}
        onClick={() => history.goBack()}
      />
     }
      
      <Title> {props.title} </Title>
    </TopBar>
  </TopWrapper>
  )
}

export default Topbar