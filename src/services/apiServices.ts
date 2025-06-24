import { LOGIN_ENDPOINT } from '../constants/ApiConstant';
import { http as httpService } from './httpServiceRequest';


export const loginUser = (payload: {}) =>
  httpService.post(`${LOGIN_ENDPOINT}/login`, payload);
