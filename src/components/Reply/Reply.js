import React, {useState} from "react";
import { Icon, Divider, IconButton, Progress, } from "rsuite";
import User from "../../shared/User";
import { useSelector } from "react-redux";
import {
  BackDrop,
  PostContent,
  PostHeader,
  PostDate,
  FlexCenter,
  FlexColumn,
  Connector,
  Stack,
  TextArea,
  ImageContainer,
  TweetButton,
} from "../../shared/styles";
import { useHistory, useLocation } from "react-router-dom";
import { Image, Toolbar, ReplyDiv } from "./reply.styles";
import UploadButton from "./UploadButton/UploadButton"; 
import ModalDiv from "../../shared/ModalDiv/ModalDiv";
import { useAxios } from "../../hooks/useAxios";
import { useEffect } from "react";
import { toast } from "react-toastify";

const Reply = () => {
  const [files,setFiles] = useState([])
  const [value,setValue] = useState('')
  const user = useSelector((state) => state.user.user);
  const history = useHistory();
  // const location = useLocation();
  // const reply  = location.state?.reply;
  const {response,error,loading,sendReq} = useAxios({url:'/app/create-tweet',method:'POST',multipart: true})
  // const tweetId = reply?._id;

  const del = (index) =>{
    setFiles(files => files.filter((e,i) => i !== index)) 
  }

  useEffect(()=>{
    if (!loading){
      if (response){
        toast.success('Tweet added')
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
    form.append('content',value)
    for(let {file} of files){
      form.append('files',file)
    }
    sendReq(form)
  }

  return (
    <BackDrop onMouseDown={()=> history.goBack()} onMouseUp={(e) => e.preventDefault()} >
      <Stack justify={'center'} align={'center'}>
        <ModalDiv style={{overflow:'auto'}} files={files.length} loading={loading} >
          <IconButton
              style={{ margin: "-15px -15px 0px" }}
              appearance="subtle"
              icon={<Icon icon="close" style={{ color: "dodgerblue" }} />}
              circle
              size="lg"
              onClick={()=> history.goBack()}
            />
        <Divider style={{ margin: "0px -20px 20px" }} />
          <Stack>
            <User image={user.file} small />
            <Stack direction={'column'}>
              <TextArea value={value} onChange={(e) => setValue(e.target.value)}
              maxLength={160}
              placeholder={"What's on your mind?"}
              />
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
                {value && <Progress.Circle style={{width:30}} percent={value.length} showInfo={false} trailWidth={10}/>}
                <TweetButton disabled={!value && !files.length} onClick={onSubmit}>
                  Tweet
                </TweetButton>
              </Toolbar>
            </Stack>
          </Stack>
        </ModalDiv>
      </Stack>
      {/* <FlexCenter>
        <ReplyDiv onClick={(e) => e.stopPropagation()}>
          <IconButton
            style={{ margin: "-15px -15px 0px" }}
            appearance="subtle"
            icon={<Icon icon="close" style={{ color: "dodgerblue" }} />}
            circle
            size="lg"
            onClick={back}
          />

          <Divider style={{ margin: "0px -20px 20px" }} />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              margin: 0,
              padding: 0,
            }}
          >
            {reply && (
              <div style={{ display: "flex" }}>
                <FlexColumn>
                  <User image={reply.image} small />
                  <Connector />
                </FlexColumn>
                <FlexColumn>
                  <PostHeader>
                    {reply.username}
                    <PostDate>{reply.date.slice(0, 11)}</PostDate>
                  </PostHeader>  
                  <PostContent>{reply.content}</PostContent>
                  <p> Replying to {reply.username}</p>
                </FlexColumn>
              </div>
            )}
            <div style={{ display: "flex" }}>
              <User image={user.file} small />
              <div style={{ width: "100%" }}>
                <Editor
                  close={back}
                  tweetId={tweetId}
                />
              </div> 
            </div>
          </div>
        </ReplyDiv>
      </FlexCenter> */}
    </BackDrop>
  );
};

export default Reply;
