import React from "react";

const Like = (props) => {
  let classes = "cursor-style heart-color fa fa-heart";
  if (!props.likeStatus) classes += "-o";
  return <i onClick={props.onLikeToggle} className={classes}></i>;
};

export default Like;
