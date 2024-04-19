import { combineReducers } from "@reduxjs/toolkit";
import user from "./user";
import post from "./post";
import profile from "./profile";
import commenteditor from "./commenteditor";

export const rootReducer = combineReducers({
  user,
  post,
  profile,
  commenteditor,
});

export default rootReducer;
