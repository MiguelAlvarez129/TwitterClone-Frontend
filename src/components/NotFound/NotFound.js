import React from "react"
import {useHistory} from "react-router"
import {Button, FlexboxGrid} from "rsuite"
import { SadFace } from "../../shared/styles"
const NotFound = (props) =>{
  const history = useHistory()
  return (
    <FlexboxGrid align="top" justify="center">
      <FlexboxGrid.Item>
      <SadFace></SadFace>
      <p>
        mmm... this page doesn't seem to exist, let's go back home.
      </p>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item>
        <Button onClick={() => history.push("/home")} size="lg" appearance="primary">
            Home
        </Button>
      </FlexboxGrid.Item>
    </FlexboxGrid>
  )
}

export default NotFound

// width: 184px;
// height: 62px;
// background-color: white;
// border-top-left-radius: 110px;
// border-top-right-radius: 110px;
// border: 10px solid gray;
// border-bottom: 0;
// margin-top: 61px;