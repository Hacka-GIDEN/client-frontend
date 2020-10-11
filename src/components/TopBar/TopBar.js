import React from "react";
import Container from "react-bootstrap/Container";
import styles from "./TopBar.module.css";

const TopBar = (props) => {
  return (
    <div className={styles.TopBar}>
      <Container className="p-0">
        <h3 className={styles.TopBarLogo}>giden.</h3>
      </Container>
    </div>
  );
};

export default TopBar;
