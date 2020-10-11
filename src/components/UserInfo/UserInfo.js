import React from "react";
import { useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import InfoSubArea from "../InfoSubArea/InfoSubArea";
import styles from "./UserInfo.module.css";

const UserInfo = (props) => {
  const user = useSelector((state) => state.user);

  if (user) {
    return (
      <InfoSubArea title="Você">
        <div className={styles.UserInfo}>
          <FaUserCircle className={styles.UserIcon} />
          {user.fullName}
        </div>
      </InfoSubArea>
    );
  }
  return <div></div>;
};

export default UserInfo;
