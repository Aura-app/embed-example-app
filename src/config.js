import { AURA_ENV } from '@env';

const config = {
  development: {
    API_URL: 'https://dev-panic.aura.services/panic-api/v2',
  },
  staging: {
    API_URL: 'https://staging-panic.aura.services/panic-api/v2',
  },
};
const ENV = AURA_ENV || 'staging';
export default config[ENV];