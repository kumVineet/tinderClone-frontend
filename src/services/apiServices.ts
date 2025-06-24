import { AUTH_ENDPOINT } from '../constants/ApiConstant';
import { httpService  } from './httpServiceRequest';

export const loginUserApi = (payload: {}) =>
  httpService.post(`${AUTH_ENDPOINT}/login`, payload);

export const signupUserApi = (payload: {}) =>
  httpService.post(`${AUTH_ENDPOINT}/signup`, payload);

export const logoutUserApi = () => httpService.post(`${AUTH_ENDPOINT}/logout`, {});
