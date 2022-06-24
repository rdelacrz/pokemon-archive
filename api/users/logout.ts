import cookie from 'cookie';
import type { VercelRequest, VercelResponse } from '@vercel/node';

async function logoutUser(request: VercelRequest, response: VercelResponse) {
  return response
    .setHeader('Set-Cookie', cookie.serialize('jwt', '', { httpOnly: true, expires: new Date() }))
    .send({});
}

export default async function handler(request: VercelRequest, response: VercelResponse) {
  switch (request.method) {
    case 'POST': return logoutUser(request, response);
    default: return response.status(405).json({ error: 'You do not have access to the method.' });
  }
}