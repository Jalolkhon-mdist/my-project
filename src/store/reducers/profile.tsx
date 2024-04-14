import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "backend";
import { postApi } from "./post";

const profile = createSlice({
  name: "profile",
  initialState: {
    data: {} as any,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postApi.delete.fulfilled, (state, action) => {
      if (action.payload) {
        const { user_id, key } = action.payload;
        const list = state.data[user_id];

        if (key && list) {
          const newArr = list.filter((e: any) => e.id !== key);
          state.data[user_id] = newArr;
        }
      }
    });
    builder.addCase(getProfile.fulfilled, (state, action) => {
      if (action.payload) {
        const { key, data } = action.payload;
        state.data[key] = data[0];
      }
    });
  },
});

export default profile.reducer;

const getProfile = createAsyncThunk("getProfile", async (id: string) => {
  if (!id) return;

  try {
    const { data } = await supabase
      .from("user_metadata")
      .select(
        `*, posts(*, user: user_metadata(*), likes: post_reactions(count), dislikes: post_reactions(count))`
      )
      .eq("posts.likes.type", "dislike")
      .eq("posts.dislikes.type", "like")
      .eq("id", id);

    console.log(data);

    if (data) {
      return { key: id, data };
    } else {
      return null;
    }
  } catch (e) {
    console.log(e);
  }
});

export const profileApi = {
  get: getProfile,
};
