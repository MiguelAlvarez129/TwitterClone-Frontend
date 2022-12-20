import React, {useState,useEffect} from 'react'
import { toast } from 'react-toastify';
import { Dropdown, Icon } from 'rsuite';
import { useAuth } from '../hooks/useAuth';
import { useAxios } from '../hooks/useAxios';
import { ToolbarButton } from './styles';
import { ToolbarCounter } from '../components/Tweet/tweet.styles';
import { useHistory } from 'react-router-dom';

const RetweetButton = ({_id,...props}) => {
  const history = useHistory();
  const [retweets,setRetweets] = useState(props.retweets);
  const [retweeted,setRetweeted] = useState(false)
  const {user:{id}} = useAuth();
  const config = {
    url:retweeted ? '/app/remove-retweet' : '/app/add-retweet',
    method: retweeted ? 'DELETE' : 'POST',
    invalidateKey:'feed'
  }
  const {error,response,loading,sendReq} = useAxios(config)

  useEffect(() => {
    const found = props.retweets.find((e) => e.author === id)
    setRetweeted(found ? true : false)
  },[props.retweets])

  const sendRetweet = (e) =>{
    e.stopPropagation();
    console.log(retweeted)
    sendReq({_id})
  }

  const quotedRetweet = (e) =>{
    e.stopPropagation()
    history.push({
      pathname:'compose/tweet',
      state:{
        quotedRetweet:{...props,retweetAuthor:null},
        background: history.location, 
      }
    })
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
      {retweeted ? 'Undo Retweet' : 'Retweet'}
    </Dropdown.Item>
    <Dropdown.Item icon={<Icon icon="edit2"/>} onClick={quotedRetweet}>
      {" "}
      Quote Tweet
    </Dropdown.Item>
  </Dropdown>
    <ToolbarCounter  type={"green"} >
    {retweets.length}
    </ToolbarCounter>
    </>
  )
}

export default RetweetButton