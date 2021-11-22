import React from "react"
import {useHistory} from "react-router"
import {Button, FlexboxGrid} from "rsuite"
const NotFound = () =>{
  const history = useHistory()
  return (
    <FlexboxGrid align="top" justify="center">
      <FlexboxGrid.Item>
      <p>
        mmm... this page doesn't seem to exist, let's go back home.
      </p>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item>
        <Button onClick={history.push("/home")} size="lg" appearance="primary">
            Home
        </Button>
      </FlexboxGrid.Item>
    </FlexboxGrid>
  )
}

export default NotFound