import React, {useState, useEffect}  from "react"
import {TweetButton} from "../../shared/styles"
import { useSelector } from "react-redux"
import { useAxios } from "../../hooks/useAxios"

const FollowButton = (props) =>{
  const {response,error,loading,sendReq} = useAxios({url:'/app/follow-user',method:'PATCH',})
  const {user} = useSelector(state => state.user)
  const {followers,id} = props
  const [following, setFollowing] = useState(false)
  useEffect(() => {
      if (followers && followers.includes(user._id)){
        setFollowing(true)
      } else {
        setFollowing(false)
      }
  }, [followers])

  const follow = () =>{
    sendReq({id})
  }
  return (

    <TweetButton top small inverted onClick={follow}>
      {following ? "Unfollow" : "Follow"}
    </TweetButton> 
  )
}


export default FollowButton;