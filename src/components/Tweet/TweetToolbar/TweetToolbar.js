import React from 'react'
import { Divider, Dropdown, Icon } from 'rsuite';
import { Stack } from '../../../shared/styles';
import { ToolbarContainer, ToolbarButton } from '../tweet.styles';

const TweetToolbar = (props) => {
  return (
    <>
      {props.extended && 
      <>
        <Divider/>
          <Stack >
            Retweet Likes
          </Stack>
        <Divider/>
      </>
    }
      <ToolbarContainer big={props.big} onClick={(e) => e.stopPropagation()}>
        <div>
          <ToolbarButton
            icon={<Icon icon="comment-o" size="3x" />}
            appearance="subtle"
            // onClick={() => redirect("comment")}
            circle
            type={"blue"}
            size="lg"
          />
          {/* <b>{comments && comments.length}</b> */}
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
            {/* <Dropdown.Item icon={<Icon icon="retweet" />} >
              {" "}
              {undo ? "Undo retweet" : "Retweet"}
            </Dropdown.Item>
            <Dropdown.Item icon={<Icon icon="edit2" />}>
              {" "}
              Quote Tweet
            </Dropdown.Item> */}
          </Dropdown>
          {/* <b>{rq}</b> */}
        </div>
        <div>
          <ToolbarButton
            icon={<Icon icon="heart-o" />}
            appearance="subtle"
            // onClick={() => redirect("like")}
            circle
            type={"red"}
            size="lg"
          />
          {/* <b>{likes && likes.quantity}</b> */}
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