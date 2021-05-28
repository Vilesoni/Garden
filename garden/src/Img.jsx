import React from "react";

const Img = (props) => {
  return (
    <div>
      <img src={`/images/${props.file}`} />
    </div>
  );
};

export default Img;
