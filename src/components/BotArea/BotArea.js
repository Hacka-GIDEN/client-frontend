import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import uniqid from "uniqid";
import fetchJsonp from "fetch-jsonp";
import BounceLoader from "react-spinners/BounceLoader";
import ChatInput from "../ChatInput/ChatInput";
import ChatMessage from "../ChatMessage/ChatMessage";
import CoursesModal from "../CoursesModal/CoursesModal";
import {
  global as appActions,
  messages as msgActions,
  user as userActions,
} from "../../store/actions";
import { chatStages } from "../../const";
import styles from "./BotArea.module.css";

const BotArea = (props) => {
  const [shouldFetchCnpj, setShouldFetchCnpj] = useState(false);
  const [showCoursesModal, setShowCoursesModal] = useState(false);

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
    dispatch(appActions.setChatStage(chatStages.WAITING_FOR_CNPJ_FETCHING));
    fetchJsonp(`https://www.receitaws.com.br/v1/cnpj/${user.cnpjRaw}`)
      .then((res) => res.json())
      .then((data) => {
        setShouldFetchCnpj(false);
        dispatch(userActions.addUserFields({ company: { ...data } }));
        dispatch(msgActions.removeMessage(messages.length - 1));
        dispatch(appActions.setChatStage(chatStages.WAITING_FOR_BOT));
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
                "Mas... responda-me: de que tipo é a sua empresa?",
                () =>
                  sendMessageAsBot(
                    "Comércio",
                    () =>
                      sendMessageAsBot(
                        "Serviços",
                        () =>
                          sendMessageAsBot(
                            "Comércio e serviços",
                            () =>
                              dispatch(
                                appActions.setChatStage(
                                  chatStages.WAITING_FOR_BUSINESS_TYPE
                                )
                              ),
                            {
                              asButton: true,
                              buttonCallback: () => {
                                dispatch(
                                  msgActions.appendUserMessage(
                                    "Comércio e serviços."
                                  )
                                );
                                dispatch(
                                  appActions.setChatStage(
                                    chatStages.WAITING_FOR_BOT
                                  )
                                );
                              },
                            }
                          ),
                        {
                          asButton: true,
                          buttonCallback: () => {
                            dispatch(msgActions.appendUserMessage("Serviços."));
                            dispatch(
                              appActions.setChatStage(
                                chatStages.WAITING_FOR_BOT
                              )
                            );
                          },
                        }
                      ),
                    {
                      asButton: true,
                      buttonCallback: () => {
                        dispatch(msgActions.appendUserMessage("Comércio."));
                        dispatch(
                          appActions.setChatStage(chatStages.WAITING_FOR_BOT)
                        );
                      },
                    }
                  )
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
      case chatStages.WAITING_FOR_CNPJ_FETCHING:
        sendMessageAsBot(
          <div>
            Prontinho, {user.firstName}! Sua empresa é a{" "}
            <strong>{user.company.nome}</strong>, certo?
          </div>,
          () => {
            dispatch(
              appActions.setChatStage(chatStages.WAITING_FOR_QUESTIONS_START)
            );
            dispatch(appActions.setChatStage(chatStages.WAITING_FOR_BOT));
          }
        );
        break;
      case chatStages.WAITING_FOR_BUSINESS_TYPE:
      case chatStages.WAITING_FOR_QUESTIONS_START:
        sendMessageAsBot(
          "Vamos começar agora com algumas perguntinhas sobre você e a sua empresa. Blz?",
          () =>
            sendMessageAsBot(
              "(1/7) De alguma maneira você acha que adversidades econômicas, políticas e tecnológicas impactam nas operações de sua empresa?",
              () =>
                sendMessageAsBot(
                  "Sim",
                  () =>
                    sendMessageAsBot(
                      "Não sei",
                      () =>
                        sendMessageAsBot(
                          "Não",
                          () =>
                            dispatch(
                              appActions.setChatStage(
                                chatStages.WAITING_FOR_ANSWER_1
                              )
                            ),
                          {
                            asButton: true,
                            buttonCallback: () => {
                              dispatch(
                                msgActions.appendUserMessage(
                                  "Não, esses tipos de adversidade não impactam nas operações da minha empresa."
                                )
                              );
                              dispatch(userActions.incrementScore(10));
                              dispatch(
                                appActions.setChatStage(
                                  chatStages.WAITING_FOR_BOT
                                )
                              );
                            },
                          }
                        ),
                      {
                        asButton: true,
                        buttonCallback: () => {
                          dispatch(
                            msgActions.appendUserMessage("Não sei responder...")
                          );
                          dispatch(userActions.incrementScore(15));
                          dispatch(
                            appActions.setChatStage(chatStages.WAITING_FOR_BOT)
                          );
                        },
                      }
                    ),
                  {
                    asButton: true,
                    buttonCallback: () => {
                      dispatch(
                        msgActions.appendUserMessage(
                          "Sim, acredito que esses tipos de adversidade têm sim impacto nas operações da minha empresa."
                        )
                      );
                      dispatch(userActions.incrementScore(50));
                      dispatch(
                        appActions.setChatStage(chatStages.WAITING_FOR_BOT)
                      );
                    },
                  }
                )
            )
        );
        break;
      case chatStages.WAITING_FOR_ANSWER_1:
        sendMessageAsBot(
          `Ótimo, ${user.firstName}! Vamos para a próxima:`,
          () =>
            sendMessageAsBot(
              "(2/7) Na sua opinião, apenas capital próprio permitirá que os planos de crescimento atuais de sua empresa sejam alcançados?",
              () =>
                sendMessageAsBot(
                  "Sim",
                  () =>
                    sendMessageAsBot(
                      "Não sei",
                      () =>
                        sendMessageAsBot(
                          "Não",
                          () =>
                            dispatch(
                              appActions.setChatStage(
                                chatStages.WAITING_FOR_ANSWER_2
                              )
                            ),
                          {
                            asButton: true,
                            buttonCallback: () => {
                              dispatch(
                                msgActions.appendUserMessage(
                                  "Não, somente capital próprio não ajudará no alcance dos planos de crescimento atuais da minha empresa."
                                )
                              );
                              dispatch(userActions.incrementScore(30));
                              dispatch(
                                appActions.setChatStage(
                                  chatStages.WAITING_FOR_BOT
                                )
                              );
                            },
                          }
                        ),
                      {
                        asButton: true,
                        buttonCallback: () => {
                          dispatch(
                            msgActions.appendUserMessage("Não sei responder...")
                          );
                          dispatch(userActions.incrementScore(10));
                          dispatch(
                            appActions.setChatStage(chatStages.WAITING_FOR_BOT)
                          );
                        },
                      }
                    ),
                  {
                    asButton: true,
                    buttonCallback: () => {
                      dispatch(
                        msgActions.appendUserMessage(
                          "Sim, é possível alcançar as metas de crescimento da minha empresa apenas com capital próprio."
                        )
                      );
                      dispatch(userActions.incrementScore(60));
                      dispatch(
                        appActions.setChatStage(chatStages.WAITING_FOR_BOT)
                      );
                    },
                  }
                )
            )
        );
        break;
      case chatStages.WAITING_FOR_ANSWER_2:
        sendMessageAsBot(
          "(3/7) A respeito da saúde financeira de seu negócio, você separa suas contas pessoais do fluxo de caixa no final do mês?",
          () =>
            sendMessageAsBot(
              "Sim",
              () =>
                sendMessageAsBot(
                  "Não",
                  () =>
                    dispatch(
                      appActions.setChatStage(chatStages.WAITING_FOR_ANSWER_3)
                    ),
                  {
                    asButton: true,
                    buttonCallback: () => {
                      dispatch(
                        msgActions.appendUserMessage(
                          "Não, não separo minhas contas pessoais do fluxo de caixa no final do mês."
                        )
                      );
                      dispatch(userActions.incrementScore(20));
                      dispatch(
                        appActions.setChatStage(chatStages.WAITING_FOR_BOT)
                      );
                    },
                  }
                ),
              {
                asButton: true,
                buttonCallback: () => {
                  dispatch(
                    msgActions.appendUserMessage(
                      "Sim, eu sempre separo minhas contas pessoais do fluxo de caixa no final do mês."
                    )
                  );
                  dispatch(userActions.incrementScore(70));
                  dispatch(appActions.setChatStage(chatStages.WAITING_FOR_BOT));
                },
              }
            )
        );
        break;
      case chatStages.WAITING_FOR_ANSWER_3:
        sendMessageAsBot(
          "(4/7) Sabemos que diferentes produtos são cuidadosamente posicionados em diferentes segmentos de mercado. Você possui táticas desenvolvidas para precificar os seus produtos, distribuí-los, criar promoções e firmar parcerias?",
          () =>
            sendMessageAsBot(
              "Sim",
              () =>
                sendMessageAsBot(
                  "Não sei como fazer isso",
                  () =>
                    sendMessageAsBot(
                      "Não",
                      () =>
                        dispatch(
                          appActions.setChatStage(
                            chatStages.WAITING_FOR_ANSWER_4
                          )
                        ),
                      {
                        asButton: true,
                        buttonCallback: () => {
                          dispatch(
                            msgActions.appendUserMessage(
                              "Não, ainda não desenvolvi essas táticas."
                            )
                          );
                          dispatch(userActions.incrementScore(35));
                          dispatch(
                            appActions.setChatStage(chatStages.WAITING_FOR_BOT)
                          );
                        },
                      }
                    ),
                  {
                    asButton: true,
                    buttonCallback: () => {
                      dispatch(
                        msgActions.appendUserMessage(
                          "Não sei como fazer isso :("
                        )
                      );
                      dispatch(userActions.incrementScore(10));
                      dispatch(
                        appActions.setChatStage(chatStages.WAITING_FOR_BOT)
                      );
                    },
                  }
                ),
              {
                asButton: true,
                buttonCallback: () => {
                  dispatch(
                    msgActions.appendUserMessage(
                      "Sim, possuo essas táticas bem desenvolvidas!"
                    )
                  );
                  dispatch(userActions.incrementScore(50));
                  dispatch(appActions.setChatStage(chatStages.WAITING_FOR_BOT));
                },
              }
            )
        );
        break;
      case chatStages.WAITING_FOR_ANSWER_4:
        sendMessageAsBot(
          "(5/7) Você vende pela Internet? Se sim, qual das ferramentas abaixo você usa mais?",
          () =>
            sendMessageAsBot(
              "Loja virtual própria",
              () =>
                sendMessageAsBot(
                  "WhatsApp ou WhatsApp Business",
                  () =>
                    sendMessageAsBot(
                      "Facebook",
                      () =>
                        sendMessageAsBot(
                          "Instagram",
                          () =>
                            sendMessageAsBot(
                              "Não vendo pela Internet",
                              () =>
                                dispatch(
                                  appActions.setChatStage(
                                    chatStages.WAITING_FOR_ANSWER_5
                                  )
                                ),
                              {
                                asButton: true,
                                buttonCallback: () => {
                                  dispatch(
                                    msgActions.appendUserMessage(
                                      "Não vendo pela Internet."
                                    )
                                  );
                                  dispatch(userActions.incrementScore(10));
                                  dispatch(
                                    appActions.setChatStage(
                                      chatStages.WAITING_FOR_BOT
                                    )
                                  );
                                },
                              }
                            ),
                          {
                            asButton: true,
                            buttonCallback: () => {
                              dispatch(
                                msgActions.appendUserMessage("Instagram.")
                              );
                              dispatch(userActions.incrementScore(40));
                              dispatch(
                                appActions.setChatStage(
                                  chatStages.WAITING_FOR_BOT
                                )
                              );
                            },
                          }
                        ),
                      {
                        asButton: true,
                        buttonCallback: () => {
                          dispatch(msgActions.appendUserMessage("Facebook."));
                          dispatch(userActions.incrementScore(40));
                          dispatch(
                            appActions.setChatStage(chatStages.WAITING_FOR_BOT)
                          );
                        },
                      }
                    ),
                  {
                    asButton: true,
                    buttonCallback: () => {
                      dispatch(
                        msgActions.appendUserMessage(
                          "WhatsApp ou WhatsApp Business."
                        )
                      );
                      dispatch(userActions.incrementScore(30));
                      dispatch(
                        appActions.setChatStage(chatStages.WAITING_FOR_BOT)
                      );
                    },
                  }
                ),
              {
                asButton: true,
                buttonCallback: () => {
                  dispatch(
                    msgActions.appendUserMessage("Loja virtual própria.")
                  );
                  dispatch(userActions.incrementScore(50));
                  dispatch(appActions.setChatStage(chatStages.WAITING_FOR_BOT));
                },
              }
            )
        );
        break;
      case chatStages.WAITING_FOR_ANSWER_5:
        sendMessageAsBot(
          "(6/7) Seus clientes pagam pelos seus produtos/serviços geralmente de que forma?",
          () =>
            sendMessageAsBot(
              "Dinheiro em espécie",
              () =>
                sendMessageAsBot(
                  "Cartões de crédito e débito",
                  () =>
                    sendMessageAsBot(
                      "Transferência bancária",
                      () =>
                        sendMessageAsBot(
                          "Boleto",
                          () =>
                            sendMessageAsBot(
                              "Cheque",
                              () =>
                                dispatch(
                                  appActions.setChatStage(
                                    chatStages.WAITING_FOR_ANSWER_6
                                  )
                                ),
                              {
                                asButton: true,
                                buttonCallback: () => {
                                  dispatch(
                                    msgActions.appendUserMessage("Cheque.")
                                  );
                                  dispatch(userActions.incrementScore(10));
                                  dispatch(
                                    appActions.setChatStage(
                                      chatStages.WAITING_FOR_BOT
                                    )
                                  );
                                },
                              }
                            ),
                          {
                            asButton: true,
                            buttonCallback: () => {
                              dispatch(msgActions.appendUserMessage("Boleto."));
                              dispatch(userActions.incrementScore(30));
                              dispatch(
                                appActions.setChatStage(
                                  chatStages.WAITING_FOR_BOT
                                )
                              );
                            },
                          }
                        ),
                      {
                        asButton: true,
                        buttonCallback: () => {
                          dispatch(
                            msgActions.appendUserMessage("Transferência.")
                          );
                          dispatch(userActions.incrementScore(40));
                          dispatch(
                            appActions.setChatStage(chatStages.WAITING_FOR_BOT)
                          );
                        },
                      }
                    ),
                  {
                    asButton: true,
                    buttonCallback: () => {
                      dispatch(
                        msgActions.appendUserMessage(
                          "Cartões de crédito e débito."
                        )
                      );
                      dispatch(userActions.incrementScore(40));
                      dispatch(
                        appActions.setChatStage(chatStages.WAITING_FOR_BOT)
                      );
                    },
                  }
                ),
              {
                asButton: true,
                buttonCallback: () => {
                  dispatch(
                    msgActions.appendUserMessage("Dinheiro em espécie.")
                  );
                  dispatch(userActions.incrementScore(15));
                  dispatch(appActions.setChatStage(chatStages.WAITING_FOR_BOT));
                },
              }
            )
        );
        break;
      case chatStages.WAITING_FOR_ANSWER_6:
        sendMessageAsBot(
          "(7/7) Quando sobra aquele dinheirinho do final do mês, você investe em algum produto financeiro? Se sim, em qual você mais aplica?",
          () =>
            sendMessageAsBot(
              "Poupança",
              () =>
                sendMessageAsBot(
                  "CDB",
                  () =>
                    sendMessageAsBot(
                      "Tesouro direto",
                      () =>
                        sendMessageAsBot(
                          "LCI/LCA",
                          () =>
                            sendMessageAsBot(
                              "Ações",
                              () =>
                                sendMessageAsBot(
                                  "Não invisto",
                                  () =>
                                    dispatch(
                                      appActions.setChatStage(
                                        chatStages.WAITING_FOR_ANSWER_7
                                      )
                                    ),
                                  {
                                    asButton: true,
                                    buttonCallback: () => {
                                      dispatch(
                                        msgActions.appendUserMessage(
                                          "Não invisto."
                                        )
                                      );
                                      dispatch(userActions.incrementScore(10));
                                      dispatch(
                                        appActions.setChatStage(
                                          chatStages.WAITING_FOR_BOT
                                        )
                                      );
                                    },
                                  }
                                ),
                              {
                                asButton: true,
                                buttonCallback: () => {
                                  dispatch(
                                    msgActions.appendUserMessage("Ações.")
                                  );
                                  dispatch(userActions.incrementScore(50));
                                  dispatch(
                                    appActions.setChatStage(
                                      chatStages.WAITING_FOR_BOT
                                    )
                                  );
                                },
                              }
                            ),
                          {
                            asButton: true,
                            buttonCallback: () => {
                              dispatch(
                                msgActions.appendUserMessage("LCI/LCA.")
                              );
                              dispatch(userActions.incrementScore(50));
                              dispatch(
                                appActions.setChatStage(
                                  chatStages.WAITING_FOR_BOT
                                )
                              );
                            },
                          }
                        ),
                      {
                        asButton: true,
                        buttonCallback: () => {
                          dispatch(
                            msgActions.appendUserMessage("Tesouro direto.")
                          );
                          dispatch(userActions.incrementScore(50));
                          dispatch(
                            appActions.setChatStage(chatStages.WAITING_FOR_BOT)
                          );
                        },
                      }
                    ),
                  {
                    asButton: true,
                    buttonCallback: () => {
                      dispatch(msgActions.appendUserMessage("CDB."));
                      dispatch(userActions.incrementScore(50));
                      dispatch(
                        appActions.setChatStage(chatStages.WAITING_FOR_BOT)
                      );
                    },
                  }
                ),
              {
                asButton: true,
                buttonCallback: () => {
                  dispatch(msgActions.appendUserMessage("Poupança."));
                  dispatch(userActions.incrementScore(20));
                  dispatch(appActions.setChatStage(chatStages.WAITING_FOR_BOT));
                },
              }
            )
        );
        break;
      case chatStages.WAITING_FOR_ANSWER_7:
        sendMessageAsBot(
          `Maravilha, ${user.firstName}! Já temos o seu perfil traçado!!! Parabéns :)`,
          () =>
            sendMessageAsBot(
              <div>
                E também já temos pronto uma coletânea de cursos do SEBRAE
                recomendados exclusivamente para você!
                <br />
                <strong>
                  Quando você concluí-los, é possível que seu score com as
                  instituições financeiras aumente!
                </strong>
              </div>,
              () =>
                sendMessageAsBot(
                  "Clique aqui para ver os cursos recomendados",
                  null,
                  {
                    asButton: true,
                    buttonCallback: () => setShowCoursesModal(true),
                  }
                )
            )
        );
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
      <CoursesModal
        show={showCoursesModal}
        onHide={() => setShowCoursesModal(false)}
        user={user}
      />
    </div>
  );
};

export default BotArea;
