interface ImportMetaEnv {
  // Base env variables (see https://vitejs.dev/guide/env-and-mode.html for more info)
  readonly MODE: 'development' | 'production';
  readonly BASE_URL: string;
  readonly DEV: boolean;
  readonly PROD: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

namespace NodeJS {
  interface ProcessEnv {
    readonly MONGODB_USERNAME: string;
    readonly MONGODB_PASSWORD: string;
    readonly MONGODB_HOST: string;
    readonly MONGODB_DB: string;
    readonly SENDINBLUE_API_KEY: string;
    readonly SENDINBLUE_API_URL: string;
    readonly JWT_SECRET: string;
    readonly JWT_ISSUER: string;
    readonly JWT_AUDIENCE: string;
  }
}