import { compare } from 'bcrypt';
import { SignJWT, decodeJwt, jwtVerify } from 'jose';
import { connect } from 'mongoose';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { User } from './_models';
import { MONGODB_URI, SECRET_KEY, verifyJWT } from './_utils';

async function loginUser(request: VercelRequest, response: VercelResponse) {
  const username = request.body.username as string;
  const password = request.body.password as string;

  try {
    await connect(MONGODB_URI);

    const user = await User.find({ username }).collation({ locale: 'en', strength: 2 }).exec();
    if (user.length === 0) {
      return response.status(401).json({ error: 'The username or password you entered is incorrect.' });
    }

    const isMatch = await compare(password, user[0].password);
    if (!isMatch) {
      return response.status(401).json({ error: 'The username or password you entered is incorrect.' });
    }
    
    const jwt = await new SignJWT({ 'user': user[0].id })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setIssuer(process.env.JWT_ISSUER as string)
      .setAudience(process.env.JWT_AUDIENCE as string)
      .setExpirationTime('24h')
      .sign(SECRET_KEY);

    return response.send(jwt);
  } catch (err) {
    console.error(err)
    return response.status(400).send(err);
  }
}

export default async function handler(request: VercelRequest, response: VercelResponse) {
  switch (request.method) {
    case 'POST': return loginUser(request, response);
    default: return response.status(405).json({ error: 'You do not have access to the method.' });
  }
}