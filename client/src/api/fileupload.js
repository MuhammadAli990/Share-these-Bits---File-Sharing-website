import axiosInstance from "./axiosconfig";

// Upload file to backend
export const uploadFile = (file) => {
  const formData = new FormData();
  formData.append('file', file);

  return axiosInstance.post('/upload', formData);
};
