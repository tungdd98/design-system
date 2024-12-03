const baseConfig = require('../../tailwind.base.config');

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...baseConfig,
  content: [
    './src/**/*!(*.stories|*.spec).{js,ts,jsx,tsx,html}',
    '../../packages/ui/**/*!(*.stories|*.spec).{js,ts,jsx,tsx,html}',
  ],
};
