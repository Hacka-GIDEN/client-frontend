import { MESSAGE_APPEND, MESSAGE_REMOVE } from "../actionTypes";

const DEFAULT_MESSAGES = [];

const appendMessage = (state, { sender, text, options }) => {
  const newState = [...state];
  const newMsg = { sender, text, ...options };
  newState.push(newMsg);
  return newState;
};

const removeMessage = (state, { idx }) => {
  const newState = [...state];
  newState.splice(idx, 1);
  return newState;
};

export default (state = DEFAULT_MESSAGES, action) => {
  switch (action.type) {
    case MESSAGE_APPEND:
      return appendMessage(state, action);
    case MESSAGE_REMOVE:
      return removeMessage(state, action);
    default:
      return state;
  }
};
