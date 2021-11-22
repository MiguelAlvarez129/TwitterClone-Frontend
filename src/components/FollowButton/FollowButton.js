import React, {useState, useEffect}  from "react"
import {TweetButton} from "../../shared/styles"
import { useSelector } from "react-redux"
import axios from "axios"
const FollowButton = (props) =>{
  const {user} = useSelector(state => state.user)
  const {isAuth} = useSelector(state => state.user)
  const {followers} = props
  const [following, setFollowing] = useState(false)
  useEffect(() => {
      if (followers && followers.includes(user._id)){
        setFollowing(true)
      } else {
        setFollowing(false)
      }
  }, [followers])

  const follow = () =>{
    axios
    .put("/app/follow",{profile:props.profile,follower:user._id})
    .then(res => {
      
      const {status} = res.data;
      if (status){
        setFollowing(true)
      } else {
        setFollowing(false)
      }
    })
  }
  return (
    isAuth && props.profile ?
    (<TweetButton top small inverted onClick={follow}>
      {following ? "Unfollow" : "Follow"}
    </TweetButton>) : (<></>)
  )
}


export default FollowButton;