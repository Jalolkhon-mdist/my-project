import { combineReducers } from "@reduxjs/toolkit";
import user from "./user";
import post from "./post";
import profile from "./profile";

export const rootReducer = combineReducers({ user, post, profile });

export default rootReducer;
