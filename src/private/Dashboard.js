import React, { useEffect } from "react";
import Feed from "../shared/Feed"
import {useSelector} from "react-redux"
import Topbar from "../shared/Topbar";

const Dashboard = (props) => {
  const {_id} = useSelector(state => state.user.user)
  // useEffect(() => {
  //   console.log("MOUNTED")
  //   return () => {
  //     console.log("UNMOUNTED")
  //   };
  // }, []);
  return (
    <>
    <Topbar title={"Feed"}/>
    <Feed _id={_id} home />
    </>
  );
};

export default Dashboard;
