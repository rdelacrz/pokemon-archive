interface ImportMetaEnv {
  // Base env variables (see https://vitejs.dev/guide/env-and-mode.html for more info)
  readonly MODE: 'development' | 'production';
  readonly BASE_URL: string;
  readonly DEV: boolean;
  readonly PROD: boolean;

  readonly VITE_MONGODB_USERNAME: string;
  readonly VITE_MONGODB_PASSWORD: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
