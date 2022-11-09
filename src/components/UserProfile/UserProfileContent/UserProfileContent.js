import React from 'react'
import { Stack } from '../../../shared/styles'

const UserProfileContent = (props) => {
  const {fullname,username,bio} = props;
  return (
    <Stack direction={'column'} style={{padding:'0 20px'}}>
      <h4>
        {fullname}
      </h4>
      <p>
      @{username}
      </p>
      <p>
        {bio}
      </p>
    </Stack>
  )
}

export default UserProfileContent