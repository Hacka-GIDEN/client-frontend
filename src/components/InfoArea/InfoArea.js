import React from "react";
import UserInfo from "../UserInfo/UserInfo";
import CompanyInfo from "../CompanyInfo/CompanyInfo";
import ScoreInfo from "../ScoreInfo/ScoreInfo";
import styles from "./InfoArea.module.css";

const InfoArea = (props) => {
  return (
    <div className={styles.InfoArea}>
      <UserInfo />
      <CompanyInfo />
      <ScoreInfo />
    </div>
  );
};

export default InfoArea;
