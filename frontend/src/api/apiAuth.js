import { api } from "../utils/axios";

export async function refreshToken() {
  const response = await api.post('/user/api/token/refresh/', {}, {
    withCredentials: true
  });
  return response;
}

export async function loginApi(formData) {
  const response = await api.post("/user/api/token/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    }
  })
  return response.data;
}

export async function getUser() {
  try {
    const response = await api.get("/user");
    return response.data;
  } catch (error) {
    throw new Error("Failed to get user data")
  }
}