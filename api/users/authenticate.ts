import { compare } from 'bcrypt';
import { SignJWT } from 'jose';
import { connect } from 'mongoose';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { User } from '../_models';
import { MONGODB_URI, SECRET_KEY } from '../_utils';

async function loginUser(request: VercelRequest, response: VercelResponse) {
  const username = request.body.username as string;
  const password = request.body.password as string;

  try {
    await connect(MONGODB_URI);

    const user = await User.findOne({ username }).collation({ locale: 'en', strength: 2 }).exec();
    if (!user) {
      return response.status(401).json({ error: 'The username or password you entered is incorrect.' });
    }

    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      return response.status(401).json({ error: 'The username or password you entered is incorrect.' });
    }

    if (!user.verified) {
      return response.status(401).json({ error: 'This profile must be verified.' });
    }

    if (!user.active) {
      return response.status(401).json({ error: 'This profile has been deactivated.' });
    }
    
    const jwt = await new SignJWT({ 'userId': user.id })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setIssuer(process.env.JWT_ISSUER || '')
      .setAudience(process.env.JWT_AUDIENCE || '')
      .setExpirationTime('24h')
      .sign(SECRET_KEY);
    
    // Updates login date
    user.loginDate = new Date();
    await user.save();

    return response.send(jwt);
  } catch (err) {
    return response.status(400).send(err);
  }
}

export default async function handler(request: VercelRequest, response: VercelResponse) {
  switch (request.method) {
    case 'POST': return loginUser(request, response);
    default: return response.status(405).json({ error: 'You do not have access to the method.' });
  }
}