import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import homeHeroImg from "../../assets/img/home-hero-img-04.png";
import values1Pic from "../../assets/img/values-1-01.png";
import values2Pic from "../../assets/img/values-2-02.png";
import values3Pic from "../../assets/img/values-3-03.png";
import styles from "./Home.module.css";

const Home = (props) => {
  return (
    <Fragment>
      <div className={styles.TopBar}>
        <Container className="p-0">
          <h3 className={styles.TopBarLogo}>giden.</h3>
        </Container>
      </div>
      <div className={styles.LinksBar}>
        <Container className="d-flex justify-content-end py-2 px-5">
          <Link to="/" className="mr-4 text-light">
            Início
          </Link>
          <Link to="/bot" className="mr-4 text-light">
            GidBot
          </Link>
        </Container>
      </div>
      <div className={styles.Page}>
        <div className={styles.Hero}>
          <div className={styles.HeroContent}>
            <Container className="p-0" style={{ height: "100%" }}>
              <Row className="align-items-center" style={{ height: "100%" }}>
                <Col className="d-flex flex-column justify-content-center">
                  <h2 style={{ color: "#ddae43" }}>
                    Precisa de crédito para realizar o seu sonho de empreender?
                  </h2>
                  <h4 className="text-light">Nós podemos te ajudar!</h4>
                  <p className="text-light pt-3">
                    A <strong>giden.</strong> não só te apoia no teu sonho, como
                    também te guia até alcançá-lo, te identifica como o
                    empreendedor único que você é.
                  </p>
                  <p className="text-light">Sabe o que é melhor?!</p>
                  <p className="text-light mb-0">
                    Ainda te indicamos, o que é fundamental para gerir o teu
                    negócio, com os melhores parceiros de Ensino.
                  </p>
                </Col>
                <Col className="text-center">
                  <img src={homeHeroImg} alt="Home hero img" width="50%" />
                </Col>
              </Row>
            </Container>
          </div>
        </div>
        <div className={styles.Features}>
          <div className="d-flex h-100 flex-column align-items-center justify-content-between py-5">
            <h2>Nossos valores</h2>
            <Container>
              <Row>
                <Col className="text-center">
                  <h5>SIMPLES</h5>
                  <p>
                    Desenvolvemos uma plataforma para tornar acessível sua busca
                    por crédito
                  </p>
                </Col>
                <Col className="text-center">
                  <h5>PRECISO</h5>
                  <p>
                    Entregamos uma análise personalizada, com base nas
                    informações que nos foram fornecidas
                  </p>
                </Col>
                <Col className="text-center">
                  <h5>TRANSPARENTE</h5>
                  <p>
                    Taxas de juros adequadas para cada estágio da sua jornada
                    empreendedora
                  </p>
                </Col>
              </Row>
              <Row>
                <Col className="text-center">
                  <img src={values1Pic} alt="Values 1 pic" width="70%" />
                </Col>
                <Col className="text-center">
                  <img src={values2Pic} alt="Values 2 pic" width="70%" />
                </Col>
                <Col className="text-center">
                  <img src={values3Pic} alt="Values 3 pic" width="70%" />
                </Col>
              </Row>
            </Container>
          </div>
        </div>
        <div
          className="text-center py-5 text-light"
          style={{ backgroundColor: "#1d3557" }}
        >
          <h1 className="display-4">GidBot</h1>
          <p className="mb-5">
            O GidBot te auxilia no preenchimento das informações necessárias
            para criação do seu perfil de crédito.
          </p>
          <Link to="/bot">
            <Button size="lg" variant="success" className="rounded-pill">
              Conheça o GidBot
            </Button>
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
