import { API_BASE_URL, handleAPIError } from './constants';
import { APICity, APIError } from './types';

export const getCityInformation = async () => {
  const fetchUrl = `${API_BASE_URL}/city`;

  try {
    const response = await fetch(fetchUrl);

    const data: APICity | APIError = await response.json();

    handleAPIError('getCity', response.status, data);

    return data as APICity;
  } catch (error) {
    console.error(error);
  }
};
