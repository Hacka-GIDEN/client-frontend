import { GLOBAL_SET_CHAT_STAGE } from "../actionTypes";
import { chatStages } from "../../const";

const DEFAULT_STATE = {
  chatStage: chatStages.WAITING_FOR_BOT,
  prevChatStage: null,
};

const setChatStage = (state, { newStage }) => {
  return { ...state, prevChatStage: state.chatStage, chatStage: newStage };
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case GLOBAL_SET_CHAT_STAGE:
      return setChatStage(state, action);
    default:
      return state;
  }
};
