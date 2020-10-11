import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import uniqid from "uniqid";
import fetchJsonp from "fetch-jsonp";
import BounceLoader from "react-spinners/BounceLoader";
import ChatInput from "../ChatInput/ChatInput";
import ChatMessage from "../ChatMessage/ChatMessage";
import {
  global as appActions,
  messages as msgActions,
  user as userActions,
} from "../../store/actions";
import { chatStages } from "../../const";
import styles from "./BotArea.module.css";

const BotArea = (props) => {
  const [shouldFetchCnpj, setShouldFetchCnpj] = useState(false);

  const appState = useSelector((state) => state.global);
  const { messages, user } = useSelector((state) => state);

  const dispatch = useDispatch();

  const chatBottomRef = useRef();

  const sendMessageAsBot = (msg, callback, options) => {
    setTimeout(() => {
      dispatch(msgActions.appendBotMessage(msg, options));
      if (callback) callback();
    }, 700);
  };

  const fetchCnpj = () => {
    if (!shouldFetchCnpj) return;
    fetchJsonp(`https://www.receitaws.com.br/v1/cnpj/${user.cnpjRaw}`)
      .then((res) => res.json())
      .then((data) => {
        setShouldFetchCnpj(false);
        dispatch(userActions.addUserFields({ company: { ...data } }));
        dispatch(msgActions.removeMessage(messages.length - 1));
        sendMessageAsBot(
          <div>
            Prontinho, {user.firstName}! Sua empresa é a{" "}
            <strong>{data.nome}</strong>, certo?
          </div>
        );
      });
  };

  const autoScrollToChatBottom = () => {
    if (chatBottomRef && chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    switch (appState.prevChatStage) {
      case null:
        sendMessageAsBot("Olá! Seja bem-vindo(a) ao giden.", () =>
          sendMessageAsBot(
            <span>
              Por favor, vamos começar com o seu <strong>nome</strong>... Como
              você se chama?
              <br />
              <em>Nome completo por favor, ok?</em>
            </span>,
            () =>
              dispatch(
                appActions.setChatStage(chatStages.WAITING_FOR_FULL_NAME)
              )
          )
        );
        break;
      case chatStages.WAITING_FOR_FULL_NAME:
        sendMessageAsBot(
          `Legal, ${user.firstName}! É um prazer enorme te conhecer :)`,
          () =>
            sendMessageAsBot(
              <span>
                Vamos lá... Digite agora o <strong>CNPJ</strong> da sua empresa:
              </span>,
              () =>
                sendMessageAsBot(
                  "Ou clique aqui caso você ainda não tenha um CNPJ",
                  () =>
                    dispatch(
                      appActions.setChatStage(chatStages.WAITING_FOR_CNPJ)
                    ),
                  {
                    asButton: true,
                    buttonCallback: () => {
                      dispatch(userActions.addUserFields({ cnpj: null }));
                      dispatch(
                        msgActions.appendUserMessage("Ainda não tenho CNPJ :(")
                      );
                      dispatch(
                        appActions.setChatStage(chatStages.WAITING_FOR_BOT)
                      );
                    },
                  }
                )
            )
        );
        break;
      case chatStages.WAITING_FOR_CNPJ:
        if (!user.cnpj) {
          sendMessageAsBot(
            `Certo, ${user.firstName}, sem problemas! Sem CNPJ.`,
            () =>
              sendMessageAsBot(
                "Deixe-me então agora te fazer algumas perguntinhas sobre o seu negócio... Posso?"
              )
          );
        } else {
          sendMessageAsBot(
            `Maravilha, ${user.firstName}! Muito obrigado :)`,
            () =>
              sendMessageAsBot(
                "Deixe-me agora procurar pela sua empresa... Prometo que não demoro!",
                () =>
                  sendMessageAsBot(
                    <div className="d-flex align-items-center justify-content-center">
                      <BounceLoader size={23} color="#1d3557" />
                      <div className="ml-2">Carregando...</div>
                    </div>,
                    () => setShouldFetchCnpj(true)
                  )
              )
          );
        }
        break;
      default:
        return;
    }
    // eslint-disable-next-line
  }, [appState.chatStage]);

  useEffect(fetchCnpj, [shouldFetchCnpj]);

  useEffect(autoScrollToChatBottom, [messages]);

  return (
    <div className={styles.BotArea}>
      <div className={styles.MessagesContainer}>
        {messages.map((msg, idx, array) => (
          <ChatMessage
            key={uniqid()}
            sender={msg.sender}
            prevSender={idx === 0 ? null : array[idx - 1].sender}
            last={idx === array.length - 1}
            button={msg.asButton}
            onClick={msg.asButton && msg.buttonCallback}
          >
            {msg.text}
          </ChatMessage>
        ))}
        <div ref={chatBottomRef} />
      </div>
      <ChatInput />
    </div>
  );
};

export default BotArea;
