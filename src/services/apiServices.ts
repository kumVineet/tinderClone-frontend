import { AUTH_ENDPOINT } from '../constants/ApiConstant';
import { http as httpService } from './httpServiceRequest';


export const loginUser = (payload: {}) =>
  httpService.post(`${AUTH_ENDPOINT}/login`, payload);


export const signupUser = (payload: {}) =>
  httpService.post(`${AUTH_ENDPOINT}/signup`, payload);