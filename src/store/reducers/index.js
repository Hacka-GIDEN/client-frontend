import { combineReducers } from "redux";
import global from "./global";
import user from "./user";
import messages from "./messages";

export default combineReducers({ global, user, messages });
