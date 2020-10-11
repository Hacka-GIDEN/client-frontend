import { chatStages } from "../const";

export const nextChatStage = (currStage, prevStage) => {
  switch (currStage) {
    case chatStages.WAITING_FOR_BOT:
      switch (prevStage) {
        case chatStages.WAITING_FOR_FULL_NAME:
          return chatStages.WAITING_FOR_CNPJ;
        default:
          return;
      }
    default:
      return chatStages.WAITING_FOR_BOT;
  }
};

export default nextChatStage;
