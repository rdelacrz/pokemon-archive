import axios from 'axios';

class HttpSetup {
  readonly baseHeaders: any = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };

  #createHttpClient() {
    const headers = { ...this.baseHeaders };
    return axios.create({
      baseURL: `${import.meta.env.VITE_APP_URL}/api/`,
      headers,
    });
  }

  get client() {
    return this.#createHttpClient();
  }
}

export const http = new HttpSetup();
