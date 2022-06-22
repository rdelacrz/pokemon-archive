import axios from 'axios';
import { wrapper } from 'axios-cookiejar-support';
import { Cookie, CookieJar } from 'tough-cookie';

class HttpSetup {
  readonly baseHeaders: any = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };

  #authToken?: string;

  #createHttpClient() {
    const headers = { ...this.baseHeaders };
    
    const jar = new CookieJar();

    // Adds authorization token, if currently available
    if (this.#authToken) {
      const cookie = new Cookie({
        key: 'jwt',
        value: this.#authToken,
        httpOnly: true,
      });
      jar.setCookie(cookie, import.meta.env.BASE_URL);
    }

    return wrapper(axios.create({
      baseURL: import.meta.env.BASE_URL,
      headers,
      jar,
    }));
  }

  setAuthToken(authToken: string) {
    this.#authToken = authToken;
  }

  get client() {
    return this.#createHttpClient();
  }
}

export const http = new HttpSetup();
