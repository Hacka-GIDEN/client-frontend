import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BotArea from "../../components/BotArea/BotArea";
import InfoArea from "../../components/InfoArea/InfoArea";
import gidbotPic from "../../assets/img/gidbot.png";
import styles from "./MainContent.module.css";

const MainContent = (props) => {
  return (
    <Container className={styles.Container}>
      <Row>
        <Col className={styles.Header}>
          <img src={gidbotPic} className={styles.HeaderPic} alt="Gidbot Logo" />
          <h2 className={styles.HeaderLogo}>GidBot</h2>
        </Col>
      </Row>
      <Row noGutters>
        <Col xs={8} className={styles.MainContentArea}>
          <BotArea />
        </Col>
        <Col className={styles.MainContentArea}>
          <InfoArea />
        </Col>
      </Row>
    </Container>
  );
};

export default MainContent;
