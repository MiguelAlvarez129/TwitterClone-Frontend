import styled, { css , keyframes }  from 'styled-components'
import background from "../images/background1.png"
import newLogo from "../images/logo.png"
import { Divider, Grid, Row, Badge, IconButton, Loader} from "rsuite"
import feather from "../images/feather-64.png"
export const Card = styled.div`
    width:100%;
    border: gray solid 1px;
    border-radius:2px;
    height:auto;
    box-shadow:  0 4px 5px 0 rgba(0,0,0,0.14), 0 1px 10px 0 rgba(0,0,0,0.12), 0 2px 4px -1px rgba(0,0,0,0.3);
    padding:25px;
    text-align: center;
    font-family: --apple-system, BlinkMacSystemFont,
     'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 
     'Open Sans', 'Helvetica Neue', sans-serif;
    background: white;
    
`

export const Button = styled.button`
    
    height: 50px;
    background:#ff4d4f;
    box-shadow: 0px 6px 11px -4px rgba(0,0,0,0.54);
    padding: 6.4px 15px;
    color:white;
    font-size:20px;
    font-weight:bold;
    letter-spacing:1px;
    text-align:center;
    transition: box-shadow 0.5s;
    border-radius:${props => props.circle ? '50%' : '3px'};
    border: none;
    width:100%;
    
    &:hover{
        box-shadow:0px 11px 11px -4px rgba(0,0,0,0.54);
        cursor: pointer;
    }

    &:focus{
        background:#ff4d4f;
        
    }

    &:active{
        background:#ff4d4f;
        box-shadow: 0px 3px 11px -4px rgba(0,0,0,0.54);
    }
    
`

export const Sidemenu = styled.div`
     @media (max-width:1000px){
        width:70px;
        padding: 0px;
        align-items: center;
        ${props=> props.right && `display:none;`}
    }
    position:sticky;
    top:0;
    z-index:50;
    display:flex;
    flex-direction:column;
    align-items:flex-start;
    background: ${props=> props.dark ? '#434343' : 'white'};
    width:${props=> props.right ?  "400px" : "314px" };
    height:100vh;
    margin-bottom:0px;
    ${props=> props.right ? "border-left: 1px solid lightgray" : "border-right: 1px solid lightgray" };
    ${props=> props.right && `padding:10px 20px;`}
`



export const TweetButton = styled.button`
    ${props => props.top && "margin-top:120px"};
    color: ${props => props.inverted ? "dodgerblue" : "white"};
    font-family: Helvetica Neue, Arial;
    font-size: ${props => props.small? "14px" : "20px"};
    font-weight: bold;
    background: ${props => props.inverted ? "white" : "dodgerblue"};
    width: 80%;
    border:${props => props.inverted && "dodgerblue 1px solid"};
    padding: 10px 20px;
    border-radius: 30px;
    transition: background-color 0.5s;
    outline:none;
    ${props => props.disabled && "opacity:0.7;"}

    &[disabled]{
    cursor:default;
    }
    &:hover{
    background-color: ${props => props.disabled ? "" : props.inverted ? "rgb(233, 244, 255)": "rgb(0, 108, 196)" } ;
    }
    
    ${props => props.responsive && ` @media (max-width:1000px){
        width: 50px;
        height: 50px;
        background-image: url(${feather});
        background-size: 30px;
        background-position: 10px;
        background-repeat: no-repeat;
        color:transparent;
        
    }`}
    
`
export const Sideoption = styled.div`
    margin: 4px 0px;
    color: ${props => props.selected ? "dodgerblue" : "black"};
    font-family: Helvetica Neue, Arial;
    font-size: 20px;
    font-weight: bold;
    padding: ${props => props.flex ? "10px" : "10px 20px" };
    border-radius: 30px;
    transition: background 0.2s, color 0.2s;
    text-decoration:none;
    ${props => props.flex ? `display: flex;
    align-items: center;
    justify-content: space-between;` : " "}
    &::after{
        content:${props => props.text };
        margin:10px;
    }
    & p{
        font-size:14px;
        font-weight:normal;
    }
    @media (max-width:1000px){
        &::after{
        content: '';
        margin: 0px;
    }
        padding: 5px;

    }

    &:focus{
        color:dodgerblue
    }
    &:hover{
    background: rgba(30, 144, 255,0.1);
    color:dodgerblue;
    }

    ${props => props.width && `
    width:60%;` }
`
export const ResponsiveMenu = styled.div`
 

     @media (max-width:600px){
        display:${props => props.xsHidden && 'none'};
    }

    @media (min-width:600px){
        display:${props => props.mdHidden && 'none'};
    }

` 

export const BarTitle = styled.h1`
    
    width:150px;
    font-size:28px;
    text-align:center;
    background: -webkit-linear-gradient(125deg, rgba(255,136,0,1) 0%, rgba(255,77,155,1) 55%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing:1px;
    font-style:italic;
    font-weight:600;
    font-family:'IBM Plex Serif', serif;

    &:active{
        background: -webkit-linear-gradient(125deg, rgba(255,136,0,0.7) 0%, rgba(255,77,155,0.7) 55%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    
`

