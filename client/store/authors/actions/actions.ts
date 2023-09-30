import { createAsyncThunk } from '@reduxjs/toolkit';

import endpoints from '../../../../constants/endpoints';

export const upLoadFile = createAsyncThunk<string, Blob, { rejectValue: string }>('author/upLoadFile', async (data, { rejectWithValue }) => {
  const formData = new FormData();
  formData.append('file', data);
  const response = await fetch(`${endpoints.authorRouter}${endpoints.uploadFile}`, {
    method: 'POST',
    headers: { Authorization: localStorage.token },
    body: formData,
  });
  if (!response.ok) {
    return rejectWithValue(`Error from server №${response.status} ${response.statusText}!!!`);
  }
  const fileName: Promise<string> = response.json();
  return fileName;
});
