import type { VercelRequest, VercelResponse } from '@vercel/node';
import { MongoClient } from 'mongodb';
import { connectToMongoDB } from './_mongoDBUtils';

export default async function handler(request: VercelRequest, response: VercelResponse) {
  return response.send('Test: ' + (process.env.MONGODB_USERNAME || ''));
}