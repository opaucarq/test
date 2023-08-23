import React from "react";

const Card = ({ data }) => {
  return (
    <div
      style={{ border: "1px solid black", margin: "10px", padding: "0 5px" }}
    >
      <h3>{data.title}</h3>
      <h6>{data.description}</h6>
      <p>{data.price}</p>
    </div>
  );
};

export default Card;
