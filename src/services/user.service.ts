import { http } from './_http-client';

const API_ENDPOINT = '/users';

export const userService = {
  authenticate: async (username: string, password: string) => {
    const url = `${API_ENDPOINT}/authenticate`;
    const body = { username, password };
    return http.client.post<boolean>(url, body).then(resp => resp.data);
  },
};