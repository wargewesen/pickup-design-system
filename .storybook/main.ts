import { fileURLToPath } from 'node:url';
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    '../stories/**/*.mdx',
    '../stories/**/*.stories.@(ts|tsx)',
    '../src/**/*.stories.@(ts|tsx)',
    '../app/src/**/*.stories.@(ts|tsx)',
  ],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
  framework: { name: '@storybook/react-vite', options: {} },
  // stories/assets (component story images) and app/public/assets (prototype images) are both served at /assets.
  staticDirs: [
    { from: '../stories/assets', to: '/assets' },
    { from: '../app/public/assets', to: '/assets' },
  ],
  viteFinal: async (config) => {
    config.resolve ??= {};
    config.resolve.alias = {
      ...(config.resolve.alias as Record<string, string>),
      '@figma/pickup-design-system': fileURLToPath(new URL('../src/index.ts', import.meta.url)),
      '@app': fileURLToPath(new URL('../app/src', import.meta.url)),
    };
    return config;
  },
};

export default config;
