import React from 'react'
import { Stack } from '../../../shared/styles'
import User from '../../../shared/User'
import { Title } from '../../Tweet/tweet.styles'
import { HeaderContainer } from '../quotedTweet.styles'

const QuotedRetweetHeader = (props) => {
  const {username,fullname,profilePic} = props.author
  return (
    <HeaderContainer>
        <Stack>
          <User small username={username} profilePic={profilePic}/>
          <Stack direction={"column"}>
          <Title>
            {fullname}
          </Title>
          @{username}
          </Stack>
          
        </Stack>
        </HeaderContainer>
  )
}

export default QuotedRetweetHeader