import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "backend";
import { RootState } from "store";

const post = createSlice({
  name: "post",
  initialState: { list: [] as any[] },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getList.fulfilled, (state, action) => {
      const { data } = action.payload;
      if (data) {
        data.forEach((newItem: any) => {
          const existingItem = state.list.find(
            (item) => item.id === newItem.id
          );
          if (!existingItem) {
            state.list.push(newItem);
          }
        });
      }
    });
  },
});

const getList = createAsyncThunk("getList", async (_, { getState }) => {
  const state = getState() as RootState;
  const user_id = state.user.data?.id;

  let queryString = "*, likes: post_reactions(count)";

  if (user_id) {
    queryString += ", reaction: post_reactions(type)";
  }

  let query = supabase
    .from("posts")
    .select(queryString)
    .eq("likes.type", "like");

  if (user_id) {
    query = query.eq("reaction.user_id", user_id);
  }

  const { data } = await query;

  return { data };
});

export default post.reducer;

export const postApi = {
  list: {
    get: getList,
  },
};
