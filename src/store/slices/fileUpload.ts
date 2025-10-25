import { FileUploadRequest } from '@/types/request';
import { FileUploadResponse } from '@/types/response';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FileUploadState {
  fileUploadLoading: boolean;
  uploadDocumentLoading: boolean;
}

const initialState: FileUploadState = {
  fileUploadLoading: false,
  uploadDocumentLoading: false,
};

const fileUploadSlice = createSlice({
  name: 'fileUpload',
  initialState,
  reducers: {
    // File Upload
    fileUploadRequest: (
      state: FileUploadState,
      _action: PayloadAction<FileUploadRequest>,
    ) => {
      state.fileUploadLoading = true;
    },
    fileUploadSuccess: (
      state: FileUploadState,
      _action: PayloadAction<FileUploadResponse>,
    ) => {
      state.fileUploadLoading = false;
    },
    fileUploadFailure: (state: FileUploadState) => {
      state.fileUploadLoading = false;
    },
  },
});

export const { fileUploadRequest, fileUploadSuccess, fileUploadFailure } =
  fileUploadSlice.actions;

export default fileUploadSlice.reducer;
