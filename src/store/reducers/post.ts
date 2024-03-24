import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "backend";
import { RootState } from "store";

const post = createSlice({
  name: "post",
  initialState: {
    data: {} as { [key: string]: any },
    comments: {} as { [key: string]: any[] },
    commentsCount: {} as { [key: string]: number },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPostList.fulfilled, (state, action) => {
      const { data } = action.payload;
      const returnData: any = {};
      if (data) {
        data.forEach((newItem: any) => {
          returnData[newItem.id] = newItem;
        });
        state.data = returnData;
      }
    });
    builder.addCase(getPost.fulfilled, (state, action) => {
      if (action.payload) {
        const { data, key } = action.payload;
        state.data[key] = data?.[0];
      }
    });
    builder.addCase(getComments.fulfilled, (state, action) => {
      if (action.payload) {
        const { data, key } = action.payload;
        const returnData: any = {};
        if (data) {
          data.forEach((newItem: any) => {
            returnData[newItem.id] = newItem;
          });
          state.comments[key] = returnData;
        }
      }
    });
    builder.addCase(postComment.fulfilled, (state, action) => {
      if (action.payload) {
        const { data, key } = action.payload;
        const returnData: any = {};
        if (data && data?.[0]) {
          returnData[data?.[0].id] = data[0];
          state.comments[key] = { ...state.comments[key], ...returnData };
        }
      }
    });
  },
});

const getPostList = createAsyncThunk("getPostList", async (_, { getState }) => {
  const state = getState() as RootState;
  const user_id = state.user.data?.id;

  let queryString = "*, user: user_data(*), likes: post_reactions(count)";

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

const getPost = createAsyncThunk(
  "getPost",
  async (post_id: string, { getState, dispatch }) => {
    const state = getState() as RootState;
    const user_id = state.user.data?.id;
    const post = state.post.data[post_id];

    if (post) return;

    let queryString = "*, user: user_data(*), likes: post_reactions(count)";

    if (user_id) {
      queryString += ", reaction: post_reactions(type)";
    }

    let query = supabase
      .from("posts")
      .select(queryString)
      .eq("id", post_id)
      .eq("likes.type", "like");

    if (user_id) {
      query = query.eq("reaction.user_id", user_id);
    }

    dispatch(getComments(post_id));

    const { data } = await query;

    return { data, key: post_id };
  }
);

const postLike = createAsyncThunk(
  "postLike",
  async (id: string, { getState }) => {
    const state = getState() as RootState;
    const user_id = state.user.data?.id;

    if (!user_id && !id) return;
  }
);

const getComments = createAsyncThunk(
  "getComments",
  async (post_id: string, { getState }) => {
    const state = getState() as RootState;
    const user_id = state.user.data?.id;
    const comments = state.post.comments[post_id];
    const lastComment = comments?.pop() || null;
    const last_id = lastComment?.id;

    let query = supabase
      .from("comments")
      .select(
        "*, user: user_data(name, img), likes: comment_reactions(count), reaction: comment_reactions(type)"
      )
      .eq("post_id", post_id)
      .eq("likes.type", "like");
    // .limit(5);

    if (last_id) {
      query = query.gte("id", last_id);
    }

    if (user_id) {
      query = query.eq("reaction.user_id", user_id);
    }

    const { data } = await query;

    return { data, key: post_id };
  }
);

const postComment = createAsyncThunk(
  "postComment",
  async (args: { post_id: string; value: string | null }, { getState }) => {
    const { post_id, value } = args;
    const state = getState() as RootState;
    const user_id = state.user.data?.id;

    if (!user_id && !post_id && !value) return;

    let query = supabase
      .from("comments")
      .insert({ user_id, post_id, content: value?.trim() })
      .select(
        "*,user: user_data(name, img), likes: comment_reactions(count), reaction: comment_reactions(type)"
      );

    const { data } = await query;

    return { data, key: post_id };
  }
);

export default post.reducer;

export const postApi = {
  get: getPost,
  like: postLike,
  list: {
    get: getPostList,
  },
  comments: {
    get: getComments,
    post: postComment,
  },
};
