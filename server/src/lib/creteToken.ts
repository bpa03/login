import jwt, { Secret } from 'jsonwebtoken';

type PayloadType = string | Buffer | object;

export default function createToken(payload: PayloadType): string {
  const secretKey: Secret = process.env.JWT_SECRET ? process.env.JWT_SECRET : 'secret';
  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
}
