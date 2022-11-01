import React from "react";
import Feed from "../shared/Feed"
import {useSelector} from "react-redux"
import Topbar from "../shared/Topbar";
import {BottomSpace} from "../shared/styles"

const Dashboard = (props) => {
  const {_id} = useSelector(state => state.user.user)
  return (
    <>
    <Topbar title={"Feed"}/>
    <Feed _id={_id} home />
    <BottomSpace/>
    </>
  );
};

export default Dashboard;
