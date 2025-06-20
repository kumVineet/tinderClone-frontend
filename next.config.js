const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

// Determine the environment (default to 'development')
const ENV = process.env.ENV || process.env.NODE_ENV || 'development';
const envFile = `.env.${ENV}`;

// Load the correct .env file
const envPath = path.resolve(__dirname, envFile);
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
  console.log(`✅ Loaded environment variables from ${envFile}`);
} else {
  console.warn(`⚠️  Environment file ${envFile} not found`);
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: '.next',
  images: {
    domains: ['localhost'],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_ENV: process.env.NEXT_PUBLIC_ENV,
  },
};

module.exports = nextConfig;
