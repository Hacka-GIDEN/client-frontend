import React from "react";
import styles from "./InfoSubArea.module.css";

const InfoSubArea = (props) => {
  return (
    <div className={styles.SubAreaContainer}>
      <h4 className={styles.SubAreaHeader}>{props.title}</h4>
      <div className={styles.SubAreaContent}>{props.children}</div>
    </div>
  );
};

export default InfoSubArea;
