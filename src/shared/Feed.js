import React, { useEffect, useState } from "react";
import {Loader, Modal, Icon} from "rsuite"
import Tweet from "./Tweet";
import axios from "axios";
import { useParams, Link, useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch} from "react-redux";
import {updateDone} from "../redux/slices/postSlice"
import {saveData} from "../redux/slices/dataSlice"
import { trackPromise } from "react-promise-tracker";
import { FeedLoader } from "../shared/styles";
import Loading from "./Loading";

const Feed = (props) => {
  const location = useLocation()
  const update = useSelector(state => state.post.update)
  const {data} = useSelector(state => state.data)
  const user = useSelector(state => state.user.user)
  const dispatch = useDispatch()
  const [posts, setPosts] = useState(null);
  const [loading,setLoading] = useState(true);
  const { _id} = props;

  useEffect(() => { // new props => renderize/change => cleanup => new effect
    const cancel = axios.CancelToken.source()
    const url = props.home ?  "/app/feed" : "/app/getUserTweets";

    if (data?.posts){
      setPosts([...data.posts])
    } else {
      if (_id != undefined) {
        trackPromise(  axios.post(url, { userId:_id },{cancelToken:cancel.token}).then((res) => {
          setPosts(res.data)
          setLoading(false)
          dispatch(saveData({posts:[...res.data]}))
          if (update){
          dispatch(updateDone())
          }
        }),"feed")
      }
    }

    return () =>{
      cancel.cancel()
      if (update){
        dispatch(updateDone())
        }
    }
  }, [_id,update,user]);

 
  return (
  <>
    {posts && posts.map((e,index) => 
    
      <Tweet {...e} key={index} noComments={false}/>
    )
    }
    { posts && !posts.length  && <h5 style={{textAlign:"center"}}>This user hasn't posted anything yet :(</h5>}
    {<Loading area="feed"/>}
  </>
  );
};

export default Feed;
