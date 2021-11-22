import React, { useEffect, useState, useContext } from "react";
import Loading from "../shared/Loading";
import axios from "axios";
import User from "../shared/User";
import Feed from "../shared/Feed"
import { CenterWrapper } from "../shared/styles";
import {useSelector} from "react-redux"
import Topbar from "../shared/Topbar";

const Dashboard = (props) => {
  const {_id} = useSelector(state => state.user.user)
  const { loading, setLoading, history, setAuth } = props;
  return (
    <>
    <Topbar title={"Feed"}/>
    <Feed _id={_id} home />
    </>
  );
};

export default Dashboard;
