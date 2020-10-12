import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const AboutModal = (props) => (
  <Modal centered size="lg" show={props.show} onHide={props.onHide}>
    <Modal.Header closeButton>
      <Modal.Title>
        Você já conhece o <strong>GidBot</strong>?
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <p className="p-3 bg-success text-light rounded">
        O GidBot é um robô <em>(chat bot)</em> desenvolvido principalmente para{" "}
        <strong>
          tornar acessível a busca de crédito pelos microempreendedores.
        </strong>
      </p>
      <hr />
      <h5>E como fazemos isso?</h5>
      <p>É bem simples:</p>
      <ol>
        <li>
          Primeiro, identificamos o{" "}
          <strong>grau de amadurecimento do microempreendor</strong>, isto é, o
          quão capacitado ele está para administrar seu próprio negócio.
          <br />
          Fazemos isso através do GidBot, que, com uma linguagem bastante
          acessível, guia o usuário a traçar seu próprio perfil.
        </li>
        <li>
          Depois, uma vez entendidas as qualidades e deficiências desse
          microempreendedor, nossa plataforma, de forma extremamente inteligente
          e customizada,{" "}
          <strong>recomenda-lhe diversos cursos de capacitação</strong>, todos
          promovidos pelo SEBRAE.
        </li>
        <li>
          Feitos os cursos, nossa plataforma consegue agora comprovar à diversas
          instituições financeiras que o microempreendedor se tornou mais
          capacitado em diversas áreas da administração corporativa.
        </li>
      </ol>
      <p>
        <strong className="text-success">
          Assim, enriquecemos o processo de análise de crédito dos bancos (ao
          fornecer-lhes dados que antes não possuíam), ao mesmo tempo que
          aumentamos a confiança dessas instituições no microempreendedor.
        </strong>
      </p>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="success" onClick={props.onHide}>
        Legal, quero conhecer!
      </Button>
    </Modal.Footer>
  </Modal>
);

export default AboutModal;
