import { TOTP } from 'otpauth';

export function generateTOTP(key?: string) {
  if (!key) {
    return '';
  }
  try {
    return new TOTP({
      secret: key,
      digits: 6,
      period: 30,
    }).generate();
  } catch (error) {
    console.error('Invalid key:', error);
    return 'Invalid key!';
  }
}
