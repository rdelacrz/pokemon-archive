import { RegisteredUserParam, User } from '~/models';
import { http } from './_http-client';

const API_ENDPOINT = 'users';

export const userService = {
  getUserData: async () => {
    const url = `/${API_ENDPOINT}`;
    return http.client.get<User>(url).then(resp => resp.data);
  },
  registerUser: async (registeredUser: RegisteredUserParam) => {
    const url = `/${API_ENDPOINT}`;
    return http.client.post<User>(url, registeredUser).then(resp => resp.data);
  },
  authenticate: async (username: string, password: string) => {
    const url = `/${API_ENDPOINT}/authenticate`;
    const body = { username, password };
    return http.client.post<boolean>(url, body).then(resp => resp.data);
  },
  verify: async (verifyKey: string) => {
    const url = `/${API_ENDPOINT}/verify?verifyKey=${verifyKey}`;
    return http.client.post<boolean>(url).then(resp => resp.data);
  },
};