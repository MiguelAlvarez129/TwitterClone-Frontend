import styled from "styled-components";

export const Bg = styled.div`
    background: lightcoral;
    width: 100%;
    height: 200px;
    margin-bottom: ${props=> props.bottom ? "-100px" : " "};
    background: lightgray;
    height: 200px;
    background-image:${props => props.image && `url(${props.image})` };
    background-size:cover;
    background-repeat:no-repeat;
    background-position:center;
` 