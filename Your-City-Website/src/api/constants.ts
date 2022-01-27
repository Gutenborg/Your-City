import { APIError } from './types';

const API_URL = 'https://api.yourcity.directory';
const DEV_API_URL = 'http://dev.api.yourcity.directory';

const getApiUrl = () => {
  if (process.env?.NODE_ENV === 'production') {
    return API_URL;
  } else {
    return DEV_API_URL;
  }
};

export const API_BASE_URL = getApiUrl();

export const handleAPIError = (method: string, status: number, data: any) => {
  if (status !== 200) {
    const errorMessage = (data as APIError)?.message ? (data as APIError)?.message : '';

    throw new Error(`The request ${method} failed with a status of ${status}. ${errorMessage ? errorMessage : ''}`);
  }
};
