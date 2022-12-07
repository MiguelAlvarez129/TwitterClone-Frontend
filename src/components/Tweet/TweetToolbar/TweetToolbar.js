import React from 'react'
import { useHistory } from 'react-router-dom';
import { Divider, Dropdown, Icon } from 'rsuite';
import LikeButton from '../../../shared/LikeButton';
import { Stack } from '../../../shared/styles';
import { ToolbarContainer, ToolbarButton, ToolbarCounter } from '../tweet.styles';

const TweetToolbar = (props) => {
  const {comments} = props;
  const history = useHistory();

  const addComment = (e) =>{
    e.stopPropagation();
    history.push({
      pathname:'/compose/tweet',
      state:{
        reply: props, 
        background: history.location, 
      }
    })
  }
  return (
    <>
      {props.extended && 
      <>
        <Divider/>
          <Stack >
            Retweet Likes {props.likes.length}
          </Stack>
        <Divider/>
      </>
      }
      <ToolbarContainer>
        <div>
          <ToolbarButton
            icon={<Icon icon="comment-o" size="3x" />}
            appearance="subtle"
            onClick={addComment}
            circle
            type={"blue"}
            size="lg"
          />
         <ToolbarCounter type={"blue"}>
          {comments}
          </ToolbarCounter>
        </div>
        <div>
          <Dropdown
            placement="leftStart"
            icon={<Icon icon="retweet" />}
            renderTitle={() => {
              return (
                <div>
                  <ToolbarButton
                    appearance="subtle"
                    icon={<Icon icon="retweet" />}
                    size="lg"
                    type={"green"}
                    circle
                  />
                </div>
              );
            }}
            noCaret
          >
            <Dropdown.Item icon={<Icon icon="retweet" />} >
              {" "}
              Retweet
            </Dropdown.Item>
            <Dropdown.Item icon={<Icon icon="edit2" />}>
              {" "}
              Quote Tweet
            </Dropdown.Item>
          </Dropdown>
          {/* <b>{rq}</b> */}
        </div>
        <div>
          <LikeButton {...props} />
        </div>
        <ToolbarButton
          icon={<Icon icon="share" />}
          appearance="subtle"
          type={"blue"}
          circle
          size="lg"
        />
    </ToolbarContainer>
    </>
  )
}

export default TweetToolbar