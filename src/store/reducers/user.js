import { USER_ADD_FIELDS, USER_INCREMENT_SCORE } from "../actionTypes";

const DEFAULT_USER = null;

const addUserFields = (state, { fieldsObj }) => {
  if (!state) return fieldsObj;
  return { ...state, ...fieldsObj };
};

const incrementScore = (state, { score }) => {
  if (!state.score) {
    return { ...state, score };
  }
  return { ...state, score: state.score + score };
};

export default (state = DEFAULT_USER, action) => {
  switch (action.type) {
    case USER_ADD_FIELDS:
      return addUserFields(state, action);
    case USER_INCREMENT_SCORE:
      return incrementScore(state, action);
    default:
      return state;
  }
};
