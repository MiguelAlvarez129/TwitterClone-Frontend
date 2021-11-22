import React, { useEffect, useState } from "react";
import {Loader, Modal, Icon} from "rsuite"
import Tweet from "./Tweet";
import axios from "axios";
import { useParams, Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch} from "react-redux";
import {updateDone} from "../redux/slices/postSlice"
import { trackPromise } from "react-promise-tracker";
import { FeedLoader } from "../shared/styles";
import Loading from "./Loading";

const Feed = (props) => {
  const params = useParams();
  const update = useSelector(state => state.post.update)
  const user = useSelector(state => state.user.user)
  const dispatch = useDispatch()
  const [posts, setPosts] = useState(null);
  const [loading,setLoading] = useState(true);
  const { _id} = props;
  const history = useHistory()

  useEffect(() => { // new props => renderize/change => cleanup => new effect
    const cancel = axios.CancelToken.source()
    const url = props.home ?  "/app/feed" : "/app/getUserTweets";
    console.log(url) 
  
    if (_id != undefined) {
      trackPromise(  axios.post(url, { userId:_id },{cancelToken:cancel.token}).then((res) => {
        console.log("old data",posts)
        setPosts(res.data)
        console.log("new data",res.data)
        setLoading(false)
        if (update){
          dispatch(updateDone())
        }
      }),"feed")
    }

    return () =>{
      cancel.cancel()
      dispatch(updateDone())
    }
  }, [_id,update,user]);

 
  return (
    <div>
    {posts && posts.map((e,index) => 
    
      <Tweet {...e} key={index} noComments={false}/>
    )
    }
    { posts && !posts.length  && <h5 style={{textAlign:"center"}}>This user hasn't posted anything yet :(</h5>}
    {<Loading area="feed"/>}
  </div>
  );
};

export default Feed;
