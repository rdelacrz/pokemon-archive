/* Contains constants and functions to be used for MongoDB-related serverless functions. */
import { VercelRequest, VercelResponse } from '@vercel/node';
import { JWTPayload, jwtVerify } from 'jose';

export const MONGODB_URI = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DB}?retryWrites=true&w=majority`;
export const SECRET_KEY = Buffer.from(process.env.JWT_SECRET || '');

/**
 * Attempts to verify a JWT token and ensure its issuer and audience are valid, and that it has not expired. If verification
 * is successfully, calls the callback function and return its value.
 * 
 * @param jwt JWT token being verified.
 * @param response Response object used to pass status code and data to the client.
 * @param callbackFunction Function that is called if verification is successful.
 * @param isVerificationToken True if JWT token will be used specifically to verify a newly-registered user, false otherwise.
 * @returns Result of callback function with JWT payload, or error-related response if verification fails.
 */
export const verifyJWT = async (
  jwt: string,
  response: VercelResponse,
  callbackFunction: (payload: JWTPayload) => Promise<VercelResponse>,
  isVerificationToken = false
) => {
  try {
    const verify = await jwtVerify(jwt, SECRET_KEY, {
      issuer: process.env.JWT_ISSUER as string,
      audience: isVerificationToken
        ? process.env.JWT_VERIFY_AUDIENCE as string
        : process.env.JWT_AUDIENCE as string,
    });
    return await callbackFunction(verify?.payload);
  } catch (err) {
    return response.status(401).send(err);
  }
}
