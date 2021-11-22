import React, { useEffect, useState } from "react";
import { useParams, useHistory, useLocation, Redirect } from "react-router-dom";
import User from "../shared/User";
import { likePost } from "../controllers/axios";
import { useSelector, useDispatch } from "react-redux";
import RegisterMessage from "../shared/RegisterMessage";
import Comments from "../shared/Comments";
import Tweet from "../shared/Tweet"
import Topbar from "../shared/Topbar"
import {
  Title,
  TopBar,
  TopWrapper,
} from "../shared/styles";
import { IconButton, Icon, Divider } from "rsuite";
import {updateDone} from "../redux/slices/postSlice"
import axios from "axios";
import { trackPromise } from "react-promise-tracker";
const PostView = (props) => {
  const dispatch = useDispatch()
  const userId = useSelector((state) => state.user.user._id);
  const {update} = useSelector((state)=> state.post)
  const [comments, setComments] = useState([]);
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [redirect,setRedirect] = useState(false)
  const { tweetId, profile } = useParams();
  const location = useLocation();
  const history = useHistory();
  const retweetBy = location.state && location.state.retweetBy


  useEffect(() => {
      
      const prueba = () =>{
          return  new Promise(resolve => setTimeout(() => resolve("Done!"),10000000))
        }
        console.log(tweetId,"TWEET")
        trackPromise(
          axios
            .post("/app/getSinglePost", { tweetId })
            .then((res) => {
              setData(res.data);
              setComments(res.data.comments)
              if (update) dispatch(updateDone())
            }).catch(e => {
              console.log(e.response)
              if (e.response.status === 404){
                setRedirect(true)
              }
            })
        )

    return () =>{
      dispatch(updateDone())
    }
  }, [tweetId,update]);

 
  return (
    redirect ? <Redirect to="/404"/> : 
    <>
    <Topbar title={"Tweet"}/>
   {data &&  <Tweet {...data} retweetBy={retweetBy} big/>}
    {comments &&  <Comments comments={comments} /> }
    </> 
  );
};

export default PostView;
