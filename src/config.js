const config = {
  development: {
    API_URL: 'https://dev-panic.aura.services/panic-api/v2',
  },
  production: {
    API_URL: 'https://panic.aura.services/panic-api/v2',
  },
};

const ENV = process.env.NODE_ENV || 'development';

export default config[ENV];