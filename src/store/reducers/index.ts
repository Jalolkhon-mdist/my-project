import { combineReducers } from "@reduxjs/toolkit";
import user from "./user";
import post, { postApi } from "./post";

export const rootReducer = combineReducers({ user, post });

export default rootReducer;

export const api = { post: postApi };
