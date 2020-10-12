import React from "react";
import { useSelector } from "react-redux";
import InfoSubArea from "../InfoSubArea/InfoSubArea";

const ScoreInfo = (props) => {
  const user = useSelector((state) => state.user);

  if (user && user.score) {
    return (
      <InfoSubArea title="Pontuação">
        <strong>Sua pontuação:</strong> {user.score}
      </InfoSubArea>
    );
  }
  return <div></div>;
};

export default ScoreInfo;
