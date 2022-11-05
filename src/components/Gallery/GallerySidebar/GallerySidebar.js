import React from 'react'
import { Loader } from 'rsuite'
import Tweet from '../../Tweet/Tweet'
import { GallerySidebarContainer } from '../gallery.styles'

const GallerySidebar = (props) => {

  return (
    <GallerySidebarContainer>
      {!props.loading && props.author && <Tweet {...props} files extended />}
      {props.loading && <Loader size="md" center/>}
    </GallerySidebarContainer>
  )
}

export default GallerySidebar