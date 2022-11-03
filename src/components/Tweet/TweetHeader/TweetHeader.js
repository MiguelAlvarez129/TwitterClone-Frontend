import React from 'react'
import { Link } from 'react-router-dom';
import { Fullname, Stack } from '../../../shared/styles';
import User from '../../../shared/User';
import { HeaderContainer, Title } from '../tweet.styles'

const TweetHeader = (props) => {
 const {username,fullname} = props.author
  return (
      <Link to={`/${username}`} onClick={e => e.stopPropagation()} style={{textDecoration:'none'}}>
        <HeaderContainer>
          {props.extended ? 
        <Stack>
          <User small/>
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