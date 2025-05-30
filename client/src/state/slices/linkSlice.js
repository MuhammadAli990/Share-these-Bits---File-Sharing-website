import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { uploadFile } from '../../api/fileupload';

export const uploadFileThunk = createAsyncThunk(
  'link/uploadFile',
  async (file, { rejectWithValue }) => {
    try {
      const response = await uploadFile(file);
      return response.data.url;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const linkSlice = createSlice({
  name: 'link',
  initialState: {
    linkUrl: null,
    status: 'idle', // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {
    resetUploadState: (state) => {
      state.linkUrl = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadFileThunk.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(uploadFileThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.linkUrl = action.payload;
      })
      .addCase(uploadFileThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  },
});

export const { resetUploadState } = linkSlice.actions;
export default linkSlice.reducer;
