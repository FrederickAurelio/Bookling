import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../utils/axios';
import { refreshToken } from '../api/apiAuth';


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

        // Response interceptor to handle token expiration
        const responseInterceptor = api.interceptors.response.use(
            response => response,
            async error => {
                const originalRequest = error.config;

                if (error.response.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;

                    try {
                        const response = refreshToken();
                        const newAccessToken = response.data.access;
                        login(newAccessToken);  // Update the context with new access token

                        api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
                        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

                        return api(originalRequest);
                    } catch (refreshError) {
                        logout();
                        return Promise.reject(refreshError);
                    }
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
