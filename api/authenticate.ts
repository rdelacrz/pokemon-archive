import { MongoClient, ServerApiVersion } from 'mongodb';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  const uri = `mongodb+srv://${import.meta.env.VITE_MONGODB_USERNAME}:${import.meta.env.VITE_MONGODB_PASSWORD}@pokecluster.c7k6bjo.mongodb.net/?retryWrites=true&w=majority`;
  const client = new MongoClient(uri, { serverApi: ServerApiVersion.v1 });
  client.connect(err => {
    const collection = client.db('pokemonArchive').collection('users');
    // perform actions on the collection object
    client.close();
  });
  return response.send('OK');
}