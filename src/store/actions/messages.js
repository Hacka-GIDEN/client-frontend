import { MESSAGE_APPEND, MESSAGE_REMOVE } from "../actionTypes";
import { chatEntities } from "../../const";

export const appendMessage = (entity, msg, options) => ({
  type: MESSAGE_APPEND,
  sender: entity,
  text: msg,
  options,
});
export const appendBotMessage = (msg, options) =>
  appendMessage(chatEntities.BOT, msg, options);
export const appendUserMessage = (msg, options) =>
  appendMessage(chatEntities.USER, msg, options);

export const removeMessage = (msgIdx) => ({
  type: MESSAGE_REMOVE,
  idx: msgIdx,
});

export default {
  appendMessage,
  appendBotMessage,
  appendUserMessage,
  removeMessage,
};
