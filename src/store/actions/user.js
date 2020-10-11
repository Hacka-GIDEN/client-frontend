import { USER_ADD_FIELDS } from "../actionTypes";

export const addUserFields = (fieldsObj) => ({
  type: USER_ADD_FIELDS,
  fieldsObj,
});

export default { addUserFields };
