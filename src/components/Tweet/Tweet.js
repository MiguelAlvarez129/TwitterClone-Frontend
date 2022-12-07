import React from 'react'
import { TweetContainer, TweetContent } from './tweet.styles'
import { Stack } from '../../shared/styles'
import User from '../../shared/User'
import TweetToolbar from './TweetToolbar/TweetToolbar'
import TweetHeader from './TweetHeader/TweetHeader'
import TweetGallery from './TweetGallery/TweetGallery'
import { Link, useHistory } from 'react-router-dom'
const Tweet = (props) => {
  const history = useHistory();
  const {author:{username},_id,extended, reply} = props;
  const onClick = (e) =>{
    e.stopPropagation()
    !reply && !extended && history.push(`/${username}/${_id}`)
  }
  return ( 
    <TweetContainer onClick={onClick} extended={extended} reply={reply}>
      <Stack> 
      {!extended && 
        <Link to={`/${username}`} onClick={e => e.stopPropagation()} style={{textDecoration:'none'}}>
          <User {...props.author} small  />
        </Link>
          }   
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
      {!reply && <TweetToolbar {...props}/>}
    </TweetContainer>
  )
}

export default Tweet