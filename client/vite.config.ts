import { defineConfig, Alias } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';

const Paths: Alias[] = [];

const AppPath: Alias = {
  find: '@',
  replacement: path.resolve(__dirname, './src'),
};

const AssetsPath: Alias = {
  find: 'assets',
  replacement: path.resolve(__dirname, './assets'),
};

const ComponentsPath: Alias = {
  find: 'components',
  replacement: path.resolve(__dirname, './src/components'),
};

Paths.push(AppPath, AssetsPath, ComponentsPath);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: Paths,
  },
});
