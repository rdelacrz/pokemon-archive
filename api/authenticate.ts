import { hash } from 'bcrypt';
import { connect } from 'mongoose';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { User } from './_models';
import { MONGODB_URI } from './_constants';

async function loginUser(request: VercelRequest, response: VercelResponse) {
  try {
    await connect(MONGODB_URI);

    // You can use a Model to create new documents using `new`:
    const userDoc = new User({
      username: 'Foo',
      password: 'pass',
      email: 'test@email.com'
    });
    await userDoc.save();
    return response.send('doommaker made');
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