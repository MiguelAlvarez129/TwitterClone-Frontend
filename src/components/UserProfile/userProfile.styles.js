import { Row } from 'rsuite'
import styled from 'styled-components'

export const UserProfileContainer = styled.div`
  position: relative;
`
export const BackgroundImage = styled.div`
    width: 100%;
    background: lightgray;
    height: 200px;
    background-image:${props => props.image && `url(${props.image})` };
    background-size:cover;
    background-repeat:no-repeat;
    background-position:inherit;
    margin-bottom: -100px;
` 
export const ProfileContainer = styled.div`
  display:flex;
  padding:20px;
  justify-content:space-between;
  width: 100%;
  align-items: end;
` 