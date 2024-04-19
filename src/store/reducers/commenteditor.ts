import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const commenteditor = createSlice({
  name: "commenteditor",
  initialState: {
    element: null as any,
    open: false as boolean,
  },
  reducers: {
    setCommentEditor(
      state,
      action: PayloadAction<{ element: any; open: boolean }>
    ) {
      const { element, open } = action.payload;
      state.element = element;
      state.open = open;
    },
  },
});

export default commenteditor.reducer;
export const { setCommentEditor } = commenteditor.actions;
