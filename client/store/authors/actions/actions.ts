import { createAsyncThunk } from '@reduxjs/toolkit';

import endpoints from '../../../../constants/endpoints';

interface IFile {
  fileName: string;
}

export const upLoadFile = createAsyncThunk<IFile, string | Blob, { rejectValue: string }>('author/upLoadFile', async (IData, { rejectWithValue }) => {
  const formData = new FormData();
  formData.append('file', IData);
  const response = await fetch(`${endpoints.authorRouter}${endpoints.uploadFile}`, {
    method: 'POST',
    headers: { Authorization: localStorage.token },
    body: formData,
  });
  if (!response.ok) {
    return rejectWithValue(`Error from server №${response.status} ${response.statusText}!!!`);
  }
  const fileName: Promise<IFile> = response.json();
  return fileName;
});
