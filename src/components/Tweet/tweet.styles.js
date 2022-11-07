import { IconButton } from 'rsuite'
import styled, { css , keyframes }  from 'styled-components'

export const TweetContainer = styled.div`
transition: background 0.25s;
cursor: ${props => !props.extended && !props.reply ? "pointer" : "default"};
${props => !props.reply  && "border-bottom:1px solid lightgray;"}
${props => !props.reply ? "padding: 10px;" : "padding-bottom:20px;"}

  &:hover{
    ${props => !props.extended && !props.reply && "background: #f0f0f0;" }
  }
`
export const TweetHeader = styled.div`
    align-items:baseline;
    color: black;
    font-family: Helvetica;
    font-size: 15px;
    display: flex;
    justify-content:flex-start;
    align-items:center;
`


export const TweetContent = styled.p`
    padding:10px 5px;
    font-family: "Helvetica";
    font-size: 16px;
    word-break:break-all;
    ${props => props.extended && `
    font-family: Helvetica;
    font-weight:normal;
    color:black;
    font-size: 22px;
    line-height: 34px;
    `}
    & > h4 {
        font-family: "Helvetica";
        font-weight:normal;
        color:black;
    }
`

const getColor = (type) =>{
  switch(type){
      case "blue":
          return "color:dodgerblue;background:#aee5ff75;";
      case "green":
          return "color:#06b306;background:#b0ffb070;"
      case "red":
          return "color:#ff6154;background:#ffb8b37a;"
  }
}
export const ToolbarButton = styled(IconButton)`

  ${props => props.selected && getColor(props.type).split(';')[0]};
  &:active,&:focus,&:active:focus{
    ${props => props.selected && getColor(props.type).split(';')[0]};
  }
  &:hover { 
      ${({ type }) =>getColor(type)}
      & + p {
        ${({ type }) => getColor(type).split(';')[0]}
      }
  }
  
`
export const ToolbarContainer = styled.div`
    display:flex;
    // justify-content:${props => props.big ? "space-around" : "space-between"};
    justify-content: space-around;
    & > div > b {
        display:${props => props.big && 'none'}
    }
`

export const ToolbarCounter = styled.p`
    display:inline;
    font-weight:bold;
    transition: color .5s;
    ${props => props.selected && getColor(props.type).split(';')[0]};
`

export const HeaderContainer = styled.div`
  color: black;
  font-family: Helvetica;
  font-size: 15px;
  display: flex;
  justify-content:flex-start;
  align-items:baseline;

  p {
    color: #646464;
    padding-left:5px;
  }
`

export const Title = styled.div`
  line-height: normal;
  color: black;
  font-family: apple-system;
  font-weight: 700;
  font-style:normal;
  font-size: 16px;
  display:inline;
  & > p{
    font-weight:normal
  }
`