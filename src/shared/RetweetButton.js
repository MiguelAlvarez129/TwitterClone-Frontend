import React, {useState,useEffect} from 'react'
import { toast } from 'react-toastify';
import { Dropdown, Icon } from 'rsuite';
import { useAuth } from '../hooks/useAuth';
import { useAxios } from '../hooks/useAxios';
import { ToolbarButton } from './styles';
import { ToolbarCounter } from '../components/Tweet/tweet.styles';

const RetweetButton = ({_id,...props}) => {
  const [retweets,setRetweets] = useState(props.retweets);
  const {user:{id}} = useAuth();
  const {error,response,loading,sendReq} = useAxios({url:'/app/add-retweet',method:'PATCH',})

  const sendRetweet = (e) =>{
    e.stopPropagation();
    sendReq({_id})
  }

  useEffect(()=>{
    if (!loading && response){
      setRetweets(response.data)
      toast.success('Retweet added successfully!')
    } 

    if (!loading && error){
      console.log(error)
      toast.error('An error ocurred while adding the retweet')
    }
  },[response,error,loading])

 
  return (
    <>
    <Dropdown
    placement="leftStart"
    icon={<Icon icon="retweet" />}
    onClick={e => e.stopPropagation()}
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
    <Dropdown.Item icon={<Icon icon="retweet" />} onClick={sendRetweet} >
      {" "}
      Retweet
    </Dropdown.Item>
    <Dropdown.Item icon={<Icon icon="edit2"/>}>
      {" "}
      Quote Tweet
    </Dropdown.Item>
  </Dropdown>
  <ToolbarCounter  type={"red"} >
    {/* {retweets.length} */}
    </ToolbarCounter>
    </>
  )
}

export default RetweetButton