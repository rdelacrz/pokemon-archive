import { connect } from 'mongoose';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { User } from '../_models';
import { MONGODB_URI, verifyJWT } from '../_utils';

async function verifyRegistration(request: VercelRequest, response: VercelResponse) {
  const jwt = request.query.verifyKey as string;
  
  return await verifyJWT(jwt, response,
    async (payload) => {
      try {
        await connect(MONGODB_URI);
        
        // Checks to ensure that user actually exists in system
        const user = await User.findById(payload.userId);
        if (!user) {
          return response.status(403).json({ error: 'User does not exist in system!' });
        }

        // Verifies and activates user account
        user.verified = true;
        user.active = true;
        user.modifiedDate = new Date();
        await user.save()

        return response.send(true);
      } catch (err) {
        return response.status(400).send(err);
      }
    },
    true
  );
}

export default async function handler(request: VercelRequest, response: VercelResponse) {
  switch (request.method) {
    case 'POST': return verifyRegistration(request, response);
    default: return response.status(405).json({ error: 'You do not have access to the method.' });
  }
}