import { api } from "../utils/axios";

export async function refreshToken() {
  const response = await api.post(
    '/api/token/refresh',
    {},
    { withCredentials: true }
  );

  return response;
}