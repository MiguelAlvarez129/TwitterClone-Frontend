import React, { useEffect, useRef, useState } from "react";
import { Button, IconButton, Icon, Whisper, Tooltip, Alert, Progress } from "rsuite";
import "react-quill/dist/quill.snow.css";
import Preview from "../shared/Preview";
import { TextArea, Toolbar, WrapperEditor, TweetButton } from "../shared/styles";
import Loading from "../shared/Loading";
import { trackPromise } from "react-promise-tracker";
import { useSelector, useDispatch } from "react-redux"
import { createPost } from "../controllers/axios.js"


const Editor = (props) => {
  const {username,_id} =  useSelector((state) => state.user.user);
  const dispatch = useDispatch()
  const {tweetId} = props; 

  const del = (id) => {
    setFiles(files.filter((e, index) => index != id));
  };
  const upload = (event) => {
    const promises = [];
    if (event.target.files.length >= 1) {
      for (const file of event.target.files) {
        promises.push(
          new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
              resolve(reader.result);
            };
          })
        );
      }
      trackPromise(
        Promise.all(promises).then((promises) =>
          setFiles([...files, ...promises])
        ),
        "images"
      );
    }
  };

  const [files, setFiles] = useState([]);
  const ref = useRef("");
  const [value, setValue] = useState("");

  const onSubmit = () => {
    let data = {}
    if (tweetId) {
      data = {username,_id,files,text:value,tweetId};
    } 
    else {
      data = {username,_id,files,text:value};
    }
    createPost(dispatch,data)
    .then(()=> props.close())
  };
  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div style={{ position: "relative" }}>
      <WrapperEditor>
        <TextArea
          value={value}
          onChange={onChange}
          maxLength="150"
          placeholder="What's on your mind?"
        />

        <Toolbar>
          <label htmlFor="attachment" style={{ display: "block" }} />
          <input
            multiple
            ref={ref} 
            onChange={(event) => {
              upload(event);
            }}
            onClick={(e) => (e.target.value = null)}
            type="file"
            accept="image/png, image/jpeg" 
            id="attachment"
            name="attachment"
            style={{ display: "none" }}
          />
          <Whisper
            placement="bottom"
            trigger="hover"
            speaker={<Tooltip>Add image</Tooltip>}
          >
            <IconButton
              onClick={() => ref.current.click()}
              style={{ paddingBottom: "auto",marginRight:'auto' }}
              icon={<Icon icon="image" style={{color:'dodgerblue'}}/>}
              size="lg"
              circle
              appearance="subtle"
            />
          </Whisper>

          {value && <Progress.Circle style={{width:30}} percent={value.length} showInfo={false} trailWidth={10}/>}

         
          <TweetButton
            style={{ marginLeft: 20, fontSize: 16, width:'auto' }}
            onClick={onSubmit}
            disabled={!value}
          >
            Tweet
          </TweetButton>
         
        </Toolbar>

        <div style={{ background: "#EFEFEF", padding: "0 20px" }}>
          {files.length > 0 ? <h5>Attachments:</h5> : null}
          {files.map((e, index) => (
            <Preview key={index} id={index} del={del} src={e} />
          ))}
        </div>
      </WrapperEditor>

      <Loading area="images" />
    </div>
  );
};

export default Editor;
