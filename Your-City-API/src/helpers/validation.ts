import { IUser } from '../models/user';

export const validateEmail = (email: string) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(email);
};

export const validatePhone = (phone: string) => {
  const re = /\d{3}-\d{3}-\d{4}/;

  return re.test(phone);
};

export const validatePassword = (password: string) => {
  const re = /[\w\d]+/;

  return re.test(password);
};

export const validateUsername = (username: string) => {
  const re = /[\w\d]+/;

  return re.test(username);
};

export const validateRole = (role: IUser['role']) => {
  const roles: IUser['role'][] = ['admin', 'user', 'reader'];

  return roles.includes(role);
};
