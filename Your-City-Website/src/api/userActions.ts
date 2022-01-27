import { decode } from 'jsonwebtoken';
import { API_BASE_URL, handleAPIError } from './constants';
import { APILoginTokens } from './types';

export const login = async (loginInfo: { email: string; password: string }) => {
  const fetchUrl = `${API_BASE_URL}/users/login`;

  try {
    const response = await fetch(fetchUrl, {
      body: JSON.stringify(loginInfo),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    });

    const data: APILoginTokens = await response.json();

    handleAPIError('login', response.status, data);

    sessionStorage.setItem('accessToken', data.accessToken);
    sessionStorage.setItem('refreshToken', data.refreshToken);
    sessionStorage.setItem('userEmail', decode(data.accessToken, { json: true })?.email);

    return true;
  } catch (error) {
    console.error(error);
  }
};

export const exchangeTokens = async (refreshToken: string) => {
  console.log(refreshToken);
};

export const logout = async () => {
  const fetchUrl = `${API_BASE_URL}/users/logout`;

  try {
    const response = await fetch(fetchUrl, {
      body: JSON.stringify({
        email: sessionStorage.getItem('userEmail'),
      }),
      method: 'POST',
    });

    const data = await response.json();

    handleAPIError('logout', response.status, data);

    sessionStorage.clear();

    return true;
  } catch (error) {
    console.error(error);
  }
};
