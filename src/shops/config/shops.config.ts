import { registerAs } from '@nestjs/config';

export default registerAs('shops', () => ({
  currency: 'MYR',
}));
