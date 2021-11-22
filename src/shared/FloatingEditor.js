import React from "react";
import { Icon, Modal, Divider, IconButton } from "rsuite";
import Editor from "../shared/Editor";
import User from "./User"
import Post from "./Post"
import {useSelector} from "react-redux"
const FloatingEditor = (props) => {
  const { show, close, contents, post } = props;
  console.log(props.contents && props.contents.username)

  const user = useSelector(state => state.user.user)
  return (
    <Modal
      show={show}
      onHide={close}
      overflow={false}
    >
      <IconButton
        style={{margin:"-15px -15px 0px"}}
        appearance="subtle"
        icon={<Icon icon="close" style={{ color: "dodgerblue" }} />}
        circle
        size="lg"
        onClick={close}
      />

      <Divider style={{ margin: "0px -20px 20px" }} />
      <Modal.Body style={{  display:'flex',flexDirection:"column",margin:0,padding:0}}>
        {post && <Post {...contents}/>}
        <div style={{display:"flex"}}>
        <User image={user.file} small/>
        <div style={{width:'100%'}}>
         <Editor close={close}/>
        </div>

       
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default FloatingEditor;
