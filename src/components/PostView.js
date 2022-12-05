import React, { useEffect } from "react";
import Comments from "../shared/Comments";
import Tweet from "../components/Tweet/Tweet"
import Topbar from "../shared/Topbar"
import { useAxios } from "../hooks/useAxios";
import { toast } from "react-toastify";
import { Loader } from "rsuite";

const PostView = (props) => {
  const {_id} = props.match.params;
  const {response,error,loading} = useAxios({url:'app/get-tweet/' + _id, method:'GET', auto:true, key:"tweet"})

  useEffect(()=>{
    if (!loading && error){
      if (error?.response?.status === 404){
        toast.error('This tweet doesn\'t seem to exist')
      } else {
        toast.error('An error ocurred while retrieving the tweet')
      }
    }
  },[response,error,loading])
 
  return (
    <>
    <Topbar title={"Tweet"} button/> 
    {response?.data && <Tweet {...response.data} extended={true}/>}
    {/* {loading && <div style={}>

      <Loader center size="md"/>
    </div> 
      } */}
    {!loading && !!response?.data?.comments.length &&  <Comments /> }
    </> 
    
  );
};

export default PostView;
