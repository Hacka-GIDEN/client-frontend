import React from "react";
import { chatEntities } from "../../const";
import styles from "./ChatMessage.module.css";

const ChatMessage = (props) => {
  if (props.button) {
    return (
      <button
        className={
          styles.Message +
          " " +
          styles.MessageButton +
          (props.sender === chatEntities.USER ? " " + styles.MessageUser : "") +
          (props.last ? " " + styles.LastMessage : "")
        }
        onClick={props.onClick}
      >
        {props.sender !== props.prevSender && (
          <h5>{props.sender === chatEntities.BOT ? "GidBot" : "Você"}</h5>
        )}
        <div className={styles.MessageContent}>{props.children}</div>
      </button>
    );
  }
  return (
    <div
      className={
        styles.Message +
        (props.sender === chatEntities.USER ? " " + styles.MessageUser : "") +
        (props.prevSender && props.sender !== props.prevSender ? " mt-3" : "") +
        (props.last ? " " + styles.LastMessage : "")
      }
    >
      {props.sender !== props.prevSender && (
        <h5>{props.sender === chatEntities.BOT ? "GidBot" : "Você"}</h5>
      )}
      <div className={styles.MessageContent}>{props.children}</div>
    </div>
  );
};

export default ChatMessage;
