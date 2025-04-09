import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://linkz:linkz2024@linkz.79c2i.mongodb.net/LinkzPlatform?retryWrites=true&w=majority&appName=Linkz';
const client = new MongoClient(uri);

export const connectDB = async () => {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
  }
};

export const db = client.db('LinkzPlatform');