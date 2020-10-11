import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import validator from "validator";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FaPaperPlane } from "react-icons/fa";
import { chatStages } from "../../const";
import { checkChatInput, nextChatStage } from "../../utils";
import {
  global as appActions,
  messages as msgActions,
  user as userActions,
} from "../../store/actions";
import styles from "./ChatInput.module.css";

const ChatInput = (props) => {
  const [inputConfig, setInputConfig] = useState({
    disabled: true,
    placeholder: "GidBot está digitando...",
  });
  const [inputText, setInputText] = useState("");
  const [inputError, setInputError] = useState(null);
  const inputRef = useRef();
  const chatStage = useSelector((state) => state.global.chatStage);
  const dispatch = useDispatch();

  const handleChangeOnInput = (event) => {
    const newInputText = event.target.value;
    if (inputError) {
      setInputError(null);
    }
    if (
      chatStage === chatStages.WAITING_FOR_CNPJ &&
      (!validator.isInt(newInputText) ||
        !validator.isLength(newInputText, { min: 0, max: 14 }))
    ) {
      return;
    }
    setInputText(event.target.value);
  };

  const handleMsgSubmission = (event) => {
    event.preventDefault();

    const validation = checkChatInput(chatStage, inputText);
    if (validation.valid) {
      const { formatted } = validation;

      switch (chatStage) {
        case chatStages.WAITING_FOR_FULL_NAME:
          const formattedAsArray = formatted.split(" ");
          dispatch(
            userActions.addUserFields({
              fullName: formatted,
              firstName: formattedAsArray[0],
              lastName: formattedAsArray[formattedAsArray.length - 1],
            })
          );
          break;
        case chatStages.WAITING_FOR_CNPJ:
          dispatch(
            userActions.addUserFields({ cnpj: formatted, cnpjRaw: inputText })
          );
          break;
        default:
          break;
      }

      dispatch(msgActions.appendUserMessage(formatted));
      dispatch(appActions.setChatStage(nextChatStage(chatStage)));
    } else {
      setInputError(validation.errors.join(";"));
    }
  };

  useEffect(() => {
    let newInputConfig = {};
    switch (chatStage) {
      case chatStages.WAITING_FOR_FULL_NAME:
        newInputConfig = {
          disabled: false,
          placeholder: "Digite seu nome completo",
        };
        break;
      case chatStages.WAITING_FOR_CNPJ:
        newInputConfig = {
          disabled: false,
          placeholder: "Digite o CNPJ da sua empresa",
        };
        break;
      default:
        newInputConfig = {
          disabled: true,
          placeholder: "GidBot está digitando...",
        };
    }

    setInputText("");
    setInputConfig(newInputConfig);
  }, [chatStage]);

  useEffect(() => {
    if (inputRef.current && !inputConfig.disabled) {
      inputRef.current.focus();
    }
  }, [inputConfig.disabled]);

  return (
    <Form onSubmit={handleMsgSubmission}>
      <Row noGutters>
        <Col xs={9} md={10} xl={11} className={styles.InputContainer}>
          <Form.Control
            {...inputConfig}
            ref={inputRef}
            value={inputText}
            onChange={handleChangeOnInput}
            isInvalid={inputError}
          />
          {inputError && (
            <Form.Control.Feedback type="invalid">
              {inputError}
            </Form.Control.Feedback>
          )}
        </Col>
        <Col>
          <Button
            block
            variant={inputError ? "outline-danger" : "outline-primary"}
            type="submit"
            className={
              styles.InputSubmitBtn +
              " d-flex align-items-center justify-content-center"
            }
            disabled={inputConfig.disabled || inputError}
          >
            <FaPaperPlane />
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default ChatInput;
