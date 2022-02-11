import React from "react";
import { Loader } from "rsuite";
import { usePromiseTracker } from "react-promise-tracker";
import { WhiteBackground, CustomLoader } from "../shared/styles";
import { FeedLoader } from "../shared/styles";
const Loading = (props) => {
  const { promiseInProgress } = usePromiseTracker({ area: props.area});
  const {fullWidth} = props
  return (
    promiseInProgress &&
    (props.area == "feed"? (
      <FeedLoader size="md" />
    ) : props.area === "images" ? (
      <Loader center size="md" backdrop />
    ): (
    <WhiteBackground fullWidth={fullWidth}>
        <Loader center size="md"  />
      </WhiteBackground>)
    )
  );
};

export default Loading;
