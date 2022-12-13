import styled from 'styled-components'

export const QuotedRetweetContainer = styled.div`
  max-width: 500px;
  border: 1px solid lightgray;
  width: 100%;
  border-radius: 5px;
  margin:10px auto;
  padding: 10px 5px;
  cursor: ${props => props.extended ? 'pointer' : 'default'};
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

