import React, {useState} from "react";
import { Icon, Divider, IconButton, Progress, } from "rsuite";
import User from "../../shared/User";
import {
  BackDrop,
  Stack,
  TextArea,
  ImageContainer,
  TweetButton,
} from "../../shared/styles";
import { useHistory, useLocation } from "react-router-dom";
import { Image, Toolbar } from "./reply.styles";
import UploadButton from "./UploadButton/UploadButton"; 
import ModalDiv from "../../shared/ModalDiv/ModalDiv";
import { useAxios } from "../../hooks/useAxios";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Tweet from "../Tweet/Tweet";
import { useAuth } from "../../hooks/useAuth";
import QuotedRetweet from "../QuotedRetweet/QuotedRetweet";

const Reply = () => {
  const [files,setFiles] = useState([])
  const [value,setValue] = useState('')
  const {user:{username,profilePic}} = useAuth();
  const history = useHistory();
  const location = useLocation();
  const reply = location.state?.reply;
  const quotedRetweet = location.state?.quotedRetweet;
  const url = reply ? '/app/add-comment' : quotedRetweet ? '/app/add-retweet'  : '/app/create-tweet'
  const {response,error,loading,sendReq} = useAxios({url,method:'POST',multipart: true, invalidateKey: 'feed'})

  const del = (index) =>{
    setFiles(files => files.filter((e,i) => i !== index)) 
  }
  useEffect(()=>{
    if (!loading){
      if (response){
        toast.success(reply ? 'Comment added!' : quotedRetweet ? 'Quoted retweet added!' : 'Tweet added!')
        history.goBack()
      }

      if (error){
        toast.error('An error ocurred while sending the tweet')
      }
    }
  },[response,error,loading])

  const onSubmit = () => {
    const form = new FormData()
    form.append('type','tweets')
    if (reply) form.append('reply',reply._id)
    if (quotedRetweet) form.append('_id',quotedRetweet.id)
    form.append('content',value)
    for(let {file} of files){
      form.append('files',file)
    }
    sendReq(form)
  }

  return (
    <BackDrop onMouseDown={()=> history.goBack()} onMouseUp={(e) => e.preventDefault()} >
        <ModalDiv files={files.length} loading={loading} >
          <IconButton
              style={{ margin: "-15px -15px 0px" }}
              appearance="subtle"
              icon={<Icon icon="close" style={{ color: "dodgerblue" }} />}
              circle
              size="lg"
              onClick={()=> history.goBack()}
            />
        <Divider style={{ margin: "0px -20px 20px" }} />
        {reply && <Tweet {...reply} reply extended={false}/>}
          <Stack>
        
            <User username={username} small profilePic={profilePic} />

            <Stack direction={'column'}>
              <TextArea value={value} onChange={(e) => setValue(e.target.value)}
              maxLength={160}
              placeholder={"What's on your mind?"}
              />
            {quotedRetweet && <QuotedRetweet {...quotedRetweet} quotedRetweet extended={false}/>}
                <ImageContainer images={files}>
                {files.map(({image},index) => (
                <Image image={image} key={index}>
                   <IconButton
                      icon={<Icon icon="close" />} 
                      circle
                      size="sm"
                      style={{position:'absolute',top:0}}
                      onClick={() => del(index)}/>
                    <img src={image}  style={{height:'auto',width:'100%'}}/>
                </Image>
              ))}
                </ImageContainer>
              <Toolbar>
                <UploadButton setFiles={setFiles} files={files}/> 
                {value && <Progress.Circle style={{width:30,marginRight:15}} percent={value.length * 100 / 160} showInfo={false} trailWidth={10}/>}
                <TweetButton disabled={!value && !files.length} onClick={onSubmit}>
                  Tweet
                </TweetButton>
              </Toolbar>
            </Stack>
          </Stack>

        </ModalDiv>
    </BackDrop>
  );
};

export default Reply;
