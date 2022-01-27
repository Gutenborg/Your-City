import { APIBusiness } from '.';
import { APIBusinessForm, APICategory, APIError } from './types';
import { API_BASE_URL, handleAPIError } from './constants';

export const getBusinesses = async (query?: string, category?: APICategory) => {
  const fetchUrl = `${API_BASE_URL}/business?${query ? `query=${query}` : ''}${
    category ? `&category=${category}` : ''
  }`;

  try {
    const response = await fetch(fetchUrl);

    const data: APIBusiness[] | APIError = await response.json();

    handleAPIError('getBusinesses', response.status, data);

    return data as APIBusiness[];
  } catch (error) {
    console.error(error);
  }
};

export const getBusinessById = async (id: APIBusiness['_id'] = 'placeholder') => {
  const fetchUrl = `${API_BASE_URL}/business/${id}`;

  try {
    const response = await fetch(fetchUrl);
    const data: APIBusiness = await response.json();

    handleAPIError('getBusinessById', response.status, data);

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const createBusiness = async (business: APIBusinessForm) => {
  const fetchUrl = `${API_BASE_URL}/business`;
  const formData = new FormData();

  for (const [k, v] of Object.entries(business)) {
    if (v && v !== '') formData.append(k, v);
  }

  try {
    const response = await fetch(fetchUrl, {
      body: formData,
      headers: {
        authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
      },
      method: 'POST',
    });

    const data: APIBusiness = await response.json();

    handleAPIError('createBusiness', response.status, data);

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const editBusiness = async (id: APIBusiness['_id'], business: APIBusinessForm) => {
  const fetchUrl = `${API_BASE_URL}/business/${id}`;
  const formData = new FormData();

  for (const [k, v] of Object.entries(business)) {
    formData.append(k, v);
  }

  console.log(formData.getAll('logo'));

  try {
    const response = await fetch(fetchUrl, {
      body: formData,
      headers: {
        authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
      },
      method: 'PUT',
    });

    const data: APIBusiness = await response.json();

    handleAPIError('editBusiness', response.status, data);

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteBusiness = async (id: APIBusiness['_id']) => {
  const fetchUrl = `${API_BASE_URL}/business/${id}`;

  try {
    const response = await fetch(fetchUrl, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
      },
    });

    const data: APIBusiness = await response.json();

    handleAPIError('deleteBusiness', response.status, data);

    return data;
  } catch (error) {
    console.error(error);
  }
};
