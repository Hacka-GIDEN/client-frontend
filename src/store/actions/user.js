import { USER_ADD_FIELDS, USER_INCREMENT_SCORE } from "../actionTypes";

export const addUserFields = (fieldsObj) => ({
  type: USER_ADD_FIELDS,
  fieldsObj,
});

export const incrementScore = (score) => ({
  type: USER_INCREMENT_SCORE,
  score,
});

export default { addUserFields, incrementScore };
