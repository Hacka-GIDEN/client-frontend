import { cnpj as cnpjV } from "cpf-cnpj-validator";
import { chatStages } from "../const";

export const checkFullName = (fullName) => {
  const errors = [];
  const fullNameArray = fullName.trim().split(" ");
  if (fullNameArray.length >= 2)
    return {
      valid: true,
      formatted: fullNameArray
        .map((name) => name[0].toUpperCase() + name.slice(1))
        .join(" "),
      errors,
    };
  else {
    errors.push("Seu nome completo deve conter pelo menos um sobrenome");
    return { valid: false, errors };
  }
};

export const checkCNPJ = (cnpj) => {
  const errors = [];
  if (cnpjV.isValid(cnpj))
    return { valid: true, formatted: cnpjV.format(cnpj), errors };
  else {
    errors.push("CNPJ inválido");
    return { valid: false, errors };
  }
};

export const checkChatInput = (chatStage, inputText) => {
  switch (chatStage) {
    case chatStages.WAITING_FOR_FULL_NAME:
      return checkFullName(inputText);
    case chatStages.WAITING_FOR_CNPJ:
      return checkCNPJ(inputText);
    default:
      return false;
  }
};

export default checkChatInput;
