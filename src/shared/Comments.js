import React, { useEffect, useState } from "react";
import { useAxios } from "../hooks/useAxios";
import { useRouteMatch } from "react-router-dom";
import Tweet from "../components/Tweet/Tweet";
import { toast } from "react-toastify";
import { Loader } from "rsuite";

const Comments = (props) => {
  const match = useRouteMatch()
  const {
    params: { _id },
  } = match;
  // const { noComments } = props;
  const {response,error,loading} = useAxios({url:'/app/get-comments/' + _id ,method:'GET',auto:true,key:'comments'})
  useEffect(()=>{
    if (!loading && error){
      toast.error('An error ocurred while retrieving the comments')
    }
  },[response,error,loading])
  // useEffect(() => {
  //   const cancel = axios.CancelToken.source()
  //   if (props.comments) {
  //     axios
  //       .post("/app/getComments", { comments: props.comments },{cancelToken:cancel.token})
  //       .then((res) => {
  //         setComments(res.data);
  //       })
  //       .catch((err) => console.log(err));
  //   }
  //   return () =>{
  //     cancel.cancel()
      
  //   }
  // }, [props.comments]);
  return (
    <>
    {loading && <Loader size="md" style={{marginTop:50,width:'100%',textAlign:'center'}} />}
    {!loading && response?.data.map((tweet,index)=>(

      <Tweet {...tweet} key={index} />
 
    ))}
    </>
    // <>
    //   {
    //     comments && comments.map((e, index) => 
    //     {
    //       let last = comments.length > 0 && (comments.length - 1) == index ? true : false;
  

    //       return <Tweet
    //         {...e}
    //         key={index}
    //         comment={true}
    //         last={
    //           last
    //         }
    //       />
    //     }
    //     )}
    // </>
  );
};

export default Comments;
