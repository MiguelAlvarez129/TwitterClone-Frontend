import React from 'react'
import { useHistory } from 'react-router-dom'
import { Stack } from '../../shared/styles'
import { TweetContent } from '../Tweet/tweet.styles'
import QuotedRetweetHeader from './QuotedRetweetHeader/QuotedRetweetHeader'
import { QuotedRetweetContainer } from './quotedTweet.styles'

const QuotedRetweet = (props) => {
  const {author:{username},_id,extended} = props;
  const history = useHistory()
  const redirect = () =>{
    extended && history.push(`/${username}/${_id}`)
  }
  return (
    <QuotedRetweetContainer onClick={redirect} extended>
       <Stack direction={'column'} >
          <QuotedRetweetHeader {...props} extended /> 
          <TweetContent>
            {props.content}
          </TweetContent>
        </Stack>
    </QuotedRetweetContainer>
  )
}

export default QuotedRetweet