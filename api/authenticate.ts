import type { VercelRequest, VercelResponse } from '@vercel/node';
import { MongoClient } from 'mongodb';
import { connectToMongoDB } from './_mongoDBUtils';

export default async function handler(request: VercelRequest, response: VercelResponse) {
  let client: MongoClient | undefined;

  try {
    client = await connectToMongoDB();

    // perform actions on the collection object
    const collection = client.db('pokemonArchive').collection('users');
    const documentCount = await collection.countDocuments();

    client.close();
    return response.send(documentCount + ' Documentss');
  } catch (err) {
    client?.close();
    return response.send(err);
  }
}