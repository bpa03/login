/* eslint-disable no-unused-vars */
/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_NODE_ENV: 'development' | 'production';
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
