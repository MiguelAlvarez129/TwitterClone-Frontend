import React from 'react'
import { Stack } from '../../../shared/styles'

const UserProfileContent = (props) => {
  const {fullname,username,bio} = props;
  return (
    <Stack direction={'column'} style={{padding:'20px',borderBottom:'1px solid lightgray'}}>
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