import type { VercelRequest, VercelResponse } from '@vercel/node';
import mongoose, { Schema } from 'mongoose';
import { MONGODB_URI } from './_mongoDBUtils';

export default async function handler(request: VercelRequest, response: VercelResponse) {
  try {
    await mongoose.connect(MONGODB_URI);
    const UserModel = mongoose.model('users', new Schema({
      username: String,
      password: String,
      firstName: String,
      lastName: String,
      email: String,
      loginDate: Date,
    }));
    const userDic = new UserModel({ username: 'doommakers' });
    await userDic.save();
    return response.send('doommaker made');
  } catch (err) {
    return response.send(err);
  }
}