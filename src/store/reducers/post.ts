import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "backend";
import { RootState } from "store";
import { requireLogin } from "./user";

interface PostState {
  list: {
    loading: boolean;
    error: boolean;
    range: number;
    data: any[] | null;
    count: { [key: string]: number };
    filter: { [key: string]: number };
    searchParams: any;
  };
  element: {
    data: { [key: string]: any };
    loading: boolean;
    error: boolean;
  };
  comments: {
    data: { [key: string]: any };
    count: { [key: string]: number };
    loading: boolean;
  };
  createModal: {
    open: boolean;
  };
  editModal: {
    open: boolean;
    id: string | null;
  };
}

const post = createSlice({
  name: "Post",
  initialState: {
    list: {
      loading: false,
      error: false,
      range: 8,
      data: null,
      count: {},
      filter: {},
    },
    element: {
      data: {},
      loading: false,
      error: false,
    },
    comments: {
      data: {},
      count: {},
      loading: false,
    },
    createModal: {
      open: false,
    },
    editModal: {
      open: false,
      id: null,
    },
  } as PostState,
  reducers: {
    PostListError(state, action: PayloadAction<boolean>) {
      state.list.error = action.payload;
    },
    PostListLoading(state, action: PayloadAction<boolean>) {
      state.list.loading = action.payload;
    },
    setPostCount(state, action: PayloadAction<{ key: string; value: number }>) {
      state.list.count[action.payload.key] = action.payload.value;
    },
    PostData(state, action: PayloadAction<{ key: string; data: any }>) {
      const { key, data } = action.payload;
      state.element.data[key] = data;
    },
    PostError(state, action: PayloadAction<boolean>) {
      state.element.error = action.payload;
    },
    commentsLoading(state, action: PayloadAction<boolean>) {
      state.comments.loading = action.payload;
    },
    setPostReaction(
      state,
      action: PayloadAction<{ post_id: string; type: string }>
    ) {
      const { post_id, type } = action.payload;
      const Post = state.element.data[post_id];

      if (Post.reaction[0]?.type === type) {
        Post.reaction = [{ type: null }];
      } else {
        Post.reaction = [{ type }];
      }
    },
    setCommentReaction(
      state,
      action: PayloadAction<{
        post_id: string;
        comment_id: string;
        type: string;
      }>
    ) {
      const { post_id, comment_id, type } = action.payload;
      const list = state.comments.data[post_id];

      const comment = list?.find((e: any) => e.id === comment_id);

      if (comment) {
        if (comment.reaction[0]?.type === type) {
          comment.reaction = [{ type: null }];
        } else {
          comment.reaction = [{ type }];
        }
      }
    },
    setCreateModal(state, action: PayloadAction<{ open: boolean }>) {
      state.createModal = action.payload;
    },
    setEditModal(
      state,
      action: PayloadAction<{ open: boolean; id: string | null }>
    ) {
      state.editModal = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPost.fulfilled, (state, action) => {
      const { key, data, error } = action.payload;

      try {
        if (data) {
          const returnData = data[0];

          let reactionType = null;

          if (!returnData?.reaction) {
            returnData.reaction = [{ type: null }];
          } else {
            reactionType = returnData?.reaction?.[0]?.type;
          }

          if (reactionType === "like") {
            returnData.likes[0].count -= 1;
          } else if (reactionType === "dislike") {
            returnData.dislikes[0].count -= 1;
          }

          state.element.data[key] = returnData;
        }

        if (error) {
          throw error;
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    });

    builder.addCase(deletePost.fulfilled, (state, action) => {
      if (action.payload) {
        const { key } = action.payload;

        if (state.list.data) {
          const returnData = state.list.data?.filter((e) => e.id !== key);
          state.list.data = returnData;
        }
      }
    });

    builder.addCase(LoadComments.fulfilled, (state, action) => {
      const { key, data, count } = action.payload;

      if (data && !state.comments.data[key]) {
        const returnData = data.map((e: any) => {
          if (e?.reaction) {
            const reactionType = e.reaction[0]?.type;

            if (reactionType === "like" && e.likes && e.likes[0]?.count > 0) {
              return {
                ...e,
                likes: [{ count: e.likes[0].count - 1 }],
              };
            } else if (
              reactionType === "dislike" &&
              e.dislikes &&
              e.dislikes[0]?.count > 0
            ) {
              return {
                ...e,
                dislikes: [{ count: e.dislikes[0].count - 1 }],
              };
            }
          }
          return e;
        });

        state.comments.data[key] = returnData;

        if (count) {
          state.comments.count[key] = count[0]?.count || 0;
        }
      }
    });

    builder.addCase(GetComments.fulfilled, (state, action) => {
      if (action.payload) {
        const { key, data } = action.payload;

        if (data) {
          const modifiedComments = data.map((item: any) => {
            const comment = { ...item };
            if (comment?.reaction) {
              const reactionType = comment.reaction[0]?.type;

              if (
                reactionType === "like" &&
                comment.likes &&
                comment.likes[0]?.count > 0
              ) {
                comment.likes = [{ count: comment.likes[0].count - 1 }];
              } else if (
                reactionType === "dislike" &&
                comment.dislikes &&
                comment.dislikes[0]?.count > 0
              ) {
                comment.dislikes = [{ count: comment.dislikes[0].count - 1 }];
              }
            }
            return comment;
          });

          const uniqueArray = Array.from(
            new Set(
              [...state.comments.data[key], ...modifiedComments].map((item) =>
                JSON.stringify(item)
              )
            )
          ).map((item) => JSON.parse(item));

          state.comments.data[key] = uniqueArray;
        }
      }
    });

    builder.addCase(PostComment.fulfilled, (state, action) => {
      if (action.payload) {
        const { key, data } = action.payload;

        if (data) {
          const comment = data[0];
          comment.likes = [{ count: 0 }];
          comment.dislikes = [{ count: 0 }];
          comment.reaction = [{ type: null }];
          state.comments.data[key] = [comment, ...state.comments.data[key]];
          state.comments.count[key] += 1;
        }
      }
    });

    builder.addCase(UpdateComment.fulfilled, (state, action) => {
      if (action.payload) {
        const { data, id, key } = action.payload;
        const list = state.comments.data[key];

        if (data && id && list) {
          const index = list.findIndex((e: any) => e.id === id);
          const newItem = Object.assign(list[index], data[0]);
          list[index] = newItem;
          state.comments.data[key] = list;
        }
      }
    });

    builder.addCase(DeleteComment.fulfilled, (state, action) => {
      if (action.payload) {
        const { data, id, key } = action.payload;
        const list = state.comments.data[key];

        if (data && id && list) {
          const newArr = list.filter((e: any) => e.id !== id);

          state.comments.data[key] = newArr;
          state.comments.count[key] -= 1;
        }
      }
    });

    builder.addCase(getPostList.fulfilled, (state, action) => {
      if (action.payload) {
        const { data } = action.payload;

        state.list.data = data;
      }
    });
  },
});

export const {
  PostListError,
  PostListLoading,
  PostData,
  PostError,
  setPostCount,
  setPostReaction,
  setCommentReaction,
  setCreateModal,
  setEditModal,
} = post.actions;

export default post.reducer;

/********************************************************************************************************************/
const config = {
  commentsPerLoad: 6,
};

/********************************************************************************************************************/
const getPostList = createAsyncThunk(
  "getPostList",
  async (args: { category: string | undefined }) => {
    const { category } = args;

    try {
      let query = supabase
        .from("posts")
        .select(
          `*, user: user_metadata(*), likes: post_reactions(count), dislikes: post_reactions(count), comments: comments(count)`
        )
        .eq("likes.type", "like")
        .eq("dislikes.type", "like")
        .order("id", { ascending: false });

      if (category) {
        query.ilike("category", category);
      }

      const { data, error } = await query;
      if (data) {
        return { data };
      } else {
        throw error;
      }
    } catch (e) {
      console.log(e);
    }
  }
);

const getPost = createAsyncThunk(
  "getPost",
  async (id: string, { dispatch, getState }) => {
    dispatch(LoadComments(id));
    const state = getState() as RootState;
    const user_id = state.user.data?.id;

    let selectString = `*, user: user_metadata(*), 
    likes: post_reactions(count), dislikes: post_reactions(count), comments: comments(count)`;

    if (user_id) {
      selectString += `, reaction: post_reactions(type)`;
    }

    let query = supabase
      .from("posts")
      .select(selectString)
      .eq("id", id)
      .eq("likes.type", "like")
      .eq("dislikes.type", "dislike");

    if (user_id) {
      query.eq("reaction.user_id", user_id);
    }

    const { data, error }: any = await query;

    return { key: id, data, error };
  }
);

const updatePost = createAsyncThunk(
  "updatePost",
  async (args: { id: string; post: any }, { getState }) => {
    const { id, post } = args;
    const state = getState() as RootState;
    const user_id = state.user.data?.id;

    if (!user_id) return;

    const { data }: any = await supabase
      .from("posts")
      .update(post)
      .eq("id", id);

    return { key: id, data };
  }
);

const deletePost = createAsyncThunk(
  "deletePost",
  async (id: string, { getState }) => {
    const state = getState() as RootState;
    const user_id = state.user.data?.id;

    if (!user_id) return;
    await supabase.from("posts").delete().eq("id", id);

    return { user_id, key: id };
  }
);

const postPost = createAsyncThunk(
  "postPost",
  async (
    post: { title: string; content: string; category: string },
    { getState }
  ) => {
    const state = getState() as RootState;
    const user_id = state.user.data?.id;

    if (!user_id) {
      return null;
    }

    const { data, error }: any = await supabase
      .from("posts")
      .insert({ ...post, user_id });

    console.log(data);

    return { data, error };
  }
);

const LoadComments = createAsyncThunk(
  "LoadComments",
  async (post_id: string, { getState }) => {
    const state = getState() as RootState;
    const user_id = state.user?.data?.id;

    const { data: count } = await supabase
      .from("comments")
      .select("count")
      .eq("post_id", post_id);

    let selectString = `*, user: user_metadata(id, name, img), dislikes: comment_reactions(count), likes: comment_reactions(count)`;

    if (user_id) {
      selectString += `, reaction: comment_reactions(type)`;
    }

    let query = supabase
      .from("comments")
      .select(selectString)
      .eq("post_id", post_id)
      .eq("dislikes.type", "dislike")
      .eq("likes.type", "like")
      .order("id", { ascending: false })
      .limit(config.commentsPerLoad);

    if (user_id) {
      query = query.eq("reaction.user_id", user_id);
    }

    const { data } = await query;

    return { key: post_id, data, count };
  }
);

const GetComments = createAsyncThunk(
  "GetComments",
  async (post_id: string, { getState, dispatch }) => {
    const state = getState() as RootState;
    const user_id = state.user.data?.id;
    const mainState = state.post.comments.data[post_id] || [];
    const last_id = mainState[mainState.length - 1]?.id;

    const stateCount = state.post.comments.count[post_id] || false;

    if (!stateCount || stateCount <= mainState.length) {
      return;
    }

    dispatch(post.actions.commentsLoading(true));

    let selectString = `*, user: user_metadata(id, name, img), dislikes: comment_reactions(count), likes: comment_reactions(count)`;

    if (user_id) {
      selectString += `, reaction: comment_reactions(type)`;
    }

    let query = supabase
      .from("comments")
      .select(selectString)
      .eq("post_id", post_id)
      .eq("dislikes.type", "dislike")
      .eq("likes.type", "like")
      .order("id", { ascending: false })
      .lte("id", last_id)
      .limit(config.commentsPerLoad);

    if (user_id) {
      query = query.eq("reaction.user_id", user_id);
    }

    const { data } = await query;

    dispatch(post.actions.commentsLoading(false));

    return { key: post_id, data };
  }
);

const PostComment = createAsyncThunk(
  "PostComment",
  async (args: { post_id: string; value: string }, { getState }) => {
    const { value, post_id } = args;
    const state = getState() as RootState;
    const user_id = state.user.data?.id;

    if (!user_id || !post_id) return;

    const { data } = await supabase
      .from("comments")
      .insert({ post_id, text: value, user_id })
      .select("*, user: user_metadata(id, name, img)");

    return { key: post_id, data };
  }
);

const UpdateComment = createAsyncThunk(
  "UpdateComment",
  async (args: { id: string; value: string; post_id: string }) => {
    const { value, id, post_id } = args;

    const { data } = await supabase
      .from("comments")
      .update({ text: value, changed: true })
      .eq("id", id)
      .select("*, user: user_metadata(id, name, img)");

    return { key: post_id, data, id };
  }
);

const DeleteComment = createAsyncThunk(
  "DeleteComment",
  async (args: { id: string; post_id: string }) => {
    const { id, post_id } = args;
    const { data } = await supabase
      .from("comments")
      .delete()
      .eq("id", id)
      .select();

    return { key: post_id, data, id };
  }
);

const PostCommentLike = createAsyncThunk(
  "PostCommentLike",
  async (
    args: { comment_id: string; post_id: string },
    { getState, dispatch }
  ) => {
    const { comment_id, post_id } = args;

    const state = getState() as RootState;
    const user_id = state.user.data?.id;
    const list = state.post.comments.data[post_id];
    const index = list?.findIndex((e: any) => e.id === comment_id);
    const comment = list[index];
    const reactionType = comment?.reaction?.[0]?.type;

    if (!user_id || !comment_id) {
      dispatch(requireLogin(true));
      return;
    }

    async function postLike(type: string) {
      await supabase
        .from("comment_reactions")
        .delete()
        .eq("user_id", user_id)
        .eq("comment_id", comment_id)
        .then(async () => {
          await supabase
            .from("comment_reactions")
            .insert({ comment_id, user_id, type });
        });
    }

    async function deleteLike() {
      await supabase
        .from("comment_reactions")
        .delete()
        .eq("user_id", user_id)
        .eq("comment_id", comment_id);
    }

    if (reactionType === "like" || reactionType === "dislike") {
      postLike(reactionType);
    } else {
      deleteLike();
    }
  }
);

const postSubscribers = createAsyncThunk(
  "PostFollower",
  async (post_id: string, { getState, dispatch }) => {
    const state = getState() as RootState;
    const user_id = state.user.data?.id;

    if (!user_id || !post_id) return;

    await supabase
      .from("applicants")
      .insert({ post_id, user_id })
      .then(() => dispatch(getPost(post_id)));
  }
);

const PostPostLike = createAsyncThunk(
  "PostPostLike",
  async (post_id: string, { getState }) => {
    const state = getState() as RootState;
    const user_id = state.user.data?.id;
    const Post = state.post.element.data[post_id];
    const reactionType = Post?.reaction[0]?.type;

    if (!user_id || !post_id) return;

    async function postLike(type: string) {
      await supabase
        .from("post_reactions")
        .delete()
        .eq("user_id", user_id)
        .eq("post_id", post_id)
        .then(async () => {
          await supabase
            .from("post_reactions")
            .upsert({ post_id, user_id, type });
        });
    }

    async function deleteLike() {
      await supabase
        .from("post_reactions")
        .delete()
        .eq("user_id", user_id)
        .eq("post_id", post_id);
    }

    if (reactionType === "like" || reactionType === "dislike") {
      postLike(reactionType);
    } else {
      deleteLike();
    }
  }
);

export const postApi = {
  get: getPost,
  post: postPost,
  update: updatePost,
  delete: deletePost,
  like: PostPostLike,
  subscribers: {
    post: postSubscribers,
  },
  list: {
    get: getPostList,
  },
  comments: {
    get: GetComments,
    post: PostComment,
    update: UpdateComment,
    delete: DeleteComment,
    like: PostCommentLike,
  },
};
