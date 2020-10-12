import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import financeThumbnail from "../../assets/img/course-financas.png";
import anticipationThumbnail from "../../assets/img/course-antecipacao.png";
import marketingThumbnail from "../../assets/img/course-marketing.jpg";
import funnelThumbnail from "../../assets/img/course-funil.png";

const EXAMPLE_COURSES = [
  {
    title: "Finanças - Controle e pagamento de tributos",
    url: "https://sebraers.com.br/solucao-digital-detalhe/?idsolucao=7349",
    thumbnail: financeThumbnail,
  },
  {
    title: "Antecipação de valores",
    url: "https://sebraers.com.br/solucao-digital-detalhe/?idsolucao=7426",
    thumbnail: anticipationThumbnail,
  },
  {
    title: "Planejamento de Marketing",
    url:
      "https://sebraers.com.br/curso-online-detalhado/?idagenda=149058&nome_agenda=Planejamento%20de%20Marketing&id_produto_ws=6197",
    thumbnail: marketingThumbnail,
  },
  {
    title: "As 5 etapas fundamentais do funil de vendas",
    url: "https://sebraers.com.br/solucao-digital-detalhe/?idsolucao=7470",
    thumbnail: funnelThumbnail,
  },
];

const CoursesModal = (props) => {
  if (!props.user) {
    return <div></div>;
  }

  return (
    <Modal centered size="lg" show={props.show} onHide={props.onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Seus cursos recomendados</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          <strong className="text-success">
            Parabéns, {props.user.firstName}!
          </strong>{" "}
          Você concluiu a sessão de perfilamento do GidBot com um resultado
          final de <strong>{props.user.score} pontos!</strong>
        </p>
        <p>
          Como próxima etapa, agora você deve realizar os seguintes cursos
          recomendados junto ao SEBRAE:
        </p>
        <Container className="my-5">
          <Row>
            {EXAMPLE_COURSES.map((course) => (
              <Col key={course.title} className="text-center">
                <div>
                  <a
                    href={course.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      width="100%"
                    />
                  </a>
                </div>
                <a href={course.url} target="_blank" rel="noopener noreferrer">
                  {course.title}
                </a>
              </Col>
            ))}
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="success"
          onClick={() => {
            window.alert(
              "A funcionalidade de cadastro ainda não foi implementada. Estamos trabalhando duro para finalizá-la o quanto antes.\n\nA ideia aqui é cadastrar o usuário na plataforma para que possamos acompanhar seu progresso nos cursos recomendados e, dessa forma, repassar essa informação às instituições financeiras."
            );
            props.onHide();
          }}
        >
          Seguir para cadastro
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CoursesModal;
