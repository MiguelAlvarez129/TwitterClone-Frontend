import React from 'react'
import { Icon, Modal } from "rsuite";
import { Link } from "react-router-dom"

const RegisterMessage = (props) => {

  const {show,close} = props

  return(
    <Modal show={show} onHide={close} style={{ padding: "20px 10px" }}>
      <Modal.Header onClick={e => e.stopPropagation()}/>
      <Modal.Body style={{ textAlign: "center" }}>
        <h2> Looking to be part of our community? </h2>
        <Icon icon="group" size="4x" style={{ margin: "20px 0" }} />
        <h5>
          {" "}
          Click <Link to="/register">here</Link> to
          <b>
            {" "}
            register! <Icon icon="character-authorize" size="lg" />{" "}
          </b>
        </h5>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  )
} 




export default RegisterMessage;