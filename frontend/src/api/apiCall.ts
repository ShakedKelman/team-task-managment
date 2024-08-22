import axios, { AxiosError } from 'axios';
import { appConfig } from '../config';

export default async function apiCall(
    url: string, 
    method: 'GET' | 'POST' | 'PUT' | 'DELETE', 
    data?: any, 
    headers: { [key: string]: string } = {}
) {
    const fullUrl = appConfig.serverUrl + url;
    console.log('Making API call:', fullUrl, method, headers, data); // Log the request details

    const options = {
        method,
        url: fullUrl,
        headers,
        data,
    };

    try {
        const response = await axios(options);
        return {
            status: true,
            data: response.data,
        };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('API call error:', error.response?.data || error.message); // Log the error details
            return {
                status: false,
                errorMessage: error.response?.data || error.message,
                data: error.response?.data,
            };
        } else {
            console.error('Unexpected error:', error);
            return {
                status: false,
                errorMessage: 'An unexpected error occurred.',
            };
        }
    }
}
