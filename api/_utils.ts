/* Contains constants and functions to be used for MongoDB-related serverless functions. */
import { jwtVerify } from 'jose';

export const MONGODB_URI = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DB}?retryWrites=true&w=majority`;
export const SECRET_KEY = Buffer.from(process.env.JWT_SECRET);

export const verifyJWT = async (jwt: string) => {
  const verify = await jwtVerify(jwt, SECRET_KEY, {
    issuer: process.env.JWT_ISSUER as string,
    audience: process.env.JWT_AUDIENCE as string
  });
  return verify?.payload;
}