export const Content = styled.div`
    width:100%;
    
`

export const Layout = styled.div`
    width:100%;
    height:auto;
`
export const Input = styled.input`
    width: ${props => props.fluid ? '100%' : 'auto'};
    padding: 9px 10px;
    border-radius: 3px;
    transition: border-color 0.5s;
    border-color: ${props => props.error ? 'red' : 'lightgray'};
    margin:10px 0px;
    border: solid lightgray 1.5px;
    

    &:focus{
        border: solid ${props => props.error ? 'red' : 'dodgerblue'} 1.5px ;
        outline:none; 
    }

    &:hover{
        border: solid ${props => props.error ? 'red' : 'dodgerblue'} 1.5px ;
        
    }
`
export const Bubble = styled.div`
    position: relative;
    background: #0a9dff;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px; 
    width: 350px; 
    height: 150px;
    padding:10px 15px;
    color:white;
    font-weight:600;
    margin:10px auto;
    &::before{
        content: "";
        position: absolute;
        top: 150px;
        left:160px;
        z-index: 1;
        border: solid 15px transparent;
        border-top-color: #0a9dff;
    }
`

export const CircularFrame = styled.button`
    background-color:transparent;
    background:lightgray;
    border: ${props => props.small ? "" : '5px solid white' };
    flex: ${props => props.small ? 'none' : " " } ;
    cursor:pointer;
    display:flex;
    justify-content:center;;
    align-items: center;
    margin:0 5px;
    /* border:0.5px solid #03fcb5 ; */
    border-radius:50% ;
    height: ${props => props.small ? '45px' : props.medium ? '75px' : '150px' };
    width: ${props => props.small ? '45px' : props.medium ? '75px' : '150px' };;
    line-height: inherit;
    box-sizing: border-box;
    text-indent: 0px;
    overflow:hidden;
    & > .overlay{
        transition: background 0.5s;
        position: absolute;
        height: 150px;
        width: 150px;
        border-radius: 50%;
        background: transparent;
    }
    
    &:hover > .overlay{
        background: #57575761;
    }

    @media (max-width:600px){
        height:${props => props.hidden && '100px'};
        width:${props => props.hidden && '100px'};
    }
    
`
export const ProfileResponsive = styled.img`
    max-height: ${props => props.maxHeight  + 'px' };

    @media (max-width:600px){
        height: 100px;
        width: 100px;
        max-height:100px;
    }
`


export const Wrapper = styled.div`
    width:auto;
    max-width:150px;
    display:flex;
    justify-content:flex-start;
    align-items:center;

`
export const Fullname = styled.h4`
    line-height: normal;
    color: black;
    font-family: apple-system;
    font-weight: 700;
    font-style:normal;
    font-size: ${props => props.small && '16px'};
    display:inline;

    @media (max-width:1000px){
        display:${props => props.hidden && 'none'};
    }
`
export const WrapperEditor = styled.div`
    display: block;
    margin: 0px auto;
    max-width: 500px;
    width:auto;
    transition: border-color 0.5s;
    
`
export const TextArea= styled.textarea`
    transition: border-color 0.5s;
    resize:none;
    max-width:500px;
    width:100% !important;
    min-height:150px;
    font-family:helvetica;
    font-size:${props => props.fontSmall ? "14px" : "20px"};
    border: none;
    border-color: lightgray;
    padding:5px 10px !important;
    margin: 0 auto;
    display:block;
    border-bottom:none; 
    border-radius: 6px;
    ${props => props.border && `
    border: solid lightgray 1.5px;

    `}
    &:focus{
        ${props => props.border ? 'border:solid dodgerblue 1.5px' : "none"} 
        outline:none; 
      
    }
    &:focus-visible{
        outline:none !important;
    }
    &:hover{
        ${props => props.border ? 'border:solid dodgerblue 1.5px' : "none"}

    }
    
`

export const Toolbar = styled.div`
    align-items:center;
    margin: 0 auto;
    padding: 5px 0px;
    border: none;
    display:flex;
    justify-content:space-between;
    max-width:500px;
    border-top:#EEE 1px solid;

`

export const ImageContainer = styled.div`
    cursor:pointer;
    margin-bottom:16px;
    display: grid;
    border-radius: 20px;
    overflow:hidden;
    grid-template-columns: ${props => props.images.length > 1 ? `50% 50%` : `100%`};
    ${props => props.images.length > 3 ? 
    `grid-template-rows: 50% 50%;
    & > div:nth-child(n+5){
        display:none;
    }
    `
    :
    `grid-auto-rows: auto auto; 
    
    & > div:nth-child(3){
        grid-column-start: 1;
        grid-column-end: 2;
        grid-row-start: 1;
        grid-row-end: 3;
        height:400px;
       
    }
    & > div:nth-child(3) img{
        height: 400px;
    } 
    `
    }
    & > div{
        height:200px;
        border: #848486 solid 1px;
    }
  
`
export const ImageCounter = styled.div`
    display: block;
    height: 20px !important;
    width: 20px;
    text-align: center;
    background: whitesmoke;
    font-weight: bold;
    position: absolute;
    right: 35px;
    bottom: 80px;
    border: 1px solid gray;
    border-radius: 3px;
`
export const Logo = styled.div`
    background-image:url(${newLogo});
    height:75px;
    width:75px;
    background-size:cover;
    background-repeat:no-repeat;
    background-position:center;    
`
export const BackgroundImg = styled.div`
    height:100vh;
    background-image:url(${background});
    background-size:cover;
    background-color:lightskyblue;
    background-repeat:no-repeat;
    background-position:center;    
`
export const PurpleDiv = styled.div`
    float:right;
    height:100%;
    width:400px;
    background:rgba(75, 0, 130, 0.7);
    box-shadow:-8px 10px 13px 1px rgba(20,0,0,0.68);
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;

    @media (max-width:425px){
        width: 100%;
    }
`
export const BackDrop = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 200;
`
export const FlexContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 100%;
    height: 100%;
`
export const GalleryContainer = styled.div`
    display:flex;
    flex-direction:column;
    height: 100%;
    width: 100%;
    position: relative;
    justify-content:flex-end;
`

