const baseConfig = require('../../tailwind.base.config');

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...baseConfig,
  content: [
    ...baseConfig.content,
    './src/**/*.{js,ts,jsx,tsx,html}',
    '../../packages/ui/**/*.{js,ts,jsx,tsx,html}',
  ],
};
