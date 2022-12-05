import { Icon, IconButton } from "rsuite"
import styled from "styled-components"

export const WrapperEditor = styled.div`
  display: block;
  margin: 0px auto; 
  max-width: 500px;
  width:auto;
  transition: border-color 0.5s;
`
export const Toolbar = styled.div`
  align-items:center;
  padding: 5px 0px;
  border: none;
  display:flex;
  justify-content:space-between;
  max-width:500px;
  border-top:#EEE 1px solid;
  width:100%;
`
export const Image = styled.div`
  background-color: lightgray;
  background-image: ${props => `url(${props.image})`};
  background-size: cover;
  background-position: center;
  height:auto;
  width:100%;
  border-radius:10px;
  position:relative;
  display:flex;
  alignItems:center;
  &:nth-child(3) {
    background-position: center;
  }
`
export const ReplyDiv = styled.div`
    background: white;
    max-width: 600px;
    width:100%;
    padding: 20px 20px 10px;
    border-radius: 14px;
    @media (max-width:600px){
        height:100%;
    }
`

