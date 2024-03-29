import React from 'react'
import { Link } from 'react-router-dom';
import { Stack } from '../../../shared/styles';
import User from '../../../shared/User';
import { HeaderContainer, Title } from '../tweet.styles'

const TweetHeader = (props) => {
 const {username,fullname,profilePic} = props.author
  return (
      <Link to={`/${username}`} onClick={e => e.stopPropagation()} style={{textDecoration:'none'}}>
        <HeaderContainer>
          {props.extended ? 
        <Stack>
          <User small username={username} profilePic={profilePic}/>
          <Stack direction={"column"}>
          <Title>
            {fullname}
          </Title>
          @{username}
          </Stack>
        </Stack>
        :
        <>
          <Title>
            {fullname}
          </Title>
          <p>
            @{username}
            {' '}
            ·
            {' '}
            {props.date}
          </p>
        </>
        }
        </HeaderContainer>
      </Link>
  )
}

export default TweetHeader