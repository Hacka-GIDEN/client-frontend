import { USER_ADD_FIELDS } from "../actionTypes";

const DEFAULT_USER = null;

const addUserFields = (state, { fieldsObj }) => {
  if (!state) return fieldsObj;
  return { ...state, ...fieldsObj };
};

export default (state = DEFAULT_USER, action) => {
  switch (action.type) {
    case USER_ADD_FIELDS:
      return addUserFields(state, action);
    default:
      return state;
  }
};
