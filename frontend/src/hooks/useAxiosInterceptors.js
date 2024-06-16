import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../utils/axios';
// import { refreshToken } from '../api/apiAuth';


const useAxiosInterceptors = () => {
  const { authState, login, logout } = useAuth();

  useEffect(() => {
    // Request interceptor to add the access token to headers
    const requestInterceptor = api.interceptors.request.use(
      config => {
        if (authState.isAuthenticated && authState.token) {
          config.headers.Authorization = `Bearer ${authState.token}`;
        }
        return config;
      },
      error => Promise.reject(error)
    );

    const responseInterceptor = api.interceptors.response.use(
      response => response,
      async error => {
        if (error.response.status === 401) {
          await logout();
        }

        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [authState, login, logout]);
};

export default useAxiosInterceptors;
