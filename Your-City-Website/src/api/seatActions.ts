import { APISeat, APISeatForm, APIError } from './types';
import { API_BASE_URL, handleAPIError } from './constants';

export const getSeats = async (query?: string) => {
  const fetchUrl = `${API_BASE_URL}/seat?${query ? `query=${query}` : ''}`;

  try {
    const response = await fetch(fetchUrl);

    const data: APISeat[] | APIError = await response.json();

    handleAPIError('getSeats', response.status, data);

    return data as APISeat[];
  } catch (error) {
    console.error(error);
  }
};

export const getSeatById = async (id: APISeat['_id'] = 'placeholder') => {
  const fetchUrl = `${API_BASE_URL}/seat/${id}`;

  try {
    const response = await fetch(fetchUrl);
    const data: APISeat = await response.json();

    handleAPIError('getSeatById', response.status, data);

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const createSeat = async (seat: APISeatForm) => {
  const fetchUrl = `${API_BASE_URL}/seat`;

  try {
    const response = await fetch(fetchUrl, {
      body: JSON.stringify(seat),
      headers: {
        authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    const data: APISeat = await response.json();

    handleAPIError('createSeat', response.status, data);

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const editSeat = async (id: APISeat['_id'], seat: APISeatForm) => {
  const fetchUrl = `${API_BASE_URL}/seat/${id}`;

  try {
    const response = await fetch(fetchUrl, {
      body: JSON.stringify(seat),
      headers: {
        authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
        'Content-Type': 'application/json',
      },
      method: 'PUT',
    });

    const data: APISeat = await response.json();

    handleAPIError('editSeat', response.status, data);

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteSeat = async (id: APISeat['_id']) => {
  const fetchUrl = `${API_BASE_URL}/seat/${id}`;

  try {
    const response = await fetch(fetchUrl, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
      },
    });

    const data: APISeat = await response.json();

    handleAPIError('deleteSeat', response.status, data);

    return data;
  } catch (error) {
    console.error(error);
  }
};
