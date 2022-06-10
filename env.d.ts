interface ImportMetaEnv {
  // Base env variables (see https://vitejs.dev/guide/env-and-mode.html for more info)
  readonly MODE: 'development' | 'production';
  readonly BASE_URL: string;
  readonly DEV: boolean;
  readonly PROD: boolean;

  readonly MONGODB_USERNAME: string;
  readonly MONGODB_PASSWORD: string;
  readonly MONGODB_HOST: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
