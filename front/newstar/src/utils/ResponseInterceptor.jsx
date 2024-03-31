import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../api/api';

export const ResponseInterceptor = () => {
    const navigate = useNavigate();

    const interceptorId = useRef(null);
    useEffect(() => {
        interceptorId.current = axiosInstance.interceptors.response.use(undefined, (error) => {
            switch (error.response.status) {
                case 401: {
                    localStorage.removeItem('X-USER-ID');
                    navigate('/');
                    break;
                }
                default:
                    break;
            }
            return Promise.reject(error);
        });

        return () => {
            axiosInstance.interceptors.response.eject(interceptorId.current);
        };
    }, [navigate]);

    return null;
};
