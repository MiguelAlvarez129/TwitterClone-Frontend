import React, { useEffect, useState } from "react";
import axios from "axios";
import Tweet from "./Tweet";

const Comments = (props) => {
  const [comments, setComments] = useState(null);
  const { noComments } = props;

  useEffect(() => {
    const cancel = axios.CancelToken.source()
    if (props.comments) {
      axios
        .post("/app/getComments", { comments: props.comments },{cancelToken:cancel.token})
        .then((res) => {
          console.log(res.data)
          setComments(res.data);
        })
        .catch((err) => console.log(err));
    }
    return () =>{
      cancel.cancel()
      
    }
  }, [props.comments]);
  return (
    <>
      {
        comments && comments.map((e, index) => 
        {
          let last = comments.length > 0 && (comments.length - 1) == index ? true : false;
          console.log("comments",comments.length > 1)
          console.log("comments2",!!(comments.length-1))

          return <Tweet
            {...e}

            comment={true}
            last={
              last
            }
          />
        }
        )}
    </>
  );
};

export default Comments;