export const CarouselContainer = styled.div`
    width: auto;
    margin: -30px auto;
    min-width: 10%;
    max-width: 100vh;
    height: 100%;
`

export const BottomToolbar = styled.div`
    width: 50vw;
    margin: 0 auto;
    position: sticky;
    bottom: 0;
    display: flex;
    justify-content: space-around;
`

export const PostPanel = styled.div`
    padding: 10px;
    cursor: ${props => props.hover ? "pointer" : "default"};
    transition: background 0.25s;
    /* ${props => props.big && "border-bottom:1px solid lightgray;"} */
    ${props => props.big ? "border-bottom:1px solid lightgray;" : ""}


    &:hover{
       ${props => props.hover && "background: #f0f0f0;"}
    }


    border-bottom:1px solid lightgray;
   
`

export const PostContent = styled.p`
    padding:10px 5px;
    font-family: "Helvetica";
    font-size: 16px;
    word-break:break-all;
    ${props => props.big && `
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

export const PostHeader = styled.div`
    align-items:baseline;
    color: black;
    font-family: Helvetica;
    font-size: 15px;
    display: flex;
    justify-content:flex-start;
    align-items:center;
`

export const PostDate = styled.p`
    font-size:15px;
    margin-left: 5px;
    color:gray;
`

export const ActionsToolbar = styled.div`
    display:flex;
    justify-content:${props => props.big ? "space-around" : "space-between"};
    margin-right:${props => props.big ? " " : "100px"};
    & > div > b {
        display:${props => props.big && 'none'}
    }

`
export const FlexColumn = styled.div`
    flex:none;
    display:flex;
    flex-direction:column;
    width: auto;
    flex: ${props => props.block && "auto" };
  

`
export const FlexCenter = styled.div`
    display:flex;
    align-items:${props => props.top ? "start" : "center"};
    justify-content:center;
    height:100%;
    width:100%;
    ${props => props.top && "margin-top:30px" };
    
`

export const Connector = styled.div`
    margin: ${props => props.comment ? "2px auto -16px" : "2px auto" };
    width: 2px;
    height: 100%;
    background: #ccc;
    display: ${props => props.last && "none" }
`

export const ReplyDiv = styled.div`
    background: white;
    min-width: 600px;
    width:auto;
    padding: 20px 20px 10px;
    border-radius: 14px;
`
export const Title = styled.h5`
    font-family:helvetica;
    color:black;
    padding-left:20px;
`
export const TopBar = styled.div`
    border-bottom: 1px solid lightgray;
    position: fixed;
    top: 0px;
    display: flex;
    align-items:center;
    height:57px;
    background: white;
    width: 592px; 
    height: 5;
    z-index: 10;
    padding: 10px 0;
`

export const TopWrapper = styled.div`
    height:57px;

`

export const Statistics = styled.div`
    font-family: Helvetica;
    font-size: 15px;

    & > p{
        margin:0 10px;
        display: inline-block;
    }

    & > p:hover{
        text-decoration:underline;
    }
    
`

export const StyledDiv = styled(Divider)`
    margin: 16px 0;
`
export const CustomGrid = styled(Grid)`
    min-height:75vh;
    padding:0;
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
    &:hover{
        ${({ type }) =>getColor(type)}
    }
`

export const WhiteBackground = styled.div`
    z-index:100;
    max-width: ${props => props.width ? props.width + "px" : props.fullWidth ? "none":"592px"  };
    width:100%;
    height: 100%;
    background:white;
    position: fixed;
    top: 0;
    display:block;
    overflow:hidden;
    ${props => props.home && `max-width:none`};
`

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
    background-position:inherit;
` 

export const CustomRow = styled(Row)`
    padding-top:20px;
`

export const newBadge = styled(Badge)`
    left: 10px;
    position: absolute;
`
export const FeedLoader = styled(Loader)`
    align-items: center;
    width: 100%;
    height: 200px;
    display: flex;
    justify-content: center;
`
export const SadFace = styled.div`
    height: 100px;
    width:100px;
    background-color:dodgerblue;

    &:after{
        content:"";
        height:50px;
        width:50px;
        
    }
`

