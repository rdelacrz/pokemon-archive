import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(request: VercelRequest, response: VercelResponse) {
  return response.send('Test: ' + (process.env.MONGODB_USERNAME || ''));
}