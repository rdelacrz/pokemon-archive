import { MongoClient, ServerApiVersion } from 'mongodb';

export const connectToMongoDB = async () => {
  const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/?retryWrites=true&w=majority`;
  const client = new MongoClient(uri, { serverApi: ServerApiVersion.v1 });
  return client.connect();
}