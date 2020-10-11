import { GLOBAL_SET_CHAT_STAGE } from "../actionTypes";

export const setChatStage = (newStage) => ({
  type: GLOBAL_SET_CHAT_STAGE,
  newStage,
});

export default { setChatStage };
