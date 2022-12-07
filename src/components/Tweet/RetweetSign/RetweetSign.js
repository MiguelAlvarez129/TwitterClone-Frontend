import React from 'react'
import { Icon } from 'rsuite';
import { useAuth } from '../../../hooks/useAuth';

const RetweetSign = (props) => {
  const {username} = props;
  const {user:{username:currentUser}} = useAuth()

  return (
    <div style={{fontWeight:'bold'}}>
      <Icon icon="retweet" />
      {' '}
      {username === currentUser ? 'You Retweeted' : `@${username} retweeted`}
    </div>
  )
}

export default RetweetSign