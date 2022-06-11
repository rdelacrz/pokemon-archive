import type { VercelRequest, VercelResponse } from '@vercel/node';
import { connect } from 'mongoose';
import { User } from './_models';
import { MONGODB_URI } from './_mongoDBUtils';

export default async function handler(request: VercelRequest, response: VercelResponse) {
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
    return response.send(err);
  }
}