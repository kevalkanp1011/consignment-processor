import axios, { AxiosProgressEvent } from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export const uploadConsignments = async (file: File, email?: string) => {
  const formData = new FormData();
  formData.append('file', file);
  if (email) formData.append('email', email);
  
  const response = await axios.post(`${API_URL}/upload-consignments`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  
  return response.data;
};

export const uploadFile = async (
  file: File,
  email?: string,
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void
) => {
  const formData = new FormData();
  formData.append('file', file);
  if (email) formData.append('email', email);

  const response = await axios.post(
    `${API_URL}/upload-consignments`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress,
    }
  );

  return response.data;
};
