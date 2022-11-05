import React from 'react'
import { TweetContainer, TweetContent } from './tweet.styles'
import { Stack, Fullname } from '../../shared/styles'
import User from '../../shared/User'
import TweetToolbar from './TweetToolbar/TweetToolbar'
import TweetHeader from './TweetHeader/TweetHeader'
import TweetGallery from './TweetGallery/TweetGallery'
import { useHistory } from 'react-router-dom'
const Tweet = (props) => {
  const history = useHistory();
  const {author:{username},_id,extended} = props;
  const onClick = (e) =>{
    e.stopPropagation()
    !extended && history.push(`/${username}/${_id}`)
  }
  return ( 
    <TweetContainer onClick={onClick} extended={extended}>
      <Stack> 
      {!extended && <User {...props.author} small/>}   
        <Stack direction={'column'}>
          <TweetHeader {...props} />
          <TweetContent extended={extended}>
            {props.content}
          </TweetContent>
        </Stack>
      </Stack>
      {!!props.files.length && <TweetGallery {...props}/>}
      {extended && 
          <p>
            {props.date}
          </p>}
      <TweetToolbar {...props}/>
    </TweetContainer>
  )
}

export default Tweet