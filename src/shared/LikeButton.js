import React, { useEffect, useState} from 'react'
import { Icon } from 'rsuite'
import { ToolbarButton, ToolbarCounter } from '../components/Tweet/tweet.styles'
import { useAuth } from '../hooks/useAuth'
import { useAxios } from '../hooks/useAxios'

const LikeButton = ({_id,...props}) => { 
  const [likes,setLikes] = useState(props.likes);
  const {user:{id}} = useAuth();
  const {response,error,loading,sendReq} = useAxios({url: !likes.includes(id) ? 'app/like-tweet' : 'app/remove-like',method: !likes.includes(id) ? 'POST' : 'DELETE'})

  useEffect(()=>{
    if (!loading && response){
      setLikes(response.data)
    }
  },[response,error,loading])

  const like = async (e) =>{ 
    e.stopPropagation();
    sendReq({_id})
  }

  return (
    <>
      <ToolbarButton
      icon={<Icon icon={likes.includes(id) ? "heart" : "heart-o"} />}
      appearance="subtle"
      onClick={like}
      circle
      type={"red"}
      size="lg"
      selected={likes.includes(id)}
    />
      <ToolbarCounter  type={"red"} selected={likes.includes(id)}>
      {likes.length}
      </ToolbarCounter>
    </>
  )
}

export default LikeButton