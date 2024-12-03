const { join } = require('path');
const baseConfig = require('../../tailwind.base.config');

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...baseConfig,
  content: [join(__dirname, 'src/**/*!(*.stories|*.spec).{ts,tsx,html}')],
};
