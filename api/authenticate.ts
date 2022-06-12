import { compare } from 'bcrypt';
import { connect } from 'mongoose';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { User } from './_models';
import { MONGODB_URI } from './_constants';

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

    // TODO: Implement authentication system
    return response.send(true);
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