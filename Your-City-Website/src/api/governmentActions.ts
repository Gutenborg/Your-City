// import { API_BASE_URL, handleAPIError } from './constants';
// import { APIBusiness, APIError } from './types';

export const getGovernmentInformation = async () => {
  //const fetchUrl = `${API_BASE_URL}/city`;

  /* try {
    const response = await fetch(fetchUrl);

    const data: APIBusiness[] | APIError = await response.json();

    handleAPIError('getBusinesses', response.status, data);

    return data as APIBusiness[];
  } catch (error) {
    console.error(error);
  } */

  return {
    name: 'Gardendale',
  };
};
